import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import CVSection from './components/CVSection';
import StoreSection from './components/StoreSection';
import BookingSection from './components/BookingSection';
import EditorDrawer from './components/EditorDrawer';
import CustomCursor from './components/CustomCursor';

const INITIAL_STATE: AppState = {
  name: "ALEXANDRE JOSEPH BELANGER",
  bio: "Portafolio editorial con enfoque en fotografía minimalista y dirección de arte contemporánea.",
  projects: [
    { id: '1', title: "L'Espace Vide", category: "EDITORIAL", image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800", description: "Exploración del vacío en la arquitectura moderna.", letter: "A", type: 'image' },
    { id: '2', title: "Mouvement", category: "FILM", image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800", description: "Estudio cinemático del movimiento humano.", letter: "M", type: 'video', videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-white-sand-on-a-beach-in-slow-motion-3450-large.mp4" },
    { id: '3', title: "Lumière", category: "FOTO", image: "https://images.unsplash.com/photo-1492691523569-7379e4004211?w=800", description: "La luz como elemento estructural.", letter: "J", type: 'image' },
    { id: '4', title: "Silhouettes", category: "FOTO", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800", description: "Contraste y forma en el retrato minimalista.", letter: "B", type: 'image' },
  ],
  experiences: [
    { year: "2022 - Present", role: "Senior Art Director", company: "Studio Minimal", description: "Liderando la visión creativa para marcas de lujo globales." },
    { year: "2019 - 2022", role: "Visual Designer", company: "Art & Form", description: "Desarrollo de identidades visuales basadas en principios bauhaus." },
    { year: "2017 - 2019", role: "Photographer", company: "Freelance", description: "Colaboraciones editoriales con revistas de diseño independiente." }
  ],
  theme: {
    primaryColor: '#000000',
    backgroundColor: '#f2f2f2',
    textColor: '#000000',
    headingFont: 'font-inter',
    bodyFont: 'font-inter',
    layout: 'grid',
    headingSize: 16
  },
  sections: [
    { id: 's1', type: 'hero', title: 'Hero', isVisible: true },
    { id: 's2', type: 'gallery', title: 'Gallery', isVisible: true },
    { id: 's3', type: 'cv', title: 'Curriculum', isVisible: true },
    { id: 's4', type: 'store', title: 'Store', isVisible: false },
    { id: 's5', type: 'booking', title: 'Booking', isVisible: false },
  ],
  cursor: {
    type: 'circle',
    color: '#000000',
    size: 20,
    mixBlendMode: 'difference'
  }
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('portfolio_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          theme: { ...INITIAL_STATE.theme, ...parsed.theme },
          cursor: { ...INITIAL_STATE.cursor, ...parsed.cursor },
          sections: parsed.sections || INITIAL_STATE.sections,
          projects: parsed.projects || INITIAL_STATE.projects,
          experiences: parsed.experiences || INITIAL_STATE.experiences
        };
      } catch (e) {
        console.error("Error loading state", e);
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
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

  const renderSection = (section: any) => {
    if (!section.isVisible) return null;

    switch (section.type) {
      case 'hero':
        return <Hero key={section.id} state={state} isEditing={isEditing} onLetterChange={handleLetterChange} />;
      case 'gallery':
        return <Gallery key={section.id} projects={state.projects} theme={state.theme} />;
      case 'cv':
        return <CVSection key={section.id} name={state.name} bio={state.bio} experiences={state.experiences} theme={state.theme} />;
      case 'store':
        return <StoreSection key={section.id} theme={state.theme} />;
      case 'booking':
        return <BookingSection key={section.id} theme={state.theme} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen selection:bg-black selection:text-white pb-20 ${state.cursor.type !== 'default' ? 'cursor-none' : ''}`}
      style={{ backgroundColor: state.theme.backgroundColor, color: state.theme.textColor }}
    >
      <CustomCursor settings={state.cursor} />
      
      <Navigation 
        name={state.name}
        isEditing={isEditing}
        onNameChange={(val) => updateState({ name: val })}
      />
      
      <main className="pt-24 px-4 md:px-8 space-y-32">
        {state.sections.map(renderSection)}
      </main>

      {/* Botón Flotante para Guardar/Editar */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-8 py-4 rounded-full shadow-2xl transition-all font-bold text-[10px] tracking-widest uppercase ${
            isEditing ? 'bg-green-600 text-white' : 'bg-black text-white hover:scale-105'
          }`}
        >
          {isEditing ? 'GUARDAR CAMBIOS' : 'MODO EDICIÓN'}
        </button>
      </div>

      {isEditing && (
        <EditorDrawer 
          state={state} 
          updateState={updateState} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </div>
  );
};

export default App;
