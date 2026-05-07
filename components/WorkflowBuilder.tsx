import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Plus, 
  Play, 
  Save, 
  Settings, 
  Trash2, 
  Database, 
  Globe, 
  Mail, 
  FileText, 
  Code,
  Zap,
  ChevronRight,
  Info,
  Layers,
  X
} from 'lucide-react';
import { AutomationCategory } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Node Component
const WorkflowNode = ({ data }: any) => {
  const Icon = data.icon || Zap;
  return (
    <div className={cn(
      "px-5 py-4 shadow-xl rounded-2xl border-2 transition-all group min-w-[220px]",
      data.isSelected ? "border-blue-500 bg-white" : "border-slate-100 bg-white hover:border-slate-300"
    )}>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />
      
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0",
          data.type === 'HTTP' ? "bg-blue-500" :
          data.type === 'DB' ? "bg-purple-500" :
          data.type === 'Mail' ? "bg-amber-500" : "bg-slate-700"
        )}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">{data.type}</p>
          <p className="text-sm font-bold truncate text-[#1E293B]">{data.label}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Ready</span>
        </div>
        <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white" />
    </div>
  );
};

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    data: { label: 'Fetch Market Data', type: 'HTTP', icon: Globe },
    position: { x: 250, y: 100 },
  },
  {
    id: '2',
    type: 'workflowNode',
    data: { label: 'Validate Integrity', type: 'Logic', icon: Zap },
    position: { x: 250, y: 300 },
  },
  {
    id: '3',
    type: 'workflowNode',
    data: { label: 'Store in Warehouse', type: 'DB', icon: Database },
    position: { x: 100, y: 500 },
  },
  {
    id: '4',
    type: 'workflowNode',
    data: { label: 'Notify Stakeholders', type: 'Mail', icon: Mail },
    position: { x: 400, y: 500 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
];

const WorkflowBuilder: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodes((nds) => nds.map((n) => ({
      ...n,
      data: { ...n.data, isSelected: n.id === node.id }
    })));
  }, [setNodes]);

  const addNode = (type: string) => {
    const id = (nodes.length + 1).toString();
    const newNode: Node = {
      id,
      type: 'workflowNode',
      data: { 
        label: `New ${type} Node`, 
        type, 
        icon: type === 'HTTP' ? Globe : type === 'DB' ? Database : type === 'Mail' ? Mail : type === 'File' ? FileText : Code 
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Workflow Canvas */}
      <div className="flex-1 relative bg-[#F1F5F9]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="!bg-white !border-none !shadow-xl !rounded-xl overflow-hidden" />
          <MiniMap 
            className="!bg-white/80 !backdrop-blur !border-none !shadow-2xl !rounded-2xl" 
            nodeColor={(n) => (n.data.type === 'HTTP' ? '#3b82f6' : '#64748b')}
          />
          
          <Panel position="top-left" className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 mt-4 ml-4">
            <button onClick={() => addNode('HTTP')} className="flex flex-col items-center gap-1.5 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <Globe size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase text-slate-400">Request</span>
            </button>
            <div className="w-px h-8 bg-slate-100"></div>
            <button onClick={() => addNode('DB')} className="flex flex-col items-center gap-1.5 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <Database size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase text-slate-400">Database</span>
            </button>
            <div className="w-px h-8 bg-slate-100"></div>
            <button onClick={() => addNode('Mail')} className="flex flex-col items-center gap-1.5 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <Mail size={18} className="text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase text-slate-400">Email</span>
            </button>
            <div className="w-px h-8 bg-slate-100"></div>
            <button onClick={() => addNode('Script')} className="flex flex-col items-center gap-1.5 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
              <Code size={18} className="text-slate-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase text-slate-400">Python</span>
            </button>
          </Panel>

          <Panel position="top-right" className="mt-4 mr-4 flex items-center gap-3">
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-xs font-bold text-slate-600">Auto-save Ready</span>
             </div>
             <button className="bg-[#1E3A8A] text-white p-3 rounded-full shadow-xl hover:bg-blue-800 transition-colors">
               <Play size={20} fill="currentColor" />
             </button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Properties Panel */}
      <div className={cn(
        "w-[400px] flex-shrink-0 flex flex-col border-l relative overflow-hidden transition-all",
        isDarkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-[#E2E8F0]"
      )}>
        {selectedNode ? (
          <>
            <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 mb-1">Configuration</p>
                <h4 className="text-xl font-bold tracking-tight">Active Node Settings</h4>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Identifier</label>
                <input 
                  type="text" 
                  value={selectedNode.data.label as string}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 outline-none font-medium transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Execution Logic</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-500/20 text-blue-600">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Retry Mode</p>
                    <p className="text-sm font-bold">Exponential</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-slate-400">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Timeout</p>
                    <p className="text-sm font-bold">300ms</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-500/10">
                  <Info size={16} className="text-green-600" />
                  <p className="text-xs font-medium text-green-700 dark:text-green-400">Successfully validated against PEP8 standards.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-700">
                 <button className="w-full py-4 bg-[#1E3A8A] text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all mb-4">
                   Commit Changes
                 </button>
                 <button className="w-full py-4 border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                   <Trash2 size={16} />
                   <span>Remove Node</span>
                 </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-40 grayscale">
            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center mb-8">
              <Layers size={64} className="text-slate-300" />
            </div>
            <h4 className="text-lg font-bold mb-2">No Node Selected</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-[240px]">
              Click on a canvas element to configure its operational parameters and logic hooks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;

// Helper to avoid build error
const MoreHorizontal = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);
