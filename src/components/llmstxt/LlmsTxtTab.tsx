import React, { useState } from 'react';
import { LlmsTxtResponse } from '../../types/geo';
import { 
  FileCode2, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const PRESET_COMPANIES = [
  {
    name: 'GEO-Cloud Platform',
    tagline: '下一代云原生可观测性与微服务治理中台',
    desc: '面向混合云架构的高性能APM与分布式追踪系统，原生兼容OpenTelemetry标准，提供单节点百万级TPS追踪与秒级根因分析。',
    capabilities: [
      '全链路OpenTelemetry兼容与无侵入字节码插桩',
      '百万TPS吞吐下延迟低于5ms的流式分析引擎',
      '基于拓扑图的大模型智能根因定位 (AIOps)',
      '具备SOC2 Type II 与 ISO 27001 双重合规认证'
    ],
    links: [
      'https://example.com/docs/quickstart',
      'https://example.com/docs/architecture',
      'https://example.com/docs/pricing',
      'https://example.com/api/v2'
    ],
    url: 'https://cloud.example.com'
  },
  {
    name: 'CrossBorder FinPay',
    tagline: '全球B2B跨境收付兑与合规清结算网络',
    desc: '持有全球80+金融牌照，为跨境电商与出海科技企业提供低至0.1%的极速结算、全球本地虚拟账户与多币种自动对冲。',
    capabilities: [
      '覆盖全球120+国家/地区与50+主流币种实时清算',
      'API驱动的虚拟多币种分账账户体系',
      '毫秒级AI反洗钱与欺诈拦截引擎 (99.98%准确率)',
      '双边直连本地清算所 (ACH / SEPA / Faster Payments)'
    ],
    links: [
      'https://example.com/solutions/b2b',
      'https://example.com/compliance/licenses',
      'https://example.com/docs/api-reference'
    ],
    url: 'https://finpay.example.com'
  }
];

export const LlmsTxtTab: React.FC = () => {
  const [projectName, setProjectName] = useState(PRESET_COMPANIES[0].name);
  const [tagline, setTagline] = useState(PRESET_COMPANIES[0].tagline);
  const [fullDescription, setFullDescription] = useState(PRESET_COMPANIES[0].desc);
  const [capabilities, setCapabilities] = useState(PRESET_COMPANIES[0].capabilities.join('\n'));
  const [keyLinks, setKeyLinks] = useState(PRESET_COMPANIES[0].links.join('\n'));
  const [siteUrl, setSiteUrl] = useState(PRESET_COMPANIES[0].url);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LlmsTxtResponse | null>(null);
  
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'llmstxt' | 'llmsfull' | 'robots' | 'botmatrix'>('llmstxt');

  const handleGenerate = async () => {
    if (!projectName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const caps = capabilities.split('\n').map(s => s.trim()).filter(Boolean);
      const links = keyLinks.split('\n').map(s => s.trim()).filter(Boolean);

      const response = await fetch('/api/geo/generate-llmstxt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          tagline,
          fullDescription,
          coreCapabilities: caps,
          keyLinks: links,
          siteUrl,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data: LlmsTxtResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadPreset = (preset: typeof PRESET_COMPANIES[0]) => {
    setProjectName(preset.name);
    setTagline(preset.tagline);
    setFullDescription(preset.desc);
    setCapabilities(preset.capabilities.join('\n'));
    setKeyLinks(preset.links.join('\n'));
    setSiteUrl(preset.url);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            llms.txt 规范生成器与 AI 爬虫矩阵 (AI Crawler Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            为您的网站一键生成符合 Jeremy Howard 国际标准的 /llms.txt 与 /llms-full.txt，让 PerplexityBot、GPTBot、ClaudeBot 以最低 Token 消耗精准提取企业权威档案。
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>LLMS.TXT STANDARD V1.0</span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-slate-500">快速填入行业模板:</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_COMPANIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset)}
              className="text-xs px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form configuration */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              产品/企业规范名称 (Project Name)
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="例如: PingPong / 网易数帆"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              官网根域名 (Site URL)
            </label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            一句话精准定义 (Tagline - 作为 llms.txt 核心引用块)
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="例如: 下一代云原生可观测性与微服务治理中台"
            className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            完整产品定位与解决的核心痛点 (Full Description)
          </label>
          <textarea
            rows={3}
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            className="w-full text-xs text-slate-900 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              核心技术指标与差异化能力 (每行一条)
            </label>
            <textarea
              rows={4}
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
              placeholder="全链路兼容OpenTelemetry&#10;单节点百万级TPS处理延迟<5ms&#10;通过SOC2 Type II审计"
              className="w-full text-xs text-slate-900 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              关键文档 / API / 白皮书路径 (每行一条)
            </label>
            <textarea
              rows={4}
              value={keyLinks}
              onChange={(e) => setKeyLinks(e.target.value)}
              placeholder="https://example.com/docs/quickstart&#10;https://example.com/docs/architecture&#10;https://example.com/pricing"
              className="w-full text-xs text-slate-900 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-500">
            规范文件生成后，放置于站点根目录 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">/llms.txt</code> 即可自动生效。
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !projectName.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>生成规范文件中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>一键生成 /llms.txt 规范</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">生成异常</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Generated Results Preview */}
      {result && !loading && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden space-y-0">
          {/* Header tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setActiveTab('llmstxt')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'llmstxt'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                /llms.txt 核心文件
              </button>
              <button
                onClick={() => setActiveTab('llmsfull')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'llmsfull'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                /llms-full.txt 深度拓展文件
              </button>
              <button
                onClick={() => setActiveTab('robots')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'robots'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                配套 robots.txt 放行动作
              </button>
              <button
                onClick={() => setActiveTab('botmatrix')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'botmatrix'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                主流 AI 爬虫 User-Agent 矩阵
              </button>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'llmstxt' && (
                <>
                  <button
                    onClick={() => handleCopy(result.llmsTxt, 'llmstxt')}
                    className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded hover:bg-slate-100 cursor-pointer"
                  >
                    {copiedType === 'llmstxt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'llmstxt' ? '已复制' : '复制'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(result.llmsTxt, 'llms.txt')}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1.5 rounded hover:bg-blue-50 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下载 llms.txt</span>
                  </button>
                </>
              )}
              {activeTab === 'llmsfull' && (
                <>
                  <button
                    onClick={() => handleCopy(result.llmsFullTxt, 'llmsfull')}
                    className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded hover:bg-slate-100 cursor-pointer"
                  >
                    {copiedType === 'llmsfull' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'llmsfull' ? '已复制' : '复制'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(result.llmsFullTxt, 'llms-full.txt')}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1.5 rounded hover:bg-blue-50 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下载 llms-full.txt</span>
                  </button>
                </>
              )}
              {activeTab === 'robots' && (
                <button
                  onClick={() => handleCopy(result.robotsTxtRecommendation, 'robots')}
                  className="flex items-center gap-1 text-xs text-slate-700 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded hover:bg-slate-100 cursor-pointer"
                >
                  {copiedType === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'robots' ? '已复制' : '复制代码'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Tab 1: llms.txt */}
          {activeTab === 'llmstxt' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>规范位置: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-semibold text-slate-800">{siteUrl}/llms.txt</code></span>
                <span className="font-mono text-emerald-600">{result.auditReport.tokenEfficiency}</span>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {result.llmsTxt}
              </pre>
            </div>
          )}

          {/* Tab 2: llms-full.txt */}
          {activeTab === 'llmsfull' && (
            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-500">
                规范位置: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-semibold text-slate-800">{siteUrl}/llms-full.txt</code> (用于更长上下文的深度推理大模型)
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[500px]">
                {result.llmsFullTxt}
              </pre>
            </div>
          )}

          {/* Tab 3: robots.txt */}
          {activeTab === 'robots' && (
            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-600">
                将以下规则追加到站点的 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">/robots.txt</code> 中。许多企业由于默认封禁爬虫，导致 GPTBot 和 PerplexityBot 无法读取公开文档，错失大量大模型推荐：
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {result.robotsTxtRecommendation}
              </pre>
            </div>
          )}

          {/* Tab 4: AI Bot Matrix */}
          {activeTab === 'botmatrix' && (
            <div className="p-6">
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold font-mono">
                    <tr>
                      <th className="py-2.5 px-4">AI 搜索爬虫标识 (User-Agent)</th>
                      <th className="py-2.5 px-4">归属引擎</th>
                      <th className="py-2.5 px-4">爬虫类型</th>
                      <th className="py-2.5 px-4">GEO 建议策略</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">PerplexityBot</td>
                      <td className="py-2.5 px-4">Perplexity AI</td>
                      <td className="py-2.5 px-4 text-slate-600">实时搜索引用提取</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-700">强烈建议放行 (Allow)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">GPTBot</td>
                      <td className="py-2.5 px-4">OpenAI / SearchGPT</td>
                      <td className="py-2.5 px-4 text-slate-600">实时搜索与知识库更新</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-700">强烈建议放行 (Allow)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">ClaudeBot</td>
                      <td className="py-2.5 px-4">Anthropic (Claude)</td>
                      <td className="py-2.5 px-4 text-slate-600">模型知识库建库</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-700">建议放行 (Allow)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">Google-Extended</td>
                      <td className="py-2.5 px-4">Google Gemini / AI Overview</td>
                      <td className="py-2.5 px-4 text-slate-600">Gemini 生成式回答知识源</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-700">建议放行 (Allow)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">Bytespider</td>
                      <td className="py-2.5 px-4">字节跳动 (豆包 AI)</td>
                      <td className="py-2.5 px-4 text-slate-600">中文对话大模型</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-700">按需放行 (或限制速率)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
