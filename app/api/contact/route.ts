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
      console.error('Нет MAX_BOT_TOKEN или MAX_CHAT_ID');
      return NextResponse.json({ ok: false, error: 'Настройки MAX не найдены' }, { status: 500 });
    }

    // 1. Определяем путь к папке с сертификатами.
    // В Vercel process.cwd() указывает на корень вашего репозитория (где лежит package.json).
    const certDir = path.join(process.cwd(), 'certs');

    // 2. Считываем содержимое сертификатов из файлов.
    // Файлы должны быть в текстовом формате PEM (Base64).
    // Если файл не найден или бинарный, код упадет с ошибкой, и мы это увидим в логах.
    const rootCa = fs.readFileSync(path.join(certDir, 'russian_trusted_root_ca.pem'));
    const subCa = fs.readFileSync(path.join(certDir, 'russian_trusted_sub_ca.pem'));

    // 3. Создаем специального агента (Agent) для Node.js.
    // Мы передаем ему массив доверенных сертификатов (массив Buffer'ов).
    const agent = new https.Agent({
      ca: [rootCa, subCa],
    });

    const text = `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Комментарий: ${message || 'Нет'}`;

    // 4. Отправляем запрос, передавая созданного агента в параметрах fetch.
    // @ts-ignore используется, чтобы TypeScript не ругался (так как fetch напрямую не типизирован для agent).
    const response = await fetch('https://platform-api2.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Токен передается без слова Bearer, просто строка
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