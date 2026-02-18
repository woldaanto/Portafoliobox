
import React, { useState } from 'react';
import { AppState, FontType } from '../types';
import { refineContent } from '../services/geminiService';

interface EditorProps {
  state: AppState;
  updateState: (newState: Partial<AppState>) => void;
  onClose: () => void;
}

const EditorDrawer: React.FC<EditorProps> = ({ state, updateState, onClose }) => {
  const [isRefining, setIsRefining] = useState(false);

  const handleRefineBio = async () => {
    setIsRefining(true);
    const newBio = await refineContent(state.bio, 'artistic');
    updateState({ bio: newBio });
    setIsRefining(false);
  };

  const fonts: { id: FontType; name: string }[] = [
    { id: 'font-italiana', name: 'Italiana (Serif)' },
    { id: 'font-playfair', name: 'Playfair (Classic)' },
    { id: 'font-inter', name: 'Inter (Modern Sans)' },
    { id: 'font-space', name: 'Space Grotesk (Tech)' },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[100] p-8 flex flex-col animate-slide-in-right overflow-y-auto">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-sm uppercase tracking-widest font-black">Design Studio</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="space-y-12 pb-12">
        {/* Profile Section */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Profile Identity</label>
          <input 
            type="text" 
            value={state.name} 
            onChange={(e) => updateState({ name: e.target.value })}
            className="w-full border-b border-black/10 py-2 focus:outline-none focus:border-black font-medium"
          />
          <div className="relative">
            <textarea 
              value={state.bio} 
              onChange={(e) => updateState({ bio: e.target.value })}
              className="w-full border border-black/10 p-4 min-h-[120px] focus:outline-none focus:border-black text-sm leading-relaxed"
            />
            <button 
              onClick={handleRefineBio}
              disabled={isRefining}
              className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-lg text-[8px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
            >
              {isRefining ? '...' : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
                  AI Refine
                </>
              )}
            </button>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Typography (Headings)</label>
          <div className="grid grid-cols-2 gap-2">
            {fonts.map((f) => (
              <button 
                key={f.id}
                onClick={() => updateState({ theme: { ...state.theme, headingFont: f.id } })}
                className={`p-3 text-[10px] border transition-all ${state.theme.headingFont === f.id ? 'border-black bg-black text-white' : 'border-gray-100 hover:border-black/20'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Layout System */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Curation Style</label>
          <div className="flex flex-col gap-2">
            {(['minimal', 'grid', 'dossier'] as const).map((l) => (
              <button 
                key={l}
                onClick={() => updateState({ theme: { ...state.theme, layout: l } })}
                className={`p-4 text-xs uppercase tracking-widest flex justify-between items-center border transition-all ${state.theme.layout === l ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                {l}
                {state.theme.layout === l && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Colors Section */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Atmosphere (Theme)</label>
          <div className="grid grid-cols-4 gap-4">
            {[
              { bg: '#ffffff', text: '#1a1a1a', name: 'Alabaster' },
              { bg: '#1a1a1a', text: '#ffffff', name: 'Obsidian' },
              { bg: '#f4f1ea', text: '#2c2c2c', name: 'Parchment' },
              { bg: '#eef2ff', text: '#1e1b4b', name: 'Azure' },
            ].map((c, i) => (
              <button 
                key={i}
                onClick={() => updateState({ theme: { ...state.theme, backgroundColor: c.bg, textColor: c.text } })}
                className="w-full aspect-square border-2 border-transparent hover:border-black transition-all rounded-full overflow-hidden"
                title={c.name}
                style={{ backgroundColor: c.bg }}
              >
                <div className="w-1/2 h-full" style={{ backgroundColor: c.text }}></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-black/5">
        <button 
          onClick={onClose}
          className="w-full bg-black text-white py-4 rounded-xl text-sm font-bold shadow-xl hover:translate-y-[-2px] transition-all"
        >
          Publish Changes
        </button>
      </div>
    </div>
  );
};

export default EditorDrawer;
