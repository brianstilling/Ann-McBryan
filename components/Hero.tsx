import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, MapPin, ChevronDown, Youtube, Facebook, Instagram } from 'lucide-react';

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

interface HeroProps {
  backgroundImage: string | null;
}

export const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollToConcerts = () => {
    document.getElementById('concerts')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWishlist = () => {
    document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#260B01] rounded-[2rem] border border-[#8D5B2F]/15 shadow-[0_45px_90px_-25px_rgba(38,11,1,0.22)]"
    >
      {/* Dynamic Background */}
      <motion.div 
        style={{ y, scale: 1.05 }}
        className="absolute inset-0 z-0"
      >
        {backgroundImage ? (
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={backgroundImage} 
            alt="Ann & McBryan Hero" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              filter: 'sepia(0.06) contrast(1.04) brightness(0.92) saturate(1.0)' 
            }}
            onError={(e) => {
              console.error("Hero image failed to load.");
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[#260B01]" />
        )}
        
        {/* Cinematic Overlays & Edge Vignetting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#260B01]/90 via-transparent to-[#260B01]/20 z-10" />
        <div className="absolute inset-0 bg-[#260B01]/5 mix-blend-multiply z-10" />
        {/* Soft edge-blender inset shadow */}
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_120px_rgba(38,11,1,0.55)] z-10 pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-20 text-center px-6 w-full max-w-7xl">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <button 
              onClick={scrollToConcerts}
              className="group relative px-12 py-5 bg-white text-[#260B01] font-bold rounded-full font-vintage tracking-[0.4em] transition-all hover:bg-[#8D5B2F] hover:text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 text-[11px] overflow-hidden"
            >
              <MapPin className="w-5 h-5 group-hover:scale-125 transition-transform duration-500" />
              <span>VIEW DATES</span>
              <div className="absolute inset-0 bg-black/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
            </button>
            <button 
              onClick={scrollToWishlist}
              className="px-12 py-5 bg-transparent border border-white/25 hover:border-white/65 text-white font-bold rounded-full font-vintage tracking-[0.4em] transition-all flex items-center gap-4 group text-[11px] backdrop-blur-sm shadow-xl"
            >
              <Music className="w-5 h-5 text-[#CBB89C] group-hover:rotate-12 transition-transform" />
              <span>REQUEST SESSION</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating social links on side */}
      <div className="absolute left-10 bottom-10 hidden xl:flex flex-col gap-8 z-20">
        <motion.div initial={{ height: 0 }} animate={{ height: 100 }} transition={{ delay: 1 }} className="w-px bg-white/20 mx-auto"></motion.div>
        <motion.a href="https://www.youtube.com/@AnnMcBryan/videos" target="_blank" className="text-white/40 hover:text-[#CBB89C] transition-colors"><Youtube className="w-5 h-5" /></motion.a>
        <motion.a href="https://www.facebook.com/AnnMcBryanDuo" target="_blank" className="text-white/40 hover:text-[#CBB89C] transition-colors"><Facebook className="w-5 h-5" /></motion.a>
        <motion.a href="https://www.instagram.com/ann_and_mcbryan/" target="_blank" className="text-white/40 hover:text-[#CBB89C] transition-colors"><Instagram className="w-5 h-5" /></motion.a>
        <motion.a href="https://www.tiktok.com/@annmcbryan" target="_blank" className="text-white/40 hover:text-[#CBB89C] transition-colors"><TikTokIcon className="w-5 h-5" /></motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer flex flex-col items-center gap-2 group z-20"
        onClick={scrollToConcerts}
      >
        <span className="text-[8px] tracking-[0.6em] font-vintage uppercase group-hover:text-white transition-colors">Descend</span>
        <ChevronDown className="w-5 h-5 group-hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
};
