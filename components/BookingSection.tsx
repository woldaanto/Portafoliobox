
import React from 'react';
import { PortfolioTheme } from '../types';

interface BookingProps {
  theme: PortfolioTheme;
}

const BookingSection: React.FC<BookingProps> = ({ theme }) => {
  return (
    <div className="py-12 flex flex-col md:flex-row gap-16">
      <div className="md:w-1/2 space-y-8">
        <h2 className={`${theme.headingFont} text-6xl`}>Inaugurate a<br/><span className="italic">Collaboration.</span></h2>
        <p className="text-lg opacity-80 leading-relaxed">
          Available for commercial commissions, gallery exhibitions, and creative consultations. Let's create something that transcends the ordinary.
        </p>
        
        <div className="space-y-4 pt-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-widest">Average Response</p>
              <p className="text-sm opacity-50">Within 48 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-black/20 p-2 focus:outline-none focus:border-black" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-black/20 p-2 focus:outline-none focus:border-black" placeholder="john@company.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest">Inquiry Type</label>
            <select className="w-full bg-transparent border-b border-black/20 p-2 focus:outline-none focus:border-black appearance-none">
              <option>Exhibition Inquiry</option>
              <option>Commission Work</option>
              <option>Workshop / Speaking</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest">Vision / Message</label>
            <textarea className="w-full bg-transparent border-b border-black/20 p-2 focus:outline-none focus:border-black min-h-[150px]" placeholder="Tell me about your project..."></textarea>
          </div>
          <button className="bg-black text-white w-full py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-colors">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingSection;
