import React from 'react';
import { BookOpen, CheckCircle2, TrendingUp, Layers, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const PlaybookTab: React.FC = () => {
  const [level, setLevel] = React.useState<'bronze' | 'silver' | 'gold' | 'master'>('bronze');

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-mono text-blue-600 font-semibold mb-1">
          SCIENTIFIC METHODOLOGY & FIELD GUIDE
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          企业级 GEO 生成式引擎优化全景方法论
        </h1>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          从零基础概念扫盲，到普林斯顿学术论文拆解，再到全网三层信源渗透与企业落地实施。
        </p>

        {/* Level Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">选择你的学习梯度:</span>
          <button
            onClick={() => setLevel('bronze')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              level === 'bronze' 
                ? 'bg-amber-600 text-white font-semibold shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🥉 青铜入门 · 概念扫盲
          </button>
          <button
            onClick={() => setLevel('silver')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              level === 'silver' 
                ? 'bg-slate-700 text-white font-semibold shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🥈 白银进阶 · 普林斯顿公式
          </button>
          <button
            onClick={() => setLevel('gold')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              level === 'gold' 
                ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🥇 黄金实战 · 三层信源穿透
          </button>
          <button
            onClick={() => setLevel('master')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              level === 'master' 
                ? 'bg-slate-900 text-white font-semibold shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            👑 王者架构 · 30天企业落地
          </button>
        </div>
      </div>

      {/* Chapter 1: SEO vs GEO Paradigm Shift */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            01
          </div>
          <h2 className="text-base font-bold text-slate-900">
            范式跃迁：传统 SEO 与 GEO (生成式引擎优化) 的底层差异
          </h2>
        </div>
        
        <p className="text-xs text-slate-600 leading-relaxed">
          传统搜索引擎的终点是<strong>“蓝色链接列表 (SERP)”</strong>，依赖 PageRank、反向外链堆叠和关键词密度；而生成式 AI 搜索的终点是<strong>“直接综合回答与信源引用 (Direct Synthesis & Citations)”</strong>。大模型不会逐字照搬网页，而是通过稠密向量检索 (Dense Retrieval) 召回文本切片，经由重排器 (Reranker) 筛选后，输入上下文由 LLM 归纳提炼。
        </p>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-2.5 px-4">对比维度</th>
                <th className="py-2.5 px-4">传统搜索引擎优化 (SEO)</th>
                <th className="py-2.5 px-4 text-blue-700 font-bold">生成式引擎优化 (GEO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">核心优化目标</td>
                <td className="py-2.5 px-4">争取搜索结果页前三条网页链接</td>
                <td className="py-2.5 px-4 font-semibold text-slate-900 bg-blue-50/30">成为大模型生成回答的首推标的与引用信源</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">索引与检索机制</td>
                <td className="py-2.5 px-4">倒排索引 (Inverted Index) + PageRank</td>
                <td className="py-2.5 px-4 bg-blue-50/30">向量嵌入 (Embeddings) + RAG 分块检索 + 交叉重排</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">内容评判标准</td>
                <td className="py-2.5 px-4">关键词出现频次、标题标签、外链数量</td>
                <td className="py-2.5 px-4 bg-blue-50/30">信息增益度 (Information Gain)、数据硬核密度、权威可信度</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">目标用户提问</td>
                <td className="py-2.5 px-4">破碎短词 ("低代码 排名")</td>
                <td className="py-2.5 px-4 bg-blue-50/30">复杂对话长句 ("中大型银行如何选型满足等保三级的低代码？")</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">技术规范入口</td>
                <td className="py-2.5 px-4">sitemap.xml / robots.txt</td>
                <td className="py-2.5 px-4 font-mono font-semibold text-blue-700 bg-blue-50/30">/llms.txt / Schema.org JSON-LD / 语义切片</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 2: Princeton Research Breakdown */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            02
          </div>
          <h2 className="text-base font-bold text-slate-900">
            普林斯顿大学科学实验：证实有效的 5 大 GEO 关键战术
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          普林斯顿大学科研团队（Kaggie et al.）发表的权威论文《GEO: Generative Engine Optimization》对上万个大模型搜索场景进行了严谨测试，发现以下内容改造策略能够带来确定性、显著的大模型可见性提升：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">1. 权威引文与外部信源背书 (Cite Sources)</span>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+30%~40% 提升</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              在正文中明确引用权威行业标准组织（如 ISO、IEEE、信通院、Gartner）或同行评审研究报告。大语言模型在 RAG 决策中具有极强的“信源声誉偏见”，包含学术或标准引文的内容被采信率最高。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">2. 硬核数据与量化指标注入 (Statistics Addition)</span>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+25%~35% 提升</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              严禁使用“极大提升”、“性能优异”等模糊修饰词。替换为“吞吐量提升至 120,000 TPS”、“端到端延迟降低 42%”、“P99 低于 5ms”。LLM 倾向于将数字密度高的分块识别为高信息增益的客观事实。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">3. 前40字直接应答与切片块元化 (Chunk Match)</span>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+20%~30% 提升</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              每个二级标题 (H2) 采用真实的问句形式（如“网易数帆低代码如何支持私有化集群？”），并在标题下<strong>前两句话（40字内）</strong>给出结论性答案，方便向量切片被完整召回。
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">4. 知识图谱实体与行业本体对齐 (Entity Co-occurrence)</span>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">基础准入门槛</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              大模型依靠实体关系图谱。必须在网页正文与 JSON-LD 中明确将品牌名与该品类最重要的属性（如 SOC2 Type II、Kubernetes 原生、等保三级）强关联，让模型形成“品牌 = 品类代表”的本体共现。
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: The 3-Tier Seeding Architecture */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            03
          </div>
          <h2 className="text-base font-bold text-slate-900">
            企业级 GEO 三层信源穿透工程体系 (The 3-Tier Architecture)
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          许多企业误以为 GEO 只是改官网，这是致命误区。根据我们对主流 AI 搜索实机探测的统计，<strong>超过 65% 的引用来自于外部第三方网站</strong>。因此企业必须构建三层立体信源矩阵：
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-slate-900 text-white rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-1">
              <span>TIER 1 · 官网基石层 (First-Party Authority)</span>
              <span>权重: 20%~25%</span>
            </div>
            <h4 className="text-sm font-semibold">第一方机器可读基建设施</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              部署规范的 <code>/llms.txt</code> 与 <code>/llms-full.txt</code>；配置放行 PerplexityBot、GPTBot 的 <code>robots.txt</code>；嵌入 Schema.org <code>SoftwareApplication</code> 和 <code>FAQPage</code> 结构化标记；消除客户端纯 JS 渲染屏障。
            </p>
          </div>

          <div className="p-4 bg-slate-800 text-white rounded-lg border border-slate-700">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400 mb-1">
              <span>TIER 2 · 中立测评与选型聚合平台 (Third-Party Review Hubs)</span>
              <span>权重: 35%~40% (最高杠杆)</span>
            </div>
            <h4 className="text-sm font-semibold">采购决策聚合阵地渗透</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              在大模型被频繁引用的平台（国内：36Kr 企服点评、CSDN 测评专栏、知乎选型专栏；海外：G2、Capterra、TrustRadius）建立完整的官方主页，收集真实企业客户带具体数字的正面评价。
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 text-white rounded-lg border border-slate-700">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
              <span>TIER 3 · 技术社区与权威背书 (Community & Ecosystem PR)</span>
              <span>权重: 25%~30%</span>
            </div>
            <h4 className="text-sm font-semibold">长尾避坑与技术对比内容沉淀</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              在开发者社区（GitHub Discussions、Reddit r/selfhosted、知乎技术圈）发布客观中立的深度架构对比方案与“真实踩坑与性能调优白皮书”，为大模型长尾对比类 Prompt 提供充分的事实依据。
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4: 30-Day Execution Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
            04
          </div>
          <h2 className="text-base font-bold text-slate-900">
            企业 30 天 GEO 落地执行时间表 (30-Day Execution Roadmap)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-mono text-slate-400 text-[11px] font-semibold">WEEK 1</div>
            <div className="font-bold text-slate-900">基础设施与爬虫就绪</div>
            <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
              <li>生成并发布 /llms.txt 文件</li>
              <li>更新 robots.txt 放行 GPTBot 等</li>
              <li>使用本工作台探测 20 个高频词</li>
              <li>建立品牌 AI 声量基准线 (SOV)</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-mono text-slate-400 text-[11px] font-semibold">WEEK 2</div>
            <div className="font-bold text-slate-900">核心文案普林斯顿重构</div>
            <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
              <li>消除官网虚无修饰性词汇</li>
              <li>注入 TPS、延迟、成本量化指标</li>
              <li>植入行业合规认证与权威引用</li>
              <li>嵌入 FAQPage JSON-LD 结构代码</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-mono text-slate-400 text-[11px] font-semibold">WEEK 3</div>
            <div className="font-bold text-slate-900">二三层外部信源矩阵布控</div>
            <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
              <li>入驻 G2 / 36Kr 等聚合平台</li>
              <li>发布 5 篇结构化中立对比测评</li>
              <li>在核心问答社区补齐避坑指南</li>
              <li>完成与行业核心词的实体共现</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="font-mono text-slate-400 text-[11px] font-semibold">WEEK 4</div>
            <div className="font-bold text-slate-900">效果复测与闭环调优</div>
            <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
              <li>全量执行 Prompt 矩阵探测</li>
              <li>核算首推率与信源穿透率增幅</li>
              <li>针对未穿透的问题做针对性修补</li>
              <li>固化企业季度 GEO 巡检机制</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
