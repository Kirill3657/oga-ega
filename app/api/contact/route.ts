import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    const token = process.env.MAX_BOT_TOKEN;
    const chatId = process.env.MAX_CHAT_ID;

    if (!token || !chatId) {
      console.error('Нет MAX_BOT_TOKEN или MAX_CHAT_ID');
      return NextResponse.json({ ok: false, error: 'Настройки MAX не найдены' }, { status: 500 });
    }

    // Создаем агента, который пропускает ошибки сертификатов (для Минцифры)
    const agent = new https.Agent({ rejectUnauthorized: false });

    const text = `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Комментарий: ${message || 'Нет'}`;

    const response = await fetch('https://platform-api2.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // токен без Bearer
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
      // @ts-ignore - чтобы TypeScript не ругался на agent
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