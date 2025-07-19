
import type React from 'react';

export interface ResearchField {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Keyword {
  keyword: string;
  description: string;
  score: number;
}

export interface Paper {
  title: string;
  authors: string[];
  summary: string;
  url?: string;
  sourceTitle?: string;
}

export interface Idea {
  title: string;
  keywords: string[];
  outline: string;
}
