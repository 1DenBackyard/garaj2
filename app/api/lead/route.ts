import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';
const s = z.object({fullName:z.string().min(2),contact:z.string().min(3),carModel:z.string().min(2),comment:z.string().optional(),selectedServices:z.array(z.string()).optional()});
const berlin=()=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Berlin',dateStyle:'short',timeStyle:'medium'}).format(new Date());
async function sendTelegram(lead:any){
  if(!process.env.TELEGRAM_BOT_TOKEN||!process.env.TELEGRAM_CHAT_ID) return;
  const token=process.env.TELEGRAM_BOT_TOKEN; const chat=process.env.TELEGRAM_CHAT_ID;
  const text=`🧾 <b>Новая заявка NeGaraj</b>\n👤 ФИО: ${lead.fullName}\n📱 Контакт: ${lead.contact}\n🚘 Авто: ${lead.carModel}\n🛠️ Работы/коммент: ${lead.comment||'-'}\n🕒 ${berlin()}\n🆔 ID: ${lead.id}`;
  const reply_markup={inline_keyboard:[[{text:'✅ Обработано',callback_data:`lead:${lead.id}:PROCESSED`},{text:'⏳ Не обработано',callback_data:`lead:${lead.id}:PENDING`}]]};
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chat,text,parse_mode:'HTML',reply_markup})});
}
export async function POST(req:Request){
  const body=s.parse(await req.json());
  const lead=await prisma.lead.create({data:{...body,selectedServices:body.selectedServices||[],source:'web'}});
  await sendTelegram(lead);
  return NextResponse.json({ok:true,id:lead.id});
}
