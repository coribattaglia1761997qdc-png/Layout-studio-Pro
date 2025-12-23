
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  // Use useMemo to prevent unnecessary re-renders of the markdown parser
  const markdownView = useMemo(() => {
    return (
      <div className="typography-target prose max-w-none text-slate-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }, [content]);

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden overflow-y-auto">
      <div className="sticky top-0 bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between z-10">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Formatted Preview (Times New Roman + SimSun)</span>
        <div className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            Professional Typography Active
        </div>
      </div>
      <div className="p-8 md:p-12 h-full">
        {content.trim() ? (
          markdownView
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Start typing on the left to see the magic...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
