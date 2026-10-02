import React, { useState } from 'react';
import { TabType } from '../../types/geo';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  BookOpen, 
  FileEdit, 
  Search, 
  FileCode2, 
  Share2, 
  TrendingUp,
  Award,
  Layers,
  Info
} from 'lucide-react';

interface BeginnerGuideTabProps {
  setActiveTab: (tab: TabType) => void;
  onExecuteProbe: (query: string, brand: string) => void;
}

export const BeginnerGuideTab: React.FC<BeginnerGuideTabProps> = ({ setActiveTab, onExecuteProbe }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [activeStage, setActiveStage] = useState<number>(1);

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const progressPercentage = Math.round((completedSteps.length / 5) * 100);

  const handleLaunchFirstProbe = () => {
    onExecuteProbe('2025年最推荐的企业级低代码平台有哪些？各自优缺点对比', '网易数帆');
    toggleStep(2);
    setActiveTab('probe');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Warm Welcome & Mission */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-6 border border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-medium border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>小白专属 · 5步通关企业级 GEO 优化向导</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              零基础也能轻松掌握的 GEO 实操指南
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              不用懂晦涩的大模型算法！只要跟随这 5 个明确步骤，边学边练，就能把你的产品和品牌送入 ChatGPT、Perplexity、Google Gemini 的首选推荐名单。
            </p>
          </div>

          {/* Gamified Progress Card */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-lg shrink-0 w-full lg:w-64 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">当前通关进度</span>
              <span className="font-mono font-bold text-emerald-400">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>已完成 {completedSteps.length} / 5 个任务</span>
              {progressPercentage === 100 && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> 已出师
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Interactive Track */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>通关关卡地图 (循序渐进，边学边做)</span>
          </h2>
          <span className="text-xs text-slate-500">点击关卡展开详细指引与专属小练习</span>
        </div>

        {/* Step 1 */}
        <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          activeStage === 1 ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'
        }`}>
          <div 
            onClick={() => setActiveStage(1)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(1); }}
                className="text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                {completedSteps.includes(1) ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    第 01 关
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    原理破冰：3分钟搞懂大模型到底是怎么给用户找答案的？
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  告别传统外链与关键词堆砌，认识大模型的“图书管理员”选书逻辑 (RAG机制)
                </p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${activeStage === 1 ? 'rotate-90' : ''}`} />
          </div>

          {activeStage === 1 && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              {/* Plain Metaphor Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 space-y-2">
                <div className="font-semibold text-amber-900 flex items-center gap-1.5 text-xs">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>通俗生动比喻：大模型就像一个极其挑剔的“超级图书管理员”</span>
                </div>
                <p className="leading-relaxed text-amber-950/80">
                  想象一下：当用户走进图书馆问“推荐几个靠谱的办公系统”，管理员（大模型）是不会凭空瞎编的。他会做 3 件事：<br/>
                  1. <strong>快速翻书 (检索切片)</strong>：先从几十本书里快速抽出最相关的几个章节；<br/>
                  2. <strong>比对权威度 (质量重排)</strong>：如果一本书通篇都是“我很牛、我很极致”，管理员会觉得是推销传单直接扔掉；如果另一本书写着“经信通院评测单节点吞吐达5万TPS，延迟&lt;8ms”，管理员立刻视为权威依据；<br/>
                  3. <strong>综合归纳并贴上标签 (生成回答并引用信源)</strong>：把最客观确凿的结论讲给用户，并标明出处。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">❌ 小白最容易踩的 SEO 误区</span>
                  <p className="text-slate-500 leading-normal">
                    以为把“最好用的系统”重复几十遍、买外链、刷点击就能生效。在 LLM 面前，这些统统被判定为低信息熵噪音！
                  </p>
                </div>
                <div className="p-3 rounded bg-emerald-50/60 border border-emerald-200">
                  <span className="font-semibold text-emerald-900 block mb-1">✅ 真正带来效果的 GEO 心法</span>
                  <p className="text-emerald-800 leading-normal">
                    <strong>“数字量化 + 权威引文 + 结构清晰”</strong>。让大模型只要检索到你的内容，就能直接把它当做标准答案去引用！
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">完成本关：理解 RAG 机制与 GEO 的核心目标</span>
                <button
                  onClick={() => { toggleStep(1); setActiveStage(2); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  已掌握，前往第 2 关 &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          activeStage === 2 ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'
        }`}>
          <div 
            onClick={() => setActiveStage(2)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(2); }}
                className="text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                {completedSteps.includes(2) ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    第 02 关
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    实机摸底：查查在潜在客户的提问中，AI 到底有没有提到你？
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  真实体验大模型搜索探测，学会看“首推位”、“竞品提及”与“引用了谁的网站”
                </p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${activeStage === 2 ? 'rotate-90' : ''}`} />
          </div>

          {activeStage === 2 && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed">
                知己知彼，百战不殆。做 GEO 优化的第一动是<strong>摸清现状</strong>：假装一个想买你家产品的企业老板，去大模型里搜一搜，看看大模型给出的清单里有没有你的名字。
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                <span className="font-semibold text-slate-900 block">实操练习：一键触发真实 AI 搜索探测</span>
                <p className="text-slate-500">
                  我们为您准备了一个典型的企业采购提问：“2025年最推荐的企业级低代码平台有哪些？”，点击下方按钮，本系统将立即调用真实大模型联网搜索进行探测：
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLaunchFirstProbe}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>立即运行第一次实机探测体验</span>
                  </button>
                  <span className="text-slate-400 text-[11px]">将自动跳转至实机探测控制台</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">完成本关：成功跑通一次实机搜索并看懂信源列表</span>
                <button
                  onClick={() => { toggleStep(2); setActiveStage(3); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  继续前往第 3 关 &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          activeStage === 3 ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'
        }`}>
          <div 
            onClick={() => setActiveStage(3)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(3); }}
                className="text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                {completedSteps.includes(3) ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    第 03 关
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    文案手术台：把官网空洞宣传重构为大模型眼里的“硬通货”
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  普林斯顿大学科学验证的 5 大加分技巧，用文案诊所边学边改
                </p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${activeStage === 3 ? 'rotate-90' : ''}`} />
          </div>

          {activeStage === 3 && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed">
                绝大多数企业的官网文案，都是给“人”随便看看的公关通稿，大模型看一眼就扔。要让大模型主动引用你，必须把文案放上“手术台”：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-900 block mb-1">第一刀：剔除形容词</span>
                  <span className="text-slate-500 block">删掉“行业领先”、“极佳体验”、“全方位赋能”。</span>
                </div>
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-900 block mb-1">第二刀：注入硬指标</span>
                  <span className="text-slate-500 block">换成具体数字，比如“单节点 50,000 QPS”、“交付周期由 3 个月缩减至 2 周”。</span>
                </div>
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-900 block mb-1">第三刀：权威背书</span>
                  <span className="text-slate-500 block">加上“通过信通院等保三级评测”、“符合 SOC2 Type II 审计标准”。</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-900 block">去专属文案诊所练一练</span>
                  <span className="text-blue-700 text-[11px]">输入你平常写的一句话，AI 老师现场批改并教你重写</span>
                </div>
                <button
                  onClick={() => { toggleStep(3); setActiveTab('clinic'); }}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors cursor-pointer shrink-0"
                >
                  打开文案诊所沙盒 &rarr;
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">完成本关：学会用普林斯顿科学公式改造 1 段产品介绍</span>
                <button
                  onClick={() => { toggleStep(3); setActiveStage(4); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  继续前往第 4 关 &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 4 */}
        <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          activeStage === 4 ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'
        }`}>
          <div 
            onClick={() => setActiveStage(4)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(4); }}
                className="text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                {completedSteps.includes(4) ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    第 04 关
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    武器装配：零代码一键生成 /llms.txt 与 Schema 结构化数据
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  为你的官网装上大模型专用导航仪，让 AI 爬虫 1 秒钟读懂你的全部产品特性
                </p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${activeStage === 4 ? 'rotate-90' : ''}`} />
          </div>

          {activeStage === 4 && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-900 block">
                  💡 什么是 /llms.txt？（小白极简解释）
                </span>
                <p className="text-slate-600 leading-relaxed">
                  过去网站给 Google 准备了一个 <code>sitemap.xml</code> 地图；现在各大 AI 搜索引擎联合推广了 <strong>/llms.txt</strong>。<br/>
                  它是一份精简干练的 Markdown 清单，放在网站根目录，专门供 Perplexity、ChatGPT、Claude 的爬虫读取。有了它，大模型不用花昂贵的算力去猜你的网站，直接按你的官方正本进行索引！
                </p>
              </div>

              <div className="flex items-center justify-between bg-emerald-50/60 p-4 rounded-lg border border-emerald-200">
                <div>
                  <span className="font-bold text-emerald-900 block">一键自动生成，下载即用</span>
                  <span className="text-emerald-700 text-[11px]">填入产品名和核心能力，系统自动生成合规的 llms.txt</span>
                </div>
                <button
                  onClick={() => { toggleStep(4); setActiveTab('llmstxt'); }}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium transition-colors cursor-pointer shrink-0"
                >
                  去配置生成 llms.txt &rarr;
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">完成本关：生成专属于你家产品的 /llms.txt 文件</span>
                <button
                  onClick={() => { toggleStep(4); setActiveStage(5); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  前往最终第 5 关 &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 5 */}
        <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          activeStage === 5 ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200'
        }`}>
          <div 
            onClick={() => setActiveStage(5)}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleStep(5); }}
                className="text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                {completedSteps.includes(5) ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    第 05 关
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    全网布阵：大模型究竟最相信哪些外部平台？去那里播撒种子！
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  65% 的 AI 引用来自第三方信源，掌握高杠杆平台的布控秘籍
                </p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${activeStage === 5 ? 'rotate-90' : ''}`} />
          </div>

          {activeStage === 5 && (
            <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed">
                光改官网只能解决 30% 的问题。在现实中，当用户问大模型“推荐几款软件”时，大模型为了保持中立，<strong>优先引用第三方平台的客观评价</strong>！
              </p>

              <div className="space-y-2">
                <span className="font-semibold text-slate-900 block">小白必须完成的 3 个外部播种动作：</span>
                
                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    <span>1. 入驻行业测评与选型点评站 (占 AI 引用量的 38%)</span>
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1 rounded">最高权重</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    行动：在 36Kr 企服点评、G2、软评等网站完善厂商主页，邀请真实客户带具体数字发表中肯评价。
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    <span>2. 在技术问答社区沉淀“中立对比帖” (占 AI 引用量的 26%)</span>
                    <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1 rounded">长尾护城河</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    行动：在知乎、CSDN、Reddit 等社区发布客观对比（例如：A产品 vs B产品 vs 我家产品的选型指南，坦诚列出各自适用场景和局限性）。
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="font-medium text-slate-900 flex items-center justify-between">
                    <span>3. 建立 4 阶段全漏斗提问矩阵</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded">全面防御</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    行动：使用本工作台的“提问矩阵”功能，生成 30+ 组真实客户可能提出的长尾 Prompt，定期复测。
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">完成本关：掌握全网立体信源构建方法，GEO 正式出师！</span>
                <button
                  onClick={() => { toggleStep(5); }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded font-medium hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  🎉 完成全部 5 关打卡！
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
