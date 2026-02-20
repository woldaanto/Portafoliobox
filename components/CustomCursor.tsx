import React, { useEffect, useState } from 'react';
import { CursorSettings } from '../types';

interface CustomCursorProps {
  settings: CursorSettings;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ settings }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.getAttribute('contenteditable') === 'true'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHover);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHover);
    };
  }, []);

  if (settings.type === 'default') return null;

  const size = isHovering ? settings.size * 1.5 : settings.size;

  const getCursorShape = () => {
    switch (settings.type) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      case 'dot':
        return 'rounded-full scale-[0.2]';
      case 'crosshair':
        return 'bg-transparent border-none';
      default:
        return 'rounded-full';
    }
  };

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-100 ease-out"
      style={{
        transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`,
      }}
    >
      {settings.type === 'crosshair' ? (
        <div className="relative" style={{ width: size, height: size }}>
          <div className="absolute top-1/2 left-0 w-full h-[1px]" style={{ backgroundColor: settings.color }} />
          <div className="absolute left-1/2 top-0 w-[1px] h-full" style={{ backgroundColor: settings.color }} />
        </div>
      ) : (
        <div
          className={`${getCursorShape()} transition-all duration-300`}
          style={{
            width: size,
            height: size,
            backgroundColor: settings.color,
            mixBlendMode: settings.mixBlendMode,
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
