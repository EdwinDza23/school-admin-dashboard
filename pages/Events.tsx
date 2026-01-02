
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Save, Calendar as CalendarIcon, AlertTriangle, Info } from 'lucide-react';
import { Event, Role } from '../types';
import Modal from '../components/Modal';

interface EventsProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  role: Role;
}

const Events: React.FC<EventsProps> = ({ events, setEvents, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const calculateStatus = (dateStr: string): 'Upcoming' | 'Ongoing' | 'Past' => {
    const today = new Date().toISOString().split('T')[0];
    if (dateStr === today) return 'Ongoing';
    return dateStr > today ? 'Upcoming' : 'Past';
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) return;

    const status = calculateStatus(formData.date);
    const updatedData = { ...formData, status } as Event;

    if (editingId) {
      setEvents(prev => prev.map(e => e.id === editingId ? updatedData : e));
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...updatedData,
      };
      setEvents(prev => [newEvent, ...prev]);
    }
    setIsModalOpen(false);
  };

  const openDeleteConfirmation = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(prev => prev.filter(e => e.id !== eventToDelete.id));
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Events Management</h1>
          <p className="text-slate-500 text-[14px] font-medium">Create and organize school calendar events</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded-[14px] border border-slate-200 flex flex-col md:flex-row gap-4 items-center shadow-sm">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Lookup events by title..." 
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] outline-none font-normal text-slate-700 focus:border-blue-300" 
            />
          </div>
        </div>

        <div className="bg-white rounded-[14px] border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-medium text-[11px] uppercase tracking-wider border-b border-slate-100">
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Event Details</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event, i) => (
                <tr key={event.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'} hover:bg-blue-50/30 transition-colors`}>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-[8px] text-[10px] font-medium uppercase tracking-wide inline-flex items-center gap-1.5 border ${
                      event.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      event.status === 'Ongoing' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <h4 className="font-medium text-slate-800 text-[14px] leading-tight">{event.title}</h4>
                    <p className="text-[12px] text-slate-400 mt-1 line-clamp-1">{event.description}</p>
                  </td>
                  <td className="px-8 py-5 text-slate-600 text-[13px] font-medium">
                    {event.date}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(event)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-[8px] transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteConfirmation(event)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[8px] transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Composition Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Event File' : 'Compose New Event'}
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
              <Save size={18} /> {editingId ? 'Update Event' : 'Commit Event'}
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Event Designation</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] font-normal text-slate-700 outline-none focus:border-blue-300 transition-all" 
              placeholder="e.g. Annual Cultural Meet"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Calendar Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] text-slate-700 outline-none focus:border-blue-300" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">System Status</label>
              <div className="h-10.5 px-4 flex items-center bg-slate-100 border border-slate-200 rounded-[10px] text-[12px] font-medium text-slate-500 uppercase tracking-wider">
                {calculateStatus(formData.date || '')}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Narrative Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[10px] text-[14px] text-slate-600 outline-none focus:border-blue-300 resize-none leading-relaxed" 
              placeholder="Provide a detailed summary for the horizontal scroll on the landing page..."
            ></textarea>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2.5 text-slate-500 font-medium hover:bg-slate-50 rounded-[10px] transition-colors text-[13px]"
            >
              Keep Event
            </button>
            <button 
              onClick={confirmDelete}
              className="bg-rose-600 text-white px-8 py-2.5 rounded-[10px] font-medium flex items-center gap-2 hover:bg-rose-700 transition-all text-[13px] shadow-sm"
            >
              <Trash2 size={18} /> Delete Permanently
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center space-y-4 py-4">
           <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 animate-pulse">
              <AlertTriangle size={32} />
           </div>
           <div>
              <h4 className="text-[18px] font-bold text-slate-900">Are you absolutely sure?</h4>
              <p className="text-[14px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                You are about to permanently remove <span className="font-bold text-slate-800">"{eventToDelete?.title}"</span> from the institutional calendar. This action cannot be undone.
              </p>
           </div>
           <div className="w-full bg-slate-50 border border-slate-100 rounded-[12px] p-4 flex items-start gap-3 text-left">
              <Info size={16} className="text-slate-400 mt-0.5" />
              <p className="text-[12px] text-slate-400 font-medium">
                Deleting this record will immediately unpublish it from the school's public website and archives.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Events;
