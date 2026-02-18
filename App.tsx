
import React, { useState, useEffect } from 'react';
import { AppState, Project } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EditorDrawer from './components/EditorDrawer';

const INITIAL_STATE: AppState = {
  name: "ALEXANDRE JOSEPH BELANGER",
  bio: "Fotógrafo y Director Visual basado en Montreal. Especializado en capturar la cotidianidad con una mirada editorial.",
  projects: [
    { id: '1', title: "Street Life", category: "Photo", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=1000", description: "", letter: "A" },
    { id: '2', title: "Geometry", category: "Photo", image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=1000", description: "", letter: "" },
    { id: '3', title: "Ecos", category: "Photo", image: "https://images.unsplash.com/photo-1492691523569-7379e4004211?auto=format&fit=crop&q=80&w=1000", description: "", letter: "J" },
    { id: '4', title: "Piel", category: "Photo", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000", description: "", letter: "B" },
  ],
  experiences: [],
  theme: {
    primaryColor: '#000000',
    backgroundColor: '#f2f2f2',
    textColor: '#000000',
    headingFont: 'font-inter',
    bodyFont: 'font-inter',
    layout: 'grid'
  }
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('portfolio_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = state.theme.backgroundColor;
    document.body.style.color = state.theme.textColor;
  }, [state.theme]);

  const updateState = (newState: Partial<AppState>) => {
    const updated = { ...state, ...newState };
    setState(updated);
    localStorage.setItem('portfolio_state', JSON.stringify(updated));
  };

  const handleNameChange = (e: React.FormEvent<HTMLDivElement>) => {
    updateState({ name: e.currentTarget.innerText });
  };

  const handleLetterChange = (id: string, newLetter: string) => {
    const newProjects = state.projects.map(p => p.id === id ? { ...p, letter: newLetter } : p);
    updateState({ projects: newProjects });
  };

  return (
    <div className={`min-h-screen ${state.theme.bodyFont} selection:bg-black selection:text-white pb-20`}>
      {/* Navegación Minimalista de la Imagen */}
      <Navigation 
        name={state.name}
        isEditing={isEditing}
        onNameChange={handleNameChange}
        theme={state.theme}
      />
      
      <main className="pt-24 px-4 md:px-8">
        <Hero 
          state={state} 
          isEditing={isEditing} 
          onLetterChange={handleLetterChange}
        />
      </main>

      {/* Botones de Control de Edición */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`${isEditing ? 'bg-green-600' : 'bg-black'} text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all font-bold text-[10px] uppercase tracking-widest`}
        >
          {isEditing ? 'GUARDAR CAMBIOS' : 'MODO EDICIÓN'}
        </button>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="bg-white text-black border border-black/10 px-8 py-4 rounded-full shadow-xl flex items-center gap-3 hover:scale-105 transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            CONFIGURACIÓN PRO
          </button>
        )}
      </div>

      {isEditorOpen && (
        <EditorDrawer 
          state={state} 
          updateState={updateState} 
          onClose={() => setIsEditorOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
