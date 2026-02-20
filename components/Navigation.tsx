import React from 'react';

interface NavigationProps {
  name: string;
  isEditing: boolean;
  onNameChange: (val: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ name, isEditing, onNameChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-8 flex justify-between items-start pointer-events-none">
      <div 
        contentEditable={isEditing}
        onBlur={(e) => onNameChange(e.currentTarget.innerText)}
        suppressContentEditableWarning={true}
        className="text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto outline-none transition-all"
      >
        {name}
      </div>

      <div className="flex gap-8 pointer-events-auto">
        {['ABOUT', 'CONTACT', 'INSTAGRAM'].map((item) => (
          <a
            key={item}
            href="#"
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