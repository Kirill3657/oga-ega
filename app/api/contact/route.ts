import { NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    const token = process.env.MAX_BOT_TOKEN;
    const chatId = process.env.MAX_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: 'Настройки MAX не найдены' }, { status: 500 });
    }

    // Сертификаты лежат в public/certs
    const certDir = path.join(process.cwd(), 'public', 'certs');

    const rootCa = fs.readFileSync(path.join(certDir, 'russian_trusted_root_ca.pem'));
    const subCa = fs.readFileSync(path.join(certDir, 'russian_trusted_sub_ca.pem'));

    const agent = new https.Agent({
      ca: [rootCa, subCa],
    });

    const text = `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Комментарий: ${message || 'Нет'}`;

    const response = await fetch('https://platform-api2.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
      // @ts-ignore
      agent: agent,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка MAX API:', response.status, errorText);
      return NextResponse.json({ ok: false, error: 'MAX API error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json({ ok: false, error: 'Внутренняя ошибка' }, { status: 500 });
  }
}