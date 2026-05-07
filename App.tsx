import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  History, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  User, 
  Moon, 
  Sun,
  ChevronRight
} from 'lucide-react';
import { AppState } from './types';
import Dashboard from './components/Dashboard';
import WorkflowBuilder from './components/WorkflowBuilder';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    activeTab: 'dashboard',
    isDarkMode: false,
    workflows: [],
    stats: {
      total: 12,
      success: 145,
      failed: 3,
      avgRuntime: '1.2s'
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "flex h-screen overflow-hidden transition-colors duration-300 font-sans",
      state.isDarkMode ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#1E293B]"
    )}>
      {/* Sidebar */}
      <aside className={cn(
        "w-64 flex-shrink-0 border-r flex flex-col z-50",
        state.isDarkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-[#E2E8F0]"
      )}>
        <div className="h-20 flex items-center px-6 gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-lg">
            <Workflow size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight uppercase tracking-tight">AutoStudio</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest opacity-60">Enterprise v2.0</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setState(prev => ({ ...prev, activeTab: item.id as any }))}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-[#64748B] hover:text-[#1E3A8A] hover:bg-[#F1F5F9] transition-all duration-200 w-full",
                  state.activeTab === item.id && "text-[#1E3A8A] bg-[#EFF6FF] border-l-4 border-[#1E3A8A] rounded-l-none",
                  state.isDarkMode && state.activeTab === item.id && "bg-blue-500/10 text-blue-400 border-blue-500"
                )}
              >
              <item.icon size={18} strokeWidth={2.5} />
              <span className="font-semibold tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-700">
          <button className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-medium rounded-lg shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 w-full py-3 mb-4">
            <Plus size={18} strokeWidth={3} />
            <span className="font-bold uppercase tracking-wider text-xs">New Workflow</span>
          </button>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <User size={16} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold truncate w-24">Senior Architect</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Pro Tier</p>
              </div>
            </div>
            <button onClick={() => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))} className="text-slate-400 hover:text-blue-500 transition-colors">
              {state.isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <header className={cn(
          "h-16 flex-shrink-0 flex items-center justify-between px-8 border-b z-40",
          state.isDarkMode ? "bg-[#1E293B]/80 border-slate-700 text-white" : "bg-white/80 border-[#E2E8F0] text-[#1E293B]",
          "backdrop-blur-md"
        )}>
          <div className="flex items-center gap-4 w-96 font-sans">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search workflows, sessions, analytics..." 
                className={cn(
                  "w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium",
                  state.isDarkMode ? "bg-slate-800 border-slate-700 placeholder-slate-500" : "bg-slate-50 border-[#E2E8F0] placeholder-slate-400"
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold tracking-tight">Workspace Beta</p>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Sync</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <div className="flex-1 overflow-hidden flex flex-col pt-2">
          {state.activeTab === 'dashboard' && <Dashboard stats={state.stats} isDarkMode={state.isDarkMode} />}
          {state.activeTab === 'workflows' && <WorkflowBuilder isDarkMode={state.isDarkMode} />}
          {(state.activeTab === 'history' || state.activeTab === 'analytics' || state.activeTab === 'settings') && (
            <div className="flex-1 flex items-center justify-center text-slate-300 dark:text-slate-700 bg-white dark:bg-[#0F172A] m-8 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
              <div className="text-center animate-pulse">
                <BarChart3 size={64} className="mx-auto mb-6 opacity-20" />
                <h3 className="text-xl font-bold tracking-tight text-slate-400 dark:text-slate-600 mb-2">Module Not Initialized</h3>
                <p className="text-sm font-medium opacity-50 uppercase tracking-[0.2em]">Contact Enterprise Support for Access</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
