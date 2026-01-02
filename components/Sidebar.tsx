
import React from 'react';
import { Role } from '../types';

interface SidebarProps {
  menuItems: Array<{ id: string; label: string; icon: React.ReactNode }>;
  activeTab: string;
  setActiveTab: (id: string) => void;
  role: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab, role }) => {
  return (
    <div className="w-64 h-full bg-white text-slate-800 flex flex-col shrink-0 border-r border-slate-200 shadow-sm transition-all duration-300">
      {/* Brand Header */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-[10px] flex items-center justify-center text-white font-semibold text-xl shadow-lg shadow-blue-200">
          S
        </div>
        <div>
          <h1 className="font-semibold text-[16px] tracking-tight leading-tight text-slate-900">
            Admin<span className="text-blue-600">Core</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">SFS Honnavar</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-all duration-150 group ${
              activeTab === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-6 mt-auto border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-500 border border-slate-300">
            {role.substring(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">Session User</p>
            <p className="text-[13px] font-medium truncate text-slate-700">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
