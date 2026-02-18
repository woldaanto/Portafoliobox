
import React from 'react';
import { AppState } from '../types';

interface HeroProps {
  state: AppState;
  isEditing: boolean;
  onLetterChange: (id: string, newLetter: string) => void;
}

const Hero: React.FC<HeroProps> = ({ state, isEditing, onLetterChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 min-h-[85vh] items-start">
      {state.projects.map((project) => (
        <div key={project.id} className="flex flex-col h-full group">
          {/* Contenedor de Imagen */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>

          {/* Letra Gigante Editable */}
          <div className="mt-4 flex-1 flex flex-col justify-start">
            <div
              contentEditable={isEditing}
              onBlur={(e) => onLetterChange(project.id, e.currentTarget.innerText)}
              suppressContentEditableWarning={true}
              className={`text-[12rem] md:text-[18vw] leading-[0.8] font-bold tracking-tighter uppercase select-none transition-all ${isEditing ? 'bg-yellow-50 outline-dashed outline-1 outline-gray-400 min-h-[1em] min-w-[1em] text-center' : ''}`}
            >
              {project.letter}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
