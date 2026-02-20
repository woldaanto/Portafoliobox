import React from 'react';
import { AppState } from '../types';

interface HeroProps {
  state: AppState;
  isEditing: boolean;
  onLetterChange: (id: string, newLetter: string) => void;
}

const Hero: React.FC<HeroProps> = ({ state, isEditing, onLetterChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
      {state.projects.map((project) => (
        <div key={project.id} className="flex flex-col">
          {/* Imagen Editorial */}
          <div className="aspect-[3/4] overflow-hidden bg-gray-300">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Letra Gigante */}
          <div className="mt-4">
            <div
              contentEditable={isEditing}
              onBlur={(e) => onLetterChange(project.id, e.currentTarget.innerText)}
              suppressContentEditableWarning={true}
              className="text-[12rem] md:text-[16vw] leading-[0.8] font-bold tracking-tighter uppercase select-none outline-none"
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