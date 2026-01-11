const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 只允许POST请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: '服务器配置错误：未找到API密钥。请在Netlify环境变量中设置DEEPSEEK_API_KEY。' 
        })
      };
    }

    // 解析请求体
    const requestData = JSON.parse(event.body);

    // 调用DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: requestData.messages,
        max_tokens: requestData.max_tokens || 2000,
        temperature: requestData.temperature || 0.7
      })
    });

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API Error:', errorText);
      
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: `DeepSeek API错误 (${response.status}): ${errorText}` 
        })
      };
    }

    // 返回成功响应
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Function Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: `服务器错误: ${error.message}` 
      })
    };
  }
};
