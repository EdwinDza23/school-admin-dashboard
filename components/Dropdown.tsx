
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  isMulti?: boolean;
  error?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  isMulti = false,
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const removeValue = (e: React.MouseEvent, valToRemove: string) => {
    e.stopPropagation();
    if (isMulti && Array.isArray(value)) {
      onChange(value.filter((v) => v !== valToRemove));
    }
  };

  const getDisplayValue = () => {
    if (isMulti) {
      const selected = Array.isArray(value) ? value : [];
      if (selected.length === 0) return <span className="text-slate-400">{placeholder}</span>;
      
      const visibleItems = selected.slice(0, 2);
      const remainingCount = selected.length - visibleItems.length;

      return (
        <div className="flex flex-wrap gap-1.5 items-center">
          {visibleItems.map((val) => {
            const option = options.find((o) => o.value === val);
            return (
              <span 
                key={val} 
                className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-[8px] text-[12px] font-medium border border-blue-100 transition-colors"
              >
                {option?.label || val}
                <X 
                  size={12} 
                  className="cursor-pointer hover:text-blue-900" 
                  onClick={(e) => removeValue(e, val)} 
                />
              </span>
            );
          })}
          {remainingCount > 0 && (
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider ml-1">
              +{remainingCount} more
            </span>
          )}
        </div>
      );
    }

    const selectedOption = options.find((o) => o.value === value);
    return selectedOption ? (
      <span className="text-slate-800 font-medium">{selectedOption.label}</span>
    ) : (
      <span className="text-slate-400">{placeholder}</span>
    );
  };

  return (
    <div className={`space-y-1.5 w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block ml-0.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            min-h-[44px] px-4 py-2 bg-white border rounded-[12px] flex items-center justify-between cursor-pointer transition-all duration-200
            ${isOpen ? 'border-blue-600 ring-4 ring-blue-50' : error ? 'border-rose-300' : 'border-slate-200 hover:border-slate-300 shadow-sm'}
          `}
        >
          <div className="flex-1 truncate">
            {getDisplayValue()}
          </div>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-[14px] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top">
            <div className="max-h-[250px] overflow-y-auto py-1.5 custom-scrollbar">
              {options.length === 0 ? (
                <div className="px-4 py-3 text-[13px] text-slate-400 italic text-center">
                  No options available
                </div>
              ) : (
                options.map((option) => {
                  const isSelected = isMulti 
                    ? (Array.isArray(value) && value.includes(option.value))
                    : value === option.value;

                  return (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`
                        px-4 py-2.5 flex items-center justify-between text-[14px] cursor-pointer transition-colors
                        ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'}
                      `}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check size={14} className="text-blue-600" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-[10px] text-rose-500 font-medium ml-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
