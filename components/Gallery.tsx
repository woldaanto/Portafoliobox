
import React from 'react';
import { Project, PortfolioTheme } from '../types';

interface GalleryProps {
  projects: Project[];
  theme: PortfolioTheme;
}

const Gallery: React.FC<GalleryProps> = ({ projects, theme }) => {
  const isGrid = theme.layout === 'grid';
  const isDossier = theme.layout === 'dossier';

  return (
    <div className="py-12">
      <div className="mb-12 flex justify-between items-end">
        <h2 className={`${theme.headingFont} text-5xl`}>Selected Works</h2>
        <span className="text-sm opacity-50 uppercase tracking-widest">({projects.length} Entries)</span>
      </div>

      <div className={`
        ${isGrid ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : ''}
        ${isDossier ? 'flex flex-col gap-24' : ''}
        ${theme.layout === 'minimal' ? 'grid grid-cols-1 md:grid-cols-2 gap-12' : ''}
      `}>
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className={`group cursor-pointer transition-all duration-700 ${isDossier ? (idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse') + ' flex flex-col gap-12' : ''}`}
          >
            <div className={`relative overflow-hidden ${isDossier ? 'md:w-3/5 aspect-[16/10]' : 'aspect-square'}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white uppercase tracking-widest text-sm border border-white px-6 py-2">View Case</span>
              </div>
            </div>

            <div className={`${isDossier ? 'md:w-2/5 flex flex-col justify-center' : 'mt-4'}`}>
              <p className="text-xs uppercase tracking-widest opacity-50 mb-2">{project.category}</p>
              <h3 className={`${theme.headingFont} text-3xl mb-4 group-hover:italic transition-all`}>{project.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-sm">{project.description}</p>
              
              {isDossier && (
                <div className="mt-8 flex gap-4">
                  <div className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center text-xs">0{idx + 1}</div>
                  <div className="h-[1px] w-full bg-black/10 mt-5"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
