import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Получаем данные из формы
    const { name, phone, message } = await request.json();
    
    // Берем данные из переменных окружения (создадим на шаге 2)
    const token = process.env.MAX_BOT_TOKEN;
    const chatId = process.env.MAX_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: 'Настройки MAX не найдены' }, { status: 500 });
    }

    // Формируем текст для сообщения
    const text = `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Комментарий: ${message || 'Нет'}`;

    // Отправляем запрос в MAX API
    const response = await fetch(`https://platform-api2.max.ru/messages?chat_id=${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Токен передается без "Bearer" [citation:11]
      },
      body: JSON.stringify({
        text: text,
        format: "markdown" // Поддержка жирного текста и переносов
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка MAX API:', errorText);
      return NextResponse.json({ ok: false, error: 'Не удалось отправить' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json({ ok: false, error: 'Внутренняя ошибка' }, { status: 500 });
  }
}