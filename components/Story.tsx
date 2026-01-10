import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, MapPin } from 'lucide-react';

interface StoryProps {
  title?: string;
}

export const Story: React.FC<StoryProps> = ({ title }) => {
  const displayTitle = title || "From the echoes of \n A Song A Day, \n the map begins to sing.";

  return (
    <section id="odyssey" className="py-32 bg-[#260B01] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-[#8D5B2F] mb-12"
          >
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span className="text-[10px] font-vintage tracking-[0.8em] uppercase font-bold">The Resonance of 365 Days</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-[#DBD5CA] italic leading-tight whitespace-pre-line">
              {displayTitle.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line.includes('the map begins to sing') ? (
                    <span className="text-white not-italic font-bold">{line}</span>
                  ) : (
                    <> {line} <br/> </>
                  )}
                </React.Fragment>
              ))}
            </h2>

            <div className="h-px w-24 bg-[#8D5B2F]/30 mx-auto"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
              <p className="text-[#DBD5CA]/70 text-xl font-serif leading-relaxed italic">
                "After 365 days of capturing a new melody every sunset on YouTube, the strings of our hearts have found a wider map. In the summer of 2026, the Black Berlingo becomes our vessel, traversing the wild heart of Europe to find the magic hidden in plain sight."
              </p>
              <p className="text-[#DBD5CA]/70 text-xl font-serif leading-relaxed italic">
                "We seek the symphony of silence in nature, the warmth of a stranger's hearth, and the stories etched in ancient city stone. Whether it is a secret hideaway, a quiet garden session, or a historic plaza at dawn—we want our music to become a part of your landscape."
              </p>
            </div>

            <div className="pt-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-block p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm max-w-3xl"
              >
                <div className="flex items-start gap-6 text-left">
                  <Sparkles className="w-10 h-10 text-[#8D5B2F] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#DBD5CA] font-vintage tracking-widest uppercase text-sm mb-4">Be our cartographer</h4>
                    <p className="text-[#DBD5CA]/50 font-serif italic text-lg leading-relaxed">
                      Our travel route is not dictated by agencies, but by you. Propose a stunning location, invite us to your event, or share an unusual idea. Every song finds its home through connection.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="text-[9px] font-vintage tracking-[0.5em] uppercase text-[#8D5B2F] font-bold mt-16 flex items-center justify-center gap-4">
               <div className="h-px w-8 bg-[#8D5B2F]/30"></div>
               Let's build something unforgettable — together
               <div className="h-px w-8 bg-[#8D5B2F]/30"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};