
import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Type, Link as LinkIcon, 
  RotateCcw, RotateCw, Eraser, ChevronDown, 
  Palette, Highlighter, Plus
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Start writing your editorial content...",
  error 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  // Sync external value with editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string, val: string = '') => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('strikethrough')) formats.push('strikethrough');
    if (document.queryCommandState('insertUnorderedList')) formats.push('bullet');
    if (document.queryCommandState('insertOrderedList')) formats.push('ordered');
    setActiveFormats(formats);
  };

  const handleLink = () => {
    const url = prompt('Enter the destination URL:', 'https://');
    if (url) execCommand('createLink', url);
  };

  const ToolbarButton = ({ 
    icon: Icon, 
    cmd, 
    val = '', 
    active = false, 
    title 
  }: { 
    icon: any, 
    cmd?: string, 
    val?: string, 
    active?: boolean, 
    title: string 
  }) => (
    <button
      type="button"
      onClick={() => cmd ? (cmd === 'link' ? handleLink() : execCommand(cmd, val)) : null}
      className={`p-2 rounded-[8px] transition-all flex items-center justify-center
        ${active 
          ? 'bg-blue-600 text-white shadow-sm' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }`}
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  const Separator = () => <div className="w-[1px] h-4 bg-slate-200 mx-1" />;

  return (
    <div className={`flex flex-col bg-white border rounded-[14px] overflow-hidden transition-all duration-300
      ${error 
        ? 'border-rose-300 ring-4 ring-rose-50' 
        : 'border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 focus-within:shadow-lg'
      }`}>
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/80 border-b border-slate-100 sticky top-0 z-10 backdrop-blur-md">
        {/* History */}
        <ToolbarButton icon={RotateCcw} cmd="undo" title="Undo" />
        <ToolbarButton icon={RotateCw} cmd="redo" title="Redo" />
        <Separator />

        {/* Text Block Dropdown Simulation */}
        <div className="relative group">
          <button type="button" className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-[12px] font-semibold text-slate-600 hover:bg-slate-100">
            <Type size={14} /> Style <ChevronDown size={12} />
          </button>
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-[12px] shadow-xl py-1 hidden group-hover:block z-20">
            <button type="button" onClick={() => execCommand('formatBlock', '<h1>')} className="w-full text-left px-4 py-2 text-[14px] font-bold hover:bg-slate-50">Heading 1</button>
            <button type="button" onClick={() => execCommand('formatBlock', '<h2>')} className="w-full text-left px-4 py-2 text-[14px] font-semibold hover:bg-slate-50">Heading 2</button>
            <button type="button" onClick={() => execCommand('formatBlock', '<h3>')} className="w-full text-left px-4 py-2 text-[14px] font-medium hover:bg-slate-50">Heading 3</button>
            <button type="button" onClick={() => execCommand('formatBlock', '<p>')} className="w-full text-left px-4 py-2 text-[14px] hover:bg-slate-50">Paragraph</button>
          </div>
        </div>
        <Separator />

        {/* Basic Styles */}
        <ToolbarButton icon={Bold} cmd="bold" active={activeFormats.includes('bold')} title="Bold" />
        <ToolbarButton icon={Italic} cmd="italic" active={activeFormats.includes('italic')} title="Italic" />
        <ToolbarButton icon={Underline} cmd="underline" active={activeFormats.includes('underline')} title="Underline" />
        <ToolbarButton icon={Strikethrough} cmd="strikethrough" active={activeFormats.includes('strikethrough')} title="Strikethrough" />
        <Separator />

        {/* Alignment */}
        <ToolbarButton icon={AlignLeft} cmd="justifyLeft" title="Align Left" />
        <ToolbarButton icon={AlignCenter} cmd="justifyCenter" title="Align Center" />
        <ToolbarButton icon={AlignRight} cmd="justifyRight" title="Align Right" />
        <ToolbarButton icon={AlignJustify} cmd="justifyFull" title="Justify" />
        <Separator />

        {/* Lists */}
        <ToolbarButton icon={List} cmd="insertUnorderedList" active={activeFormats.includes('bullet')} title="Bullet List" />
        <ToolbarButton icon={ListOrdered} cmd="insertOrderedList" active={activeFormats.includes('ordered')} title="Numbered List" />
        <Separator />

        {/* Colors */}
        <div className="relative group">
          <button type="button" className="p-2 rounded-[8px] text-slate-500 hover:bg-slate-100" title="Text Color">
            <Palette size={16} />
          </button>
          <div className="absolute top-full left-0 mt-1 grid grid-cols-4 gap-1 p-2 bg-white border border-slate-200 rounded-[12px] shadow-xl hidden group-hover:grid z-20">
            {['#000000', '#2563EB', '#DC2626', '#16A34A', '#F59E0B', '#64748B', '#7C3AED', '#DB2777'].map(color => (
              <button key={color} type="button" onClick={() => execCommand('foreColor', color)} className="w-5 h-5 rounded-full border border-slate-200" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <ToolbarButton icon={Highlighter} cmd="hiliteColor" val="#FEF9C3" title="Highlight Text" />
        <Separator />

        {/* Insert & Clean */}
        <ToolbarButton icon={LinkIcon} cmd="link" title="Insert Link" />
        <ToolbarButton icon={Eraser} cmd="removeFormat" title="Clear Formatting" />
      </div>

      {/* Content Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        className="p-8 min-h-[450px] outline-none text-[15px] text-slate-700 leading-[1.6] bg-white prose prose-slate max-w-none 
          [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-slate-900
          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:text-slate-800
          [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-3 [&>h3]:text-slate-800
          [&>p]:mb-4 [&>p]:leading-relaxed
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
          [&>a]:text-blue-600 [&>a]:underline [&>a]:font-medium
          empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:pointer-events-none"
        data-placeholder={placeholder}
      />
      
      {/* Word Count / Footer */}
      <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
        <div className="flex gap-4">
          <span>HTML Editor Mode</span>
          <span>Draft Auto-saved</span>
        </div>
        <div className="flex gap-4">
          <span>Press Alt+0 for help</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
