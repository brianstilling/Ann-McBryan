import React from 'react';
import { Youtube, Facebook, Instagram, Music, Heart } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.26-.17-.38-.26v7.02c0 1.17-.14 2.35-.54 3.45-.99 2.8-3.56 4.77-6.54 4.86-3.06.13-6.1-1.95-6.98-4.89-.88-2.82.23-6.11 2.72-7.75 1.05-.7 2.32-1.02 3.58-1.01v4.03c-1.13-.04-2.34.45-2.93 1.41-.39.63-.47 1.43-.26 2.14.41 1.42 1.93 2.38 3.39 2.13 1.47-.25 2.48-1.67 2.48-3.13V.02z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const instagramLink = "https://www.instagram.com/ann_and_mcbryan/";

  return (
    <footer className="py-24 bg-[#1a0701] border-t border-[#260B01]/10 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-4xl font-serif text-[#DBD5CA] mb-2 tracking-tight">Ann & McBryan</h3>
            <p className="text-[#8D5B2F] text-[10px] font-bold font-vintage tracking-[0.5em] uppercase">Songs Across Europe • MMXXVI</p>
          </div>
          
          <div className="flex items-center gap-10 md:gap-16">
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
              href={instagramLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3 text-[#DBD5CA]/40 hover:text-[#8D5B2F] transition-all"
            >
              <div className="p-3 rounded-full border border-white/5 group-hover:border-[#8D5B2F]/40 transition-colors">
                <Instagram className="w-7 h-7" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-vintage font-bold">Instagram</span>
            </a>

            <a 
              href="https://www.tiktok.com/@annmcbryan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3 text-[#DBD5CA]/40 hover:text-[#8D5B2F] transition-all"
            >
              <div className="p-3 rounded-full border border-white/5 group-hover:border-[#8D5B2F]/40 transition-colors">
                <TikTokIcon className="w-7 h-7" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-vintage font-bold">TikTok</span>
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