import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Play, Music2 } from 'lucide-react';

export const VideoSection: React.FC = () => {
  // Main link to all videos
  const videosLink = "https://www.youtube.com/@AnnMcBryan/videos";

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
          
          <div className="flex flex-col items-center gap-6">
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