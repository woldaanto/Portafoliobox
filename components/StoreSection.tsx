
import React from 'react';
import { PortfolioTheme } from '../types';

interface StoreProps {
  theme: PortfolioTheme;
}

const StoreSection: React.FC<StoreProps> = ({ theme }) => {
  const items = [
    { name: "Digital Noise #1", price: "€1,200", img: "https://picsum.photos/id/102/500/600" },
    { name: "Organic Flow #4", price: "€2,450", img: "https://picsum.photos/id/103/500/600" },
    { name: "Canvas Genesis", price: "€3,100", img: "https://picsum.photos/id/104/500/600" },
  ];

  return (
    <div className="py-12">
      <div className="mb-12">
        <h2 className={`${theme.headingFont} text-6xl mb-2`}>Limited Collection</h2>
        <p className="text-sm opacity-50 uppercase tracking-widest">Available for Private Acquisition</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-6 group">
            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-4 right-4 bg-white px-4 py-2 text-xs font-bold shadow-lg">In Stock</div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm opacity-50">Giclée print on 310gsm Paper</p>
              </div>
              <span className="text-lg font-serif">{item.price}</span>
            </div>
            <button className="w-full border border-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all">
              Inquire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSection;
