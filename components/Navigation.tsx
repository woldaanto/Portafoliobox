import React from 'react';

interface NavigationProps {
  name: string;
  isEditing: boolean;
  onNameChange: (val: string) => void;
  instagram: string;
}

const Navigation: React.FC<NavigationProps> = ({ name, isEditing, onNameChange, instagram }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-8 flex justify-between items-start pointer-events-none">
      <div 
        contentEditable={isEditing}
        onBlur={(e) => onNameChange(e.currentTarget.innerText)}
        suppressContentEditableWarning={true}
        className="text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto outline-none transition-all cursor-pointer"
        onClick={() => scrollTo('hero')}
      >
        {name}
      </div>

      <div className="flex gap-8 pointer-events-auto">
        <button
          onClick={() => scrollTo('about')}
          className="text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
        >
          ABOUT
        </button>
        <button
          onClick={() => scrollTo('contact')}
          className="text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
        >
          CONTACT
        </button>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
        >
          INSTAGRAM
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
