
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { PaperData } from '../types';

interface A4PreviewProps {
  data: PaperData;
}

const A4Preview: React.FC<A4PreviewProps> = ({ data }) => {
  return (
    <div className="relative">
      <div id="paper-capture" className="a4-page font-song text-5 leading-[1.6] bg-white text-slate-900">
        {/* Chinese Title */}
        <div className="mt-[16pt] mb-4 text-center">
          <h1 className="text-3 font-hei font-bold">{data.title}</h1>
        </div>

        {/* Authors & Meta */}
        <div className="text-center text-s4 mb-2">{data.authors.join(' ')}</div>
        <div className="text-center text-5 mb-1">{data.affiliations.join(', ')}</div>
        <div className="text-center text-5 font-times mb-6">{data.email}</div>

        {/* Abstract */}
        <div className="text-s5 mb-2 leading-tight">
          <span className="font-hei font-bold">摘要：</span>{data.abstract}
        </div>
        <div className="text-s5 mb-8 leading-tight">
          <span className="font-hei font-bold">关键词：</span>{data.keywords}
        </div>

        {/* English Title (Optional Rendering) */}
        {data.enTitle && (
          <div className="text-center mb-6">
            <h2 className="text-3 font-times font-bold">{data.enTitle}</h2>
          </div>
        )}

        {/* Body Content with Math & SCI Table Styles */}
        <div className="prose prose-sm max-w-none text-justify custom-body-render academic-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              h1: ({node, children}) => <h3 className="text-s4 font-hei font-bold mt-8 mb-4">{children}</h3>,
              h2: ({node, children}) => <h4 className="text-5 font-hei font-bold mt-4 mb-2">{children}</h4>,
              p: ({node, children}) => <p className="mb-4 indent-8 text-justify">{children}</p>,
              table: ({node, children}) => (
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse text-5 sci-table">{children}</table>
                </div>
              ),
              thead: ({children}) => <thead className="border-y-2 border-slate-900">{children}</thead>,
              tbody: ({children}) => <tbody className="border-b-2 border-slate-900">{children}</tbody>,
              tr: ({children}) => <tr className="border-b border-slate-300 last:border-0">{children}</tr>,
              th: ({children}) => <th className="p-2 text-center font-bold">{children}</th>,
              td: ({children}) => <td className="p-2 text-center">{children}</td>,
            }}
          >
            {data.body}
          </ReactMarkdown>
        </div>

        {/* References */}
        {data.references.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-s4 font-hei font-bold mb-4">参考文献</h2>
            <div className="text-5 space-y-1">
              {data.references.map((ref, idx) => (
                <div key={idx} className="flex">
                  <span className="min-w-[2.5rem]">{ref.trim().startsWith('[') ? '' : `[${idx+1}] `}</span>
                  <span className="flex-1">{ref}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Visual Indicator for Table Styles */}
      <style>{`
        .sci-table thead { border-top: 1.5pt solid black; border-bottom: 0.75pt solid black; }
        .sci-table tbody { border-bottom: 1.5pt solid black; }
        .sci-table tr { border: none !important; }
        .academic-body table { margin-left: auto; margin-right: auto; }
      `}</style>
    </div>
  );
};

export default A4Preview;
