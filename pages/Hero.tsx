
import React from 'react';
import { Monitor, Image as ImageIcon, Layout, Save, RotateCcw } from 'lucide-react';
import { HeroConfig, Role } from '../types';

interface HeroProps {
  hero: HeroConfig;
  setHero: React.Dispatch<React.SetStateAction<HeroConfig>>;
  role: Role;
}

const Hero: React.FC<HeroProps> = ({ hero, setHero, role }) => {
  const handleUpdate = (field: keyof HeroConfig, value: string) => {
    setHero(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Hero Configuration</h1>
          <p className="text-slate-500 text-[14px] font-medium">Control the primary narrative and branding of the landing page</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-[10px] text-[13px] font-medium flex items-center gap-2 hover:bg-slate-50 transition-all">
            <RotateCcw size={18} /> Revert Changes
          </button>
          <button className="bg-blue-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm">
            <Save size={18} /> Update Live Hero
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[14px] border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Master Narrative Heading</label>
              <input 
                type="text" 
                value={hero.heading}
                onChange={e => handleUpdate('heading', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[18px] font-semibold text-slate-900 focus:border-blue-300 outline-none transition-all shadow-inner" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Subordinate Context / Description</label>
              <textarea 
                rows={4}
                value={hero.subtext}
                onChange={e => handleUpdate('subtext', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] text-slate-600 leading-relaxed focus:border-blue-300 outline-none resize-none transition-all shadow-inner" 
              ></textarea>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Primary Visual Asset</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-[10px] px-4 py-2.5 text-[12px] text-slate-400 font-medium truncate shadow-inner">
                  {hero.backgroundImageUrl}
                </div>
                <button className="shrink-0 flex items-center gap-2 bg-white text-slate-600 border border-slate-200 px-4 py-2.5 rounded-[10px] text-[12px] font-medium hover:bg-slate-50 transition-colors">
                  <ImageIcon size={18} /> Replace Media
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic">High-fidelity assets only (1920x1080px minimum recommended).</p>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[14px] flex gap-4">
             <div className="p-3 bg-white rounded-[10px] shadow-sm text-blue-600 shrink-0 h-fit">
                <Layout size={20} />
             </div>
             <div>
                <h4 className="font-semibold text-blue-900 text-[14px]">Architectural Guardrails</h4>
                <p className="text-[12px] text-blue-800/60 mt-1 leading-relaxed font-medium">
                  The dashboard restricts structural edits to maintain institutional brand integrity. You are modifying content within a fixed, calibrated layout for optimal user experience across all devices.
                </p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 font-medium text-[12px] uppercase tracking-widest mb-2">
            <Monitor size={14} /> Desktop Emulation Preview
          </div>
          <div className="bg-white rounded-[18px] p-2 shadow-2xl overflow-hidden aspect-[16/10] relative border border-slate-200">
             <div className="h-full rounded-[14px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${hero.backgroundImageUrl})` }}>
                   <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
                </div>
                
                <div className="relative h-full flex flex-col items-center justify-center px-12 text-center text-white">
                   <div className="w-16 h-1 w-16 bg-blue-500 rounded-full mb-8 shadow-lg"></div>
                   <h2 className="text-4xl font-semibold tracking-tight mb-4 animate-in fade-in duration-1000 slide-in-from-top-4">{hero.heading}</h2>
                   <p className="text-[16px] text-white/80 max-w-lg font-normal leading-relaxed animate-in fade-in duration-1000 delay-200 slide-in-from-top-2">{hero.subtext}</p>
                   <div className="mt-10 flex gap-4">
                      <div className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-[10px] shadow-xl text-[14px]">Explore Programs</div>
                      <div className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-[10px] text-[14px]">Our History</div>
                   </div>
                </div>

                <div className="absolute top-8 left-8 flex items-center gap-4">
                   <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-[6px] border border-white/20 shadow-sm flex items-center justify-center text-[10px] font-black">S</div>
                   <div className="w-24 h-1.5 bg-white/20 rounded-full"></div>
                </div>
                <div className="absolute top-8 right-8 flex gap-5">
                   <div className="w-10 h-1.5 bg-white/20 rounded-full"></div>
                   <div className="w-10 h-1.5 bg-white/20 rounded-full"></div>
                   <div className="w-10 h-1.5 bg-white/20 rounded-full"></div>
                </div>
             </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-medium uppercase tracking-widest italic">Dynamic Preview Mode • Refreshes on input change</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
