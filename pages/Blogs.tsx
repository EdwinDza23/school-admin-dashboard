
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Edit3, 
  Archive, 
  Save, 
  User, 
  Image as ImageIcon, 
  Tag, 
  X,
  AlertCircle,
  Layout,
  AlertTriangle,
  Info,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { BlogPost, Role } from '../types';
import Modal from '../components/Modal';
import Dropdown, { DropdownOption } from '../components/Dropdown';
import RichTextEditor from '../components/RichTextEditor';

const INITIAL_FORM: Partial<BlogPost> = {
  title: '',
  excerpt: '',
  content: '<h1>Enter your headline</h1><p>Start writing your institutional article here...</p>',
  category: 'General',
  additionalCategories: [],
  authorName: '',
  authorRole: '',
  publishDate: new Date().toISOString().split('T')[0],
  readTime: '5 min',
  coverImageUrl: '',
  isPublished: false,
};

const CATEGORIES: DropdownOption[] = [
  { label: 'General News', value: 'General' },
  { label: 'Academic Excellence', value: 'Education' },
  { label: 'STEM & Tech', value: 'STEM' },
  { label: 'Campus Happenings', value: 'Campus Life' },
  { label: 'Athletics & Sports', value: 'Sports' },
  { label: 'Faculty Insights', value: 'Staff Focus' }
];

const TAG_OPTIONS: DropdownOption[] = [
  { label: 'Workshop', value: 'Workshop' },
  { label: 'Webinar', value: 'Webinar' },
  { label: 'Exhibition', value: 'Exhibition' },
  { label: 'Award', value: 'Award' },
  { label: 'Conference', value: 'Conference' },
  { label: 'Alumni', value: 'Alumni' },
  { label: 'Competition', value: 'Competition' }
];

interface BlogsProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  role: Role;
}

const convertToParagraphArray = (html: string): string[] => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const paragraphs: string[] = [];
  const nodes = div.childNodes;
  nodes.forEach(node => {
    const text = node.textContent?.trim();
    if (text) paragraphs.push(text);
  });
  if (paragraphs.length === 0 && html.trim()) {
    return html.split(/<p>|<div>|<br>|<\/p>|<\/div>|<li>|<\/li>/)
      .map(p => p.replace(/<[^>]*>/g, '').trim())
      .filter(p => p.length > 0);
  }
  return paragraphs;
};

const Blogs: React.FC<BlogsProps> = ({ blogs, setBlogs, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDataPreview, setShowDataPreview] = useState(false);

  const publishedCount = useMemo(() => blogs.filter(b => b.isPublished).length, [blogs]);
  const paragraphArrayPreview = useMemo(() => convertToParagraphArray(formData.content || ''), [formData.content]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt?.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.coverImageUrl?.trim()) newErrors.coverImageUrl = 'Cover Image URL is required';
    if (!formData.authorName?.trim()) newErrors.authorName = 'Author Name is required';
    if (!formData.authorRole?.trim()) newErrors.authorRole = 'Author Role is required';
    if (!formData.publishDate) newErrors.publishDate = 'Publish Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData(blog);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!validate()) {
      // Small visual indicator or scroll to error could be added here
      return;
    }

    if (formData.isPublished) {
      const isCurrentlyPublished = blogs.find(b => b.id === editingId)?.isPublished;
      if (!isCurrentlyPublished && publishedCount >= 6) {
        alert('Institutional Limit: Maximum of 6 active publications allowed.');
        return;
      }
    }

    if (editingId) {
      setBlogs(prev => prev.map(b => b.id === editingId ? { ...b, ...formData } as BlogPost : b));
    } else {
      const newBlog: BlogPost = { id: Date.now().toString(), ...formData } as BlogPost;
      setBlogs(prev => [newBlog, ...prev]);
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Blog Repository</h1>
          <p className="text-slate-500 text-[14px] font-medium">Manage institutional news and faculty insights</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm">
          <Plus size={18} /> Compose Article
        </button>
      </div>

      <div className={`p-4 rounded-[14px] flex items-center gap-3 border transition-colors ${publishedCount >= 6 ? 'bg-rose-50 border-rose-100' : 'bg-blue-50 border-blue-100'}`}>
         <div className={`p-2 rounded-[8px] text-white ${publishedCount >= 6 ? 'bg-rose-500' : 'bg-blue-600'}`}>
            <AlertCircle size={18} />
         </div>
         <p className={`text-[13px] font-medium ${publishedCount >= 6 ? 'text-rose-900' : 'text-blue-900'}`}>
           {publishedCount >= 6 
            ? <span className="font-semibold text-rose-600 uppercase tracking-wide mr-2">Limit Reached:</span> 
            : <span className="font-semibold text-blue-600 uppercase tracking-wide mr-2">Capacity Check:</span>
           } {publishedCount} / 6 active publications allowed.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-[14px] border border-slate-200 overflow-hidden group shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col">
             <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                {blog.coverImageUrl ? (
                  <img src={blog.coverImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon size={40} />
                  </div>
                )}
             </div>
             
             <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                   <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-slate-100">
                      {blog.category}
                   </span>
                   <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                      <Calendar size={12} />
                      {formatDate(blog.publishDate)}
                   </div>
                </div>

                <h3 className="text-[16px] font-medium text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 flex-1">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                   <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img src={blog.authorImageUrl || `https://ui-avatars.com/api/?name=${blog.authorName}&background=random`} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div className="min-w-0">
                      <p className="text-[12px] font-medium text-slate-700 truncate">{blog.authorName}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight truncate">{blog.authorRole}</p>
                   </div>
                   <div className="ml-auto flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Clock size={12} />
                      <span>{blog.readTime}</span>
                   </div>
                </div>
             </div>

             <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border transition-colors ${
                  blog.isPublished 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {blog.isPublished ? (
                    <>
                      <CheckCircle2 size={10} />
                      Published
                    </>
                  ) : (
                    <>
                      <FileText size={10} />
                      Draft
                    </>
                  )}
                </span>

                <div className="flex items-center gap-1">
                   <button 
                     onClick={() => handleOpenEdit(blog)}
                     className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                     title="Edit Post"
                   >
                     <Edit3 size={16} />
                   </button>
                   <button 
                     onClick={() => { setBlogToDelete(blog); setIsDeleteModalOpen(true); }}
                     className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                     title="Delete Post"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? 'Modify Article' : 'Compose New Article'}
        footer={
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
               <button 
                 type="button" 
                 onClick={() => setFormData(prev => ({...prev, isPublished: !prev.isPublished}))} 
                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.isPublished ? 'bg-blue-600' : 'bg-slate-200'}`}
               >
                 <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
               </button>
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                 {formData.isPublished ? 'Live Publication' : 'Private Draft'}
               </span>
            </div>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={closeModal} 
                className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSave} 
                className="bg-blue-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all text-[13px] shadow-sm"
              >
                <Save size={18} /> {editingId ? 'Save Changes' : 'Create Article'}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-10">
          {Object.keys(errors).length > 0 && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-[12px] flex items-start gap-3 text-rose-600 animate-in fade-in duration-300">
               <AlertCircle size={18} className="shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <p className="text-[13px] font-bold uppercase tracking-wider">Missing Required Information</p>
                 <p className="text-[12px] font-medium opacity-80 leading-relaxed">Please ensure all starred fields are populated before committing the article to the repository.</p>
               </div>
            </div>
          )}

          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-slate-50 pb-2">
               <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest">
                 <FileText size={14} /> Global Settings
               </div>
               <button 
                 type="button" 
                 onClick={() => setShowDataPreview(!showDataPreview)} 
                 className={`flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-all ${showDataPreview ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
               >
                 <Layout size={12} /> Internal Array View
               </button>
             </div>
             
             {showDataPreview && (
                <div className="bg-slate-900 rounded-[12px] p-6 font-mono text-[12px] text-blue-300 animate-in slide-in-from-top-2 duration-300 overflow-x-auto">
                   <div className="flex items-center gap-2 text-blue-400 mb-4 pb-2 border-b border-blue-900/50">
                     <AlertCircle size={14} />
                     <span className="uppercase tracking-widest font-bold">CMS Export Schema Simulator</span>
                   </div>
                   <div className="space-y-1">
                     <span className="text-pink-400">const</span> <span className="text-yellow-400">contentBlocks</span> = [{paragraphArrayPreview.map((p, i) => (
                       <div key={i} className="pl-4">
                         <span className="text-green-400">"{p}"</span>{i < paragraphArrayPreview.length - 1 ? ',' : ''}
                       </div>
                     ))}];
                   </div>
                </div>
             )}

             <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Article Headline *</label>
                  <input 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    className={`w-full px-4 py-2.5 bg-white border rounded-[12px] text-[15px] font-medium text-slate-800 outline-none transition-all ${errors.title ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus:border-blue-400 shadow-sm focus:ring-4 focus:ring-blue-50'}`} 
                    placeholder="Article title..." 
                  />
                  {errors.title && <p className="text-[10px] text-rose-500 font-medium ml-1">{errors.title}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex justify-between ml-0.5">
                    Search Engine Abstract * 
                    <span className="text-slate-300 lowercase italic font-normal">{formData.excerpt?.length || 0} chars</span>
                  </label>
                  <textarea 
                    rows={2} 
                    value={formData.excerpt} 
                    onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                    className={`w-full px-4 py-2.5 bg-white border rounded-[12px] text-[13px] text-slate-600 outline-none resize-none leading-relaxed transition-all ${errors.excerpt ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus:border-blue-400 shadow-sm focus:ring-4 focus:ring-blue-50'}`} 
                    placeholder="Short summary for indexing..." 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Cover Asset URL *</label>
                  <input 
                    value={formData.coverImageUrl} 
                    onChange={e => setFormData({...formData, coverImageUrl: e.target.value})} 
                    className={`w-full px-4 py-2.5 bg-white border rounded-[12px] text-[13px] text-slate-600 outline-none transition-all ${errors.coverImageUrl ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus:border-blue-400 shadow-sm focus:ring-4 focus:ring-blue-50'}`} 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2">
               <Edit3 size={14} /> Institutional Editorial Content
             </div>
             <RichTextEditor 
               value={formData.content || ''} 
               onChange={(html) => setFormData({...formData, content: html})} 
               error={!!errors.content} 
               placeholder="Compose your article with headings, lists, and formatting..."
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-slate-100">
             <div className="space-y-6">
                <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2">
                  <Tag size={14} /> Pillars & Taxonomy
                </div>
                <div className="space-y-4">
                  <Dropdown 
                    label="Primary Pillar" 
                    options={CATEGORIES} 
                    value={formData.category} 
                    onChange={(val) => setFormData({...formData, category: val})} 
                  />
                  <Dropdown 
                    label="Sub-Tags" 
                    options={TAG_OPTIONS} 
                    isMulti 
                    placeholder="Add tags..."
                    value={formData.additionalCategories} 
                    onChange={(val) => setFormData({...formData, additionalCategories: val})} 
                  />
                </div>
             </div>
             <div className="space-y-6">
                <div className="flex items-center gap-2 text-[11px] font-medium text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-2">
                  <User size={14} /> Scholarly Attribution
                </div>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Author Name *</label>
                        <input value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} className={`w-full px-4 py-2.5 bg-white border rounded-[12px] text-[13px] font-medium text-slate-700 outline-none transition-all ${errors.authorName ? 'border-rose-300' : 'border-slate-200 focus:border-blue-300 shadow-sm'}`} placeholder="Name" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Author Role *</label>
                        <input value={formData.authorRole} onChange={e => setFormData({...formData, authorRole: e.target.value})} className={`w-full px-4 py-2.5 bg-white border rounded-[12px] text-[13px] font-medium text-slate-700 outline-none transition-all ${errors.authorRole ? 'border-rose-300' : 'border-slate-200 focus:border-blue-300 shadow-sm'}`} placeholder="Role" />
                      </div>
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-0.5">Author Avatar URL</label>
                     <input value={formData.authorImageUrl} onChange={e => setFormData({...formData, authorImageUrl: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-[12px] text-[13px] text-slate-500 outline-none focus:border-blue-400 shadow-sm" placeholder="Profile image URL" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Blog Post?"
        footer={
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                if (blogToDelete) {
                  setBlogs(prev => prev.filter(b => b.id !== blogToDelete.id));
                  setIsDeleteModalOpen(false);
                  setBlogToDelete(null);
                }
              }}
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
                Deleting <span className="font-bold text-slate-800">"{blogToDelete?.title}"</span> will permanently remove it from the system.
              </p>
           </div>
           <div className="w-full bg-slate-50 border border-slate-100 rounded-[12px] p-4 flex items-start gap-3 text-left">
              <Info size={16} className="text-slate-400 mt-0.5" />
              <p className="text-[12px] text-slate-400 font-medium">
                This action is irreversible. The content will be purged from both the admin repository and the public-facing website.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Blogs;
