
import React, { useState, useMemo } from 'react';
import Editor from './components/Editor';
import A4Preview from './components/A4Preview';
import WeChatPreview from './components/WeChatPreview';
import WeChatModern from './components/WeChatModern';
import WeChatDiary from './components/WeChatDiary';
import { parseMarkdownToPaper } from './services/paperEngine';
import { exportToDocx, exportToImage, exportToPdf, copyToWeChat } from './services/exportService';
import { TemplateId, DigitalStyleId } from './types';

const App: React.FC = () => {
  const [template, setTemplate] = useState<TemplateId>('academic');
  const [digitalStyle, setDigitalStyle] = useState<DigitalStyleId>('retro');
  
  // New: Digital Header/Footer Controls
  const [digitalHeader, setDigitalHeader] = useState('ARTICLE');
  const [digitalSubHeader, setDigitalSubHeader] = useState('Classical Aesthetic Collection');
  const [digitalTitleOverride, setDigitalTitleOverride] = useState(''); // New: Manual Title Control
  const [digitalFooter, setDigitalFooter] = useState('End of Transmission • 精致学术排版');

  const handleStyleChange = (style: DigitalStyleId) => {
    setDigitalStyle(style);
    // Auto-switch defaults for better UX
    if (style === 'retro') {
      setDigitalHeader('ARTICLE');
      setDigitalSubHeader('Classical Aesthetic Collection');
      setDigitalFooter('End of Transmission • 精致学术排版');
    } else if (style === 'modern_sci') {
      setDigitalHeader('LINEAR');
      setDigitalSubHeader('Minimalist Design System');
      setDigitalFooter('Designed by Linear System');
    } else if (style === 'diary') {
      setDigitalHeader('LIFE LOG');
      setDigitalSubHeader(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      setDigitalFooter('Written with ❤️');
    }
  };

  const [academicMarkdown, setAcademicMarkdown] = useState<string>(`# 数字化背景下学术期刊排版研究

王晓东 | 某大学新闻学院

摘要：本文分析了在全媒体时代学术期刊排版系统的演变。通过公式 $E=mc^2$ 描述信息能量转化。

关键词：排版系统；自动化；学术传播

---

# 1. 引言
学术排版是科学研究成果呈现的第一道门槛。

## 1.1 三线表渲染示例
| 项目 | 观测值 | 误差 | 备注 |
| :--- | :---: | :---: | :--- |
| 实验 A | 12.5 | 0.02 | 稳定 |
| 实验 B | 18.2 | 0.05 | 波动 |
| 实验 C | 14.1 | 0.01 | 极佳 |

## 1.2 数学公式支持
这里是一个复杂的行间公式：
$$
\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho \\mathbf{u}) = 0
$$

# 2. 排版指南
为获得最佳效果，请遵循以下结构：
1. **标题 (H1)**: 文章主标题
2. **作者信息**: 使用 \`|\` 分隔姓名与机构
3. **摘要/关键词**: 必须包含 \`摘要：\` 和 \`关键词：\` 前缀
4. **分割线**: 使用 \`---\` 进入正文
5. **引用**: 使用 \`> \` 进行重点标注
`);

  const [digitalMarkdown, setDigitalMarkdown] = useState<string>(`# 周末的一场雨

> 有时候，发呆也是一种休息。

今天去了一家很棒的咖啡馆 ☕️。

### 1. 观察记录
坐在窗边看着雨滴落下，感觉时间都变慢了。
* 咖啡很香
* 音乐是 Jazz Hip-hop
* 猫咪在睡觉 🐈

### 2. 随手记
$$
Happiness = \\frac{Reality}{Expectation}
$$

### 今日歌单
| 歌曲 | 歌手 | 心情 |
| :--- | :--- | :--- |
| Lemon | 米津玄师 | 怀念 |
| Summer | 久石让 | 清新 |

![Photo](https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)
`);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const activeMarkdown = template === 'academic' ? academicMarkdown : digitalMarkdown;
  const setMarkdown = template === 'academic' ? setAcademicMarkdown : setDigitalMarkdown;

  // Academic Data Parsing
  const paperData = useMemo(() => parseMarkdownToPaper(academicMarkdown), [academicMarkdown]);

  // Digital Title Parsing (Independent of Academic Data)
  const derivedDigitalTitle = useMemo(() => {
    const match = digitalMarkdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : "无标题";
  }, [digitalMarkdown]);

  // Final Digital Title: Override takes precedence, then derived from MD
  const displayDigitalTitle = digitalTitleOverride || derivedDigitalTitle;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans relative">
      
      <aside className={`
        no-print fixed inset-y-0 left-0 z-50 w-64 lg:w-80 bg-white border-r border-slate-200 flex flex-col shadow-xl transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:relative lg:flex-shrink-0
      `}>
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Layout Studio</h1>
            <p className="text-[10px] opacity-60 mt-1 uppercase tracking-widest font-semibold">Scientific & Digital Hub</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Mode</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { setTemplate('academic'); setIsSidebarOpen(false); }}
                className={`p-2 text-xs rounded border transition-all ${template === 'academic' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400'}`}
              >
                📜 论文 A4
              </button>
              <button 
                onClick={() => { setTemplate('digital'); setIsSidebarOpen(false); }}
                className={`p-2 text-xs rounded border transition-all ${template === 'digital' ? 'bg-amber-700 border-amber-700 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400'}`}
              >
                📱 社交分享
              </button>
            </div>
          </section>

          {template === 'digital' && (
            <section className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
              <div>
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Digital Style</h2>
                <div className="space-y-2">
                  <button onClick={() => handleStyleChange('retro')} className={`w-full p-2 text-left text-xs rounded border transition-all ${digitalStyle === 'retro' ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-slate-200 text-slate-600'}`}> lantern 复古典雅风格 </button>
                  <button onClick={() => handleStyleChange('modern_sci')} className={`w-full p-2 text-left text-xs rounded border transition-all ${digitalStyle === 'modern_sci' ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-white border-slate-200 text-slate-600'}`}> linear 极简线性风格 </button>
                  <button onClick={() => handleStyleChange('diary')} className={`w-full p-2 text-left text-xs rounded border transition-all ${digitalStyle === 'diary' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}> 📔 casual 休闲手札风格 </button>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Header Control</h2>
                <div className="space-y-3">
                  <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 uppercase font-semibold">Main Title (Override)</label>
                      <input 
                        value={digitalTitleOverride} 
                        onChange={e => setDigitalTitleOverride(e.target.value)} 
                        placeholder={derivedDigitalTitle}
                        className="w-full p-2 text-xs border border-slate-200 rounded outline-none focus:border-indigo-500 placeholder:text-slate-300" 
                      />
                      <p className="text-[9px] text-slate-400">Leave empty to use Markdown H1 (# Title)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 uppercase font-semibold">Top Label</label>
                        <input value={digitalHeader} onChange={e => setDigitalHeader(e.target.value)} className="w-full p-2 text-xs border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 uppercase font-semibold">Sub Label</label>
                        <input value={digitalSubHeader} onChange={e => setDigitalSubHeader(e.target.value)} className="w-full p-2 text-xs border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Footer Settings</h2>
                <div className="space-y-1">
                    <input value={digitalFooter} onChange={e => setDigitalFooter(e.target.value)} placeholder="Footer text..." className="w-full p-2 text-xs border border-slate-200 rounded outline-none focus:border-indigo-500" />
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Publishing</h2>
            <div className="space-y-2">
              {template === 'academic' ? (
                <>
                  <button onClick={() => exportToDocx(paperData)} className="w-full p-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all">Download Word</button>
                  <button onClick={exportToPdf} className="w-full p-2.5 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all">Print PDF</button>
                </>
              ) : (
                <>
                  <button onClick={() => copyToWeChat('wechat-capture')} className="w-full p-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-all">📋 Copy HTML Format</button>
                  <button onClick={() => exportToImage('wechat-capture')} className="w-full p-2.5 bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all">Save as Image</button>
                </>
              )}
            </div>
          </section>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="lg:hidden no-print h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 z-40">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500 hover:bg-slate-100 rounded">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
           </button>
           <span className="font-bold text-slate-800">Layout Studio</span>
           <button onClick={() => setIsPreviewOpen(true)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
           </button>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <main className="no-print w-full lg:w-1/2 p-4 lg:p-6 overflow-hidden flex flex-col h-full">
            <Editor value={activeMarkdown} onChange={setMarkdown} />
          </main>

          <aside className={`
            fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] lg:w-1/2 bg-slate-200 border-l border-slate-200 shadow-2xl transition-transform duration-300
            ${isPreviewOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            lg:relative lg:block lg:shadow-none lg:p-6 lg:overflow-y-auto h-full
          `}>
            <div className="lg:hidden no-print h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
               <span className="font-bold text-slate-800">Preview</span>
               <button onClick={() => setIsPreviewOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>

            <div className="p-4 lg:p-0 overflow-y-auto h-[calc(100%-3.5rem)] lg:h-auto">
              <div className="min-w-fit md:min-w-0 flex justify-center">
                <div className="origin-top scale-[0.6] sm:scale-[0.85] lg:scale-100 transition-transform duration-300">
                  {template === 'academic' ? (
                    <A4Preview data={paperData} />
                  ) : (
                    digitalStyle === 'retro' ? (
                      <WeChatPreview 
                        content={digitalMarkdown} 
                        title={displayDigitalTitle} 
                        headerLabel={digitalHeader} 
                        subHeader={digitalSubHeader}
                        footerText={digitalFooter} 
                      />
                    ) : digitalStyle === 'modern_sci' ? (
                      <WeChatModern 
                        content={digitalMarkdown} 
                        title={displayDigitalTitle} 
                        headerLabel={digitalHeader} 
                        subHeader={digitalSubHeader}
                        footerText={digitalFooter} 
                      />
                    ) : (
                      <WeChatDiary
                        content={digitalMarkdown}
                        title={displayDigitalTitle}
                        headerLabel={digitalHeader}
                        subHeader={digitalSubHeader}
                        footerText={digitalFooter}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {(isSidebarOpen || isPreviewOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => { setIsSidebarOpen(false); setIsPreviewOpen(false); }}
        />
      )}
    </div>
  );
};

export default App;
