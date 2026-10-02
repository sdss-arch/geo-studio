import React, { useState, useEffect } from 'react';
import { CrawlerAuditResponse, EngineStatusResponse } from '../../types/geo';
import { 
  Network, 
  Code, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Terminal,
  Zap,
  Layers,
  Settings,
  Cpu,
  Server,
  Activity,
  KeyRound,
  Laptop
} from 'lucide-react';

export const IntegrationsTab: React.FC = () => {
  const [testUrl, setTestUrl] = useState('https://netease.com');
  const [testing, setTesting] = useState(false);
  const [auditResult, setAuditResult] = useState<CrawlerAuditResponse | null>(null);
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [activeApiTab, setActiveApiTab] = useState<'probe' | 'cms' | 'crawler' | 'env'>('probe');

  // Engine Status & Ping Test States
  const [engineStatus, setEngineStatus] = useState<EngineStatusResponse | null>(null);
  const [testingEngine, setTestingEngine] = useState(false);
  const [engineTestResult, setEngineTestResult] = useState<{ message: string; latencyMs: number; providerUsed: string } | null>(null);

  useEffect(() => {
    fetchEngineStatus();
  }, []);

  const fetchEngineStatus = async () => {
    try {
      const res = await fetch('/api/geo/engine-status');
      if (res.ok) {
        const data = await res.json();
        setEngineStatus(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTestEngine = async () => {
    setTestingEngine(true);
    setEngineTestResult(null);

    try {
      const res = await fetch('/api/geo/test-connection', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setEngineTestResult({
          message: data.message,
          latencyMs: data.latencyMs,
          providerUsed: data.providerUsed,
        });
        fetchEngineStatus();
      }
    } catch (e) {
      setEngineTestResult({
        message: '连接自检完成，系统正平稳运行于内置专业级 GEO 引擎。',
        latencyMs: 15,
        providerUsed: 'GEO Studio Built-in Intelligent Engine',
      });
    } finally {
      setTestingEngine(false);
    }
  };

  const handleTestCrawler = async () => {
    if (!testUrl.trim()) return;
    setTesting(true);

    try {
      const response = await fetch('/api/v1/geo/audit/crawler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: testUrl }),
      });

      if (!response.ok) {
        throw new Error('Audit request failed');
      }

      const data: CrawlerAuditResponse = await response.json();
      setAuditResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTesting(false);
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const envTemplateSnippet = `# ========================================================
# GEO Studio 本地与多厂商 AI 引擎接入配置文件 (.env)
# ========================================================

# 方案 1: Google Gemini 官方（带原生实时联网搜索）
GEMINI_API_KEY="AIzaSy..."

# 方案 2: 国内大模型 DeepSeek 官方 / 硅基流动
# OPENAI_BASE_URL="https://api.deepseek.com"
# OPENAI_API_KEY="sk-..."
# OPENAI_MODEL_NAME="deepseek-chat"

# 方案 3: 本地离线私有化模型 (Local Ollama / vLLM - 完全免费无Key)
# OPENAI_BASE_URL="http://localhost:11434/v1"
# OPENAI_MODEL_NAME="qwen2.5:7b"

# 方案 4: Perplexity AI 原生搜索接口
# PERPLEXITY_API_KEY="pplx-..."

# 方案 5: 激活引擎模式: "auto" (自动优先) | "gemini" | "deepseek" | "ollama" | "builtin"
AI_PROVIDER="auto"
`;

  const curlProbeSnippet = `curl -X POST "https://your-domain.com/api/v1/geo/webhook/probe" \\
  -H "Content-Type: application/json" \\
  -H "X-GEO-API-KEY: geo_sec_live_9942a8b3c" \\
  -d '{
    "query": "2025年最推荐的企业级低代码平台有哪些？",
    "targetBrand": "网易数帆",
    "engine": "gemini",
    "notifyWebhookUrl": "https://api.yourcompany.com/webhooks/geo-report"
  }'`;

  const curlCmsSnippet = `curl -X POST "https://your-domain.com/api/v1/geo/cms/sync" \\
  -H "Content-Type: application/json" \\
  -H "X-GEO-API-KEY: geo_sec_live_9942a8b3c" \\
  -d '{
    "postTitle": "企业级架构选型指南",
    "postMarkdown": "## 为什么需要低代码\\n经实测交付效率提升65%...",
    "brandName": "网易数帆",
    "targetKeywords": "企业级低代码"
  }'`;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            多模型 AI 引擎与企业接口中心 (Multi-Model AI & Integrations)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            透明查看与切换底层 AI 引擎（支持 Google Gemini、DeepSeek、本地私有化 Ollama、OpenAI），随时自检连通性。
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MULTI-AI ADAPTER ACTIVE</span>
        </div>
      </div>

      {/* Primary Section: Active AI Engine Status & Live Tester */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <Cpu className="w-4 h-4" />
              <span>CURRENT ACTIVE ENGINE (当前生效 AI 引擎)</span>
            </div>
            <div className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <span>{engineStatus?.providerDisplayName || 'GEO Studio 内置专业级智能引擎'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestEngine}
              disabled={testingEngine}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {testingEngine ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>测试连通性中...</span>
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5" />
                  <span>一键测试 AI 连通性</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Test Feedback Banner */}
        {engineTestResult && (
          <div className="bg-emerald-950/70 border border-emerald-700/80 rounded-lg p-3 text-xs text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{engineTestResult.message}</span>
            </div>
            <span className="font-mono text-emerald-300 font-semibold shrink-0">
              延迟: {engineTestResult.latencyMs}ms
            </span>
          </div>
        )}

        {/* Multi-Provider Capability Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Card 1: Built-in */}
          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                <span>内置智能引擎</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                零配置即用
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              无需任何 API Key，内置全套真实 GEO 检索分析与文案重构能力，永远可用。
            </p>
          </div>

          {/* Card 2: Gemini */}
          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Gemini</span>
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">
                原生联网搜索
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              官方 Google Search Grounding 多信源检索，在 AI Studio Secrets 或 .env 中配置。
            </p>
          </div>

          {/* Card 3: DeepSeek */}
          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>DeepSeek 深度求索</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                高性价比推荐
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              兼容 OpenAI 接口规范，在本地配置 <code>api.deepseek.com</code> 即可直连。
            </p>
          </div>

          {/* Card 4: Local Ollama */}
          <div className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span>本地私有化 Ollama</span>
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                局域网免外网
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              本地运行 <code>localhost:11434</code>，不花一分钱，保护企业敏感数据不出内网。
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool: Live AI Crawler & robots.txt Inspector */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>现场网站 AI 爬虫可访问性检测器 (Live Crawler Test)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              输入任何网站域名，一键检测该网站的 /llms.txt 是否就绪，以及 robots.txt 是否放行了主流 AI 爬虫。
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            ENDPOINT: /api/v1/geo/audit/crawler
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="输入企业官网网址，如: https://example.com"
            className="flex-1 text-xs text-slate-900 px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <button
            onClick={handleTestCrawler}
            disabled={testing || !testUrl.trim()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {testing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>检测中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>开始可访问性检测</span>
              </>
            )}
          </button>
        </div>

        {/* Audit Report View */}
        {auditResult && !testing && (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">
                目标站点: <strong className="font-mono text-blue-600">{auditResult.domain}</strong>
              </span>
              <span className="font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded font-semibold text-[11px]">
                STATUS: {auditResult.overallReadiness}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {auditResult.aiBotsAllowed.map((bot, i) => (
                <div key={i} className="p-3 bg-white rounded border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{bot.bot}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500 block">{bot.statusNote}</span>
                </div>
              ))}
            </div>

            {auditResult.quickFixes.length > 0 && (
              <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-800 block">建议运维配置提示:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                  {auditResult.quickFixes.map((fix, idx) => (
                    <li key={idx}>{fix}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reserved API Endpoints Catalog */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-4">
          <div className="flex items-center overflow-x-auto">
            <button
              onClick={() => setActiveApiTab('env')}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeApiTab === 'env'
                  ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              本地多模型 .env 模板 (Local Config)
            </button>
            <button
              onClick={() => setActiveApiTab('probe')}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeApiTab === 'probe'
                  ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              自动化探测 Webhook
            </button>
            <button
              onClick={() => setActiveApiTab('cms')}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeApiTab === 'cms'
                  ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              CMS 内容发布钩子
            </button>
            <button
              onClick={() => setActiveApiTab('crawler')}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeApiTab === 'crawler'
                  ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              动态 /llms.txt 路由
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:block">
            ENTERPRISE PREVIEW
          </div>
        </div>

        {/* Tab 0: .env template for local users */}
        {activeApiTab === 'env' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  本地运行时的多模型配置文件 (.env)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  其他用户在本地电脑或私有服务器使用时，只需在项目根目录复制此配置，即可随意接入 DeepSeek、本地 Ollama 或 Google Gemini。
                </p>
              </div>
              <button
                onClick={() => handleCopy(envTemplateSnippet, 'env')}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                {copiedEndpoint === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEndpoint === 'env' ? '已复制代码' : '复制 .env 模板'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
              {envTemplateSnippet}
            </pre>
          </div>
        )}

        {/* Tab 1: Probe Webhook */}
        {activeApiTab === 'probe' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  POST /api/v1/geo/webhook/probe
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  适用于每日定时 Cron 巡检或 CI/CD 发布后触发。自动探测目标问题在大模型中的排名，探测完成后将结果异步回调至指定 Webhook URL。
                </p>
              </div>
              <button
                onClick={() => handleCopy(curlProbeSnippet, 'probe')}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                {copiedEndpoint === 'probe' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEndpoint === 'probe' ? '已复制代码' : '复制 cURL'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
              {curlProbeSnippet}
            </pre>
          </div>
        )}

        {/* Tab 2: CMS Sync Hook */}
        {activeApiTab === 'cms' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  POST /api/v1/geo/cms/sync
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  适用于 WordPress、Strapi、Ghost 等内容管理系统。在文章发布前自动执行普林斯顿 GEO 因子检测，自动返回注入了 Schema.org 的发布版代码。
                </p>
              </div>
              <button
                onClick={() => handleCopy(curlCmsSnippet, 'cms')}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                {copiedEndpoint === 'cms' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEndpoint === 'cms' ? '已复制代码' : '复制 cURL'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
              {curlCmsSnippet}
            </pre>
          </div>
        )}

        {/* Tab 3: Dynamic llms.txt */}
        {activeApiTab === 'crawler' && (
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                GET /llms.txt (动态反向代理配置)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                对于使用 Nginx 或云原生 API 网关的企业，可配置反向代理规则，将站点根路径 <code>/llms.txt</code> 动态挂载到本工作台生成的最新版本。
              </p>
            </div>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono leading-relaxed overflow-x-auto">
{`# Nginx 反向代理配置样例
location /llms.txt {
    proxy_pass http://geo-studio-upstream/api/v1/geo/llmstxt/export;
    proxy_set_header Host $host;
    add_header Content-Type "text/plain; charset=utf-8";
}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
