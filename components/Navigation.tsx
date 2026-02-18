
import React from 'react';
import { PortfolioTheme } from '../types';

interface NavigationProps {
  name: string;
  isEditing: boolean;
  onNameChange: (e: React.FormEvent<HTMLDivElement>) => void;
  theme: PortfolioTheme;
}

const Navigation: React.FC<NavigationProps> = ({ name, isEditing, onNameChange, theme }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-8 flex justify-between items-start pointer-events-none">
      <div 
        contentEditable={isEditing}
        onBlur={onNameChange}
        suppressContentEditableWarning={true}
        className={`${theme.headingFont} text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto transition-all ${isEditing ? 'bg-yellow-100 outline-dashed outline-2 outline-gray-300 px-2' : ''}`}
      >
        {name}
      </div>

      <div className="flex gap-8 pointer-events-auto">
        {['ABOUT', 'CONTACT', 'INSTAGRAM'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
