import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Инициализируем Resend с API ключом из переменных окружения
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    // Проверяем наличие API ключа
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'API ключ Resend не настроен' }, { status: 500 });
    }

    // Отправляем письмо
    const { data, error } = await resend.emails.send({
      // Важно: Если у вас нет своего домена, используйте onboarding@resend.dev для теста
      // Если у вас есть верифицированный домен (например, ваш-домен.ру), укажите его здесь
      from: 'Учи.ру <zayavki@resend.dev>', 
      to: ['wwwkirillstarcraft@gmail.com'], // Замените на реальную почту заказчика!
      subject: 'Новая заявка с сайта',
      replyTo: 'onboarding@resend.dev', // Куда отвечать клиенту (можно оставить как есть)
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Новая заявка на обучение!</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Комментарий:</strong> ${message || 'Нет'}</p>
          <hr>
          <p style="color: #777; font-size: 12px;">Это письмо отправлено автоматически с сайта Учи.ру</p>
        </div>
      `,
    });

    if (error) {
      console.error('Ошибка Resend:', error);
      return NextResponse.json({ ok: false, error: 'Ошибка отправки письма' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json({ ok: false, error: 'Внутренняя ошибка' }, { status: 500 });
  }
}