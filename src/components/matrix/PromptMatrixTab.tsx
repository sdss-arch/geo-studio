import React, { useState } from 'react';
import { PromptMatrixResponse, TabType } from '../../types/geo';
import { Grid3X3, Sparkles, RefreshCw, Search, ArrowRight, TrendingUp, AlertCircle, Layers } from 'lucide-react';

interface PromptMatrixTabProps {
  onExecuteProbe: (query: string, brand: string) => void;
  setActiveTab: (tab: TabType) => void;
}

const PRESET_CATEGORIES = [
  {
    category: '企业级低代码与流程编排平台',
    brand: '网易数帆',
    role: '企业CTO / 架构总监 / 数字化部门负责人'
  },
  {
    category: 'B2B跨境支付与资金管理中台',
    brand: 'PingPong',
    role: '出海企业财务总监 (CFO) / 跨境电商运营总监'
  },
  {
    category: '企业大模型私有化知识库与Agent平台',
    brand: '智谱AI',
    role: 'CIO / IT总监 / 智能化中台架构师'
  }
];

export const PromptMatrixTab: React.FC<PromptMatrixTabProps> = ({ onExecuteProbe, setActiveTab }) => {
  const [category, setCategory] = useState(PRESET_CATEGORIES[0].category);
  const [brandName, setBrandName] = useState(PRESET_CATEGORIES[0].brand);
  const [targetRole, setTargetRole] = useState(PRESET_CATEGORIES[0].role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PromptMatrixResponse | null>(null);

  const handleGenerate = async () => {
    if (!category.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/geo/generate-prompt-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          brandName,
          targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data: PromptMatrixResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleProbePrompt = (promptText: string) => {
    onExecuteProbe(promptText, brandName);
    setActiveTab('probe');
  };

  const loadPreset = (preset: typeof PRESET_CATEGORIES[0]) => {
    setCategory(preset.category);
    setBrandName(preset.brand);
    setTargetRole(preset.role);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            高意图提问矩阵与声量追踪 (Generative Prompt Matrix)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            大模型时代的关键词研究已转变为"对话意图矩阵"。穷尽企业决策人在不同采购阶段会向大模型提出的长尾提问。
          </p>
        </div>
        <div className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 rounded border border-blue-100 flex items-center gap-1.5">
          <Grid3X3 className="w-3.5 h-3.5" />
          <span>4-STAGE BUYER FUNNEL</span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-slate-500">选择品类预设:</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_CATEGORIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset)}
              className="text-xs px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium"
            >
              {preset.category}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Configuration */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标行业与品类 (Category)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              自身品牌名 (Target Brand)
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              目标采购决策人画像 (Decision Maker)
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-500">
            涵盖：品类发现与候选集、深度架构与合规、核心竞品头对头对比、落地避坑与报价4个漏斗阶段。
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !category.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>生成高意图矩阵中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>批量生成全漏斗提问矩阵</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">生成失败</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Entity graph recommendations */}
          {result.entityGraphRecommendations.length > 0 && (
            <div className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs space-y-1.5">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>大模型实体图谱关联建议 (Entity Associations to Seed)</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {result.entityGraphRecommendations.map((rec, i) => (
                  <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs font-mono">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Clusters */}
          <div className="space-y-5">
            {result.clusters.map((cluster, cIdx) => (
              <div key={cIdx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      {cluster.intentName}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      采购漏斗阶段: {cluster.buyerStage}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {cluster.prompts.length} 个核心 Prompt
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {cluster.prompts.map((item, pIdx) => (
                    <div key={pIdx} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-slate-900 text-xs leading-relaxed">
                          "{item.prompt}"
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span>
                            搜索热度: <strong className="font-mono text-slate-700">{item.searchVolumeTier}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            打入难度: <strong className="font-mono text-slate-700">{item.aiInclusionDifficulty}</strong>
                          </span>
                          <span>·</span>
                          <span className="text-blue-600 font-medium">
                            推荐打法: {item.recommendedTactics.join(' / ')}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <button
                          onClick={() => handleProbePrompt(item.prompt)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Search className="w-3 h-3 text-blue-600" />
                          <span>一键实机探测</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
