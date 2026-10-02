import React, { useState } from 'react';
import { Network, Sparkles, Copy, Check, CheckCircle2, Shield, Layers, Code, ArrowRight } from 'lucide-react';

export const EntitySchemaTab: React.FC = () => {
  const [schemaType, setSchemaType] = useState<'SoftwareApplication' | 'Organization' | 'FAQPage' | 'TechArticle'>('SoftwareApplication');
  const [appName, setAppName] = useState('网易数帆轻舟低代码平台');
  const [category, setCategory] = useState('Enterprise Low-Code Application Platform');
  const [vendorName, setVendorName] = useState('网易数帆');
  const [ratingValue, setRatingValue] = useState('4.8');
  const [ratingCount, setRatingCount] = useState('128');
  const [operatingSystem, setOperatingSystem] = useState('Linux, Kubernetes, Cloud Native');
  const [copied, setCopied] = useState(false);

  // Dynamic Schema Generation
  const generateSchema = () => {
    if (schemaType === 'SoftwareApplication') {
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': appName,
        'applicationCategory': category,
        'operatingSystem': operatingSystem,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'CNY',
          'description': '提供企业级免费PoC试用与定制报价'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': ratingValue,
          'ratingCount': ratingCount,
          'bestRating': '5'
        },
        'author': {
          '@type': 'Organization',
          'name': vendorName,
          'url': 'https://example.com'
        },
        'featureList': [
          '全可视化组件拖拽编排',
          '支持百万级高并发与微服务容器原生集成',
          '通过信通院先进级可信低代码评测',
          '支持本地化与私有云部署'
        ]
      };
    } else if (schemaType === 'FAQPage') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `${appName} 与传统自研相比开发效率提升多少？`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `经信通院及多家金融国央企实测，使用${appName}进行业务系统重构平均可降低65%~75%的代码量，复杂业务交付周期由3个月缩减至2周。`
            }
          },
          {
            '@type': 'Question',
            'name': `${appName} 如何保障数据安全与私有化合规？`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${appName}支持完整源码级导出与私有化K8s集群部署，通过等保三级与信创全面兼容适配，底层数据不经过任何第三方公有云。`
            }
          }
        ]
      };
    } else if (schemaType === 'Organization') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': vendorName,
        'alternateName': ['NetEase Digital Sail', '数帆科技'],
        'url': 'https://example.com',
        'logo': 'https://example.com/logo.png',
        'knowsAbout': [
          'Low-Code Platform',
          'Cloud Native APM',
          'Microservices Architecture',
          'OpenTelemetry'
        ],
        'sameAs': [
          'https://baike.baidu.com/item/网易数帆',
          'https://github.com/netease'
        ]
      };
    } else {
      return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': `2025企业级低代码架构选型与高可用落地方案`,
        'author': {
          '@type': 'Organization',
          'name': vendorName
        },
        'proficiencyLevel': 'Expert',
        'about': [
          { '@type': 'Thing', 'name': category },
          { '@type': 'Thing', 'name': 'Microservices Orchestration' }
        ],
        'description': `系统分析企业低代码选型必须考量的架构扩展性、私有化部署、高并发TPS吞吐能力与安全性指标。`
      };
    }
  };

  const schemaJson = JSON.stringify(generateSchema(), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            知识图谱实体对齐与 Schema 语义标记 (Knowledge Entity & Schema Studio)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            生成式大模型基于图谱三元组（Entity-Relation-Entity）进行实体消歧与归类。通过机器可读的 Schema.org 标记，确立品牌在特定技术门类的第一权威性。
          </p>
        </div>
        <div className="text-xs font-mono text-purple-700 bg-purple-50 px-3 py-1.5 rounded border border-purple-100 flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5" />
          <span>SCHEMA.ORG JSON-LD</span>
        </div>
      </div>

      {/* Entity Co-Occurrence Concept Diagram */}
      <div className="bg-slate-900 text-slate-100 rounded-lg p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-blue-400">GEO ENTITY ONTOLOGY MECHANISM</span>
          <span className="text-[11px] text-slate-400">大模型知识抽取原理</span>
        </div>
        <h3 className="text-sm font-semibold text-white">
          为什么大模型不把您的品牌推荐到特定品类？
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          大语言模型（如 ChatGPT / Perplexity）通过海量预训练语料建立词嵌入与实体关联。如果您的品牌在语料中从未与核心技术词（如 SOC2、Kubernetes 原生、TPS 50,000+、ISO 27001）形成高频<strong>实体共现（Entity Co-occurrence）</strong>，大模型在回答特定高门槛选型问题时就会自动过滤掉该品牌。
        </p>

        {/* Visual Entity Triple */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded bg-slate-800 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-mono block">SUBJECT (实体主语)</span>
            <span className="text-sm font-bold text-white mt-1 block">目标品牌 / 标的产品</span>
          </div>
          <div className="p-3 rounded bg-slate-800 border border-slate-700 text-center flex flex-col justify-center">
            <span className="text-[10px] text-blue-400 font-mono">PREDICATE (明确谓词关系)</span>
            <span className="text-xs text-slate-300 font-medium mt-1">isA / provides / compliesWith</span>
          </div>
          <div className="p-3 rounded bg-slate-800 border border-slate-700 text-center">
            <span className="text-[10px] text-emerald-400 font-mono block">OBJECT (权威客体标准)</span>
            <span className="text-sm font-bold text-white mt-1 block">行业品类 / 性能指标 / 认证</span>
          </div>
        </div>
      </div>

      {/* Schema Generator Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            选择 Schema.org 结构化类型 (为 AI 爬虫精准注标)
          </label>
          <div className="flex flex-wrap gap-2">
            {(['SoftwareApplication', 'FAQPage', 'Organization', 'TechArticle'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSchemaType(type)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  schemaType === type
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {schemaType === 'SoftwareApplication' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                软件/平台名称 (Application Name)
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                软件所属行业分类 (Application Category)
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
                出品厂商/机构 (Vendor Name)
              </label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                用户真实评价均分 (Aggregate Rating)
              </label>
              <input
                type="text"
                value={ratingValue}
                onChange={(e) => setRatingValue(e.target.value)}
                className="w-full text-xs text-slate-900 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Code Output Box */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-700">
              生成的生产环境 JSON-LD 代码 (嵌入网页 HTML &lt;head&gt;):
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制到剪贴板' : '复制 JSON-LD 代码'}</span>
            </button>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed max-h-[400px]">
            {schemaJson}
          </pre>
        </div>
      </div>
    </div>
  );
};
