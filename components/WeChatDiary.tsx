
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface WeChatDiaryProps {
  content: string;
  title: string;
  headerLabel?: string;
  subHeader?: string;
  footerText?: string;
}

const WeChatDiary: React.FC<WeChatDiaryProps> = ({ content, title, headerLabel = "LIFE LOG", subHeader, footerText }) => {
  return (
    <div id="wechat-capture" className="max-w-[600px] mx-auto min-h-screen bg-[#fdfaf5] p-6 md:p-8 font-sans text-[#5c4033] relative overflow-hidden" 
         style={{ 
             fontFamily: '"Comic Sans MS", "Chalkboard SE", "Hannotate SC", "YouYuan", cursive, sans-serif',
             backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
             backgroundSize: '20px 20px'
         }}>
      
      {/* Tape Effect Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#f3e5ab] opacity-60 rotate-[-2deg] shadow-sm backdrop-blur-sm" style={{ clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)' }}></div>

      {/* Header Area */}
      <header className="mt-8 mb-10 text-center relative z-10">
        <div className="inline-block border-2 border-[#5c4033] rounded-[2rem] px-6 py-2 bg-white shadow-[4px_4px_0px_#5c4033] transform rotate-[-1deg] mb-6">
           <span className="text-sm font-bold tracking-widest uppercase text-[#8a6d3b]">{headerLabel}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 relative inline-block z-10">
            {title}
            {/* Highlighter Effect */}
            <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#fff07c] -z-10 opacity-70 rounded-sm transform -rotate-1 skew-x-12"></span>
        </h1>
        
        <div className="mt-4 flex justify-center items-center space-x-2 text-[#8d7b68] text-sm">
           <span>📅</span>
           <span className="italic">{subHeader || "My Daily Journal"}</span>
        </div>
      </header>

      {/* Body */}
      <div className="diary-body text-[17px] leading-[1.8]">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            // Headings
            h1: ({node, children}) => (
              <div className="mt-10 mb-6 text-center">
                 <h2 className="text-2xl font-bold text-[#5c4033] border-b-2 border-dashed border-[#d4c5a3] inline-block pb-1">{children}</h2>
              </div>
            ),
            h2: ({node, children}) => (
              <h3 className="text-xl font-bold mt-8 mb-4 text-[#6b4c35] flex items-center">
                <span className="mr-2 text-xl">✨</span> {children}
              </h3>
            ),
            h3: ({node, children}) => (
              <h4 className="text-lg font-bold mt-6 mb-3 text-[#8a6d3b] bg-[#fcf4d9] inline-block px-2 rounded transform -rotate-1">
                {children}
              </h4>
            ),
            
            // "Sticky Note" Blockquote
            blockquote: ({node, children}) => (
              <div className="my-8 mx-2 p-6 bg-[#fff9c4] text-[#6d4c41] shadow-[2px_2px_5px_rgba(0,0,0,0.05)] transform rotate-1 rounded-bl-[20px]">
                <div className="w-8 h-8 absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e6ee9c] opacity-50 rounded-full"></div>
                <blockquote className="italic relative font-medium">
                  "{children}"
                </blockquote>
              </div>
            ),
            
            // Lists: Hand-drawn look
            ul: ({node, children}) => <ul className="my-6 space-y-2 ml-4">{children}</ul>,
            ol: ({node, children}) => <ol className="my-6 space-y-2 ml-4">{children}</ol>,
            li: ({node, children, ordered, index}: any) => (
              <li className="flex items-start mb-2">
                <span className="mr-3 font-bold text-[#bcaaa4] mt-1">{ordered ? `${index + 1}.` : '●'}</span>
                <span className="flex-1">{children}</span>
              </li>
            ),

            // Code: Simple notebook style
            pre: ({node, children}) => <>{children}</>,
            code: ({node, className, children}) => {
              const match = /language-(\w+)/.exec(className || '');
              return !match 
                ? <code className="bg-[#eee] px-2 py-0.5 rounded-md text-[#d84315] font-bold text-[90%] mx-1 font-mono">{children}</code>
                : (
                  <div className="my-6 bg-[#2d2d2d] rounded-xl p-4 shadow-lg border-2 border-[#5c4033] transform rotate-[0.5deg]">
                    <pre className="overflow-x-auto font-mono text-sm text-[#f0f0f0] leading-relaxed">
                      <code>{children}</code>
                    </pre>
                  </div>
                )
            },

            // Tables: Hand-drawn grid
            table: ({node, children}) => (
              <div className="my-8 overflow-x-auto p-2 bg-white border-2 border-[#5c4033] rounded-lg shadow-[4px_4px_0px_#ebdcb2]">
                <table className="w-full text-sm text-left">{children}</table>
              </div>
            ),
            thead: ({children}) => <thead className="bg-[#fcf4d9] border-b-2 border-[#5c4033] text-[#5c4033]">{children}</thead>,
            tbody: ({children}) => <tbody>{children}</tbody>,
            tr: ({children}) => <tr className="border-b border-dashed border-[#d4c5a3] last:border-0">{children}</tr>,
            th: ({children}) => <th className="px-4 py-2 font-bold">{children}</th>,
            td: ({children}) => <td className="px-4 py-2 border-r border-dashed border-[#d4c5a3] last:border-0">{children}</td>,

            // Paragraphs & Separators
            p: ({node, children}) => <p className="mb-6">{children}</p>,
            hr: ({node}) => <hr className="my-10 border-t-4 border-dotted border-[#d7ccc8] w-2/3 mx-auto" />,
            
            // Images: Polaroid Style
            img: ({node, src, alt}: any) => (
                <div className="my-8 p-3 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] transform rotate-1 transition-transform hover:rotate-0 inline-block w-full rounded-sm">
                    <img src={src} alt={alt} className="w-full h-auto bg-[#f0f0f0] block mb-3" />
                    {alt && <div className="text-center font-handwriting text-[#8d7b68] text-sm italic pb-1">{alt}</div>}
                </div>
            ),

            // Links: Marker underline
            a: ({node, href, children}) => (
              <a href={href} className="text-[#bf360c] font-bold no-underline border-b-2 border-[#ffcc80] hover:bg-[#ffcc80] transition-colors rounded-sm px-1">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-6 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-[#d7ccc8]"></div>
          <div className="inline-block bg-[#fdfaf5] px-4 relative -top-3">
              <span className="text-2xl">🌱</span>
          </div>
          <div className="text-xs text-[#8d7b68] font-bold uppercase tracking-widest mt-2">
            {footerText}
          </div>
      </footer>

    </div>
  );
};

export default WeChatDiary;
