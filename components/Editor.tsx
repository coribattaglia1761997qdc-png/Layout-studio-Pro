
import React, { useRef } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onChange(content);
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Markdown Input</span>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] bg-white border border-slate-300 px-2 py-1 rounded hover:bg-slate-100 transition-colors text-slate-600 font-medium"
          >
            Import .md/.txt
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".md,.txt,.markdown" 
            className="hidden" 
          />
        </div>
        <div className="flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
        </div>
      </div>
      <textarea
        className="flex-1 p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed text-slate-700 bg-slate-50/30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing or import a file..."
      />
    </div>
  );
};

export default Editor;
