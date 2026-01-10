import React from 'react';
import { motion } from 'framer-motion';
import { Concert } from '../types';
import { ExternalLink, MapPin, Ticket, Lock, Sparkles, History, Clock, Star, ArrowRight } from 'lucide-react';

interface ConcertListProps {
  sessions: Concert[];
}

const scrollToWishlist = () => {
  document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' });
};

const getStatusText = (status: string) => {
  switch(status) {
    case 'sold-out': return 'Fully Booked';
    case 'private': return 'Private Event';
    default: return 'Boarding Now';
  }
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'sold-out': return 'text-[#260B01]/40';
    case 'private': return 'text-[#939789]';
    default: return 'text-[#D4AF37]';
  }
};

const DateBlock: React.FC<{ date: string; variant?: 'standard' | 'large' }> = ({ date, variant = 'standard' }) => {
  const isTBA = date.toLowerCase().includes('announced');
  const isLarge = variant === 'large';
  
  if (isTBA) {
    return (
      <div className={`flex flex-col items-center justify-center border-[#260B01]/10 text-center ${isLarge ? 'min-w-[120px] pr-8' : 'min-w-[100px] border-r pr-10 md:pr-16'}`}>
        <span className={`${isLarge ? 'text-4xl' : 'text-3xl'} font-serif text-[#260B01] font-bold leading-none`}>TBA</span>
        <span className="text-[8px] font-vintage tracking-[0.2em] text-[#D4AF37] font-bold mt-2 uppercase opacity-60">DATE</span>
      </div>
    );
  }
  
  const parts = date.split(' ');
  const month = parts[0];
  const day = parts[1]?.replace(',', '') || '??';
  
  return (
    <div className={`flex flex-col items-center justify-center border-[#260B01]/10 ${isLarge ? 'min-w-[120px] pr-10 border-r' : 'min-w-[100px] border-r pr-10 md:pr-16'}`}>
      <span className={`${isLarge ? 'text-6xl' : 'text-5xl'} font-serif text-[#260B01] font-bold leading-none group-hover:text-[#D4AF37] transition-colors`}>{day}</span>
      <span className={`${isLarge ? 'text-xs mt-3' : 'text-[10px] mt-3'} font-vintage tracking-[0.4em] text-[#D4AF37] font-bold uppercase opacity-60`}>{month}</span>
    </div>
  );
};

const FeaturedSession: React.FC<{ concert: Concert }> = ({ concert }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative mb-16 p-0.5 bg-gradient-to-br from-[#D4AF37]/30 via-[#D4AF37]/5 to-transparent rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(38,11,1,0.1)]"
  >
    <div className="bg-[#DBD5CA]/60 backdrop-blur-xl rounded-[2.4rem] overflow-hidden relative border border-white/30">
      <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
          <DateBlock date={concert.date} variant="large" />
          
          <div>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="px-3 py-1 bg-[#260B01] text-white text-[8px] font-vintage font-bold tracking-[0.2em] rounded-full shadow-md flex items-center gap-2">
                <Star className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
                UPCOMING SESSION
              </span>
              <div className="flex items-center gap-2 text-[#8D5B2F]">
                <Clock className="w-3 h-3" />
                <span className="text-[9px] font-bold tracking-widest">{concert.time}</span>
              </div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-serif text-[#260B01] font-bold mb-3 tracking-tight group-hover:text-[#8D5B2F] transition-colors">
              {concert.city}, <span className="text-[#8D5B2F]/60 italic font-normal">{concert.country}</span>
            </h3>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#260B01]">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xl font-serif italic font-bold">{concert.venue}</span>
              </div>
              {concert.address && (
                <p className="text-[12px] text-[#260B01]/50 ml-0 md:ml-7 font-medium">
                  {concert.address}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-5 w-full lg:w-auto">
          <a 
            href="https://www.facebook.com/AnnMcBryanDuo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto px-10 py-5 bg-[#260B01] hover:bg-[#D4AF37] text-white hover:text-[#260B01] rounded-[1.5rem] font-vintage tracking-[0.4em] text-[10px] uppercase font-bold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group/btn"
          >
            <span>JOIN SESSION</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </a>
          <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#D4AF37] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
            {getStatusText(concert.status)}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const SessionRow: React.FC<{ concert: Concert; index: number }> = ({ concert, index }) => (
  <motion.div
    id={`concert-${concert.id}`}
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/40 hover:bg-white backdrop-blur-md border border-[#260B01]/5 hover:border-[#D4AF37]/30 rounded-[2rem] transition-all duration-500 shadow-sm hover:shadow-xl scroll-mt-32"
  >
    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
      <DateBlock date={concert.date} />
      <div>
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">{concert.country}</span>
          <div className="h-px w-6 bg-[#D4AF37]/30"></div>
        </div>
        <h3 className="text-3xl font-serif text-[#260B01] mb-2 leading-tight font-bold group-hover:text-[#8D5B2F] transition-colors">{concert.city}</h3>
        <div className="flex items-start gap-2.5 text-[13px] text-[#260B01]/50 italic font-serif">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-[#260B01]/70">{concert.venue}</span>
            {concert.address && <span className="text-[10px] opacity-60 not-italic font-sans tracking-wide mt-0.5">{concert.address}</span>}
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 md:mt-0 flex items-center gap-5">
      <a 
        href="https://www.facebook.com/AnnMcBryanDuo"
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-10 py-4 bg-[#260B01] hover:bg-[#D4AF37] hover:text-[#260B01] text-white font-bold font-vintage tracking-[0.3em] text-[9px] rounded-full transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-xl group/btn"
      >
        <span>INFO</span>
        <Ticket className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
      </a>
      <a href="https://www.facebook.com/AnnMcBryanDuo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[#260B01]/5 flex items-center justify-center text-[#260B01]/20 hover:text-[#D4AF37] transition-all">
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
);

export const ConcertList: React.FC<ConcertListProps> = ({ sessions }) => {
  const now = new Date();
  
  // Refined filtering logic to ensure current/future dates are visible
  const upcomingSessions = sessions.filter(concert => {
    if (concert.date.toLowerCase().includes('announced')) return true;
    const concertDate = new Date(concert.date);
    // Include today and future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return concertDate >= today;
  });

  const pastSessions = sessions.filter(concert => {
    if (concert.date.toLowerCase().includes('announced')) return false;
    const concertDate = new Date(concert.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return concertDate < today;
  });

  const [featuredUpcoming, ...otherUpcoming] = upcomingSessions;

  return (
    <section id="concerts" className="py-24 bg-[#CBB89C] relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent hidden xl:block"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} className="mb-6">
            <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
            <span className="text-[#260B01]/40 font-vintage tracking-[0.5em] text-[9px] font-bold uppercase">The Official Logbook</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-serif text-[#260B01] mb-5 leading-none font-bold">Tour Sessions</h2>
          <p className="text-[#260B01]/60 max-w-lg italic text-base font-serif">
            "Every melody leaves a trace, every chord marks a milestone on our voyage through the heart of Europe."
          </p>
        </div>

        {/* Featured Upcoming Session */}
        {featuredUpcoming && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <h3 className="text-xl font-serif text-[#260B01] italic font-bold">Upcoming Sessions</h3>
              <div className="h-px flex-grow bg-[#260B01]/10"></div>
            </div>
            <FeaturedSession concert={featuredUpcoming} />
          </div>
        )}

        {/* Other Planned Path */}
        {otherUpcoming.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xl font-serif text-[#260B01] italic font-bold">Planned Path</h3>
              <div className="h-px flex-grow bg-[#260B01]/10"></div>
            </div>
            <div className="space-y-4">
              {otherUpcoming.map((concert, index) => (
                <SessionRow key={concert.id} concert={concert} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Past Sessions */}
        {pastSessions.length > 0 && (
          <div className="mt-24 pt-24 border-t border-[#260B01]/5 opacity-80">
            <div className="flex items-center gap-4 mb-8">
              <History className="w-4 h-4 text-[#8D5B2F]" />
              <h3 className="text-xl font-serif text-[#260B01] italic font-bold">Past sessions</h3>
              <div className="h-px flex-grow bg-[#260B01]/10"></div>
            </div>
            <div className="space-y-4">
              {pastSessions.map((concert, index) => (
                <SessionRow key={concert.id} concert={concert} index={index + 10} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};