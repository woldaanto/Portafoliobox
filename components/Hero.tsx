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
          {/* Imagen o Video Editorial */}
          <div className="aspect-[3/4] overflow-hidden bg-gray-300 relative group">
            {project.type === 'video' && project.videoUrl ? (
              <video 
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-[8px] text-white uppercase tracking-[0.3em] font-bold border border-white/40 px-3 py-1 bg-black/20 backdrop-blur-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Letra Gigante */}
          <div className="mt-4">
            <div
              contentEditable={isEditing}
              onBlur={(e) => onLetterChange(project.id, e.currentTarget.innerText)}
              suppressContentEditableWarning={true}
              className={`${state.theme.headingFont} leading-[0.8] font-bold tracking-tighter uppercase select-none outline-none transition-all`}
              style={{ fontSize: `${state.theme.headingSize}vw` }}
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
