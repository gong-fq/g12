const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const requestData = JSON.parse(event.body);

    // 优化 1：使用更稳定的 API 路径并设置合理的超时预期
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: requestData.messages,
        // 优化 2：为了防止超时，我们适当控制在 2000 token 以内，但这足以支撑长篇学术解释
        max_tokens: 2000, 
        temperature: 0.6
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Professor, the server is temporarily overloaded. 请重试。" }) };
  }
};