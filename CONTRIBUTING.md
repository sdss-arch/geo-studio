# GEO Studio 贡献者指南 (Contributing Guide)

欢迎加入 **GEO Studio** 开源项目！我们非常欢迎来自全球开发者的代码改进、实战案例沉淀、算法适配与文档优化。

---

## 🛠️ 本地开发环境准备

### 1. 技术栈概览
- **前端框架**：React 18 + TypeScript + Vite
- **样式方案**：Tailwind CSS (Zero-Pill Enterprise Style)
- **后端服务**：Express + Node.js (全栈单体架构，端口 3000)
- **AI 调度底座**：Universal AI Dispatcher (Gemini / DeepSeek / Ollama / OpenAI)

### 2. 启动步骤
```bash
# 1. 克隆你的 Fork 仓库
git clone https://github.com/<your-username>/geo-studio.git
cd geo-studio

# 2. 安装依赖
npm install

# 3. 复制环境变量 (可选)
cp .env.example .env

# 4. 启动全栈开发服务 (热更新)
npm run dev
```

浏览器打开 `http://localhost:3000` 即可进入工作台。

---

## 🌿 Git 分支与提交流程

1. 基于 `main` 分支拉取新的特性分支：
   ```bash
   git checkout -b feat/your-feature-name
   # 或
   git checkout -b fix/issue-description
   ```
2. 编码规范遵循 Conventional Commits：
   - `feat:` 新增功能
   - `fix:` 修复 Bug
   - `docs:` 文档更新
   - `style:` 格式与样式优化
   - `refactor:` 代码重构
   - `perf:` 性能提升
3. 提交前本地必须运行验证：
   ```bash
   npm run lint
   npm run build
   ```
4. 推送并提交 Pull Request 至官方仓库 `main` 分支。

---

## 💡 我们最欢迎的贡献方向
- 更多国内与国际高权重信源适配（如小红书、微信搜一搜、Reddit 专项物料生成）
- 更多开源大模型（如 Qwen2.5-Coder、Llama 3.3、GLM-4）适配
- 批量自动化巡检脚本与企业微信/钉钉/飞书告警机器人推送
- 各行业一线真实的 GEO 落地案例补充！
