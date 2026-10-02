import React, { useState } from 'react';
import { TabType } from '../../types/geo';
import { 
  ArrowUpRight, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  FileText,
  Activity,
  Sparkles
} from 'lucide-react';

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
  onExecuteProbe: (query: string, brand: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ setActiveTab, onExecuteProbe }) => {
  const [quickQuery, setQuickQuery] = useState('2025年最推荐的企业级低代码平台有哪些？');
  const [quickBrand, setQuickBrand] = useState('网易数帆');

  const handleQuickProbeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onExecuteProbe(quickQuery, quickBrand);
      setActiveTab('probe');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Value Proposition */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>GENERATIVE ENGINE OPTIMIZATION</span>
              <span>·</span>
              <span>ENTERPRISE WORKBENCH</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              企业级 GEO 生成式引擎优化控制台
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              全面监控与优化您的品牌在 ChatGPT、Perplexity、Google Gemini、Claude 等主流生成式大模型搜索中的推荐位与信源穿透率。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('playbook')}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              阅读科学方法论
            </button>
            <button
              onClick={() => setActiveTab('probe')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>启动实机探测</span>
            </button>
          </div>
        </div>

        {/* Quick Launch Search Probe */}
        <div className="mt-5 pt-5 border-t border-slate-800">
          <form onSubmit={handleQuickProbeSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="输入高意图采购问题，如: 推荐几款适合中大型团队的客服AI系统"
                className="w-full bg-slate-800/90 text-sm text-white placeholder-slate-400 px-3.5 py-2.5 rounded-md border border-slate-700 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
            <div className="w-full sm:w-44">
              <input
                type="text"
                value={quickBrand}
                onChange={(e) => setQuickBrand(e.target.value)}
                placeholder="目标品牌/产品名"
                className="w-full bg-slate-800/90 text-sm text-white placeholder-slate-400 px-3.5 py-2.5 rounded-md border border-slate-700 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>一键实机探测</span>
            </button>
          </form>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>AI SOV 模型声量份额</span>
            <span className="text-emerald-600 font-medium font-mono text-xs flex items-center">
              +14.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
            68.4%
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-normal">
            在50组行业核心采购意图Prompt中，模型将我方列入核心候选集的比例
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>信源穿透率 (Citation)</span>
            <span className="text-emerald-600 font-medium font-mono text-xs flex items-center">
              +8.5% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
            71.8%
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-normal">
            生成式回答在展开引用角标(Grounding Sources)中收录我方或权威信源比例
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>首位首推率 (Primary Pick)</span>
            <span className="text-amber-600 font-medium font-mono text-xs">
              42.0%
            </span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
            42.0%
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-normal">
            在对比与选型回答中被AI作为第1顺位推荐或主要案例阐述的比例
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>普林斯顿GEO内容就绪度</span>
            <span className="text-blue-600 font-mono text-xs">
              INDEX 82
            </span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
            82<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-normal">
            基于客观数据密度、权威引文、结构化问答块及Schema知识对齐评分
          </p>
        </div>
      </div>

      {/* Two Column Layout: Source Breakdown vs Action Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Citation Distribution by Channel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                生成式引擎引用信源分布矩阵 (Citation Distribution)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI模型在生成回答时，实际上是从哪些第三方信源提炼事实与形成观点的？
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              SAMPLE: 320+ SITES
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Channel 1 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">中立测评与选型聚合平台 (G2 / 36Kr / Capterra / 软评)</span>
                <span className="font-mono text-slate-600 tabular-nums">38.4% 引用占比</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '38.4%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                GEO最高杠杆信源：模型极度青睐具有多维度打分和多用户实名评价的聚合页
              </p>
            </div>

            {/* Channel 2 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">专业技术社区与开发者论坛 (Zhihu / Reddit / CSDN / GitHub)</span>
                <span className="font-mono text-slate-600 tabular-nums">26.1% 引用占比</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '26.1%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                长尾对比、避坑指南、架构选型Prompt最常调用的事实依据
              </p>
            </div>

            {/* Channel 3 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">厂商官方开发者文档与技术白皮书 (Docs / Whitepapers)</span>
                <span className="font-mono text-slate-600 tabular-nums">18.5% 引用占比</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18.5%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                需具备良好 llms.txt 规范或 Markdown 友好的清晰结构方可被完整检索
              </p>
            </div>

            {/* Channel 4 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">权威行业研报与标准化机构 (Gartner / IDC / 信通院 / ISO)</span>
                <span className="font-mono text-slate-600 tabular-nums">17.0% 引用占比</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '17.0%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                模型用于论证"行业第一/领导者地位"时必需的权威锚点
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded p-3 text-xs text-slate-600 mt-3 flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">GEO 关键洞察：</span>
              大模型生成回答不是凭空捏造，而是基于检索增强生成 (RAG)。若想在大模型搜索中被推荐，仅做官网SEO是不够的，必须在上述4类引用权重最高的信源矩阵中植入结构化事实与对比证据。
            </div>
          </div>
        </div>

        {/* Right Column: High-Priority GEO Actions (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              亟待实施的 GEO 优化队列
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              按照预期对大模型搜索推荐率的提升幅度降序排列
            </p>
          </div>

          <div className="space-y-3">
            {/* Task 1 */}
            <div className="p-3 rounded border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-900">部署 /llms.txt 规范文件</span>
                <span className="text-[11px] font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">HIGH PRIORITY</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                当前站点根目录缺少 /llms.txt，PerplexityBot 与 GPTBot 在爬取技术文档时无法高效提取产品概览与核心能力。
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">预期提升: +28% 官方信源捕获率</span>
                <button
                  onClick={() => setActiveTab('llmstxt')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  去配置 llms.txt &rarr;
                </button>
              </div>
            </div>

            {/* Task 2 */}
            <div className="p-3 rounded border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-900">注入普林斯顿研究量化数据 (Stats Boost)</span>
                <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">CONTENT</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                官网介绍过多"行业领先/极致性能"等形容词，缺乏TPS、延迟降低百分比、合规认证等模型敏感的硬指标。
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">预期提升: +37% 引用权重加权</span>
                <button
                  onClick={() => setActiveTab('optimizer')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  去重构内容 &rarr;
                </button>
              </div>
            </div>

            {/* Task 3 */}
            <div className="p-3 rounded border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-900">拓展 4 类高意图提问矩阵</span>
                <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">STRATEGY</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                建立竞品对比词(X vs Y)、架构兼容词、落地避坑词等对话式Prompt库，有针对性地布局长尾检索。
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">预期提升: 覆盖30+采购决策Query</span>
                <button
                  onClick={() => setActiveTab('matrix')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  生成提问矩阵 &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
