
import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, CheckCircle, Folder, Save, X, AlertTriangle, Info } from 'lucide-react';
import { GalleryImage, Role } from '../types';
import { GALLERY_CATEGORIES } from '../constants';
import Modal from '../components/Modal';
import Dropdown, { DropdownOption } from '../components/Dropdown';

interface GalleryProps {
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  role: Role;
}

const Gallery: React.FC<GalleryProps> = ({ gallery, setGallery, role }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imgToDelete, setImgToDelete] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    url: '',
    category: GALLERY_CATEGORIES[0]
  });

  const categoryOptions: DropdownOption[] = useMemo(() => 
    GALLERY_CATEGORIES.map(cat => ({ label: cat, value: cat })), 
  []);

  const filteredGallery = useMemo(() => {
    if (activeFilter === 'All') return gallery;
    return gallery.filter(img => img.category === activeFilter);
  }, [gallery, activeFilter]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ url: '', category: GALLERY_CATEGORIES[0] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setFormData(img);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.url) return;
    if (editingId) {
      setGallery(prev => prev.map(img => img.id === editingId ? { ...img, ...formData } as GalleryImage : img));
    } else {
      const newImg: GalleryImage = {
        id: Date.now().toString(),
        url: formData.url as string,
        category: formData.category as string,
      };
      setGallery(prev => [newImg, ...prev]);
    }
    setIsModalOpen(false);
  };

  const openDeleteConfirmation = (img: GalleryImage) => {
    setImgToDelete(img);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (imgToDelete) {
      setGallery(prev => prev.filter(img => img.id !== imgToDelete.id));
      setIsDeleteModalOpen(false);
      setImgToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Media Repository</h1>
          <p className="text-slate-500 text-[14px] font-medium">Curate and publish high-fidelity institutional photography</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Add Media Asset
        </button>
      </div>

      <div className="bg-white p-2 rounded-[14px] border border-slate-200 flex overflow-x-auto gap-1 shadow-sm no-scrollbar">
         {['All', ...GALLERY_CATEGORIES].map((cat) => (
           <button 
             key={cat} 
             onClick={() => setActiveFilter(cat)}
             className={`whitespace-nowrap px-5 py-2 rounded-[10px] text-[13px] font-medium tracking-wide transition-all ${activeFilter === cat ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      {filteredGallery.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[14px] py-32 text-center shadow-sm">
           <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[18px] flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-inner">
              <ImageIcon size={32} />
           </div>
           <h3 className="font-semibold text-slate-400 text-[16px]">No assets found in this category</h3>
           <p className="text-[13px] text-slate-300 mt-2 font-medium">Try changing your filter or add a new institutional photo.</p>
           <button onClick={handleOpenAdd} className="mt-6 text-blue-600 font-semibold text-[14px] hover:underline">Upload First Asset</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
           {filteredGallery.map(img => (
             <div key={img.id} className="aspect-square bg-slate-50 rounded-[14px] overflow-hidden relative group cursor-pointer border border-slate-200 shadow-sm">
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                   <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-[6px] border border-white/20 mb-4">
                      <Folder size={12} className="text-white" />
                      <span className="text-white text-[10px] font-semibold uppercase tracking-widest">{img.category}</span>
                   </div>
                   
                   <div className="flex gap-2">
                     <button 
                       onClick={(e) => { e.stopPropagation(); handleOpenEdit(img); }}
                       className="w-9 h-9 bg-white text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all shadow-xl"
                     >
                       <Edit2 size={16} />
                     </button>
                     <button 
                       onClick={(e) => { e.stopPropagation(); openDeleteConfirmation(img); }}
                       className="w-9 h-9 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-all shadow-xl"
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg border border-white/20">
                    <CheckCircle size={10} />
                  </div>
                </div>
             </div>
           ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Modify Media Asset' : 'Register New Visual Asset'}
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]">Cancel</button>
            <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all text-[13px] shadow-sm"><Save size={18} /> {editingId ? 'Commit Changes' : 'Publish Asset'}</button>
          </div>
        }
      >
        <div className="space-y-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2"><ImageIcon size={14} /> Asset Source</div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Image Source URL *</label>
                  <input value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-[12px] text-[14px] text-slate-700 outline-none focus:border-blue-300 shadow-sm" placeholder="https://..." />
                </div>
                {formData.url && (
                  <div className="aspect-video w-full rounded-[14px] overflow-hidden border border-slate-200 bg-slate-50 relative group">
                    <img src={formData.url} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
           </div>

           <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2"><Folder size={14} /> Classification</div>
              <Dropdown 
                label="Predefined Category *" 
                options={categoryOptions} 
                value={formData.category} 
                onChange={(val) => setFormData({...formData, category: val})} 
              />
              <p className="text-[11px] text-slate-400 italic mt-2">Assets are categorized to power specific sections of the school website.</p>
           </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Media Asset?"
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
              <h4 className="text-[18px] font-bold text-slate-900">Confirm Asset Removal</h4>
              <p className="text-[14px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                You are about to permanently purge this media asset from the institutional repository. This action is irreversible.
              </p>
           </div>
           {imgToDelete && (
             <div className="w-32 h-32 rounded-[12px] overflow-hidden border border-slate-200 shadow-sm">
                <img src={imgToDelete.url} className="w-full h-full object-cover" alt="Preview" />
             </div>
           )}
           <div className="w-full bg-slate-50 border border-slate-100 rounded-[12px] p-4 flex items-start gap-3 text-left">
              <Info size={16} className="text-slate-400 mt-0.5" />
              <p className="text-[12px] text-slate-400 font-medium">
                Once deleted, the image will no longer appear on the website and its URL will become invalid.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
