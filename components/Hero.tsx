import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, MapPin, ChevronDown, Youtube, Facebook } from 'lucide-react';
import { COLORS } from '../constants';

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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#260B01]">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y, scale: 1.05 }}
        className="absolute inset-0 z-0"
      >
        {backgroundImage ? (
          <img 
            src={backgroundImage} 
            alt="Ann & McBryan Hero" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
            onError={(e) => {
              console.error("Hero image failed to load. Check sharing settings on Google Drive.");
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[#260B01]" />
        )}
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#260B01] via-[#260B01]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[#260B01]/40 mix-blend-color-burn z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-7xl">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-6 mb-12 overflow-hidden">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[1px] w-24 bg-[#8D5B2F]"
            ></motion.div>
            <span className="text-[#8D5B2F] tracking-[0.8em] uppercase text-[9px] font-vintage font-bold">
              SINCE • MCMXCVIII
            </span>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[1px] w-24 bg-[#8D5B2F]"
            ></motion.div>
          </div>
          
          <h1 className="flex flex-col mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-6xl md:text-[10rem] font-serif text-white font-bold leading-none tracking-tighter"
            >
              Ann & McBryan
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1.5 }}
              className="text-4xl md:text-8xl italic text-[#CBB89C] font-serif leading-tight -mt-4 md:-mt-8 opacity-90"
            >
              Songs Across Europe
            </motion.span>
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-10 mb-16">
            <p className="text-xl md:text-3xl text-white/90 font-light italic leading-relaxed font-serif">
              "A nomadic concert diary, capturing acoustic souls in the wild heart of the continent."
            </p>
            <div className="h-px w-20 bg-[#8D5B2F]/30 mx-auto"></div>
            <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase font-vintage font-bold">
              Voyage 2026 • The Black Berlingo Sessions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            <button 
              onClick={scrollToConcerts}
              className="group relative px-16 py-6 bg-white text-[#260B01] font-bold rounded-full font-vintage tracking-[0.4em] transition-all hover:bg-[#8D5B2F] hover:text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 text-[11px] overflow-hidden"
            >
              <MapPin className="w-5 h-5 group-hover:scale-125 transition-transform duration-500" />
              <span>VIEW DATES</span>
              <div className="absolute inset-0 bg-black/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
            </button>
            <button 
              onClick={scrollToWishlist}
              className="px-16 py-6 bg-transparent border border-white/20 hover:border-white/50 text-white font-bold rounded-full font-vintage tracking-[0.4em] transition-all flex items-center gap-4 group text-[11px] backdrop-blur-sm"
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
        <motion.a href="https://www.youtube.com/@AnnMcBryan/videos" target="_blank" className="text-white/30 hover:text-[#8D5B2F] transition-colors"><Youtube className="w-5 h-5" /></motion.a>
        <motion.a href="https://www.facebook.com/AnnMcBryanDuo" target="_blank" className="text-white/30 hover:text-[#8D5B2F] transition-colors"><Facebook className="w-5 h-5" /></motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer flex flex-col items-center gap-4 group z-20"
        onClick={scrollToConcerts}
      >
        <span className="text-[8px] tracking-[0.6em] font-vintage uppercase group-hover:text-white transition-colors">Descend</span>
        <ChevronDown className="w-6 h-6 group-hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
};