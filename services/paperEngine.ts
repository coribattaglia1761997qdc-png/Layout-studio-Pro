
import { PaperData } from '../types';

export const parseMarkdownToPaper = (text: string): PaperData => {
  const lines = text.split('\n');
  const paper: PaperData = {
    title: '', authors: [], affiliations: [], email: '',
    abstract: '', keywords: '', enTitle: '', enAuthors: [],
    enAffiliations: [], enAbstract: '', enKeywords: '',
    body: '', references: []
  };

  let section: 'meta' | 'abstract' | 'body' | 'refs' = 'meta';
  let bodyLines: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Detect section transitions
    if (trimmed.startsWith('# ')) {
      const h1Text = trimmed.replace('# ', '');
      // If we already have a title and this is late in the document, it's a body header
      if (paper.title && section !== 'meta') {
        bodyLines.push(line);
      } else {
        paper.title = h1Text;
      }
    } else if (trimmed.startsWith('摘要：')) {
      paper.abstract = trimmed.replace('摘要：', '').trim();
    } else if (trimmed.startsWith('Abstract:')) {
      paper.enAbstract = trimmed.replace('Abstract:', '').trim();
    } else if (trimmed.startsWith('关键词：')) {
      paper.keywords = trimmed.replace('关键词：', '').trim();
    } else if (trimmed.startsWith('Key words:')) {
      paper.enKeywords = trimmed.replace('Key words:', '').trim();
    } else if (trimmed.toLowerCase().startsWith('references') || trimmed === '参考文献') {
      section = 'refs';
    } else if (trimmed.startsWith('---') && section === 'meta') {
      section = 'body';
    } else {
      if (section === 'meta') {
          // Meta logic: title -> authors -> affiliations -> email -> enTitle
          if (!paper.title) paper.title = trimmed;
          else if (trimmed.includes('@')) paper.email = trimmed;
          else if (/[a-zA-Z]/.test(trimmed) && trimmed.length > 15 && !paper.enTitle) {
              paper.enTitle = trimmed;
              section = 'body'; // Move to body after English Title usually
          }
          else if (paper.authors.length === 0) paper.authors.push(trimmed);
          else paper.affiliations.push(trimmed);
      } else if (section === 'body') {
          // If we see something that looks like the start of standard sections, jump sections
          if (trimmed.startsWith('摘要：') || trimmed.startsWith('Abstract:')) {
             // Already handled by prefix checks above
          } else {
            bodyLines.push(line);
          }
      } else if (section === 'refs') {
          paper.references.push(trimmed);
      }
    }
  });

  paper.body = bodyLines.join('\n');
  return paper;
};
