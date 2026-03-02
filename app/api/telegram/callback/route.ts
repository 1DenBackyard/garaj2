import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req:Request){
  const u=await req.json(); const cb=u.callback_query; if(!cb) return NextResponse.json({ok:true});
  const [_, id, status] = String(cb.data).split(':');
  if(id&&status) await prisma.lead.update({where:{id:Number(id)},data:{status:status as any}});
  if(process.env.TELEGRAM_BOT_TOKEN){
    const token=process.env.TELEGRAM_BOT_TOKEN;
    const txt=`${cb.message?.text||''}\n\nСтатус: ${status}`;
    await fetch(`https://api.telegram.org/bot${token}/editMessageText`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:cb.message.chat.id,message_id:cb.message.message_id,text:txt,reply_markup:cb.message.reply_markup})});
  }
  return NextResponse.json({ok:true});
}
