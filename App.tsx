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
            <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <h1 className="text-xl font-bold tracking-tight text-white">Studio <span className="font-light opacity-50 italic serif text-sm tracking-normal">Pro</span></h1>
          </div>
          
          <nav className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 px-2">Blueprints</p>
            {AUTOMATION_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleGenerate(tpl.description, tpl.category)}
                disabled={loading}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
              >
                <span className="text-lg opacity-60 group-hover:opacity-100">{tpl.icon}</span>
                <span className="truncate">{tpl.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5 bg-white/[0.02]">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <p className="text-xs font-semibold text-indigo-300 mb-1">Expert Mode</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">Precision-engineered Python automation logic for production systems.</p>
          </div>
        </div>
      </aside>

      {/* Main Workbench */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-tr from-[#020617] via-[#020617] to-[#0f172a]">
        {/* Top Header */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h2 className="text-sm font-medium text-slate-400">Project Workspace</h2>
            <p className="text-xs text-slate-600 font-mono tracking-tighter">STUDIO_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold">AI</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          {/* Hero Section */}
          {!result && !loading && (
            <div className="max-w-3xl animate-slide-up">
              <h1 className="text-6xl font-bold tracking-tight gradient-text mb-6">
                Forge Logic <br />
                <span className="italic serif text-5xl font-light opacity-80">With Precision.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
                Describe your operational bottleneck or automation goal. Our studio architect will design a professional-grade Python solution tailored to your requirements.
              </p>
            </div>
          )}

          {/* Input Section */}
          <div className="max-w-4xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
            <div className="relative glass rounded-2xl p-6 transition-all duration-300">
              <textarea
                className="w-full bg-transparent text-xl font-medium text-white placeholder-slate-600 border-none focus:ring-0 resize-none h-32 custom-scrollbar"
                placeholder="Briefly describe the automation you wish to build..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>GPT-READY</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  <span>PYTHON 3.10+</span>
                </div>
                <button
                  onClick={() => handleGenerate(customPrompt)}
                  disabled={loading || !customPrompt.trim()}
                  className="px-6 py-2.5 accent-gradient text-white rounded-lg text-sm font-bold tracking-tight hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 active:scale-95 transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Blueprint</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {/* Result Console */}
          {result && !loading && (
            <div className="max-w-6xl animate-slide-up space-y-8 pb-20">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Information Card */}
                <div className="w-full lg:w-1/3 glass rounded-2xl p-8 border border-white/10 flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2 block">System Profile</span>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{result.title}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                    {result.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Category</span>
                      <span className="px-2 py-1 bg-white/5 rounded-md text-slate-300 border border-white/5 uppercase tracking-tighter text-[10px]">{result.category}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-slate-500 font-medium block">Core Dependencies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.dependencies.map((dep, i) => (
                          <span key={i} className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded text-[10px] font-mono">{dep}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => copyToClipboard(`pip install ${result.dependencies.join(' ')}`)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono text-slate-400 transition-colors"
                    >
                      <span>$ pip install...</span>
                      <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </button>
                  </div>
                </div>

                {/* Console Output */}
                <div className="w-full lg:w-2/3 glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Console Tabs */}
                  <div className="flex items-center px-6 border-b border-white/5 bg-slate-900/40">
                    <button 
                      onClick={() => setActiveTab('code')}
                      className={`px-4 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'code' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                      source.py
                    </button>
                    <button 
                      onClick={() => setActiveTab('instructions')}
                      className={`px-4 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'instructions' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                      deployment.md
                    </button>
                    <div className="ml-auto flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(activeTab === 'code' ? result.pythonCode : result.setupInstructions + "\n\n" + result.deploymentGuide)}
                        className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#020617] p-8 overflow-x-auto custom-scrollbar max-h-[600px]">
                    {activeTab === 'code' ? (
                      <pre className="code-font text-sm leading-relaxed"><code className="text-indigo-300">{result.pythonCode}</code></pre>
                    ) : (
                      <div className="space-y-8 py-4">
                        <section>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Setup Environment</h4>
                          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{result.setupInstructions}</div>
                        </section>
                        <section>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Deployment Guide</h4>
                          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{result.deploymentGuide}</div>
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