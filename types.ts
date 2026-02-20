
export type FontType = 'font-playfair' | 'font-inter' | 'font-space' | 'font-italiana';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  letter?: string; // Letra gigante debajo de la foto
  type?: 'image' | 'video';
  videoUrl?: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface PortfolioTheme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: FontType;
  bodyFont: FontType;
  layout: 'minimal' | 'grid' | 'dossier';
  headingSize: number;
}

export interface Section {
  id: string;
  type: 'hero' | 'gallery' | 'cv' | 'store' | 'booking';
  title: string;
  isVisible: boolean;
}

export interface CursorSettings {
  type: 'default' | 'circle' | 'square' | 'dot' | 'crosshair';
  color: string;
  size: number;
  mixBlendMode: 'normal' | 'difference' | 'exclusion';
}

export interface AppState {
  name: string;
  bio: string;
  projects: Project[];
  experiences: Experience[];
  theme: PortfolioTheme;
  sections: Section[];
  cursor: CursorSettings;
}
