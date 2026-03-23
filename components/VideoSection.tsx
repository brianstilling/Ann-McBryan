import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Play, Music2, Instagram, Music } from 'lucide-react';

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

export const VideoSection: React.FC = () => {
  // Main link to all videos
  const videosLink = "https://www.youtube.com/@AnnMcBryan/videos";
  const instagramLink = "https://www.instagram.com/ann_and_mcbryan/";
  const tiktokLink = "https://www.tiktok.com/@annmcbryan";

  return (
    <section className="py-32 bg-[#DBD5CA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-full bg-[#8D5B2F]/5 text-[#8D5B2F]"
          >
            <Music2 className="w-8 h-8" />
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#8D5B2F] uppercase tracking-[0.4em] text-[10px] font-vintage font-bold mb-4 block"
          >
            Captured Moments
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-[#260B01] mb-8 font-bold leading-tight"
          >
            Live Sessions <br />
            <span className="italic text-[#8D5B2F]/80 font-normal">from the road</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#260B01]/70 max-w-2xl text-xl md:text-2xl font-light leading-relaxed italic mb-12 font-serif"
          >
            "Music is the language of the voyage. We stop wherever the light is right and the air is still."
          </motion.p>
          
          <div className="flex flex-col items-center gap-8">
            <motion.a 
              href={videosLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#260B01] text-[#DBD5CA] font-vintage tracking-[0.3em] text-[12px] uppercase font-bold rounded-full hover:bg-[#8D5B2F] transition-all shadow-[0_20px_50px_rgba(38,11,1,0.2)] group"
            >
              <Youtube className="w-6 h-6" />
              Watch on YouTube
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-[#8D5B2F] hover:text-[#260B01] transition-colors font-vintage tracking-[0.2em] text-[11px] uppercase font-bold group"
              >
                <Instagram className="w-5 h-5" />
                Instagram: @ann_and_mcbryan
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.a>

              <motion.a
                href={tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-[#8D5B2F] hover:text-[#260B01] transition-colors font-vintage tracking-[0.2em] text-[11px] uppercase font-bold group"
              >
                <TikTokIcon className="w-5 h-5" />
                TikTok: @annmcbryan
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.a>
            </div>
            
            <p className="text-[9px] text-[#260B01]/40 font-bold uppercase tracking-[0.4em] leading-relaxed max-w-sm">
              Explore our full catalog of acoustic sessions and nomadic diaries on our official channel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#260B01]/5 pt-16">
          {[
            { label: 'Featured', value: 'Live Acoustic Session' },
            { label: 'Audio', value: 'Stereo Native' },
            { label: 'Style', value: 'Vocals & Guitar' },
            { label: 'Platform', value: 'YouTube' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <span className="block text-[8px] uppercase tracking-[0.5em] text-[#8D5B2F] font-bold mb-2">{item.label}</span>
              <span className="text-[#260B01] font-serif italic text-base">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements to maintain the stunning look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8D5B2F]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#260B01]/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </section>
  );
};