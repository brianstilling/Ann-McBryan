import React from 'react';
import { Youtube, Facebook, Music, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 bg-[#1a0701] border-t border-[#260B01]/10 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-4xl font-serif text-[#DBD5CA] mb-2 tracking-tight">Ann & McBryan</h3>
            <p className="text-[#8D5B2F] text-[10px] font-bold font-vintage tracking-[0.5em] uppercase">Songs Across Europe • MMXXVI</p>
          </div>
          
          <div className="flex items-center gap-20">
            <a 
              href="https://www.youtube.com/@AnnMcBryan/videos" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3 text-[#DBD5CA]/40 hover:text-[#8D5B2F] transition-all"
            >
              <div className="p-3 rounded-full border border-white/5 group-hover:border-[#8D5B2F]/40 transition-colors">
                <Youtube className="w-7 h-7" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-vintage font-bold">YouTube</span>
            </a>
            <a 
              href="https://www.facebook.com/AnnMcBryanDuo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3 text-[#DBD5CA]/40 hover:text-[#8D5B2F] transition-all"
            >
              <div className="p-3 rounded-full border border-white/5 group-hover:border-[#8D5B2F]/40 transition-colors">
                <Facebook className="w-7 h-7" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-vintage font-bold">Facebook</span>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
            <div className="flex items-center gap-2 text-[#8D5B2F] text-[10px] font-bold tracking-[0.2em] uppercase font-vintage">
              <Music className="w-4 h-4" />
              Heartfelt Covers since 1998
            </div>
            <div className="text-[#DBD5CA]/20 text-[9px] uppercase tracking-[0.3em] leading-relaxed font-light">
              Ann & McBryan<br />
              Songs Across Europe Tour 2026<br />
              <div className="flex items-center justify-center md:justify-end gap-1 mt-1">
                With <Heart className="w-2.5 h-2.5 fill-current" /> from Denmark
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <span className="text-[#DBD5CA]/10 text-[8px] uppercase tracking-[0.5em]">
            &copy; 2026 Ann & McBryan — All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};