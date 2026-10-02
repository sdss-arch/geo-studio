import React, { useState } from 'react';
import { ProbeResponse, GroundingChunk } from '../../types/geo';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Globe, 
  Building2, 
  Zap, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface LiveProbeTabProps {
  initialQuery?: string;
  initialBrand?: string;
}

const PRESET_QUERIES = [
  {
    title: '企业级低代码平台选型',
    query: '2025年最推荐的企业级低代码平台有哪些？各自优缺点对比',
    brand: '网易数帆',
    competitors: ['简道云', '宜搭', 'ClickPaaS', 'Mendix'],
  },
  {
    title: '出海与跨境支付网关选型',
    query: 'B2B出海企业选择哪些跨境支付与资金管理平台最安全合规？',
    brand: 'PingPong',
    competitors: ['Stripe', 'Airwallex', 'Payoneer', '万里汇'],
  },
  {
    title: '大模型私有化与AI知识库',
    query: '企业搭建内部大模型知识库系统有哪些成熟落地的厂商方案？',
    brand: '智谱AI',
    competitors: ['百度千帆', '阿里云百炼', '火山引擎', 'MiniMax'],
  },
  {
    title: '智能客服与全渠道联络中心',
    query: '求推荐目前体验最好的全渠道智能客服与电销系统方案',
    brand: '容联七陌',
    competitors: ['智齿科技', '美洽', '网易七鱼', '腾讯企点'],
  },
];

export const LiveProbeTab: React.FC<LiveProbeTabProps> = ({ 
  initialQuery = '2025年最推荐的企业级低代码平台有哪些？各自优缺点对比',
  initialBrand = '网易数帆'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [targetBrand, setTargetBrand] = useState(initialBrand);
  const [competitorInput, setCompetitorInput] = useState('简道云, 宜搭, ClickPaaS, Mendix');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProbeResponse | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<'gemini' | 'perplexity' | 'searchgpt' | 'claude' | 'deepseek'>('gemini');
  const [copied, setCopied] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'answer' | 'sources' | 'gap'>('answer');

  const ENGINES = [
    { id: 'gemini', name: 'Google Gemini 3.8 Flash', tag: '谷歌原生实时联网', desc: '基于谷歌原生搜索索引与知识实体' },
    { id: 'perplexity', name: 'Perplexity AI (Sonar)', tag: '深度引用与高密度切片', desc: '极其看重首段回答与技术信源穿透' },
    { id: 'searchgpt', name: 'OpenAI SearchGPT', tag: 'B2B测评与口碑聚合', desc: '偏好G2/36Kr点评与分级推荐' },
    { id: 'claude', name: 'Anthropic Claude', tag: '逻辑严密与架构权衡', desc: '客观分析优缺点与行业合规' },
    { id: 'deepseek', name: 'DeepSeek-R1 / 深度求索', tag: '中文技术与信创生态', desc: '深度索引知乎、CSDN与国产自主可控' },
  ] as const;

  const executeProbe = async (q = query, b = targetBrand, c = competitorInput, eng = selectedEngine) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);

    const competitors = c.split(/[,，]/).map(s => s.trim()).filter(Boolean);

    try {
      const response = await fetch('/api/geo/probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          targetBrand: b,
          competitors,
          market: 'zh',
          engine: eng,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data: ProbeResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '探测执行失败，请检查网络或配置');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_QUERIES[0]) => {
    setQuery(preset.query);
    setTargetBrand(preset.brand);
    setCompetitorInput(preset.competitors.join(', '));
    executeProbe(preset.query, preset.brand, preset.competitors.join(', '));
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render text with highlighted brand
  const renderHighlightedText = (text: string, brand: string) => {
    if (!brand || !text) return text;
    const regex = new RegExp(`(${brand})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      part.toLowerCase() === brand.toLowerCase() ? (
        <mark key={index} className="bg-amber-100 text-amber-900 font-semibold px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            实机大模型搜索探测与引用溯源 (Live AI Probe)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            直接调用真实 Google Search Grounding 多信源检索增强引擎，还原 AI 对高意图采购问题的回答与事实出处。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>REAL-TIME SEARCH GROUNDING ACTIVE</span>
        </div>
      </div>

      {/* Preset Quick Select */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-slate-500">企业级测试用例预设 (一键载入):</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset)}
              className="text-left p-2.5 rounded border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 transition-all text-xs cursor-pointer group"
            >
              <div className="font-semibold text-slate-800 group-hover:text-blue-600 truncate">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 truncate">
                标的: {preset.brand}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            高意图搜索问题 (Buyer Intent Prompt)
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入目标潜在客户可能在 AI 搜索中提问的具体问题"
              className="w-full text-sm text-slate-900 px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
            />
          </div>
        </div>

        {/* Target Engine Selector */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              选择目标大模型搜索算法视角 (Target Engine Perspective)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              ENGINE: {selectedEngine.toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {ENGINES.map((eng) => (
              <button
                key={eng.id}
                type="button"
                onClick={() => setSelectedEngine(eng.id)}
                className={`p-2 rounded border text-left cursor-pointer transition-all ${
                  selectedEngine === eng.id
                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold text-xs truncate">{eng.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">{eng.tag}</div>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            底层由 Google Gemini 3.8 Flash 实时搜索工具驱动，支持切换不同大模型（Perplexity、ChatGPT、Claude、DeepSeek）的重排策略与偏好模式。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标监测品牌 / 产品
            </label>
            <input
              type="text"
              value={targetBrand}
              onChange={(e) => setTargetBrand(e.target.value)}
              placeholder="例如: 网易数帆"
              className="w-full text-sm text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              对比竞品名单 (用逗号分隔)
            </label>
            <input
              type="text"
              value={competitorInput}
              onChange={(e) => setCompetitorInput(e.target.value)}
              placeholder="例如: 简道云, 宜搭, ClickPaaS"
              className="w-full text-sm text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            提示：GEO 核心指标不仅关注回答文本，更关注下方解析出的外部引用信源 (Grounding Sources)
          </div>
          <button
            onClick={() => executeProbe()}
            disabled={loading || !query.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>实机联网探测中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>开始大模型搜索探测</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              正在调用 Gemini 3.8 Flash 执行实时搜索增强生成...
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              系统正在执行 Google Search Grounding、提取检索网页块、分析品牌命中顺序并聚类信源域名分布。
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">探测请求异常</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Probe Results View */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Quick Result Diagnostic Summary Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {result.analysis.brandPosition === 'TOP_RECOMMENDED' ? (
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                ) : result.analysis.brandPosition === 'MENTIONED_ALTERNATIVE' ? (
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="text-xs text-slate-400 font-mono">
                    PROBE OUTCOME:
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {result.analysis.brandPosition === 'TOP_RECOMMENDED' && (
                      <span className="text-emerald-700">✓ 核心首推位：标的品牌已成功打入大模型首推候选区</span>
                    )}
                    {result.analysis.brandPosition === 'MENTIONED_ALTERNATIVE' && (
                      <span className="text-blue-700">⚑ 次席备选位：标的品牌被提及，但排序落后于竞品</span>
                    )}
                    {result.analysis.brandPosition === 'ABSENT' && (
                      <span className="text-rose-700">✕ 缺失穿透：标的品牌在本次大模型回答中未被收录</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-2 rounded border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">ENGINE PERSPECTIVE</span>
                  <span className="font-semibold text-blue-600 uppercase">{result.engineUsed || selectedEngine}</span>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CITED SOURCES</span>
                  <span className="font-semibold text-slate-900">{result.analysis.totalSourcesCited} 个外部信源</span>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div>
                  <span className="text-slate-400 block text-[10px]">BRAND CITATIONS</span>
                  <span className="font-semibold text-slate-900">{result.analysis.brandCitationsCount} 个直接信源</span>
                </div>
              </div>
            </div>

            {/* Competitor presence check */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">竞品被提及情况:</span>
              {result.analysis.competitorMentions.map((comp, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono ${
                    comp.mentioned
                      ? 'bg-slate-100 text-slate-800 font-medium border border-slate-300'
                      : 'bg-slate-50 text-slate-400 border border-dashed border-slate-200'
                  }`}
                >
                  <span>{comp.name}</span>
                  <span className="text-[10px] text-slate-500">
                    ({comp.mentioned ? `提及${comp.frequency}次` : '未提及'})
                  </span>
                </span>
              ))}
            </div>

            {/* Strategic Recommendations Banner */}
            {result.analysis.recommendations.length > 0 && (
              <div className="bg-blue-50/60 border border-blue-100 rounded-md p-3.5 space-y-1.5 text-xs text-blue-900">
                <div className="font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>针对此 Prompt 的 GEO 突破策略诊断：</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {result.analysis.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tabbed Inspection View */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            {/* Tab navigation */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50/70 px-4">
              <button
                onClick={() => setActiveResultTab('answer')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeResultTab === 'answer'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                生成式回答正文 (AI Synthesis)
              </button>
              <button
                onClick={() => setActiveResultTab('sources')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeResultTab === 'sources'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                引用信源穿透清单 ({result.groundingChunks.length})
              </button>
              <button
                onClick={() => setActiveResultTab('gap')}
                className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeResultTab === 'gap'
                    ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                信源域名权重分布与渗透机会
              </button>
            </div>

            {/* Tab 1: AI Generated Answer */}
            {activeResultTab === 'answer' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>模型合成回答原貌 (高亮标出目标品牌):</span>
                  <button
                    onClick={() => handleCopyText(result.generatedText)}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制' : '复制全文'}</span>
                  </button>
                </div>
                <div className="prose prose-slate max-w-none text-xs leading-relaxed font-sans bg-slate-50/50 p-4 rounded border border-slate-100 whitespace-pre-wrap">
                  {renderHighlightedText(result.generatedText, targetBrand)}
                </div>
              </div>
            )}

            {/* Tab 2: Grounding Citations Table */}
            {activeResultTab === 'sources' && (
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium font-mono text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4 w-12 text-center">#</th>
                      <th className="py-2.5 px-4">信源标题 (Title)</th>
                      <th className="py-2.5 px-4">主域名 (Domain)</th>
                      <th className="py-2.5 px-4">权威属性</th>
                      <th className="py-2.5 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.groundingChunks.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          未提取到外部引用信源
                        </td>
                      </tr>
                    ) : (
                      result.groundingChunks.map((chunk, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-4 text-center font-mono text-slate-400 text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-900 max-w-md truncate">
                            {chunk.title}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-600 text-[11px]">
                            {chunk.domain}
                          </td>
                          <td className="py-2.5 px-4">
                            {chunk.domain.includes('zhihu') || chunk.domain.includes('reddit') ? (
                              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono">社区讨论</span>
                            ) : chunk.domain.includes('36kr') || chunk.domain.includes('g2') ? (
                              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">选型测评</span>
                            ) : chunk.domain.includes('gov') || chunk.domain.includes('edu') ? (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono">官方权威</span>
                            ) : (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">行业资讯/文档</span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            {chunk.uri && (
                              <a
                                href={chunk.uri}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-[11px]"
                              >
                                <span>访问原文</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Domain Distribution & Gap Analysis */}
            {activeResultTab === 'gap' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 mb-1">
                    引用信源主域名频次分布 (Top Source Domains)
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    这些域名构成了大模型对此类问题回答的"知识底座"。要改变大模型的推荐，您需要优先在这些域名上建立存在感：
                  </p>

                  <div className="space-y-2">
                    {Object.entries(result.domainBreakdown).map(([domain, count], i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-mono text-slate-800 font-medium">{domain}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-500 tabular-nums">被引用 {count} 次</span>
                          <span className="text-[11px] text-blue-600 font-medium">建议重点布控 &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-2">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span>GEO 行动方案建议 (Digital PR & Entity Seeding)</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">
                    1. <strong>入驻头部聚合页</strong>：针对上述排名靠前的测评/聚合站，提交官方技术参数，更新最新的客户案例与对比测评表。<br />
                    2. <strong>长尾问答布局</strong>：在主流社区针对该主题发表高信息增益的干货架构解析，包含真实TPS、跑分数据和客观局限性分析（大模型极度偏好包含客观优缺点的中立内容）。<br />
                    3. <strong>部署站点 llms.txt</strong>：确保自身官网有标准的 /llms.txt 文件，方便大模型爬虫直接索引官方正本清源的信息。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
