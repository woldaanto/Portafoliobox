
import React from 'react';
import { Experience, PortfolioTheme } from '../types';

interface CVProps {
  name: string;
  bio: string;
  experiences: Experience[];
  theme: PortfolioTheme;
}

const CVSection: React.FC<CVProps> = ({ name, bio, experiences, theme }) => {
  return (
    <div className="py-12 max-w-4xl mx-auto bg-white p-12 shadow-2xl border-t-8 border-black">
      <div className="flex flex-col md:flex-row justify-between mb-16 gap-8">
        <div className="space-y-4">
          <h2 className={`${theme.headingFont} text-4xl uppercase tracking-tighter`}>{name}</h2>
          <p className="text-sm uppercase tracking-widest font-bold">Curriculum Vitae</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Location: Paris / Remote</p>
          <p className="text-sm">Contact: elena@art-dossier.com</p>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-xs uppercase tracking-widest font-bold border-b border-black/10 pb-4 mb-8">Personal Manifesto</h3>
        <p className="text-lg leading-relaxed italic text-gray-700">
          "{bio}"
        </p>
      </div>

      <div className="space-y-12">
        <h3 className="text-xs uppercase tracking-widest font-bold border-b border-black/10 pb-4">Professional Trajectory</h3>
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
            <div className="md:w-32 text-sm font-bold opacity-50">{exp.year}</div>
            <div className="flex-1">
              <h4 className={`${theme.headingFont} text-2xl group-hover:pl-4 transition-all duration-300`}>{exp.role}</h4>
              <p className="text-sm uppercase tracking-tighter mb-4">{exp.company}</p>
              <p className="text-sm opacity-70 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t border-black/10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] opacity-40">
        <span>© 2024 Art Dossier Portfolio</span>
        <span>Verified Excellence</span>
      </div>
    </div>
  );
};

export default CVSection;
