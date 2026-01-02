
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Soft Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Container: 18px Radius */}
      <div className="relative bg-white rounded-[18px] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center bg-white shrink-0 border-b border-slate-100">
          <h3 className="text-[18px] font-semibold text-slate-900 tracking-tight">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 rounded-[10px] hover:bg-slate-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content with Inter typography */}
        <div className="p-8 overflow-y-auto bg-white custom-scrollbar">
          <div className="font-normal text-slate-700 text-[14px] leading-relaxed">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/50 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
