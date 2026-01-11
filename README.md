# 英语语法助手 - Netlify部署指南

这是一个基于DeepSeek AI的英语语法学习助手，通过Netlify Functions安全地调用API，保护你的API密钥不被泄露。

## 📁 项目结构

```
.
├── index.html                    # 主页面
├── package.json                  # 项目依赖
├── netlify.toml                  # Netlify配置
├── .gitignore                    # Git忽略文件
├── .env.example                  # 环境变量示例
└── netlify/
    └── functions/
        └── deepseek-api.js       # API代理函数
```

## 🚀 部署步骤

### 1. 准备代码仓库

将所有文件上传到GitHub仓库（推荐）或其他Git平台。

### 2. 在Netlify创建站点

1. 登录 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" → "Import an existing project"
3. 选择你的Git仓库
4. 构建设置会自动从 `netlify.toml` 读取，无需手动配置

### 3. 配置环境变量 ⚠️ **重要**

在Netlify中设置API密钥：

1. 进入你的站点控制台
2. 前往 **Site settings** → **Environment variables**
3. 点击 **Add a variable**
4. 添加以下变量：
   - **Key**: `DEEPSEEK_API_KEY`
   - **Value**: 你的DeepSeek API密钥
   - **Scopes**: 选择 "All deployment contexts"

### 4. 部署

点击 "Deploy site"，Netlify会自动：
- 安装依赖
- 部署静态文件
- 创建serverless函数

## 🔑 获取DeepSeek API密钥

1. 访问 [DeepSeek平台](https://platform.deepseek.com/)
2. 注册/登录账号
3. 在控制台中创建API密钥
4. 复制密钥并在Netlify中配置

## 🔒 安全特性

- ✅ API密钥存储在Netlify环境变量中
- ✅ 前端无法直接访问密钥
- ✅ 所有API请求通过serverless函数代理
- ✅ 设置了安全响应头

## 🧪 本地测试

如果需要在本地测试：

1. 安装Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. 创建 `.env` 文件（基于 `.env.example`）：
   ```bash
   DEEPSEEK_API_KEY=你的实际API密钥
   ```

3. 启动本地开发服务器：
   ```bash
   netlify dev
   ```

4. 访问 `http://localhost:8888`

## 📝 使用说明

部署成功后，用户可以：
- 选择语法主题学习
- 输入问题获取AI讲解
- 使用语音输入（支持中英文）
- 听取AI回答的语音播放
- 切换中英文界面

## ⚠️ 注意事项

1. **不要**将 `.env` 文件提交到Git仓库
2. **确保** `.gitignore` 包含了 `.env`
3. **定期检查** API使用量，避免超出配额
4. 如果API密钥泄露，立即在DeepSeek平台重新生成

## 🛠️ 故障排查

### 问题：API请求失败
- 检查Netlify环境变量是否正确设置
- 确认DeepSeek API密钥有效
- 查看Netlify Functions日志

### 问题：函数未找到
- 确认 `netlify.toml` 配置正确
- 检查函数文件路径是否为 `netlify/functions/deepseek-api.js`

## 📧 支持

如有问题，请检查：
- [Netlify文档](https://docs.netlify.com/)
- [DeepSeek API文档](https://platform.deepseek.com/docs)

---

**版本**: 1.0.0  
**最后更新**: 2025年1月
