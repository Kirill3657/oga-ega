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
      from: 'Учи.ру <hello@mail.engelsuchi64.ru>', 
      to: ['wwwkirillstarcraft@gmail.com'], // Замените на реальную почту заказчика!
      subject: 'Новая заявка с сайта',
      replyTo: 'onboarding@resend.dev', // Куда отвечать клиенту (можно оставить как есть)
      html: `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Новая заявка</title>
        </head>
        <body style="margin:0; padding:0; background-color:#0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B0F19; padding:40px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background-color:#0F1523; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="padding:32px 32px 24px 32px; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #eab308 100%);">
                      <h1 style="margin:0; font-size:22px; font-weight:900; color:#0B0F19; letter-spacing:-0.5px;">
                        Учи.ру
                      </h1>
                      <p style="margin:6px 0 0 0; font-size:13px; color:rgba(11,15,25,0.75); font-weight:500;">
                        Новая заявка с сайта
                      </p>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="padding:32px;">
                      <p style="margin:0 0 24px 0; font-size:15px; line-height:1.6; color:#cbd5e1;">
                        Поступила новая заявка. Свяжитесь с клиентом в течение дня.
                      </p>

                      <!-- ПОЛЕ: ИМЯ -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px; background-color:rgba(255,255,255,0.04); border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
                        <tr>
                          <td style="padding:14px 18px;">
                            <p style="margin:0 0 4px 0; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#22d3ee; font-weight:700;">Имя</p>
                            <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">${name}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- ПОЛЕ: ТЕЛЕФОН -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px; background-color:rgba(255,255,255,0.04); border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
                        <tr>
                          <td style="padding:14px 18px;">
                            <p style="margin:0 0 4px 0; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#22d3ee; font-weight:700;">Телефон</p>
                            <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">
                              <a href="tel:${phone}" style="color:#ffffff; text-decoration:none;">${phone}</a>
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- ПОЛЕ: КОММЕНТАРИЙ -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px; background-color:rgba(255,255,255,0.04); border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
                        <tr>
                          <td style="padding:14px 18px;">
                            <p style="margin:0 0 4px 0; font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#22d3ee; font-weight:700;">Комментарий</p>
                            <p style="margin:0; font-size:15px; color:#e2e8f0; line-height:1.5;">${message || '<span style="color:#64748b;">— не указан —</span>'}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center">
                            <a href="tel:${phone}" style="display:inline-block; padding:14px 32px; background:linear-gradient(135deg, #06b6d4 0%, #22c55e 100%); color:#0B0F19; font-size:15px; font-weight:700; text-decoration:none; border-radius:999px;">
                              Позвонить клиенту
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="padding:20px 32px 28px 32px; border-top:1px solid rgba(255,255,255,0.06);">
                      <p style="margin:0; font-size:12px; color:#64748b; line-height:1.5; text-align:center;">
                        Это письмо отправлено автоматически с сайта <span style="color:#22d3ee; font-weight:600;">Учи.ру</span><br>
                        г. Энгельс, ул. Тельмана 14а · +7 (927) 161-98-04
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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