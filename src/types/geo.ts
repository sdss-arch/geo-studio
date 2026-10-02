export type TabType = 
  | 'beginner'     // 新手通关向导 (Zero to One Journey)
  | 'multiplatform' // 全平台阵地布控中枢 (Multi-Platform Campaign Hub) - NEW!
  | 'clinic'       // 边学边练诊所 (Practice Sandbox)
  | 'overview'     // GEO 总览大盘
  | 'probe'        // 实机搜索探测
  | 'optimizer'    // 普林斯顿内容强化
  | 'llmstxt'      // llms.txt 规范引擎
  | 'schema'       // 实体图谱与 Schema
  | 'matrix'       // 提问矩阵
  | 'playbook'     // 从浅入深方法论
  | 'integrations'; // 预留接口与企业集成

export type TargetPlatform = 'zhihu' | '36kr_g2' | 'csdn_dev' | 'baike' | 'media_case';

export interface PlatformAssetResponse {
  platform: TargetPlatform;
  platformName: string;
  title: string;
  content: string;
  submissionGuide: string;
  keyGeoSignals: string[];
  targetAudience: string;
  checklist: string[];
}

export interface PlatformCampaignTask {
  id: string;
  platform: TargetPlatform;
  platformName: string;
  status: 'PENDING' | 'GENERATED' | 'PUBLISHED' | 'INDEXED';
  title: string;
  publishedUrl?: string;
  priority: 'HIGH' | 'MEDIUM' | 'ESSENTIAL';
  weightInAI: string;
}


export interface GroundingChunk {
  title: string;
  uri: string;
  domain: string;
}

export interface CompetitorMention {
  name: string;
  mentioned: boolean;
  frequency: number;
}

export interface ProbeAnalysis {
  targetBrand: string;
  brandMentioned: boolean;
  brandPosition: 'TOP_RECOMMENDED' | 'MENTIONED_ALTERNATIVE' | 'ABSENT' | 'CRITICIZED';
  brandCitationsCount: number;
  competitorMentions: CompetitorMention[];
  totalSourcesCited: number;
  recommendations: string[];
}

export interface ProbeResponse {
  query: string;
  engineUsed?: 'gemini' | 'perplexity' | 'searchgpt' | 'claude' | 'deepseek' | string;
  generatedText: string;
  searchQueries: string[];
  groundingChunks: GroundingChunk[];
  domainBreakdown: Record<string, number>;
  analysis: ProbeAnalysis;
}

export interface GeoDiagnostic {
  dimension: string;
  status: 'critical' | 'warning' | 'good';
  issue: string;
  solution: string;
}

export interface ContentOptimizationResponse {
  scores: {
    overall: number;
    quoteSourcing: number;
    statisticsDensity: number;
    informationGain: number;
    entityAlignment: number;
    aiParseability: number;
  };
  diagnostics: GeoDiagnostic[];
  extractedEntities: string[];
  optimizedContent: string;
  jsonLdSchema: Record<string, any>;
  summaryOfChanges: string[];
}

export interface LlmsTxtResponse {
  llmsTxt: string;
  llmsFullTxt: string;
  robotsTxtRecommendation: string;
  auditReport: {
    tokenEfficiency: string;
    keyInformationCaptured: string[];
  };
}

export interface PromptMatrixItem {
  prompt: string;
  searchVolumeTier: 'High' | 'Medium' | 'Long-tail';
  aiInclusionDifficulty: 'Low' | 'Medium' | 'High';
  recommendedTactics: string[];
}

export interface PromptCluster {
  intentName: string;
  buyerStage: string;
  prompts: PromptMatrixItem[];
}

export interface PromptMatrixResponse {
  clusters: PromptCluster[];
  entityGraphRecommendations: string[];
}

export interface ClinicDiagnosisResponse {
  originalSentence: string;
  flawsDetected: {
    type: 'empty_adjective' | 'missing_number' | 'missing_entity' | 'passive_voice' | 'no_citation';
    label: string;
    description: string;
  }[];
  score: number;
  beforeVsAfter: {
    before: string;
    after: string;
    whyBetter: string;
  }[];
  rewrittenSentence: string;
  beginnerTip: string;
}

export interface SupportedProvider {
  id: string;
  name: string;
  type: string;
  status: 'CONNECTED' | 'STANDBY' | 'READY';
  description: string;
}

export interface EngineStatusResponse {
  activeProvider: string;
  providerDisplayName: string;
  isRealApiConnected: boolean;
  details: {
    hasGeminiKey: boolean;
    openaiBaseUrl: string;
    openaiModel: string;
    hasOpenaiKey: boolean;
    hasPerplexityKey: boolean;
  };
  supportedProviders: SupportedProvider[];
}

export interface CrawlerAuditResponse {
  targetUrl: string;
  domain: string;
  llmsTxtDetected: boolean;
  llmsTxtUrl?: string;
  llmsTxtContentSnippet?: string;
  robotsTxtDetected: boolean;
  aiBotsAllowed: {
    bot: string;
    allowed: boolean;
    statusNote: string;
  }[];
  overallReadiness: 'READY' | 'NEEDS_CONFIG' | 'BLOCKED';
  quickFixes: string[];
}

