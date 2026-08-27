import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Compass, Mail, Mountain, Music, ArrowRight, CheckCircle2 } from 'lucide-react';
// @ts-ignore
import defaultTourPhoto from '../src/assets/images/tour_duo_sunset_1787818730824.jpg';

export const TourUpdate: React.FC = () => {
  const [photoSrc] = useState<string>(() => {
    return localStorage.getItem('ann_mcbryan_tour_2026_photo') || defaultTourPhoto;
  });

  const scrollToWishlist = () => {
    const el = document.getElementById('wishlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tour-update" className="py-20 md:py-28 bg-[#DBD5CA] relative overflow-hidden border-b border-[#260B01]/5">
      {/* Subtle organic paper background texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-15 pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[#8D5B2F] mb-6"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-[11px] font-vintage tracking-[0.6em] uppercase font-bold text-[#8D5B2F]">
              Tour Chronicle & Announcements
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#260B01] font-bold tracking-tight max-w-4xl leading-[1.1]"
          >
            Gratitude for 2026, <br />
            <span className="italic font-normal text-[#8D5B2F]">and the Road Ahead in 2027.</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-[#8D5B2F]/40 my-8"
          />
        </div>

        {/* Two Editorial Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-stretch">
          {/* Card 1: 2026 Thank You & Reflections with Tour Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white/75 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 border border-[#260B01]/10 shadow-[0_20px_50px_-20px_rgba(38,11,1,0.08)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(38,11,1,0.14)] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8D5B2F]/5 rounded-bl-[5rem] -z-0 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="p-4 bg-[#8D5B2F]/10 rounded-2xl text-[#8D5B2F]">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#260B01]/5 text-[#8D5B2F] font-vintage text-[10px] uppercase tracking-[0.3em] font-bold">
                  Tour 2026 Retrospective
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#260B01] font-bold mb-6 leading-snug">
                Thank You for a Fantastic <br />
                <span className="italic font-normal text-[#8D5B2F]">Songs Across Europe 2026</span>
              </h3>

              {/* Editorial grid with photo and text */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 md:gap-8 items-start mb-8">
                {/* Vintage framed duo photo */}
                <div className="sm:col-span-5 order-first sm:order-last">
                  <div className="relative p-2.5 sm:p-3 bg-[#DBD5CA]/70 rounded-3xl border border-[#8D5B2F]/20 shadow-md">
                    <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden relative shadow-inner bg-[#260B01]/10">
                      <img
                        src={photoSrc}
                        alt="Ann & McBryan on Songs Across Europe Tour 2026"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center pt-2.5 pb-1">
                      <span className="font-serif italic text-[12px] text-[#260B01]/75 font-semibold">Tour Moments 2026</span>
                    </div>
                  </div>
                </div>

                {/* Narrative text */}
                <div className="sm:col-span-7 space-y-4 text-[#260B01]/75 font-serif text-base sm:text-lg leading-relaxed">
                  <p>
                    To every host who opened their home, every listener who shared an evening under the summer stars, and everyone who welcomed us along the way — <strong className="text-[#260B01] font-semibold">thank you from the bottom of our hearts.</strong>
                  </p>
                  <p className="italic border-l-2 border-[#8D5B2F]/40 pl-3.5 text-[#260B01]/85">
                    The Songs Across Europe Tour 2026 lived fully and deeply up to our every expectation. The warmth, the intimacy of acoustic chords in historic plazas, living rooms, vineyards, and canals reminded us why we play.
                  </p>
                  <p>
                    It was an adventure that touched our souls — and one that makes us want to pack the Black Berlingo and do even more!
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#260B01]/5 flex items-center gap-3 text-[#8D5B2F] font-vintage text-[10px] tracking-[0.25em] uppercase font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#8D5B2F]" />
              <span>Memories Etched into Melody</span>
            </div>
          </motion.div>

          {/* Card 2: Great News - 2027 Tour & Scotland Highlands */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[#260B01] text-[#DBD5CA] rounded-[2.5rem] p-8 md:p-12 border border-[#8D5B2F]/20 shadow-[0_30px_70px_-20px_rgba(38,11,1,0.3)] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8D5B2F]/15 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8D5B2F]/10 rounded-bl-[5rem] -z-0 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="p-4 bg-white/10 rounded-2xl text-[#CBB89C]">
                  <Mountain className="w-6 h-6" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-[#CBB89C] font-vintage text-[10px] uppercase tracking-[0.3em] font-bold border border-white/5">
                  Great News • Voyage 2027
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-6 leading-snug">
                Plans for 2027 Are Underway: <br />
                <span className="italic font-normal text-[#CBB89C]">The Scottish Highlands & Beyond</span>
              </h3>

              <div className="space-y-4 text-[#DBD5CA]/80 font-serif text-lg leading-relaxed mb-8">
                <p>
                  We are thrilled to reveal that we are already making plans for our <strong className="text-white font-semibold">2027 Tour!</strong>
                </p>
                <p className="italic border-l-2 border-[#CBB89C]/40 pl-4 text-[#DBD5CA]">
                  As it looks now, our next musical voyage will, among other wonderful destinations, bring us to the rugged and poetic <strong className="text-white">highlands of Scotland</strong>. Initial connections and contacts have already been made!
                </p>
                <p>
                  We are scouting special places where stories, nature, and acoustic soundscapes meet for an unforgettable journey across new horizons.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-3 text-[#CBB89C] font-vintage text-[10px] tracking-[0.25em] uppercase font-bold">
              <Compass className="w-4 h-4 text-[#CBB89C]" />
              <span>Next Chapters in the Making</span>
            </div>
          </motion.div>
        </div>

        {/* Invitation & Request Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="p-8 sm:p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#260B01]/5 via-[#8D5B2F]/10 to-[#260B01]/5 border border-[#8D5B2F]/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[#8D5B2F] mb-3">
              <Music className="w-4 h-4" />
              <span className="font-vintage text-[10px] tracking-[0.4em] uppercase font-bold">
                Host a Concert / Play at Your Venue
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif text-[#260B01] font-bold mb-3">
              Have a request or want us to play?
            </h4>
            <p className="text-[#260B01]/70 font-serif text-base sm:text-lg leading-relaxed">
              You can always reach out to us. Whether you want to propose a house concert, an intimate festival stage, or a scenic stop on our next route — use the booking form below or send us an email directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto justify-center">
            <button
              onClick={scrollToWishlist}
              className="w-full sm:w-auto px-8 py-4 bg-[#260B01] text-white hover:bg-[#8D5B2F] rounded-full font-vintage text-[11px] uppercase tracking-[0.3em] font-bold transition-all shadow-md flex items-center justify-center gap-3 group"
            >
              <span>Use Booking Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="mailto:annmcbryan@gmail.com?subject=Concert%20Request%20-%20Songs%20Across%20Europe&body=Hello%20Ann%20%26%20McBryan%2C%0A%0AWe%20would%20love%20to%20invite%20you%20to%20play%21%0A%0ALocation%2FCity%3A%20%0APreferred%20Dates%2FYear%3A%20%0AEvent%20Details%3A%20%0A%0AWarm%20regards%2C"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#260B01] hover:bg-[#8D5B2F] hover:text-white border border-[#260B01]/10 rounded-full font-vintage text-[11px] uppercase tracking-[0.3em] font-bold transition-all shadow-sm flex items-center justify-center gap-3 group"
            >
              <Mail className="w-4 h-4 text-[#8D5B2F] group-hover:text-white transition-colors" />
              <span>Email Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
