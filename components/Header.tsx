
import React, { useState } from 'react';
import { Bell, ChevronDown, UserCircle, LogOut } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  roleDisplay: Record<Role, string>;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, roleDisplay, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-6">
        <h2 className="text-[14px] font-medium text-slate-500 hidden sm:block tracking-wide">
          Institution Control Center
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-600 relative transition-colors">
          <Bell size={18} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-[8px] font-semibold rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200"></div>

        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="text-right hidden lg:block">
              <p className="text-[12px] font-medium text-slate-700 tracking-wide uppercase">{roleDisplay[currentRole]}</p>
              <p className="text-[10px] text-slate-400 font-medium">SFS_v2.0.4</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors border border-slate-200">
              <UserCircle size={22} />
            </div>
            <ChevronDown size={14} className={`text-slate-400 group-hover:text-slate-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-[12px] shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 border-b border-slate-50">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Signed in as</p>
                  <p className="text-[13px] font-bold text-slate-700 truncate">{roleDisplay[currentRole]}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 text-[13px] font-semibold transition-colors"
                >
                  <LogOut size={16} /> Exit Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
