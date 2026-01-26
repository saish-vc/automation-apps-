
export enum AutomationCategory {
  WEB_SCRAPING = 'Web Scraping',
  SOCIAL_MEDIA = 'Social Media',
  FILE_MANAGEMENT = 'File Management',
  DATA_ANALYSIS = 'Data Analysis',
  SYSTEM_UTILITY = 'System Utility',
  CUSTOM = 'Custom'
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

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: AutomationCategory;
  icon: string;
}
