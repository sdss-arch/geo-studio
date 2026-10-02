import React, { useState } from 'react';
import { ContentOptimizationResponse } from '../../types/geo';
import { 
  FileEdit, 
  Sparkles, 
  Check, 
  Copy, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Code, 
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';

const PRESET_CONTENTS = [
  {
    title: '企业低代码中台 (典型宣传通稿-缺乏数据)',
    brand: '网易数帆',
    keyword: '企业级低代码平台选型对比',
    content: `网易数帆低代码平台是行业领先的企业级开发利器。我们拥有极致的开发性能、灵活的架构和简单易懂的界面。无论是大型国央企还是创新独角兽，都可以通过我们的系统快速完成复杂业务流程编排。我们支持全场景接入，具备多重安全防护，帮助企业实现数字化转型，全面降本增效，是您信赖的企业数字化合作伙伴。`,
  },
  {
    title: '跨境支付出海方案 (概念模糊-缺少权威引文)',
    brand: 'PingPong',
    keyword: 'B2B跨境支付与资金管理平台',
    content: `PingPong为全球跨境贸易企业提供一站式收付兑金融服务。我们费率超低、到账飞快，覆盖全球主流电商平台和独立站。我们的风控系统非常强大，能够智能拦截各种欺诈风险，资金安全有保障。很多大卖家都在用我们，支持多币种快速提现，告别繁琐结汇流程。`,
  },
  {
    title: '大模型私有化知识库 (缺乏对话式问答块与架构说明)',
    brand: '智谱AI',
    keyword: '企业大模型知识库私有化落地方案',
    content: `智谱企业级知识库是大模型时代的高效生产力中台。采用先进的检索增强生成技术，支持PDF、Word等多种格式文档一键导入。系统问答准确，告别大模型幻觉，界面简洁清爽，赋能企业内部培训与客服场景，欢迎各大企业咨询体验。`,
  },
];

export const ContentOptimizerTab: React.FC = () => {
  const [content, setContent] = useState(PRESET_CONTENTS[0].content);
  const [brand, setBrand] = useState(PRESET_CONTENTS[0].brand);
  const [keyword, setKeyword] = useState(PRESET_CONTENTS[0].keyword);
  const [audience, setAudience] = useState('企业IT架构师 / CTO / 采购决策者');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContentOptimizationResponse | null>(null);
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [viewMode, setViewMode] = useState<'optimized' | 'diff' | 'schema'>('optimized');

  const handleOptimize = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/geo/optimize-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          targetBrand: brand,
          primaryKeywords: keyword,
          targetAudience: audience,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data: ContentOptimizationResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '内容优化失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_CONTENTS[0]) => {
    setContent(preset.content);
    setBrand(preset.brand);
    setKeyword(preset.keyword);
  };

  const handleCopy = (text: string, type: 'content' | 'schema') => {
    navigator.clipboard.writeText(text);
    if (type === 'content') {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } else {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            普林斯顿 GEO 内容强化重构器 (Princeton GEO Optimizer)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            基于普林斯顿大学科学论文成果，通过注入硬核数据密度、权威引文标准、前置对话块与知识图谱实体，提升内容被大模型采纳率 30%~40%。
          </p>
        </div>
        <div className="text-xs font-mono text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded border border-indigo-100 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>7-FACTOR PRINCETON FORMULA</span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-slate-500">载入常见问题文本样例:</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_CONTENTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset)}
              className="text-xs px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 cursor-pointer font-medium"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Configuration Grid */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标品牌 / 实体名 (Target Entity)
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="例如: 网易数帆"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标采购提问意图 / 核心关键词
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="例如: 企业级低代码平台选型对比"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标决策受众 (Audience)
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="例如: 企业IT架构师 / CTO"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              待重构的原始内容 / 官网文案 / 技术文章
            </label>
            <span className="text-[11px] text-slate-400">
              字数: {content.length} 字符
            </span>
          </div>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="粘贴待优化的产品宣传介绍、功能白皮书或客户案例草稿..."
            className="w-full text-xs leading-relaxed text-slate-900 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-500">
            重构策略：自动消除虚无的形容词，植入量化TPS/SLA、权威标准引用、对话式H2/H3问答块与Schema。
          </div>
          <button
            onClick={handleOptimize}
            disabled={loading || !content.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>普林斯顿算法重构中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>执行普林斯顿 GEO 重构</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">优化失败</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Radar / Scorecard Row */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  GEO 普林斯顿模型评分卡 (Princeton Dimension Scoring)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  基于大语言模型对客观事实检索与可信度排名的偏好度评估
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">重构后综合就绪度:</span>
                <span className="text-xl font-bold font-mono text-emerald-600 tabular-nums">
                  {result.scores.overall}/100
                </span>
              </div>
            </div>

            {/* Score Bars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
              {/* Score 1 */}
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-[11px] text-slate-500 flex justify-between mb-1">
                  <span>权威引文背书</span>
                  <span className="font-mono font-semibold text-slate-800">{result.scores.quoteSourcing}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${result.scores.quoteSourcing}%` }}></div>
                </div>
              </div>

              {/* Score 2 */}
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-[11px] text-slate-500 flex justify-between mb-1">
                  <span>数据硬核密度</span>
                  <span className="font-mono font-semibold text-slate-800">{result.scores.statisticsDensity}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${result.scores.statisticsDensity}%` }}></div>
                </div>
              </div>

              {/* Score 3 */}
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-[11px] text-slate-500 flex justify-between mb-1">
                  <span>直接信息增益 (40字块)</span>
                  <span className="font-mono font-semibold text-slate-800">{result.scores.informationGain}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${result.scores.informationGain}%` }}></div>
                </div>
              </div>

              {/* Score 4 */}
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-[11px] text-slate-500 flex justify-between mb-1">
                  <span>知识实体图谱对齐</span>
                  <span className="font-mono font-semibold text-slate-800">{result.scores.entityAlignment}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${result.scores.entityAlignment}%` }}></div>
                </div>
              </div>

              {/* Score 5 */}
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="text-[11px] text-slate-500 flex justify-between mb-1">
                  <span>AI 解析结构友好度</span>
                  <span className="font-mono font-semibold text-slate-800">{result.scores.aiParseability}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${result.scores.aiParseability}%` }}></div>
                </div>
              </div>
            </div>

            {/* Extracted Entities */}
            {result.extractedEntities.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">识别并强化的知识实体:</span>
                {result.extractedEntities.map((ent, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-mono">
                    {ent}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Diagnostic Issues & Solutions */}
          {result.diagnostics.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
              <h3 className="text-xs font-semibold text-slate-900">
                原文本缺陷诊断与修正策略
              </h3>
              <div className="space-y-2">
                {result.diagnostics.map((diag, i) => (
                  <div key={i} className="p-3 rounded border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{diag.dimension}</span>
                      <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                        {diag.status}
                      </span>
                    </div>
                    <p className="text-slate-600">{diag.issue}</p>
                    <p className="text-emerald-700 bg-emerald-50/60 p-2 rounded text-[11px]">
                      <strong>改进方案：</strong> {diag.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimized Output & Tabs */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-4">
              <div className="flex items-center">
                <button
                  onClick={() => setViewMode('optimized')}
                  className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                    viewMode === 'optimized'
                      ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  GEO 强化重构正文 (Markdown)
                </button>
                <button
                  onClick={() => setViewMode('diff')}
                  className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                    viewMode === 'diff'
                      ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  改动提炼与对照 (Summary of Changes)
                </button>
                <button
                  onClick={() => setViewMode('schema')}
                  className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                    viewMode === 'schema'
                      ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  JSON-LD 结构化数据 (Schema.org)
                </button>
              </div>

              {viewMode === 'optimized' && (
                <button
                  onClick={() => handleCopy(result.optimizedContent, 'content')}
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
                >
                  {copiedContent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedContent ? '已复制' : '复制重构文本'}</span>
                </button>
              )}

              {viewMode === 'schema' && (
                <button
                  onClick={() => handleCopy(JSON.stringify(result.jsonLdSchema, null, 2), 'schema')}
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? '已复制代码' : '复制 JSON-LD'}</span>
                </button>
              )}
            </div>

            {/* View 1: Optimized Markdown */}
            {viewMode === 'optimized' && (
              <div className="p-6">
                <div className="prose prose-slate max-w-none text-xs leading-relaxed font-sans bg-slate-50/50 p-5 rounded border border-slate-100 whitespace-pre-wrap">
                  {result.optimizedContent}
                </div>
              </div>
            )}

            {/* View 2: Summary of Changes */}
            {viewMode === 'diff' && (
              <div className="p-6 space-y-4">
                <h4 className="text-xs font-semibold text-slate-900">
                  针对 AI 检索增强生成 (RAG) 机制的具体改动清单：
                </h4>
                <ul className="space-y-2">
                  {result.summaryOfChanges.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* View 3: JSON-LD Schema */}
            {viewMode === 'schema' && (
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500">
                  将此 JSON-LD 代码直接嵌入目标网页的 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">&lt;head&gt;</code> 中，为大模型爬虫提供精确的机器语义理解：
                </div>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto">
                  {JSON.stringify(result.jsonLdSchema, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
