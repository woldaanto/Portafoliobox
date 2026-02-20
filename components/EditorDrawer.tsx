
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
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-[9px] uppercase font-bold">
              <span>Heading Scale</span>
              <span>{state.theme.headingSize}vw</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="32" 
              value={state.theme.headingSize}
              onChange={(e) => updateState({ theme: { ...state.theme, headingSize: parseInt(e.target.value) } })}
              className="w-full accent-black"
            />
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
          <div className="grid grid-cols-5 gap-2">
            {[
              { bg: '#ffffff', text: '#1a1a1a', name: 'Alabaster' },
              { bg: '#1a1a1a', text: '#ffffff', name: 'Obsidian' },
              { bg: '#f4f1ea', text: '#2c2c2c', name: 'Parchment' },
              { bg: '#eef2ff', text: '#1e1b4b', name: 'Azure' },
              { bg: '#000000', text: '#00FF00', name: 'Matrix' },
            ].map((c, i) => (
              <button 
                key={i}
                onClick={() => updateState({ theme: { ...state.theme, backgroundColor: c.bg, textColor: c.text } })}
                className={`w-full aspect-square border-2 transition-all rounded-full overflow-hidden ${state.theme.backgroundColor === c.bg ? 'border-black' : 'border-transparent hover:border-black/20'}`}
                title={c.name}
                style={{ backgroundColor: c.bg }}
              >
                <div className="w-1/2 h-full" style={{ backgroundColor: c.text }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Windows & Layout Section */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Windows & Layout</label>
          <div className="space-y-2">
            {state.sections.map((section, index) => (
              <div key={section.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 group">
                <div className="flex flex-col gap-1">
                  <button 
                    disabled={index === 0}
                    onClick={() => {
                      const newSections = [...state.sections];
                      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
                      updateState({ sections: newSections });
                    }}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                  </button>
                  <button 
                    disabled={index === state.sections.length - 1}
                    onClick={() => {
                      const newSections = [...state.sections];
                      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
                      updateState({ sections: newSections });
                    }}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider flex-1">{section.title}</span>
                <button 
                  onClick={() => {
                    const newSections = state.sections.map(s => 
                      s.id === section.id ? { ...s, isVisible: !s.isVisible } : s
                    );
                    updateState({ sections: newSections });
                  }}
                  className={`w-10 h-5 rounded-full transition-all relative ${section.isVisible ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${section.isVisible ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cursor Design Section */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Cursor Design</label>
          <div className="grid grid-cols-3 gap-2">
            {(['default', 'circle', 'square', 'dot', 'crosshair'] as const).map((type) => (
              <button 
                key={type}
                onClick={() => updateState({ cursor: { ...state.cursor, type } })}
                className={`p-2 text-[9px] uppercase tracking-tighter border transition-all ${state.cursor.type === type ? 'bg-black text-white border-black' : 'bg-white border-gray-100'}`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {state.cursor.type !== 'default' && (
            <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] uppercase font-bold">
                  <span>Size</span>
                  <span>{state.cursor.size}px</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="100" 
                  value={state.cursor.size}
                  onChange={(e) => updateState({ cursor: { ...state.cursor, size: parseInt(e.target.value) } })}
                  className="w-full accent-black"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold">Color</label>
                <div className="flex gap-2">
                  {['#000000', '#ffffff', '#FF4D00', '#00FF00', '#0000FF'].map((color) => (
                    <button 
                      key={color}
                      onClick={() => updateState({ cursor: { ...state.cursor, color } })}
                      className={`w-6 h-6 rounded-full border ${state.cursor.color === color ? 'border-black scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input 
                    type="color" 
                    value={state.cursor.color}
                    onChange={(e) => updateState({ cursor: { ...state.cursor, color: e.target.value } })}
                    className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold">Blend Mode</label>
                <select 
                  value={state.cursor.mixBlendMode}
                  onChange={(e) => updateState({ cursor: { ...state.cursor, mixBlendMode: e.target.value as any } })}
                  className="w-full text-[10px] p-2 border border-gray-200 rounded focus:outline-none"
                >
                  <option value="normal">Normal</option>
                  <option value="difference">Difference</option>
                  <option value="exclusion">Exclusion</option>
                </select>
              </div>
            </div>
          )}
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
