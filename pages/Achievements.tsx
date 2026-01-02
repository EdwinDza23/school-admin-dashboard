
import React, { useState, useMemo } from 'react';
import { Plus, Search, Trophy, User, Edit2, Trash2, CheckCircle2, Star, Save, Image as ImageIcon, AlertTriangle, Info } from 'lucide-react';
import { Achievement, AchievementCategory, Role } from '../types';
import Modal from '../components/Modal';
import Dropdown, { DropdownOption } from '../components/Dropdown';

interface AchievementsProps {
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  role: Role;
}

const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: 'Academic Excellence', value: AchievementCategory.ACADEMIC },
  { label: 'Sports & Athletics', value: AchievementCategory.SPORTS }
];

const Achievements: React.FC<AchievementsProps> = ({ achievements, setAchievements, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [achToDelete, setAchToDelete] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({
    studentName: '',
    classSection: '',
    category: AchievementCategory.ACADEMIC,
    title: '',
    competitionName: '',
    year: '2024',
    rank: '',
    description: '',
    isFeatured: false,
    isActive: true,
    photoUrl: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      studentName: '',
      classSection: '',
      category: AchievementCategory.ACADEMIC,
      title: '',
      competitionName: '',
      year: '2024',
      rank: '',
      description: '',
      isFeatured: false,
      isActive: true,
      photoUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingId(ach.id);
    setFormData(ach);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.studentName || !formData.title) return;
    if (editingId) {
      setAchievements(prev => prev.map(a => a.id === editingId ? { ...a, ...formData } as Achievement : a));
    } else {
      const newAch: Achievement = { id: Date.now().toString(), ...formData } as Achievement;
      setAchievements(prev => [newAch, ...prev]);
    }
    setIsModalOpen(false);
  };

  const toggleFeatured = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, isFeatured: !a.isFeatured } : a));
  };

  const toggleActive = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const openDeleteConfirmation = (ach: Achievement) => {
    setAchToDelete(ach);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (achToDelete) {
      setAchievements(prev => prev.filter(a => a.id !== achToDelete.id));
      setIsDeleteModalOpen(false);
      setAchToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Academic & Sports Achievers</h1>
          <p className="text-slate-500 text-[14px] font-medium">Showcase student excellence on the institution website</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm">
          <Plus size={18} /> Register Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[14px] border border-slate-200 h-fit space-y-6 shadow-sm">
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-4 ml-0.5">Quick Filters</h4>
            <div className="space-y-1">
              {['Academic', 'Sports', 'Featured'].map(filter => (
                <label key={filter} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-[8px] cursor-pointer text-[14px] font-medium text-slate-600 transition-colors">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600 rounded border-slate-300" /> {filter}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="bg-white p-3 rounded-[14px] border border-slate-200 shadow-sm">
             <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input type="text" placeholder="Lookup student or competition name..." className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] outline-none font-normal text-slate-700 focus:border-blue-300" />
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {achievements.map(ach => (
              <div key={ach.id} className={`bg-white rounded-[14px] border p-5 group transition-all duration-300 hover:shadow-md ${ach.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-slate-50 border border-slate-200 shrink-0 shadow-sm">
                    {ach.photoUrl ? <img src={ach.photoUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={32} /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-[6px] uppercase tracking-wider border ${ach.category === AchievementCategory.ACADEMIC ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {ach.category}
                      </span>
                      <div className="flex gap-1">
                        <button onClick={() => toggleFeatured(ach.id)} className={`p-1.5 rounded-[6px] transition-colors ${ach.isFeatured ? 'text-amber-500 bg-amber-50 border border-amber-100' : 'text-slate-300 hover:bg-slate-50'}`}><Star size={14} fill={ach.isFeatured ? 'currentColor' : 'none'} /></button>
                        <button onClick={() => toggleActive(ach.id)} className={`p-1.5 rounded-[6px] transition-colors ${ach.isActive ? 'text-emerald-500 bg-emerald-50 border border-emerald-100' : 'text-slate-300 hover:bg-slate-50'}`}><CheckCircle2 size={14} /></button>
                      </div>
                    </div>
                    <h3 className="font-medium text-slate-800 text-[15px] mt-1 truncate">{ach.studentName}</h3>
                    <p className="text-[12px] text-slate-400 font-medium uppercase mt-0.5">{ach.classSection}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[13px]"><Trophy size={14} className="text-amber-500" /><span className="font-medium text-slate-600">{ach.rank} Rank</span></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50"><p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed italic">"{ach.description}"</p></div>
                <div className="mt-4 flex justify-between items-center"><div className="flex gap-2"><button onClick={() => handleOpenEdit(ach)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button><button onClick={() => openDeleteConfirmation(ach)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button></div><span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-[6px] border border-slate-100">{ach.year}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Modify Achievement File' : 'Compose Success Story'}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]">Cancel</button>
            <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all text-[13px] shadow-sm"><Save size={18} /> {editingId ? 'Update Profile' : 'Publish Success'}</button>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2"><User size={14} /> Student Identity</div>
             <div className="flex gap-6 items-start">
               <div className="w-24 h-24 rounded-[14px] bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-300 shrink-0 relative overflow-hidden group shadow-sm">
                 {formData.photoUrl ? <img src={formData.photoUrl} className="w-full h-full object-cover" /> : <ImageIcon size={24} />}
               </div>
               <div className="flex-1 grid grid-cols-2 gap-4">
                 <div className="space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Legal Name *</label><input value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all" /></div>
                 <div className="space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Grade & Section *</label><input value={formData.classSection} onChange={e => setFormData({...formData, classSection: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all" /></div>
               </div>
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2"><Trophy size={14} /> Achievement Record</div>
             <div className="grid grid-cols-2 gap-4">
               <Dropdown 
                 label="Department" 
                 options={CATEGORY_OPTIONS} 
                 value={formData.category} 
                 onChange={(val) => setFormData({...formData, category: val as AchievementCategory})} 
               />
               <div className="space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Calendar Year</label><input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all" /></div>
               <div className="col-span-2 space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Honorific Title *</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all font-medium" /></div>
               <div className="space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Competition Scope</label><input value={formData.competitionName} onChange={e => setFormData({...formData, competitionName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all" /></div>
               <div className="space-y-1.5"><label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Outcome / Rank</label><input value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all" /></div>
             </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-slate-100">
             <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest ml-0.5">Narrative Citation</label>
             <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-600 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all resize-none leading-relaxed" />
          </div>

          <div className="flex gap-8 pt-4">
             <div className="flex items-center gap-3"><button type="button" onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})} className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${formData.isFeatured ? 'bg-amber-500' : 'bg-slate-300'}`}><div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.isFeatured ? 'left-5.5' : 'left-0.5'}`} /></button><span className="text-[12px] font-medium text-slate-600 tracking-wide uppercase">Feature prominently</span></div>
             <div className="flex items-center gap-3"><button type="button" onClick={() => setFormData({...formData, isActive: !formData.isActive})} className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}><div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-5.5' : 'left-0.5'}`} /></button><span className="text-[12px] font-medium text-slate-600 tracking-wide uppercase">System Activation</span></div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Achievement Profile?"
        footer={
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="bg-rose-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-rose-700 transition-all text-[13px] shadow-sm"
            >
              <Trash2 size={18} /> Yes, delete
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center space-y-4 py-4">
           <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 animate-pulse">
              <AlertTriangle size={32} />
           </div>
           <div>
              <h4 className="text-[18px] font-bold text-slate-900">Are you sure?</h4>
              <p className="text-[14px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                You are about to permanently remove the achievement profile for <span className="font-bold text-slate-800">"{achToDelete?.studentName}"</span>. This action cannot be undone.
              </p>
           </div>
           <div className="w-full bg-slate-50 border border-slate-100 rounded-[12px] p-4 flex items-start gap-3 text-left">
              <Info size={16} className="text-slate-400 mt-0.5" />
              <p className="text-[12px] text-slate-400 font-medium">
                The record will be removed from the school website and internal success archives.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Achievements;
