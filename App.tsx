
import React, { useState } from 'react';
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
    alert('Pinned to your clipboard! 📌');
  };

  return (
    <div className="min-h-screen pb-20 px-6 pt-12 max-w-6xl mx-auto selection:bg-[#f2cc8f]">
      {/* Hand-drawn style Header */}
      <header className="relative mb-20 flex flex-col items-center">
        <div className="absolute -top-6 -left-4 w-24 h-24 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" className="fill-[#e07a5f]">
            <path d="M20,50 Q30,20 50,20 T80,50 T50,80 T20,50" />
          </svg>
        </div>
        
        <h1 className="serif text-6xl font-bold mb-4 text-[#3d405b] relative">
          The Python Studio
          <span className="absolute -right-12 bottom-0 hand text-2xl text-[#e07a5f] rotate-12 underline decoration-wavy">
            & Automation
          </span>
        </h1>
        <p className="hand text-2xl text-slate-500 max-w-xl text-center leading-relaxed">
          Where we sketch ideas into logic. Describe your workflow below, and let's build something useful together.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Creator's Desk (Inputs) */}
        <div className="w-full md:w-2/5 space-y-12 sticky top-8">
          <section className="relative">
            <div className="absolute inset-0 bg-[#e07a5f]/5 sketch-border -m-2 -rotate-1 pointer-events-none"></div>
            <div className="bg-white p-8 paper-card rounded-sm relative">
              <h2 className="serif text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-[#e07a5f] italic">01.</span> Start a Project
              </h2>
              <textarea
                className="w-full bg-[#fdfbf7] border-2 border-[#3d405b]/10 focus:border-[#e07a5f] rounded-lg p-5 text-[#3d405b] transition-all outline-none resize-none h-40 hand text-xl"
                placeholder="Ex: I want to save every cat photo I find on a specific blog into a 'Cute' folder..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
              <button
                onClick={() => handleGenerate(customPrompt)}
                disabled={loading || !customPrompt.trim()}
                className="w-full mt-6 bg-[#3d405b] text-white hover:bg-[#2d2f44] disabled:opacity-50 py-4 rounded-md font-bold text-lg shadow-xl shadow-[#3d405b]/10 transform active:scale-[0.98]"
              >
                {loading ? 'Doodling the logic...' : 'Craft System'}
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="serif text-xl font-bold text-[#3d405b] px-2 flex items-center gap-2">
              <span className="text-[#81b29a] italic">02.</span> Reference Blueprints
            </h2>
            <div className="flex flex-wrap gap-4">
              {AUTOMATION_TEMPLATES.map((tpl, i) => (
                <button
                  key={tpl.id}
                  onClick={() => handleGenerate(tpl.description, tpl.category)}
                  disabled={loading}
                  className={`group p-5 bg-white paper-card border-2 border-[#3d405b]/5 rounded-sm transition-all text-left flex-1 min-w-[200px] ${i % 2 === 0 ? 'tilted-left' : 'tilted-right'}`}
                >
                  <div className="text-3xl mb-2 opacity-80 group-hover:scale-110 transition-transform inline-block">{tpl.icon}</div>
                  <h3 className="font-bold text-[#3d405b] mb-1">{tpl.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 italic">{tpl.description}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* The Drafting Table (Output) */}
        <div className="w-full md:w-3/5">
          {loading ? (
            <div className="h-[600px] flex flex-col items-center justify-center bg-white/50 sketch-border border-dashed border-[#3d405b]/20">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-[#e07a5f] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-[#81b29a] border-b-transparent rounded-full animate-spin [animation-duration:1.5s]"></div>
              </div>
              <p className="hand text-2xl text-slate-500 animate-pulse">Sharpening the pencils...</p>
            </div>
          ) : result ? (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white p-10 paper-card sketch-border relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 bg-[#f2cc8f] p-2 rotate-12 shadow-sm text-xs font-bold uppercase tracking-widest text-[#3d405b] border border-[#3d405b]/10">
                  Approved
                </div>

                <div className="mb-10">
                  <div className="flex flex-wrap justify-between items-end gap-4 border-b-2 border-dotted border-[#3d405b]/10 pb-6">
                    <div>
                      <span className="hand text-lg text-[#81b29a] block mb-1">
                        Category: {result.category}
                      </span>
                      <h2 className="serif text-4xl font-bold text-[#3d405b]">{result.title}</h2>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(result.pythonCode)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#fdfbf7] border border-[#3d405b]/10 rounded hover:bg-[#f2cc8f] transition-colors text-sm font-semibold"
                    >
                      <span>Grab Code</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-6 text-lg text-slate-600 leading-relaxed italic italic-font serif">{result.description}</p>
                </div>

                <div className="mb-10 p-6 bg-[#fdfbf7] border-l-4 border-[#e07a5f] rounded-r-lg">
                  <h3 className="hand text-xl font-bold text-[#3d405b] mb-3">Tools of the Trade (Dependencies)</h3>
                  <div className="flex flex-wrap gap-3">
                    {result.dependencies.map((dep, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-[#3d405b]/10 rounded shadow-sm text-[#3d405b] text-sm code-font">
                        {dep}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 bg-[#3d405b]/5 p-3 rounded text-xs code-font text-slate-500 overflow-x-auto">
                    $ pip install {result.dependencies.join(' ')}
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="serif text-xl font-bold text-[#3d405b] mb-4">Python Script</h3>
                  <div className="relative">
                    <pre className="bg-[#3d405b] p-8 rounded-lg overflow-x-auto shadow-inner text-sm leading-relaxed code-font">
                      <code className="text-[#f2cc8f]">{result.pythonCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-dotted border-[#3d405b]/20">
                  <div className="space-y-3">
                    <h3 className="hand text-2xl font-bold text-[#e07a5f]">Studio Setup</h3>
                    <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed serif">{result.setupInstructions}</div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="hand text-2xl font-bold text-[#81b29a]">Launch Protocol</h3>
                    <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed serif">{result.deploymentGuide}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center bg-[#3d405b]/5 sketch-border border-dashed border-[#3d405b]/10 text-slate-400 p-10 text-center">
              <div className="w-24 h-24 mb-6 opacity-20">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6.02 20.71,5.63L18.37,3.29C17.98,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
                </svg>
              </div>
              <p className="serif text-xl italic mb-2">The table is clear.</p>
              <p className="hand text-lg">Pick a blueprint or write an idea to begin your next automation project.</p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 flex items-center gap-4 animate-bounce">
              <span className="text-3xl">📝</span>
              <p className="hand text-xl">Oops, the ink spilled! {error}</p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-24 text-center pb-12 opacity-40">
        <p className="hand text-xl">Made with curiosity and a bit of Python ink.</p>
      </footer>
    </div>
  );
};

export default App;
