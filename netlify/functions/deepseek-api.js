const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const requestData = JSON.parse(event.body);

    // 注意：去掉 v1，直接使用标准路径，这样更稳定
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: requestData.messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    // 这里的报错会直接显示在 Netlify Function 日志里
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};