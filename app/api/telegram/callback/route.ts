import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type TelegramUpdate = {
  callback_query?: {
    data?: string;
    message?: {
      text?: string;
      chat: { id: number | string };
      message_id: number;
      reply_markup?: unknown;
    };
  };
  message?: {
    text?: string;
    chat: { id: number | string };
    from?: { id: number; username?: string; first_name?: string; last_name?: string };
  };
};

const berlin = () =>
  new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date());

async function tgRequest(method: string, payload: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return response.json().catch(() => null);
}

async function forwardBotLead(rawText: string, fromChatId: number | string) {
  const lineParts = rawText
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const fullName = lineParts[0] || 'Не указано';
  const contact = lineParts[1] || `tg:${fromChatId}`;
  const carModel = lineParts[2] || 'Не указано';
  const comment = lineParts.slice(3).join(', ') || rawText;

  const lead = await prisma.lead.create({
    data: {
      fullName,
      contact,
      carModel,
      comment,
      selectedServices: JSON.stringify([]),
      source: 'tg_bot'
    }
  });

  const text = `🧾 <b>Новая заявка NeGaraj</b>\n👤 ФИО: ${lead.fullName}\n📱 Контакт: ${lead.contact}\n🚘 Авто: ${lead.carModel}\n🛠️ Работы/коммент: ${lead.comment || '-'}\n🕒 ${berlin()}\n🆔 ID: ${lead.id}`;
  const reply_markup = {
    inline_keyboard: [
      [
        { text: '✅ Обработано', callback_data: `lead:${lead.id}:PROCESSED` },
        { text: '⏳ Не обработано', callback_data: `lead:${lead.id}:PENDING` }
      ]
    ]
  };

  if (process.env.TELEGRAM_CHAT_ID) {
    await tgRequest('sendMessage', {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      reply_markup
    });
  }

  await tgRequest('sendMessage', {
    chat_id: fromChatId,
    text: '✅ Заявка принята. Скоро свяжемся с вами.'
  });
}

export async function POST(req: Request) {
  const update = (await req.json()) as TelegramUpdate;

  const callback = update.callback_query;
  if (callback?.data && callback.message) {
    const [, id, status] = String(callback.data).split(':');
    if (id && status) {
      await prisma.lead.update({ where: { id: Number(id) }, data: { status: status as any } });
    }

    const txt = `${callback.message.text || ''}\n\nСтатус: ${status}`;
    await tgRequest('editMessageText', {
      chat_id: callback.message.chat.id,
      message_id: callback.message.message_id,
      text: txt,
      reply_markup: callback.message.reply_markup
    });

    return NextResponse.json({ ok: true, type: 'callback' });
  }

  const message = update.message;
  if (message?.text) {
    const msgText = message.text.trim();

    if (msgText.startsWith('/start')) {
      await tgRequest('sendMessage', {
        chat_id: message.chat.id,
        text: 'Привет! Напишите фамилию, номер для связи, модель авто, комментарий по работе (в одном сообщении, через запятую или с новой строки).'
      });
      return NextResponse.json({ ok: true, type: 'start' });
    }

    await forwardBotLead(msgText, message.chat.id);
    return NextResponse.json({ ok: true, type: 'bot_lead' });
  }

  return NextResponse.json({ ok: true, type: 'ignored' });
}
