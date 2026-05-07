import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Zap,
  MoreHorizontal,
  Download,
  Play
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardProps {
  stats: {
    total: number;
    success: number;
    failed: number;
    avgRuntime: string;
  };
  isDarkMode: boolean;
}

const data = [
  { name: 'Mon', success: 40, failed: 4 },
  { name: 'Tue', success: 30, failed: 2 },
  { name: 'Wed', success: 65, failed: 8 },
  { name: 'Thu', success: 45, failed: 3 },
  { name: 'Fri', success: 90, failed: 5 },
  { name: 'Sat', success: 70, failed: 2 },
  { name: 'Sun', success: 85, failed: 4 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, isDarkMode }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Workspace Overview</h2>
            <p className="text-slate-500 font-medium">Real-time performance metrics for your automation fleet.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC] font-medium rounded-lg shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-medium rounded-lg shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
              <Plus size={16} />
              <span>Deploy Node</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] relative overflow-hidden py-6 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-blue-600">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                <Zap size={20} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                <span>12%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Workflows</p>
            <h3 className="text-3xl font-bold tracking-tight">{stats.total}</h3>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] relative overflow-hidden py-6 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-green-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                <span>8%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Successful Runs</p>
            <h3 className="text-3xl font-bold tracking-tight">{stats.success}</h3>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] relative overflow-hidden py-6 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-red-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600">
                <AlertCircle size={20} />
              </div>
              <div className="flex items-center gap-1 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                <ArrowDownRight size={12} />
                <span>2%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Failed Sessions</p>
            <h3 className="text-3xl font-bold tracking-tight text-red-500">{stats.failed}</h3>
          </div>

          <div className="p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] relative overflow-hidden py-6 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-amber-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
                <Clock size={20} />
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-bold bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full">
                <span>0.1s</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg Execution</p>
            <h3 className="text-3xl font-bold tracking-tight">{stats.avgRuntime}</h3>
          </div>
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-bold">Execution Trend</h4>
                <p className="text-xs text-slate-500 font-medium">System performance over the last 7 cycles</p>
              </div>
              <select className={cn(
                "text-xs font-bold border-none bg-transparent outline-none cursor-pointer",
                isDarkMode ? "text-slate-400" : "text-slate-600"
              )}>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#F1F5F9"} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', 
                      borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="success" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSuccess)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] p-8">
            <h4 className="text-lg font-bold mb-6">Recent Activity</h4>
            <div className="space-y-6">
              {[
                { title: 'Scraper #42', time: '2m ago', status: 'success', statusText: 'Completed' },
                { title: 'Notifier Bot', time: '14m ago', status: 'success', statusText: 'Completed' },
                { title: 'Data Sync V2', time: '1h ago', status: 'failed', statusText: 'Error' },
                { title: 'Backup Task', time: '3h ago', status: 'success', statusText: 'Completed' },
                { title: 'API Refresher', time: '5h ago', status: 'success', statusText: 'Completed' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      activity.status === 'success' ? "bg-green-500" : "bg-red-500"
                    )}></div>
                    <div>
                      <p className="text-sm font-bold">{activity.title}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      activity.status === 'success' ? "text-green-600 bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800/20" : "text-red-600 bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-800/20"
                    )}>
                      {activity.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors">
              View Audit Logs
            </button>
          </div>
        </div>

        {/* Workflow Table Section */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] overflow-hidden">
          <div className="p-8 border-b border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
            <h4 className="text-lg font-bold">Active Deployments</h4>
            <button className="text-slate-400">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Efficiency</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Last Executed</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: 'Financial Report Generator', status: 'Operational', efficiency: '99.8%', time: 'Oct 12, 14:20' },
                { name: 'Cloud Resource Auditor', status: 'Maintenance', efficiency: '82.4%', time: 'Oct 11, 09:15' },
                { name: 'Lead Enrichment Pipeline', status: 'Operational', efficiency: '94.1%', time: 'Oct 12, 16:45' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-[#1E3A8A] dark:text-blue-400">{row.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold tracking-tighter">ID: TXN_90{i}A</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={cn(
                         "w-2 h-2 rounded-full animate-pulse",
                         row.status === 'Operational' ? "bg-green-500" : "bg-amber-500"
                       )}></span>
                       <span className="text-xs font-semibold">{row.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-mono font-bold">{row.efficiency}</p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {row.time}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all">
                      <Play size={16} className="text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
