import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Music, History, Sparkles, Mic2, Guitar } from 'lucide-react';

interface AboutProps {
  prImages: string[];
}

export const About: React.FC<AboutProps> = ({ prImages }) => {
  return (
    <section id="about" className="py-32 bg-[#DBD5CA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {prImages.length > 0 ? (
                prImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative overflow-hidden rounded-[2.5rem] border border-[#260B01]/10 shadow-2xl ${
                      idx === 1 ? 'md:mt-16' : 'mt-0'
                    } ${
                      idx === 2 ? 'md:col-span-2 md:max-w-[75%] md:mx-auto mt-8' : ''
                    }`}
                  >
                    {/* Applying a creative cinematic filter via CSS */}
                    <div className="relative overflow-hidden group">
                      <img 
                        src={img} 
                        alt={`Ann & McBryan PR Portrait ${idx + 1}`} 
                        className={`w-full transition-all duration-1000 group-hover:scale-105 ${
                          idx === 2 ? 'h-auto' : 'aspect-[4/5] object-cover'
                        }`} 
                        style={{ 
                          filter: 'contrast(1.05) brightness(0.98) saturate(0.9) sepia(0.05)',
                        }}
                      />
                      {/* Grainy overlay for organic texture */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none mix-blend-multiply"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#260B01]/30 to-transparent pointer-events-none"></div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 h-[600px] bg-[#260B01]/5 rounded-[3rem] animate-pulse flex flex-col items-center justify-center text-[#260B01]/20">
                  <Music className="w-16 h-16 mb-4 opacity-30" />
                  <span className="text-[11px] uppercase tracking-[0.5em] font-vintage font-bold">Processing Likeness Assets...</span>
                </div>
              )}
            </div>
            
            {/* Decorative Label */}
            <div className="absolute -left-12 top-1/2 -rotate-90 hidden xl:flex items-center gap-6 text-[#8D5B2F] opacity-30">
              <div className="w-16 h-[1px] bg-current"></div>
              <span className="text-[11px] font-vintage uppercase tracking-[0.8em] font-bold">EDITORIAL SESSIONS • MMXXVI</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <div className="flex items-center gap-4 text-[#8D5B2F] mb-12">
                <History className="w-6 h-6" />
                <span className="text-[11px] font-vintage tracking-[0.6em] uppercase font-bold text-clay">The Chronicles</span>
              </div>
              
              <h2 className="text-6xl md:text-[5.5rem] font-serif text-[#260B01] mb-12 leading-[1.05] font-bold tracking-tight">
                The Geometry of a Song: <br />
                <span className="italic font-normal text-[#8D5B2F]/80">A 365-Day Resonance.</span>
              </h2>

              <div className="space-y-10 mb-20">
                <p className="text-xl md:text-2xl text-[#260B01]/80 font-serif leading-relaxed italic border-l-4 border-[#8D5B2F]/20 pl-8">
                  "Ann & McBryan are the architects of the intimate. Since 1998, they have explored the dialogue between a single guitar and a shared breath."
                </p>
                <div className="h-px w-24 bg-[#8D5B2F]/30"></div>
                <p className="text-[#260B01]/60 text-lg md:text-xl font-serif leading-relaxed">
                  Their YouTube masterpiece, <span className="text-[#260B01] font-bold underline decoration-[#8D5B2F]/30 underline-offset-8">"A Song A Day"</span>, wasn't just a project—it was a vow. For 365 consecutive sunsets, Ann and McBryan recorded a raw, unedited acoustic session, proving that music doesn't need a stage to find its soul.
                </p>
                <p className="text-[#260B01]/60 text-lg md:text-xl font-serif leading-relaxed">
                  This odyssey through folk, rock, and pop transformed their studio into a global crossroads, connecting hearts across continents and setting the stage for their upcoming European voyage in the Black Berlingo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-10 rounded-[2.5rem] bg-white border border-[#260B01]/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <Mic2 className="w-8 h-8 text-[#8D5B2F] mb-8 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[11px] font-vintage tracking-[0.4em] uppercase font-bold text-[#260B01] mb-4">Ann</h4>
                  <p className="text-sm text-[#260B01]/50 italic font-serif leading-relaxed">A voice of amber and silk, carrying the weight of 25 years of nomadic stories.</p>
                </div>
                <div className="group p-10 rounded-[2.5rem] bg-white border border-[#260B01]/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <Guitar className="w-8 h-8 text-[#8D5B2F] mb-8 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[11px] font-vintage tracking-[0.4em] uppercase font-bold text-[#260B01] mb-4">McBryan</h4>
                  <p className="text-sm text-[#260B01]/50 italic font-serif leading-relaxed">The pulse behind the strings. Architect of the 365-day musical journey.</p>
                </div>
              </div>

              <div className="mt-20 flex flex-wrap gap-10 items-center">
                <motion.a 
                  href="https://www.youtube.com/@AnnMcBryan/videos" 
                  target="_blank"
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="inline-flex items-center gap-8 px-16 py-8 bg-[#260B01] text-white rounded-full font-vintage tracking-[0.5em] text-[12px] uppercase font-bold shadow-2xl group transition-all"
                >
                  <Youtube className="w-7 h-7 text-red-500" />
                  Explore the 365 Days
                  <Sparkles className="w-5 h-5 text-[#8D5B2F] group-hover:rotate-12 transition-transform" />
                </motion.a>
                <div className="flex items-center gap-3 text-[#8D5B2F]/60 text-[10px] uppercase tracking-[0.5em] font-bold font-vintage">
                  <div className="w-12 h-[1px] bg-current"></div>
                  LIVE FROM THE HEART
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
