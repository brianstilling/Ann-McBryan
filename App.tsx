import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ConcertList } from './components/ConcertList';
import { TourMap } from './components/TourMap';
import { VideoSection } from './components/VideoSection';
import { BookingForm } from './components/BookingForm';
import { WishSongForm } from './components/WishSongForm';
import { Story } from './components/Story';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import { TOUR_DATA } from './constants';
import { Concert } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  // Keeping the top image as it is
  const heroImage = "https://lh3.googleusercontent.com/d/1Ucfoo7X4wKeKQXcGK5vCV_5jsBKCGaLg";
  
  // Setting the specific images for 'The Geometry of a Song' section
  const [prImages, setPrImages] = useState<string[]>([
    "https://lh3.googleusercontent.com/d/1qKjfjRaT30H2DHq9Jr5vk0s_jZRdj4n6",
    "https://lh3.googleusercontent.com/d/1sgAVbXWHbLXav_svAsE_SWE2nrIhwwc2"
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');
  const [sessions, setSessions] = useState<Concert[]>([]);
  const [storyTitle, setStoryTitle] = useState("From the echoes of \n A Song A Day, \n the map begins to sing.");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generatePrAssets = async (force = false) => {
    const STORAGE_KEY = 'ann_mcbryan_pr_v10_official_override';
    const savedPrImages = localStorage.getItem(STORAGE_KEY);
    
    // Only use saved images if they were manually forced/regenerated via Admin
    if (savedPrImages && !force) {
      setPrImages(JSON.parse(savedPrImages));
      return;
    }

    // AI Generation only occurs if 'force' is triggered from AdminPanel
    if (force) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt1 = 'A high-end portrait of Ann & McBryan in a cozy European studio. Warm cinematic lighting, editorial photography.';
        const response = await ai.models.generateContent({ 
          model: 'gemini-2.5-flash-image', 
          contents: { parts: [{ text: prompt1 }] } 
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const img = `data:image/png;base64,${part.inlineData.data}`;
              setPrImages([img]);
              localStorage.setItem(STORAGE_KEY, JSON.stringify([img]));
              return;
            }
          }
        }
      } catch (err) {
        console.warn("AI asset generation failed, sticking to official assets.");
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHashChange);

    // Versioning check to ensure Bønnerup and other updates display correctly
    const DATA_VERSION = 'v1.2_bonnerup_official_photos';
    const savedVersion = localStorage.getItem('ann_mcbryan_data_ver');
    const savedSessions = localStorage.getItem('ann_mcbryan_sessions');
    
    if (savedSessions && savedVersion === DATA_VERSION) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(TOUR_DATA);
      localStorage.setItem('ann_mcbryan_sessions', JSON.stringify(TOUR_DATA));
      localStorage.setItem('ann_mcbryan_data_ver', DATA_VERSION);
    }
    
    const savedStory = localStorage.getItem('ann_mcbryan_story_title');
    if (savedStory) setStoryTitle(savedStory);

    // Checks for storage overrides but defaults to the useState initial array
    generatePrAssets();
    
    setTimeout(() => setIsLoading(false), 1500);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return (
      <AdminPanel 
        sessions={sessions} 
        setSessions={setSessions} 
        storyTitle={storyTitle} 
        setStoryTitle={setStoryTitle}
        onRegenerateImages={() => generatePrAssets(true)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#DBD5CA] selection:bg-[#8D5B2F] selection:text-white">
      <AnimatePresence>
        {isLoading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#DBD5CA] flex flex-col items-center justify-center p-6">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="mb-8">
              <Compass className="w-16 h-16 text-[#8D5B2F] opacity-50" />
            </motion.div>
            <h2 className="text-4xl font-serif text-[#260B01] mb-2 italic">Charting the path...</h2>
            <p className="text-[#8D5B2F] font-vintage tracking-[0.5em] text-[10px] uppercase">Ann & McBryan — Voyage 2026</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8D5B2F] to-[#260B01] origin-left z-[60]" style={{ scaleX }} />

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#260B01] pointer-events-auto cursor-pointer flex flex-col items-center md:items-start group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-serif text-4xl font-bold leading-none tracking-tight group-hover:text-[#8D5B2F] transition-all">Ann & McBryan</span>
            <span className="font-vintage text-[9px] tracking-[0.6em] uppercase text-[#8D5B2F] mt-2 font-bold opacity-80">Songs Across Europe</span>
          </div>
          <nav className="flex items-center gap-4 md:gap-8 text-[9px] uppercase tracking-[0.3em] font-vintage font-bold text-[#260B01] pointer-events-auto bg-[#DBD5CA]/70 backdrop-blur-2xl px-6 md:px-8 py-3 rounded-full border border-[#260B01]/5 shadow-2xl">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#8D5B2F] transition-colors relative group">The Chronicles</button>
            <button onClick={() => scrollToSection('wishlist')} className="hover:text-[#8D5B2F] transition-colors relative group">Request Session</button>
            <button onClick={() => scrollToSection('song-wish')} className="hover:text-[#8D5B2F] transition-colors relative group">Wish a Song</button>
            <button onClick={() => scrollToSection('odyssey')} className="hover:text-[#8D5B2F] transition-colors relative group">The Odyssey</button>
          </nav>
        </div>
      </header>

      <main>
        <Hero backgroundImage={heroImage} />
        <About prImages={prImages} />
        <Story title={storyTitle} />
        <ConcertList sessions={sessions} />
        <TourMap sessions={sessions} />
        <VideoSection />
        <BookingForm />
        <WishSongForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;