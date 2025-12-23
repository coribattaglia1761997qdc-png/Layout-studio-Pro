
export type TemplateId = 'academic' | 'digital';
export type DigitalStyleId = 'retro' | 'modern_sci' | 'diary';

export interface PaperData {
  title: string;
  authors: string[];
  affiliations: string[];
  email: string;
  abstract: string;
  keywords: string;
  enTitle: string;
  enAuthors: string[];
  enAffiliations: string[];
  enAbstract: string;
  enKeywords: string;
  body: string;
  references: string[];
}
