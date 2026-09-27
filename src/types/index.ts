export type CategoryId =
  | 'all'
  | 'tech'
  | 'ai'
  | 'apps'
  | 'tutorials'
  | 'work-online'
  | 'tools'
  | 'tech-news'
  | 'troubleshooting'
  | 'iphone'
  | 'samsung'
  | 'windows'
  | 'screens'
  | 'network';

export type DifficultyLevel = 'سهل' | 'متوسط' | 'متقدم';

export interface GuideStep {
  title: string;
  detail: string;
  warning?: string;
  tip?: string;
  actionCode?: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  icon: string;
  date: string;
  readTime: number; // in minutes
  difficulty: DifficultyLevel;
  symptoms: string[];
  devicesAffected: string[];
  intro: string;
  steps: GuideStep[];
  practicalExamples?: string[];
  tips?: string[];
  conclusion?: string;
  faqs?: ArticleFAQ[];
  tip?: string;
  whenToSeekRepair: string;
  relatedIds?: string[];
  tags: string[];
  viewsCount?: number;
  featured?: boolean;
  startHere?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
  count?: number;
}

export interface DiagnosticOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface DiagnosticQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: DiagnosticOption[];
}

export type PageView =
  | 'home'
  | 'articles'
  | 'article-detail'
  | 'search'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'disclaimer'
  | 'terms';
