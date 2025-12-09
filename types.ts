export interface NavItem {
  label: string;
  href: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  result: string;
  metric: string;
}

export interface TechItem {
  category: string;
  tools: string[];
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: Date;
}
