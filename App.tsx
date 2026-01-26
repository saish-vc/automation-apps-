
import React, { useState, useEffect } from 'react';
import { AUTOMATION_TEMPLATES } from './constants';
import { AutomationCategory, GeneratedSystem } from './types';
import { generateAutomation } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [result, setResult] = useState<GeneratedSystem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string, category?: AutomationCategory) => {
    setLoading(true);
    setError(null);
    try {
      const system = await generateAutomation(prompt, category || AutomationCategory.CUSTOM);
      setResult(system);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          AutoPy Architect
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Generate production-grade Python automation systems in seconds. 
          Pick a blueprint or describe your custom workflow.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Inputs & Templates */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-400">⚡</span> Custom Build
            </h2>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none h-32"
              placeholder="e.g., A web scraper that fetches the latest AI news from Hacker News and sends me a Discord notification..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <button
              onClick={() => handleGenerate(customPrompt)}
              disabled={loading || !customPrompt.trim()}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? 'Architecting...' : 'Generate System'}
            </button>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-300 px-2">Blueprints</h2>
            <div className="grid grid-cols-1 gap-4">
              {AUTOMATION_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleGenerate(tpl.description, tpl.category)}
                  disabled={loading}
                  className="group text-left p-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700 rounded-xl transition-all hover:translate-x-1"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{tpl.icon}</span>
                    <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{tpl.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{tpl.description}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-400 animate-pulse">Designing your system architecture...</p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20 mb-2 inline-block">
                      {result.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white">{result.title}</h2>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.pythonCode)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
                    title="Copy Source Code"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-300 mb-6">{result.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Required Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.dependencies.map((dep, i) => (
                      <code key={i} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-emerald-400 text-sm">
                        {dep}
                      </code>
                    ))}
                  </div>
                  <div className="mt-3 bg-black/30 p-2 rounded text-xs code-font text-slate-500">
                    pip install {" " + result.dependencies.join(' ')}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Python Implementation</h3>
                  <div className="relative group">
                    <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto border border-slate-700 max-h-[500px] text-sm leading-relaxed code-font">
                      <code className="text-blue-300">{result.pythonCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-2">Setup</h3>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap">{result.setupInstructions}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2">Deployment</h3>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap">{result.deploymentGuide}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-800/10 rounded-2xl border border-dashed border-slate-800 text-slate-600">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.282a2 2 0 01-1.806 0l-.628-.282a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.34.34a2 2 0 000 2.828l1.246 1.246a2 2 0 002.828 0L21.365 7.137a2 2 0 000-2.828l-1.246-1.246a2 2 0 00-2.828 0L19.428 15.428z" />
              </svg>
              <p>Your generated automation will appear here.</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
