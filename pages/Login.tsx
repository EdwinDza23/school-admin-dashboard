
import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, UserCircle, ArrowRight, AlertCircle, Copy } from 'lucide-react';
import { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

const DEMO_ACCOUNTS = [
  {
    role: 'System Admin',
    email: 'admin@schooldemo.com',
    password: 'Admin@123',
    type: Role.SYSTEM_ADMIN,
    description: 'Full oversight of staff, content, and admissions'
  },
  {
    role: 'Content Editor',
    email: 'editor@schooldemo.com',
    password: 'Editor@123',
    type: Role.CONTENT_EDITOR,
    description: 'Manage blogs, events, gallery, and achievements'
  },
  {
    role: 'Admissions Viewer',
    email: 'admissions@schooldemo.com',
    password: 'Admissions@123',
    type: Role.ADMISSIONS_VIEWER,
    description: 'Read-only access to admission applications'
  }
];

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated network delay
    setTimeout(() => {
      const account = DEMO_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
      if (account) {
        onLogin(account.type);
      } else {
        setError('Invalid email or password. Please use the demo accounts below.');
        setIsLoading(false);
      }
    }, 800);
  };

  const autoFill = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 selection:bg-blue-100">
      <div className="w-full max-w-md space-y-8">
        {/* Institutional Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-[18px] text-white shadow-xl shadow-blue-200 mb-2">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin<span className="text-blue-600">Core</span></h1>
            <p className="text-[14px] text-slate-500 font-medium">SFS Honnavar • Institutional Gateway</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.08)] p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                    placeholder="name@institution.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-[10px] flex items-center gap-3 text-rose-600 text-[12px] font-medium animate-in shake duration-300">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-[12px] font-semibold text-[14px] uppercase tracking-[0.1em] hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Enter Dashboard <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              <span className="bg-white px-3">Demo Testing Access</span>
            </div>
          </div>

          {/* Demo Accounts List */}
          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((acc) => (
              <button 
                key={acc.type}
                onClick={() => autoFill(acc)}
                className="w-full text-left p-4 rounded-[16px] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="p-2 bg-white rounded-[10px] border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors shadow-sm">
                  <UserCircle size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-slate-800">{acc.role}</h4>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{acc.description}</p>
                </div>
                <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity border border-blue-50">
                   <Copy size={12} className="text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security Footer */}
        <p className="text-center text-[11px] text-slate-400 font-medium tracking-wide uppercase">
          Protected institutional domain • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
