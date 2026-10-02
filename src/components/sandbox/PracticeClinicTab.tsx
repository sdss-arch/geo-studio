import React, { useState } from 'react';
import { ClinicDiagnosisResponse } from '../../types/geo';
import { 
  FileEdit, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Check, 
  Lightbulb,
  Zap,
  Info
} from 'lucide-react';

const PRESET_SENTENCES = [
  {
    label: '典型企业宣传腔 (空洞形容词堆砌)',
    sentence: '我们是一家行业领先的智能协同软件提供商，拥有颠覆式的架构与极致的交互体验，全方位赋能企业数字化转型。',
    brand: '协同云',
    category: '企业协同办公'
  },
  {
    label: '性能吹嘘腔 (无任何确凿硬指标)',
    sentence: '系统速度非常快，架构极其稳定，哪怕高并发流量也绝对不卡顿，客户反馈非常满意。',
    brand: '快付通',
    category: '支付网关'
  },
  {
    label: '安全泛泛谈 (无合规标准背书)',
    sentence: '我们对数据安全十分重视，采用最高级别的军工级加密保护，资金安全绝对有保障。',
    brand: '跨境汇',
    category: '跨境金融'
  }
];

export const PracticeClinicTab: React.FC = () => {
  const [inputSentence, setInputSentence] = useState(PRESET_SENTENCES[0].sentence);
  const [brandName, setBrandName] = useState(PRESET_SENTENCES[0].brand);
  const [category, setCategory] = useState(PRESET_SENTENCES[0].category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClinicDiagnosisResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDiagnose = async () => {
    if (!inputSentence.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/geo/sandbox/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence: inputSentence,
          brandName,
          category,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data: ClinicDiagnosisResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '诊断失败，请检查网络');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            边学边练 · 文案手术台 (Practice Sandbox & Sentence Clinic)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            输入一句你平常写的产品宣传语，AI 老师现场给你“挑刺”，告诉你大模型为什么不会引用它，并一步步教你改出大模型喜欢的硬核内容。
          </p>
        </div>
        <div className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1.5 rounded border border-amber-200 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>INTERACTIVE CLINIC</span>
        </div>
      </div>

      {/* Preset Quick Loader */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-slate-500">挑选一个典型待抢救病句试练:</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SENTENCES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputSentence(preset.sentence);
                setBrandName(preset.brand);
                setCategory(preset.category);
              }}
              className="text-xs px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Input Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              标的品牌名
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="例如: 网易数帆 / PingPong"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              所属行业/品类
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="例如: 低代码中台 / 跨境支付"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            待动手术的文案（一两句话或一段介绍）
          </label>
          <textarea
            rows={3}
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder="输入你官网当前写的一句话，或者自己撰写的文案草稿..."
            className="w-full text-xs text-slate-900 p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-400">
            提示：大模型最讨厌“无法被事实或数据证伪”的自夸
          </div>
          <button
            onClick={handleDiagnose}
            disabled={loading || !inputSentence.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI 老师会诊中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>立即上台诊断 &amp; 重写</span>
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
            <div className="font-semibold">会诊失败</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Diagnosis Results */}
      {result && !loading && (
        <div className="space-y-5">
          {/* Top Score & Advice Banner */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm ${
                  result.score < 60 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {result.score}分
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    大模型采信评分: {result.score < 60 ? '低信息熵（AI极易忽略）' : '高可信度'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    大语言模型判定这是否具有“值得被作为答案引用”的事实价值
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                DIAGNOSIS COMPLETE
              </div>
            </div>

            {/* Beginner Tip */}
            {result.beginnerTip && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-md p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">小白老师心法：</span>
                  <span className="leading-relaxed ml-1">{result.beginnerTip}</span>
                </div>
              </div>
            )}

            {/* Flaws Detected */}
            {result.flawsDetected.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-slate-800">
                  诊断出的核心致命硬伤 (为什么大模型不理你):
                </span>
                <div className="space-y-2">
                  {result.flawsDetected.map((flaw, i) => (
                    <div key={i} className="p-3 rounded border border-rose-100 bg-rose-50/40 text-xs space-y-1">
                      <div className="font-semibold text-rose-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>{flaw.label}</span>
                      </div>
                      <p className="text-slate-600 pl-5">{flaw.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Before vs After Demonstration */}
          {result.beforeVsAfter.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
              <h3 className="text-xs font-semibold text-slate-900">
                普林斯顿科学改造示范 (Before vs After)
              </h3>
              <div className="space-y-3">
                {result.beforeVsAfter.map((item, i) => (
                  <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2.5 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono text-[11px] block">BEFORE (改前宣传话术)</span>
                      <p className="text-slate-700 line-through bg-slate-100/80 p-2 rounded">{item.before}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-emerald-700 font-mono text-[11px] font-semibold block">AFTER (符合 GEO 科学规范写法)</span>
                      <p className="text-emerald-900 font-medium bg-emerald-50 p-2.5 rounded border border-emerald-100">{item.after}</p>
                    </div>
                    <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-100">
                      💡 <strong>为什么大模型更喜欢改后？</strong> {item.whyBetter}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fully Rewritten Master Sentence with Copy */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-900">
                可直接复制上线的高转化 GEO 示范文案:
              </h3>
              <button
                onClick={() => handleCopy(result.rewrittenSentence)}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制到剪贴板' : '一键复制'}</span>
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs leading-relaxed font-sans">
              {result.rewrittenSentence}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
