
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface WeChatPreviewProps {
  content: string;
  title: string;
  headerLabel?: string;
  subHeader?: string;
  footerText?: string;
}

const WeChatPreview: React.FC<WeChatPreviewProps> = ({ content, title, headerLabel = "ARTICLE", subHeader = "Classical Aesthetic Collection", footerText }) => {
  return (
    <div id="wechat-capture" className="max-w-[600px] mx-auto bg-[#fdfaf2] min-h-screen p-6 md:p-10 shadow-lg border border-[#e8dfc4] text-[#3e3121] font-song">
      <header className="text-center mb-12 py-8 border-b-2 border-double border-[#d4c5a3]">
        <div className="text-[12px] uppercase tracking-[4px] text-[#9a845a] mb-2">— {headerLabel} —</div>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4 px-4">{title}</h1>
        <div className="w-12 h-[1px] bg-[#d4c5a3] mx-auto mb-4"></div>
        <div className="text-[14px] italic text-[#7a6a4d]">{subHeader}</div>
      </header>

      <div className="wechat-retro-body text-[16px] leading-[1.8] tracking-wider text-justify">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({node, children}) => (
              <div className="my-10 text-center">
                <span className="inline-block px-6 py-2 border-y border-[#d4c5a3] text-xl font-bold relative">
                   <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#d4c5a3]">⬥</span>
                   {children}
                   <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4c5a3]">⬥</span>
                </span>
              </div>
            ),
            h2: ({node, children}) => (
              <h2 className="text-lg font-bold mt-10 mb-6 flex items-center space-x-2 border-l-4 border-[#9a845a] pl-4">
                {children}
              </h2>
            ),
            h3: ({node, children}) => (
              <h3 className="text-md font-bold mt-8 mb-4 text-[#7a6a4d] border-b border-[#e8dfc4] pb-1">
                {children}
              </h3>
            ),
            p: ({node, children}) => <p className="mb-6 leading-relaxed">{children}</p>,
            blockquote: ({node, children}) => (
              <blockquote className="my-8 p-6 bg-[#f7f1e3] border-l-0 border-t border-b border-[#d4c5a3] italic text-[#6a5a3d]">
                {children}
              </blockquote>
            ),
            ul: ({node, children}) => <ul className="list-none mb-6 pl-2">{children}</ul>,
            ol: ({node, children}) => <ol className="list-none mb-6 pl-2 space-y-2">{children}</ol>,
            li: ({node, children, index, ordered}: any) => (
              <li className="flex items-baseline mb-3">
                <span 
                  className="mr-3 flex-shrink-0 text-[#9a845a] select-none" 
                  style={{ 
                    fontFamily: '"Times New Roman", serif', 
                    fontStyle: 'italic', 
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    lineHeight: '1'
                  }}
                >
                  {ordered ? `${(index || 0) + 1}.` : '❧'}
                </span>
                <div className="flex-1">{children}</div>
              </li>
            ),
            table: ({node, children}) => (
              <div className="my-8 overflow-x-auto bg-[#fcf8f0] p-1 rounded-sm">
                <table className="w-full border-collapse text-sm">{children}</table>
              </div>
            ),
            th: ({children}) => <th className="p-3 bg-[#f0e6d2] border border-[#d4c5a3] text-[#7a6a4d] font-bold">{children}</th>,
            td: ({children}) => <td className="p-3 border border-[#d4c5a3] text-center">{children}</td>,
            pre: ({node, children}) => <>{children}</>,
            code: ({node, className, children}) => {
              const match = /language-(\w+)/.exec(className || '');
              return !match 
                ? <code className="bg-[#f0e6d2] px-1 rounded text-[#8a2a2a] font-mono text-[14px]">{children}</code>
                : <pre className="bg-[#f7f1e3] p-4 rounded-lg overflow-x-auto border border-[#d4c5a3] my-6 font-mono text-[13px] text-[#5a4a3a]"><code>{children}</code></pre>
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-dashed border-[#d4c5a3] text-center text-[12px] text-[#9a845a] tracking-widest uppercase">
        {footerText || "End of Transmission • 精致学术排版"}
      </footer>
    </div>
  );
};

export default WeChatPreview;
