import React from 'react';
import { TabType } from '../../types/geo';
import { 
  Compass,
  Stethoscope,
  BarChart3, 
  Search, 
  FileEdit, 
  FileCode2, 
  Network, 
  Grid3X3, 
  BookOpen, 
  ShieldCheck,
  Cpu,
  Plug,
  Share2
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const beginnerSection: { id: TabType; label: string; en: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: 'beginner', 
      label: '小白通关向导', 
      en: 'Zero to One Journey', 
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      badge: '5步通关'
    },
    { 
      id: 'multiplatform', 
      label: '全网多平台阵地中枢', 
      en: 'Multi-Platform Hub', 
      icon: <Share2 className="w-4 h-4 text-blue-400" />,
      badge: '实战核心'
    },
    { 
      id: 'clinic', 
      label: '边学边练文案诊所', 
      en: 'Practice Sandbox', 
      icon: <Stethoscope className="w-4 h-4 text-amber-400" />,
      badge: '即时批改'
    },
  ];

  const enterpriseSection: { id: TabType; label: string; en: string; icon: React.ReactNode }[] = [
    { 
      id: 'overview', 
      label: 'GEO 总览大盘', 
      en: 'Overview & SOV', 
      icon: <BarChart3 className="w-4 h-4" /> 
    },
    { 
      id: 'probe', 
      label: '实机搜索探测', 
      en: 'Live AI Probe & Citations', 
      icon: <Search className="w-4 h-4" /> 
    },
    { 
      id: 'optimizer', 
      label: '普林斯顿内容强化', 
      en: 'Princeton GEO Content', 
      icon: <FileEdit className="w-4 h-4" /> 
    },
    { 
      id: 'llmstxt', 
      label: 'llms.txt 规范引擎', 
      en: 'AI Crawler Standard', 
      icon: <FileCode2 className="w-4 h-4" /> 
    },
    { 
      id: 'schema', 
      label: '实体图谱与 Schema', 
      en: 'Entities & JSON-LD', 
      icon: <Network className="w-4 h-4" /> 
    },
    { 
      id: 'matrix', 
      label: '高意图提问矩阵', 
      en: 'Prompt Matrix & SOV', 
      icon: <Grid3X3 className="w-4 h-4" /> 
    },
  ];

  const knowledgeSection: { id: TabType; label: string; en: string; icon: React.ReactNode }[] = [
    { 
      id: 'playbook', 
      label: '从浅入深方法论', 
      en: 'GEO Execution Playbook', 
      icon: <BookOpen className="w-4 h-4" /> 
    },
    { 
      id: 'integrations', 
      label: '预留接口与集成', 
      en: 'Reserved API & Webhooks', 
      icon: <Plug className="w-4 h-4" /> 
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      {/* Workspace Context */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>当前优化标的</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE
          </span>
        </div>
        <div className="text-sm font-semibold text-white truncate">
          Enterprise B2B / SaaS
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
          引擎: Gemini 3.8 Flash + Search Grounding
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {/* Group 1: Beginner & Practice */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            小白专区 · 边学边练
          </div>
          {beginnerSection.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/20">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Group 2: Enterprise Deep Tools */}
        <div className="space-y-1 pt-1">
          <div className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            企业级深度控制台
          </div>
          {enterpriseSection.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Group 3: Playbook & Integrations */}
        <div className="space-y-1 pt-1">
          <div className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            方法论与预留集成
          </div>
          {knowledgeSection.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Engine & Standard Reference */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
        <div className="text-slate-300 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>合规与权威标准</span>
        </div>
        <p className="leading-relaxed text-slate-400">
          基于 Princeton GEO 科学实验框架与 Jeremy Howard llms.txt 规范构建。
        </p>
        <div className="pt-1 flex items-center justify-between text-slate-400 font-mono text-[10px]">
          <span>VERSION: 2026.1</span>
          <span className="text-emerald-400">PROD</span>
        </div>
      </div>
    </aside>
  );
};
