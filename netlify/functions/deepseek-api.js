const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 仅允许 POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    // 从 Netlify 后台的环境变量读取 Key
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: '环境变量 DEEPSEEK_API_KEY 未设置' }) 
      };
    }

    const requestData = JSON.parse(event.body);

    // 调用 DeepSeek 官方接口
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};