
import React from 'react';
import { AutomationCategory, AutomationTemplate } from './types';

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  {
    id: 'price-tracker',
    name: 'E-commerce Price Tracker',
    description: 'Monitor prices across multiple sites and get notified of drops.',
    category: AutomationCategory.WEB_SCRAPING,
    icon: '📊'
  },
  {
    id: 'auto-poster',
    name: 'Social Media Auto-Poster',
    description: 'Schedule and post content across Twitter, LinkedIn, and Instagram.',
    category: AutomationCategory.SOCIAL_MEDIA,
    icon: '📱'
  },
  {
    id: 'file-organizer',
    name: 'Smart File Organizer',
    description: 'Automatically sort downloads and documents based on file content.',
    category: AutomationCategory.FILE_MANAGEMENT,
    icon: '📁'
  },
  {
    id: 'report-gen',
    name: 'Automated PDF Reporter',
    description: 'Generate professional business reports from CSV or Excel data.',
    category: AutomationCategory.DATA_ANALYSIS,
    icon: '📝'
  }
];
