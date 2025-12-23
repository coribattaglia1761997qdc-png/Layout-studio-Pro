
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface WeChatModernProps {
  content: string;
  title: string;
  headerLabel?: string;
  subHeader?: string;
  footerText?: string;
}

const WeChatModern: React.FC<WeChatModernProps> = ({ content, title, headerLabel = "LINEAR", subHeader = "Minimalist Design System", footerText }) => {
  return (
    <div id="wechat-capture" className="max-w-[650px] mx-auto min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      
      {/* Card Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Header */}
        <header className="p-8 md:p-12 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-6">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-widest border border-slate-200">
              {headerLabel}
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              // {subHeader}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
            {title}
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500/80 to-transparent rounded-full opacity-80"></div>
        </header>

        {/* Body */}
        <div className="p-8 md:p-12 linear-body text-[16px] leading-[1.8] text-slate-700">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Headings: Typography based hierarchy with Gradient Underline
              h1: ({node, children}) => (
                <div className="mt-12 mb-6 group">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                    {children}
                  </h2>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-transparent mt-3 rounded-full opacity-40 group-hover:w-20 transition-all duration-500"></div>
                </div>
              ),
              h2: ({node, children}) => (
                <div className="mt-10 mb-5">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {children}
                  </h3>
                  <div className="h-1 w-8 bg-gradient-to-r from-slate-300 to-transparent mt-2 rounded-full opacity-50"></div>
                </div>
              ),
              h3: ({node, children}) => (
                <h4 className="text-lg font-bold mt-8 mb-3 text-slate-900">
                  {children}
                </h4>
              ),
              
              // Components: "Product Interface" look
              blockquote: ({node, children}) => (
                <div className="my-8 bg-slate-50 border border-slate-200 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-200"></div>
                  <blockquote className="text-slate-600 text-[15px] italic leading-relaxed pl-2">
                    {children}
                  </blockquote>
                </div>
              ),
              
              // Lists: Clean, rhythmic, badge-style for ordered
              ul: ({node, children}) => <ul className="my-6 space-y-3">{children}</ul>,
              ol: ({node, children}) => <ol className="my-6 space-y-3">{children}</ol>,
              li: ({node, children, ordered, index}: any) => (
                <li className="flex items-start gap-3">
                  {ordered ? (
                     <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-[4px] bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 mt-1.5 shadow-sm select-none">
                       {index + 1}
                     </span>
                  ) : (
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 ml-1 opacity-60 shadow-sm" />
                  )}
                  <div className="flex-1 pt-0.5">{children}</div>
                </li>
              ),

              // Code: Unified container style
              pre: ({node, children}) => <>{children}</>,
              code: ({node, className, children}) => {
                const match = /language-(\w+)/.exec(className || '');
                return !match 
                  ? <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[13px] font-medium text-slate-800 font-mono align-middle mx-0.5">{children}</code>
                  : (
                    <div className="my-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200">
                        <div className="flex space-x-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{match?.[1] || 'CODE'}</span>
                      </div>
                      <pre className="p-5 overflow-x-auto font-mono text-[13px] text-slate-600 leading-relaxed bg-slate-50/50">
                        <code>{children}</code>
                      </pre>
                    </div>
                  )
              },

              // Tables: Strictly Rounded Corners
              table: ({node, children}) => (
                <div className="my-8 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-sm text-left border-collapse">{children}</table>
                </div>
              ),
              thead: ({children}) => <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">{children}</thead>,
              tbody: ({children}) => <tbody className="bg-white divide-y divide-slate-100">{children}</tbody>,
              tr: ({children}) => <tr className="hover:bg-slate-50/50 transition-colors">{children}</tr>,
              th: ({children}) => <th className="px-4 py-3 font-semibold whitespace-nowrap text-xs uppercase tracking-wider text-slate-500">{children}</th>,
              td: ({children}) => <td className="px-4 py-3 text-slate-600">{children}</td>,

              // Paragraphs & Separators
              p: ({node, children}) => <p className="mb-6 last:mb-0">{children}</p>,
              hr: ({node}) => <hr className="my-10 border-slate-100" />,
              
              // Links: Blue accent
              a: ({node, href, children}) => (
                <a href={href} className="text-blue-600 font-medium hover:text-blue-700 underline decoration-blue-200 underline-offset-4 decoration-1 transition-all hover:decoration-blue-400">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="px-8 md:px-12 py-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest gap-2">
          <span>{footerText || "Designed by Linear System"}</span>
          <span className="opacity-50 font-mono">Build v2.0</span>
        </footer>

      </div>
      
      {/* Global Style Overrides for this component */}
      <style>{`
        .linear-body p > img {
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default WeChatModern;
