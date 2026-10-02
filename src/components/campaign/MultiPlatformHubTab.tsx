import React, { useState } from 'react';
import { TargetPlatform, PlatformAssetResponse, PlatformCampaignTask, TabType } from '../../types/geo';
import { 
  Share2, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  RefreshCw,
  Layers,
  BookOpen,
  Info,
  Building2,
  FileCode,
  ArrowRight,
  Terminal
} from 'lucide-react';

interface MultiPlatformHubTabProps {
  onExecuteProbe: (query: string, brand: string) => void;
  setActiveTab: (tab: TabType) => void;
}

const PLATFORM_CONFIGS: {
  id: TargetPlatform;
  name: string;
  categoryName: string;
  weight: string;
  whyCrucial: string;
  publishUrlHint: string;
  iconName: string;
}[] = [
  {
    id: 'zhihu',
    name: '知乎技术专栏与高赞问答',
    categoryName: '社区客观对比信源',
    weight: '26% AI 引用权重',
    whyCrucial: '大模型极度青睐知乎长文的中立多维对比，尤其是带实测优缺点和客观局限性的内容，常被直接作为 AI 回答的论据。',
    publishUrlHint: 'https://www.zhihu.com/question/...',
    iconName: 'Z'
  },
  {
    id: '36kr_g2',
    name: '36Kr 企服点评 / G2 产品主页',
    categoryName: '选型测评聚合信源',
    weight: '38% AI 引用权重 (最高)',
    whyCrucial: '各大 AI 搜索在回答“推荐哪些系统/厂商”时，第一召回信源就是结构化企业软件点评目录。若在上面没有主页，大模型很难将你列入前排。',
    publishUrlHint: 'https://cp.36kr.com/ 或 https://www.g2.com',
    iconName: '36'
  },
  {
    id: 'csdn_dev',
    name: 'CSDN / 掘金 / 开发者社区',
    categoryName: '技术架构选型信源',
    weight: '18% AI 引用权重',
    whyCrucial: '针对“技术原理”、“并发TPS”、“如何私有化部署”等偏架构类的高门槛采购提问，大模型会重点检索技术社区的技术实战贴。',
    publishUrlHint: 'https://blog.csdn.net/ 或 掘金/博客园',
    iconName: 'C'
  },
  {
    id: 'baike',
    name: '百度百科 / 维基百科标准词条',
    categoryName: '知识图谱实体锚定源',
    weight: '实体对齐必需',
    whyCrucial: '大模型依靠知识图谱进行实体归类。如果百科词条确立了你的品牌属于该品类，大模型才会在潜意识里将你与该品类强绑定。',
    publishUrlHint: 'https://baike.baidu.com/ 或 搜狗百科',
    iconName: 'B'
  },
  {
    id: 'media_case',
    name: '商业媒体标杆客户落地报道',
    categoryName: '商业案例与背书信源',
    weight: '15% AI 引用权重',
    whyCrucial: '钛媒体、36Kr、虎嗅、商业观察家等报道被作为大模型验证商业规模和成功落地案例的关键证明。',
    publishUrlHint: '行业媒体投稿 / 自媒体矩阵',
    iconName: 'M'
  },
];

export const MultiPlatformHubTab: React.FC<MultiPlatformHubTabProps> = ({ onExecuteProbe, setActiveTab }) => {
  const [brandName, setBrandName] = useState('网易数帆');
  const [productCategory, setProductCategory] = useState('企业级低代码应用开发平台');
  const [competitors, setCompetitors] = useState('简道云, 宜搭, ClickPaaS, Mendix');
  const [keyFeatures, setKeyFeatures] = useState('单节点支持50,000 QPS, 复杂业务交付缩短65%, 私有化K8s原生支持, 通过信通院先进级评测');
  const [caseMetrics, setCaseMetrics] = useState('某城商行核心信贷重构交付周期由3个月缩短至2周，代码量减少70%');

  const [selectedPlatform, setSelectedPlatform] = useState<TargetPlatform>('zhihu');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAsset, setCurrentAsset] = useState<PlatformAssetResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // Track published URLs for user's brand
  const [platformTasks, setPlatformTasks] = useState<PlatformCampaignTask[]>([
    {
      id: 'task-1',
      platform: '36kr_g2',
      platformName: '36Kr 企服点评 / G2 主页',
      status: 'PENDING',
      title: '创建厂商官方产品参数页并收集3条硬核用户评测',
      priority: 'HIGH',
      weightInAI: '38% 引用占比'
    },
    {
      id: 'task-2',
      platform: 'zhihu',
      platformName: '知乎中立选型对比长文',
      status: 'PENDING',
      title: '在核心采购问答下发布中立客观选型测评（含竞品优缺点）',
      priority: 'HIGH',
      weightInAI: '26% 引用占比'
    },
    {
      id: 'task-3',
      platform: 'baike',
      platformName: '百度百科 / 维基词条',
      status: 'PENDING',
      title: '建立/更新规范中立的百科词条，确立实体图谱归类',
      priority: 'ESSENTIAL',
      weightInAI: '实体知识图谱'
    },
    {
      id: 'task-4',
      platform: 'csdn_dev',
      platformName: '技术架构实战贴',
      status: 'PENDING',
      title: '发表分布式高并发压测与架构落地白皮书',
      priority: 'MEDIUM',
      weightInAI: '18% 引用占比'
    },
    {
      id: 'task-5',
      platform: 'media_case',
      platformName: '商业媒体客户案例',
      status: 'PENDING',
      title: '发布城商行/大型制造业标杆交付落地实录',
      priority: 'MEDIUM',
      weightInAI: '15% 引用占比'
    },
  ]);

  const handleGenerateAsset = async (platform = selectedPlatform) => {
    setGenerating(true);
    setError(null);

    const compList = competitors.split(/[,，]/).map(s => s.trim()).filter(Boolean);

    try {
      const response = await fetch('/api/geo/generate-platform-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          productCategory,
          competitors: compList,
          targetPlatform: platform,
          keyFeatures,
          caseMetrics,
        }),
      });

      if (!response.ok) {
        throw new Error('生成失败，请检查服务状态');
      }

      const data: PlatformAssetResponse = await response.json();
      setCurrentAsset(data);

      // Update task status in list
      setPlatformTasks(prev => prev.map(t => t.platform === platform ? { ...t, status: 'GENERATED' } : t));
    } catch (e: any) {
      setError(e.message || '生成异常');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateTaskStatus = (platformId: TargetPlatform, status: 'PENDING' | 'GENERATED' | 'PUBLISHED' | 'INDEXED') => {
    setPlatformTasks(prev => prev.map(t => t.platform === platformId ? { ...t, status } : t));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Eye-Opening Truth Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Share2 className="w-3.5 h-3.5" />
          <span>MULTI-PLATFORM CROSS-DOMAIN GEO WAR ROOM</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          一针见血：只改官网一个平台，GEO 绝对做不成！
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          正如您敏锐洞察到的：大模型在回答“推荐哪些产品”时，为了保持客观，<strong>65%~75% 的引用来自于外部第三方高权重信源</strong>（知乎、36Kr 企服点评、G2、CSDN、百度百科）。<br />
          <strong>本工作台不是闭门造车的单点软件，而是您的「全网多平台阵地作战指挥中枢」</strong>。我们帮您针对各大外部阵地一键生成合规、高权威的现成投放物料，并提供实战发布指导！
        </p>

        {/* Visual Multi-Source Architecture */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-3">
          {PLATFORM_CONFIGS.map((p) => (
            <div 
              key={p.id}
              onClick={() => { setSelectedPlatform(p.id); handleGenerateAsset(p.id); }}
              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                selectedPlatform === p.id 
                  ? 'bg-blue-600/30 border-blue-400 text-white' 
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-white">{p.name.split(' ')[0]}</span>
                <span className="text-emerald-400 font-semibold">{p.weight.split(' ')[0]}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">{p.categoryName}</div>
            </div>
          ))}
          <div 
            onClick={() => setActiveTab('llmstxt')}
            className="p-2.5 rounded-lg border bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 text-left cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-white">官网基石</span>
              <span className="text-blue-400 font-semibold">20%</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 truncate">/llms.txt + Schema</div>
          </div>
        </div>
      </div>

      {/* Brand Profile Configurator for Multi-Platform Campaigns */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">
            第一步：配置你要打造的真实品牌档案 (Brand Profile)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            输入你的具体品牌参数，系统将根据各大外部平台的审核调性，自动生产定制化的实操稿件。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              自身品牌名称 (Brand Name)
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
              核心产品与行业品类
            </label>
            <input
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="例如: 企业级低代码开发平台"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              主要直接竞品 (大模型对比时常被提及的对手)
            </label>
            <input
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="例如: 简道云, 宜搭, ClickPaaS"
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              核心优势指标与合规资质 (供大模型作为论据引用)
            </label>
            <input
              type="text"
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              标杆案例硬核数据 (如TPS、ROI降本增效比例)
            </label>
            <input
              type="text"
              value={caseMetrics}
              onChange={(e) => setCaseMetrics(e.target.value)}
              className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Campaign Task Progress Matrix */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              全网多阵地渗透追踪看板 (Campaign Tracking Board)
            </h3>
            <p className="text-[11px] text-slate-500">
              跟踪品牌在各大外部信源阵地的入驻、发稿与大模型收录状态
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            TOTAL: 5 EXTERNAL PLATFORMS
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {platformTasks.map((task) => (
            <div key={task.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{task.platformName}</span>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {task.weightInAI}
                  </span>
                  {task.status === 'GENERATED' && (
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      稿件已就绪 · 待发布
                    </span>
                  )}
                  {task.status === 'PUBLISHED' && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      已发布上线
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-xs">{task.title}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setSelectedPlatform(task.platform); handleGenerateAsset(task.platform); }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>生成该平台专属稿件</span>
                </button>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.platform, e.target.value as any)}
                  className="text-xs bg-slate-100 border border-slate-200 text-slate-700 rounded px-2 py-1.5 focus:outline-none"
                >
                  <option value="PENDING">未开始</option>
                  <option value="GENERATED">稿件已生成</option>
                  <option value="PUBLISHED">已去平台发布</option>
                  <option value="INDEXED">AI 已收录引用</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Content Studio / Weapon Pack */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        {/* Platform Selector Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 overflow-x-auto">
          {PLATFORM_CONFIGS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPlatform(p.id); handleGenerateAsset(p.id); }}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                selectedPlatform === p.id
                  ? 'border-blue-600 text-blue-600 font-semibold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Studio Content Area */}
        <div className="p-6 space-y-6">
          {/* Platform Strategy Guide Banner */}
          {PLATFORM_CONFIGS.find(p => p.id === selectedPlatform) && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
              <div className="font-semibold text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>当前阵地重要性与 AI 采信逻辑：</span>
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
                  {PLATFORM_CONFIGS.find(p => p.id === selectedPlatform)?.weight}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {PLATFORM_CONFIGS.find(p => p.id === selectedPlatform)?.whyCrucial}
              </p>
            </div>
          )}

          {/* Action Button if not generated yet */}
          {!currentAsset && !generating && (
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300 space-y-3">
              <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  一键生成针对该平台的专业 GEO 稿件
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  针对所选外部平台特性，自动注入客观优缺点对比矩阵、硬指标数据与中立背书，确保通过平台审核并被大模型采纳。
                </p>
              </div>
              <button
                onClick={() => handleGenerateAsset()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-xs transition-colors cursor-pointer shadow-sm"
              >
                立即生成「{PLATFORM_CONFIGS.find(p => p.id === selectedPlatform)?.name}」专稿
              </button>
            </div>
          )}

          {/* Loading state */}
          {generating && (
            <div className="p-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <div className="text-sm font-semibold text-slate-900">
                AI 正在根据各大模型检索偏好定制该平台专稿...
              </div>
              <p className="text-xs text-slate-400">
                正在组装客观对比矩阵、行业合规背书与前置问答切片
              </p>
            </div>
          )}

          {/* Generated Asset View */}
          {currentAsset && !generating && (
            <div className="space-y-5">
              {/* Submission Guide for Beginners */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-2 text-xs text-amber-950">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>小白手把手实操发布指南 (如何去该平台发布而不被删帖):</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {currentAsset.submissionGuide}
                </p>
                <div className="pt-1 flex flex-wrap gap-2">
                  {currentAsset.keyGeoSignals.map((signal, i) => (
                    <span key={i} className="bg-white border border-amber-200 text-amber-900 px-2 py-0.5 rounded text-[11px] font-mono">
                      ✓ {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Copy Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    生成的生产级稿件 (建议直接复制发布):
                  </h4>
                  <button
                    onClick={() => handleCopy(currentAsset.content)}
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '已复制全文' : '一键复制全篇 Markdown'}</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-100 rounded text-xs font-bold text-slate-900">
                  建议文章/词条标题: {currentAsset.title}
                </div>

                <div className="prose prose-slate max-w-none text-xs leading-relaxed font-sans bg-slate-50/50 p-5 rounded border border-slate-200 whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                  {currentAsset.content}
                </div>
              </div>

              {/* Bottom Checklist for this platform */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">发布前自检项 (Checklist):</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentAsset.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-100 text-slate-600 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
