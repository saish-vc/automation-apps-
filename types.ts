
export enum AutomationCategory {
  WEB_SCRAPING = 'Web Scraping',
  SOCIAL_MEDIA = 'Social Media',
  FILE_MANAGEMENT = 'File Management',
  DATA_ANALYSIS = 'Data Analysis',
  SYSTEM_UTILITY = 'System Utility',
  CUSTOM = 'Custom',
  HTTP = 'HTTP Request',
  DATABASE = 'Database',
  EMAIL = 'Email'
}

export interface GeneratedSystem {
  title: string;
  description: string;
  category: AutomationCategory;
  dependencies: string[];
  pythonCode: string;
  setupInstructions: string;
  deploymentGuide: string;
}

export interface WorkflowNodeData {
  label: string;
  category: AutomationCategory;
  config: Record<string, any>;
  status: 'ready' | 'running' | 'success' | 'failed';
}

export interface AppState {
  activeTab: 'dashboard' | 'workflows' | 'history' | 'analytics' | 'settings';
  isDarkMode: boolean;
  workflows: any[];
  stats: {
    total: number;
    success: number;
    failed: number;
    avgRuntime: string;
  };
}
