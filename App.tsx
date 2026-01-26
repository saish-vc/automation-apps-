import React, { useState, useEffect } from 'react';
import { AUTOMATION_TEMPLATES } from './constants';
import { AutomationCategory, GeneratedSystem } from './types';
import { generateAutomation } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [result, setResult] = useState<GeneratedSystem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'instructions'>('code');

  const handleGenerate = async (prompt: string, category?: AutomationCategory) => {
    setLoading(true);
    setError(null);
    try {
      const system = await generateAutomation(prompt, category || AutomationCategory.CUSTOM);
      setResult(system);
      setActiveTab('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-72 flex-shrink-0 glass border-r border-white/5 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/40">F</div>
            <h1 className="text-xl font-bold tracking-tight text-white">Forge <span className="font-light opacity-50 italic serif text-sm tracking-normal">Logic</span></h1>
          </div>
          
          <nav className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 mb-4 px-2">Operational Blueprints</p>
            {AUTOMATION_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleGenerate(tpl.description, tpl.category)}
                disabled={loading}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
              >
                <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{tpl.icon}</span>
                <span className="truncate">{tpl.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5 bg-white/[0.01]">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/10">
            <p className="text-xs font-semibold text-blue-400 mb-1">Architect Tier</p>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Production-ready kernels with automated integrity checks.</p>
          </div>
        </div>
      </aside>

      {/* Main Workbench */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-tr from-[#020617] via-[#020617] to-[#0a0f1f]">
        {/* Top Header */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest text-[10px]">Active Workspace</h2>
            <p className="text-[11px] text-slate-600 font-mono tracking-tighter">ARCH_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 tracking-wider uppercase">Secure Link Active</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
          {/* Hero Section */}
          {!result && !loading && (
            <div className="max-w-3xl animate-slide-up">
              <h1 className="text-7xl font-bold tracking-tighter gradient-text mb-6">
                Forge Logic <br />
                <span className="italic serif text-5xl font-light opacity-60">Architecting Automation.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl font-medium">
                Describe your operational bottleneck. Our architect will synthesize a professional-grade Python kernel tailored to your infrastructure.
              </p>
            </div>
          )}

          {/* Expanded Input Section - Widened to max-w-4xl to match the "format" */}
          <div className="max-w-4xl relative group animate-slide-up">
            <div className="lux-input-container">
              <div className="lux-rgb-glow"></div>
              <div className="lux-velvet-surface p-8">
                <textarea
                  className="w-full bg-transparent text-xl font-extralight text-white placeholder-slate-700 border-none focus:ring-0 outline-none resize-none h-28 custom-scrollbar tracking-[0.05em] leading-relaxed"
                  placeholder="Define the logic requirements..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-6 text-[10px] text-slate-700 font-mono tracking-[0.2em] uppercase">
                    <div className="flex items-center gap-2 group/hint cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20 group-hover/hint:bg-blue-400 transition-all"></span>
                      <span className="group-hover/hint:text-slate-400 transition-colors">Enterprise Systems</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 group/hint cursor-default">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/20 group-hover/hint:bg-cyan-400 transition-all"></span>
                      <span className="group-hover/hint:text-slate-400 transition-colors">Verified Logic</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleGenerate(customPrompt)}
                    disabled={loading || !customPrompt.trim()}
                    className="relative px-10 py-3.5 group/btn overflow-hidden rounded-2xl transition-all"
                  >
                    <div className="absolute inset-0 bg-white hover:bg-slate-100 transition-colors"></div>
                    <div className="absolute inset-[1px] bg-[#030712] rounded-[15px] group-hover/btn:bg-[#0a0f2b] transition-colors"></div>
                    
                    <div className="relative flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase">
                      {loading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                          <span className="text-blue-400">Processing</span>
                        </>
                      ) : (
                        <>
                          <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 bg-clip-text text-transparent group-hover/btn:scale-105 transition-transform">Synthesize Kernel</span>
                          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <p className="mt-4 text-[10px] text-slate-700 italic px-10 font-semibold tracking-widest">
              * Dedicated high-performance computation cycle ensuring architectural integrity.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl p-8 bg-red-500/5 border border-red-500/10 rounded-3xl text-red-400 text-sm flex items-center gap-5 animate-slide-up">
              <svg className="w-6 h-6 flex-shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span className="font-medium tracking-tight">{error}</span>
            </div>
          )}

          {/* Result Console */}
          {result && !loading && (
            <div className="max-w-6xl animate-slide-up space-y-10 pb-32">
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Information Card */}
                <div className="w-full lg:w-1/3 glass rounded-[40px] p-10 border border-white/5 flex flex-col gap-8 shadow-inner">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-3 block">Kernel manifest</span>
                    <h3 className="text-4xl font-bold text-white tracking-tighter leading-none">{result.title}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 leading-relaxed italic border-l border-blue-500/20 pl-6 font-medium">
                    {result.description}
                  </p>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      <span>Deployment Path</span>
                      <span className="px-3 py-1 bg-blue-500/5 rounded-full text-blue-400 border border-blue-500/10">{result.category}</span>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest block">System Dependencies</span>
                      <div className="flex flex-wrap gap-2">
                        {result.dependencies.map((dep, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 text-slate-400 rounded-lg text-[10px] font-mono">{dep}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-8 border-t border-white/5">
                    <button 
                      onClick={() => copyToClipboard(`pip install ${result.dependencies.join(' ')}`)}
                      className="w-full flex items-center justify-between px-6 py-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl text-xs font-mono text-slate-500 transition-colors border border-white/5"
                    >
                      <span className="tracking-tighter">$ pip install...</span>
                      <svg className="w-5 h-5 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    </button>
                  </div>
                </div>

                {/* Console Output */}
                <div className="w-full lg:w-2/3 glass rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                  {/* Console Tabs */}
                  <div className="flex items-center px-10 border-b border-white/5 bg-[#030712]/40">
                    <button 
                      onClick={() => setActiveTab('code')}
                      className={`px-6 py-6 text-[10px] font-bold tracking-[0.3em] uppercase transition-all border-b-2 ${activeTab === 'code' ? 'border-blue-500 text-white' : 'border-transparent text-slate-600 hover:text-slate-400'}`}
                    >
                      primary_kernel.py
                    </button>
                    <button 
                      onClick={() => setActiveTab('instructions')}
                      className={`px-6 py-6 text-[10px] font-bold tracking-[0.3em] uppercase transition-all border-b-2 ${activeTab === 'instructions' ? 'border-blue-500 text-white' : 'border-transparent text-slate-600 hover:text-slate-400'}`}
                    >
                      runtime_deployment.md
                    </button>
                    <div className="ml-auto flex items-center gap-6">
                      <div className="flex gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(activeTab === 'code' ? result.pythonCode : result.setupInstructions + "\n\n" + result.deploymentGuide)}
                        className="p-3 hover:bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#020617] p-12 overflow-x-auto custom-scrollbar max-h-[700px]">
                    {activeTab === 'code' ? (
                      <pre className="code-font text-sm leading-relaxed"><code className="text-blue-200/90">{result.pythonCode}</code></pre>
                    ) : (
                      <div className="space-y-12 py-4">
                        <section>
                          <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-6">Initialize Environment</h4>
                          <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">{result.setupInstructions}</div>
                        </section>
                        <section>
                          <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-6">Production Strategy</h4>
                          <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">{result.deploymentGuide}</div>
                        </section>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;