/**
 * Business: Send flower order to Telegram bot @pnkma
 * Args: event with httpMethod, body containing order details
 * Returns: HTTP response with success/error status
 */

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;
  
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      },
      body: '',
      isBase64Encoded: false
    };
  }
  
  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
      isBase64Encoded: false
    };
  }

  const orderData = JSON.parse(body || '{}');
  
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Telegram configuration missing',
        message: 'Пожалуйста, свяжитесь с администратором для настройки Telegram'
      }),
      isBase64Encoded: false
    };
  }

  const itemsList = orderData.items
    .map(item => {
      const itemPrice = item.discount 
        ? Math.round(item.price * (1 - item.discount / 100))
        : item.price;
      return `• ${item.name} x${item.quantity} — ${itemPrice * item.quantity}₽`;
    })
    .join('\n');

  const totalWithDiscount = Math.round(orderData.total * 0.75);

  const message = `🌸 НОВЫЙ ЗАКАЗ Elena's Flowers\n\n` +
    `👤 Клиент: ${orderData.name}\n` +
    `📱 Телефон: ${orderData.phone}\n` +
    `📍 Адрес: ${orderData.address}\n` +
    `📅 Дата: ${orderData.date}\n` +
    `⏰ Время: ${orderData.time}\n\n` +
    `🛒 Товары:\n${itemsList}\n\n` +
    `💰 Сумма: ${orderData.total}₽\n` +
    `🎉 Скидка 25% на первую доставку: ${totalWithDiscount}₽\n\n` +
    `ID заказа: ${context.requestId}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to send Telegram message',
        details: result
      }),
      isBase64Encoded: false
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ 
      success: true,
      message: 'Заказ успешно отправлен в Telegram!',
      orderId: context.requestId
    }),
    isBase64Encoded: false
  };
};
