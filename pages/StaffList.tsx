
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  User, 
  Shield, 
  Trash2, 
  Edit2, 
  GripVertical, 
  CheckCircle, 
  XCircle,
  Save,
  Image as ImageIcon,
  Hash,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Staff, Role } from '../types';
import Modal from '../components/Modal';

const INITIAL_FORM: Partial<Staff> = {
  name: '',
  role: '',
  photoUrl: '',
  isActive: true,
  order: 1
};

interface StaffListProps {
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  role: Role;
}

const StaffList: React.FC<StaffListProps> = ({ staff, setStaff, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<Partial<Staff>>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Staff name is required';
    if (!formData.role?.trim()) newErrors.role = 'Designation/Role is required';
    if (formData.order === undefined || formData.order < 1) newErrors.order = 'Valid display order is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...INITIAL_FORM,
      order: staff.length + 1
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: Staff) => {
    setEditingId(member.id);
    setFormData(member);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editingId) {
      setStaff(prev => prev.map(s => s.id === editingId ? { ...s, ...formData } as Staff : s));
    } else {
      const newMember: Staff = {
        id: Date.now().toString(),
        ...formData,
      } as Staff;
      setStaff(prev => [...prev, newMember]);
    }
    setIsModalOpen(false);
  };

  const openDeleteConfirmation = (member: Staff) => {
    setStaffToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(prev => prev.filter(s => s.id !== staffToDelete.id));
      setIsDeleteModalOpen(false);
      setStaffToDelete(null);
    }
  };

  const toggleStaffStatus = (id: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const sortedStaff = [...staff].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Staff Management</h1>
          <p className="text-slate-500 text-[14px] font-medium">Configure faculty profile and display order</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Add Staff Member
        </button>
      </div>

      <div className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="relative w-full md:w-72 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
             <input type="text" placeholder="Filter staff..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-[10px] text-[14px] outline-none font-normal text-slate-700 focus:border-blue-300" />
           </div>
           <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Web Active</span>
              <span className="flex items-center gap-1.5"><XCircle size={14} className="text-slate-300" /> Hidden</span>
           </div>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedStaff.length === 0 ? (
            <div className="p-20 text-center">
               <User className="mx-auto text-slate-200 mb-4" size={40} />
               <p className="text-slate-400 font-medium text-[14px]">No staff records yet</p>
               <button onClick={handleOpenAdd} className="text-blue-600 text-[12px] font-medium mt-2 hover:underline">Click to add your first member</button>
            </div>
          ) : (
            sortedStaff.map((member, i) => (
              <div key={member.id} className={`p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'} hover:bg-blue-50/30 flex items-center gap-6 group transition-colors ${!member.isActive ? 'opacity-60' : ''}`}>
                <div className="text-slate-300 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={18} />
                </div>
                
                <div className="w-11 h-11 rounded-[10px] overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={20} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-[14px] truncate ${member.isActive ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mt-0.5 truncate">{member.role}</p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="hidden md:block text-right">
                     <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Index</p>
                     <p className="text-[14px] font-semibold text-slate-600">#{member.order}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleStaffStatus(member.id)}
                      className={`px-3 py-1.5 rounded-[8px] text-[11px] font-medium uppercase tracking-wider transition-all border ${
                        member.isActive 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {member.isActive ? 'Active' : 'Hidden'}
                    </button>
                    
                    <button 
                      onClick={() => handleOpenEdit(member)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-[8px] transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => openDeleteConfirmation(member)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[8px] transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-blue-50/50 p-6 rounded-[14px] border border-blue-100 flex gap-4">
         <Shield className="text-blue-600 shrink-0" size={24} />
         <div>
            <h4 className="font-medium text-blue-900 text-[14px]">Privileged Access Only</h4>
            <p className="text-[12px] text-blue-800/70 mt-1 leading-relaxed font-medium">
              Only System Administrators can manage the staff registry. Changes made here impact the credibility and structure of the school's public presence.
            </p>
         </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Staff Profile' : 'New Staff Registration'}
        footer={
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all text-[13px] shadow-sm"
            >
              <Save size={18} /> {editingId ? 'Update Profile' : 'Register Member'}
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2">
               <User size={14} /> Identity Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Full Name *</label>
                <input 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] font-normal text-slate-700 outline-none focus:border-blue-300 transition-all" 
                  placeholder="e.g. Dr. John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Designation *</label>
                <input 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] font-normal text-slate-700 outline-none focus:border-blue-300 transition-all" 
                  placeholder="e.g. Senior Faculty"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2">
               <ImageIcon size={14} /> Profile Media
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[12px] bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-300 shrink-0 relative overflow-hidden group">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} className="w-full h-full object-cover" />
                ) : (
                  <User size={24} />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Plus size={20} className="text-slate-600" />
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Public Photo URL</label>
                <input 
                  value={formData.photoUrl}
                  onChange={e => setFormData({...formData, photoUrl: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-[12px] text-[13px] text-slate-600 outline-none focus:border-blue-300" 
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest">
               <Hash size={14} /> Display Configuration
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
               <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Sort Index (1 is first)</label>
                  <input 
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 1})}
                    className="w-24 px-4 py-2 bg-white border border-slate-200 rounded-[12px] text-[14px] font-semibold text-slate-700 outline-none focus:border-blue-300" 
                  />
               </div>
               
               <div className="flex items-center gap-4 mb-1">
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, isActive: !prev.isActive}))}
                    className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-5.5' : 'left-0.5'}`} />
                  </button>
                  <span className="text-[12px] font-medium text-slate-600">
                    {formData.isActive ? 'Profile Visible' : 'Profile Hidden'}
                  </span>
               </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Staff Profile?"
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
              <h4 className="text-[18px] font-bold text-slate-900">Confirm HR Record Removal</h4>
              <p className="text-[14px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                You are about to remove <span className="font-bold text-slate-800">"{staffToDelete?.name}"</span> from the faculty registry. This action is irreversible.
              </p>
           </div>
           <div className="w-full bg-slate-50 border border-slate-100 rounded-[12px] p-4 flex items-start gap-3 text-left">
              <Info size={16} className="text-slate-400 mt-0.5" />
              <p className="text-[12px] text-slate-400 font-medium">
                The profile will be instantly purged from the public staff list and internal administration records.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default StaffList;
