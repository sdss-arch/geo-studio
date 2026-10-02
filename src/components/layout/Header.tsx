import React from 'react';
import { TabType } from '../../types/geo';
import { Sparkles, Terminal, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onNewProbe: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onNewProbe }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
          className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90"
        >
          <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white font-mono text-xs font-semibold">
            G
          </div>
          <span>GEO Studio</span>
        </a>
        <span className="hidden sm:inline-block text-xs font-medium text-slate-400 font-mono">
          / Enterprise
        </span>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('beginner')}
          className={`transition-colors hover:text-slate-900 flex items-center gap-1 cursor-pointer ${
            activeTab === 'beginner' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          <span>新手向导</span>
        </button>
        <button
          onClick={() => setActiveTab('multiplatform')}
          className={`transition-colors hover:text-slate-900 flex items-center gap-1 cursor-pointer ${
            activeTab === 'multiplatform' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          <span>全网多平台作战</span>
          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-1 rounded font-semibold">实战中枢</span>
        </button>
        <button
          onClick={() => setActiveTab('clinic')}
          className={`transition-colors hover:text-slate-900 cursor-pointer ${
            activeTab === 'clinic' ? 'text-slate-900 font-semibold' : ''
          }`}
        >
          文案诊所
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`transition-colors hover:text-slate-900 cursor-pointer ${
            activeTab === 'overview' ? 'text-slate-900 font-semibold' : ''
          }`}
        >
          总览大盘
        </button>
        <button
          onClick={() => setActiveTab('probe')}
          className={`transition-colors hover:text-slate-900 cursor-pointer ${
            activeTab === 'probe' ? 'text-slate-900 font-semibold' : ''
          }`}
        >
          实机探测
        </button>
        <button
          onClick={() => setActiveTab('optimizer')}
          className={`transition-colors hover:text-slate-900 cursor-pointer ${
            activeTab === 'optimizer' ? 'text-slate-900 font-semibold' : ''
          }`}
        >
          内容强化
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`transition-colors hover:text-slate-900 cursor-pointer ${
            activeTab === 'integrations' ? 'text-slate-900 font-semibold' : ''
          }`}
        >
          预留接口
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveTab('integrations')}
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors cursor-pointer"
          title="点击查看 AI 引擎状态、切换 Provider 与本地运行配置"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>AI 引擎就绪</span>
        </button>
        <button
          onClick={onNewProbe}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>实机探测</span>
        </button>
      </div>
    </header>
  );
};
