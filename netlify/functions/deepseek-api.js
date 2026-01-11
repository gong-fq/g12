const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const { messages } = JSON.parse(event.body);

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1800, // 适度调整，确保在10秒内能传回大部分核心内容
        temperature: 0.6,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      return { statusCode: response.status, body: errorData };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Professor, the server timed out. Please try again." }) };
  }
};