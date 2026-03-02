import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  fullName: z.string().min(2),
  contact: z.string().min(3),
  carModel: z.string().min(2),
  comment: z.string().optional(),
  selectedServices: z.array(z.string()).optional()
});

const berlin = () =>
  new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date());

async function sendTelegram(lead: {
  id: number;
  fullName: string;
  contact: string;
  carModel: string;
  comment: string | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chat) {
    console.warn('[lead] Telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing');
    return { sent: false, reason: 'missing_env' as const };
  }

  const text = `🧾 <b>Новая заявка NeGaraj</b>\n👤 ФИО: ${lead.fullName}\n📱 Контакт: ${lead.contact}\n🚘 Авто: ${lead.carModel}\n🛠️ Работы/коммент: ${lead.comment || '-'}\n🕒 ${berlin()}\n🆔 ID: ${lead.id}`;
  const reply_markup = {
    inline_keyboard: [
      [
        { text: '✅ Обработано', callback_data: `lead:${lead.id}:PROCESSED` },
        { text: '⏳ Не обработано', callback_data: `lead:${lead.id}:PENDING` }
      ]
    ]
  };

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', reply_markup }),
      cache: 'no-store'
    });

    const tgResult = await response.json().catch(() => null);

    if (!response.ok || tgResult?.ok === false) {
      console.error('[lead] Telegram send failed', {
        status: response.status,
        statusText: response.statusText,
        tgResult
      });
      return { sent: false, reason: 'telegram_error' as const, details: tgResult };
    }

    console.info('[lead] Telegram send success', {
      leadId: lead.id,
      chatId: chat,
      messageId: tgResult?.result?.message_id
    });
    return { sent: true as const };
  } catch (error) {
    console.error('[lead] Telegram send exception', {
      leadId: lead.id,
      error: error instanceof Error ? error.message : String(error)
    });
    return { sent: false, reason: 'exception' as const };
  }
}

export async function POST(req: Request) {
  try {
    const payload = leadSchema.parse(await req.json());

    const lead = await prisma.lead.create({
      data: { ...payload, selectedServices: payload.selectedServices || [], source: 'web' }
    });

    const telegram = await sendTelegram({
      id: lead.id,
      fullName: lead.fullName,
      contact: lead.contact,
      carModel: lead.carModel,
      comment: lead.comment
    });

    if (!telegram.sent) {
      console.warn('[lead] Created in DB, but Telegram not sent', { leadId: lead.id, reason: telegram.reason });
    }

    return NextResponse.json({ ok: true, id: lead.id, telegram });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[lead] Validation error', { issues: error.issues });
      return NextResponse.json({ ok: false, error: 'validation_error', issues: error.issues }, { status: 400 });
    }

    console.error('[lead] Unhandled error', {
      error: error instanceof Error ? error.message : String(error)
    });
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}
