import React, { useState } from 'react';
import { TabType } from './types/geo';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BeginnerGuideTab } from './components/beginner/BeginnerGuideTab';
import { MultiPlatformHubTab } from './components/campaign/MultiPlatformHubTab';
import { PracticeClinicTab } from './components/sandbox/PracticeClinicTab';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { LiveProbeTab } from './components/probe/LiveProbeTab';
import { ContentOptimizerTab } from './components/optimizer/ContentOptimizerTab';
import { LlmsTxtTab } from './components/llmstxt/LlmsTxtTab';
import { EntitySchemaTab } from './components/entity/EntitySchemaTab';
import { PromptMatrixTab } from './components/matrix/PromptMatrixTab';
import { PlaybookTab } from './components/playbook/PlaybookTab';
import { IntegrationsTab } from './components/integrations/IntegrationsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beginner');
  const [probeQuery, setProbeQuery] = useState('2025年最推荐的企业级低代码平台有哪些？各自优缺点对比');
  const [probeBrand, setProbeBrand] = useState('网易数帆');

  const handleExecuteProbe = (query: string, brand: string) => {
    setProbeQuery(query);
    setProbeBrand(brand);
    setActiveTab('probe');
  };

  const handleNewProbe = () => {
    setActiveTab('probe');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewProbe={handleNewProbe} 
      />

      {/* Main Workspace with Sidebar + Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'beginner' && (
              <BeginnerGuideTab 
                setActiveTab={setActiveTab} 
                onExecuteProbe={handleExecuteProbe} 
              />
            )}

            {activeTab === 'multiplatform' && (
              <MultiPlatformHubTab 
                setActiveTab={setActiveTab} 
                onExecuteProbe={handleExecuteProbe} 
              />
            )}

            {activeTab === 'clinic' && (
              <PracticeClinicTab />
            )}

            {activeTab === 'overview' && (
              <OverviewTab 
                setActiveTab={setActiveTab} 
                onExecuteProbe={handleExecuteProbe} 
              />
            )}

            {activeTab === 'probe' && (
              <LiveProbeTab 
                key={`${probeQuery}-${probeBrand}`}
                initialQuery={probeQuery}
                initialBrand={probeBrand}
              />
            )}

            {activeTab === 'optimizer' && (
              <ContentOptimizerTab />
            )}

            {activeTab === 'llmstxt' && (
              <LlmsTxtTab />
            )}

            {activeTab === 'schema' && (
              <EntitySchemaTab />
            )}

            {activeTab === 'matrix' && (
              <PromptMatrixTab 
                onExecuteProbe={handleExecuteProbe}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'playbook' && (
              <PlaybookTab />
            )}

            {activeTab === 'integrations' && (
              <IntegrationsTab />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

