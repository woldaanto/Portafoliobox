import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

const INITIAL_STATE: AppState = {
  name: "ALEXANDRE JOSEPH BELANGER",
  bio: "Portafolio editorial con enfoque en fotografía minimalista.",
  projects: [
    { id: '1', title: "Proyecto 1", category: "FOTO", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800", description: "", letter: "A" },
    { id: '2', title: "Proyecto 2", category: "FOTO", image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800", description: "", letter: "" },
    { id: '3', title: "Proyecto 3", category: "FOTO", image: "https://images.unsplash.com/photo-1492691523569-7379e4004211?w=800", description: "", letter: "J" },
    { id: '4', title: "Proyecto 4", category: "FOTO", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800", description: "", letter: "B" },
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
    const saved = localStorage.getItem('portfolio_v1');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_v1', JSON.stringify(state));
  }, [state]);

  const updateState = (newState: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const handleLetterChange = (id: string, newLetter: string) => {
    const newProjects = state.projects.map(p => p.id === id ? { ...p, letter: newLetter } : p);
    updateState({ projects: newProjects });
  };

  return (
    <div className="min-h-screen selection:bg-black selection:text-white pb-20">
      <Navigation 
        name={state.name}
        isEditing={isEditing}
        onNameChange={(val) => updateState({ name: val })}
      />
      
      <main className="pt-24 px-4 md:px-8">
        <Hero 
          state={state} 
          isEditing={isEditing} 
          onLetterChange={handleLetterChange}
        />
      </main>

      {/* Botón Flotante para Guardar/Editar */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-8 py-4 rounded-full shadow-2xl transition-all font-bold text-[10px] tracking-widest uppercase ${
            isEditing ? 'bg-green-600 text-white' : 'bg-black text-white hover:scale-105'
          }`}
        >
          {isEditing ? 'GUARDAR CAMBIOS' : 'MODO EDICIÓN'}
        </button>
      </div>
    </div>
  );
};

export default App;