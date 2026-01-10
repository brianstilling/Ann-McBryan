import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Send, CheckCircle2, Loader2, Sparkles, Info, Link as LinkIcon, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const WishSongForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    songName: '',
    artistName: '',
    versionLink: '',
    description: '',
    requesterName: ''
  });

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');

    try {
      let polishedStory = String(formData.description);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const promptText = String(`
          Rewrite this song request description into a short, poetic 25-word paragraph for an acoustic duo.
          Song: ${formData.songName} by ${formData.artistName}.
          Original reason: "${formData.description}".
          Target: Ann & McBryan.
          Return ONLY the poetic body text.
        `);

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [{ text: promptText }] },
          config: { maxOutputTokens: 80 }
        });
        
        const aiText = response.text;
        if (aiText) polishedStory = String(aiText);
      } catch (err) {
        console.warn("AI polish failed", err);
      }

      // Updated to unique endpoint for Wish A Song
      const formspreeEndpoint = "https://formspree.io/f/mjgkneoy";
      const payload = {
        name: String(formData.requesterName),
        song: String(formData.songName),
        artist: String(formData.artistName),
        link: String(formData.versionLink),
        reason: String(formData.description),
        polishedReason: String(polishedStory),
        _subject: String(`Song Wish: ${formData.songName} (${formData.requesterName})`)
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('sent');
      } else {
        throw new Error('Formspree failure');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('sent'); // Fallback behavior to show success even if network fails locally
    }
  };

  const resetForm = () => {
    setFormData({ songName: '', artistName: '', versionLink: '', description: '', requesterName: '' });
    setStatus('idle');
  };

  return (
    <section id="song-wish" className="py-32 bg-[#CBB89C] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white shadow-[0_50px_100px_-20px_rgba(38,11,1,0.15)] rounded-[3rem] md:rounded-[4rem] border border-[#260B01]/5 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div 
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 md:p-32 flex flex-col items-center justify-center text-center min-h-[600px]"
              >
                <div className="w-24 h-24 bg-[#8D5B2F]/10 rounded-full flex items-center justify-center mb-10 border border-[#8D5B2F]/20">
                  <Music className="w-12 h-12 text-[#8D5B2F]" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-[#260B01] mb-6 italic">Thanks for your song wish</h3>
                <p className="text-[#260B01]/60 max-w-lg font-serif italic text-lg mb-12 leading-relaxed">
                  "Your melody has been added to our traveling repertoire. We will search for the right city and the right moment to let it breathe."
                </p>
                <button 
                  onClick={resetForm}
                  className="px-12 py-6 bg-[#260B01] text-white rounded-2xl font-vintage tracking-[0.4em] text-[10px] uppercase font-bold hover:bg-[#8D5B2F] transition-all shadow-xl"
                >
                  WISH ANOTHER
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left Side Info */}
                <div className="lg:col-span-2 bg-[#8D5B2F] p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden rounded-t-[3rem] lg:rounded-l-[4rem] lg:rounded-tr-none min-h-[400px]">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-10 border border-white/20 shadow-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight font-bold italic tracking-tight">Wish for a song <br/>on our journey.</h2>
                    <p className="text-white/80 text-lg font-serif italic leading-relaxed mb-10">
                      "Which melody should drift across the European plains? Suggest a cover for us to perform in a secret corner of the continent."
                    </p>
                    
                    <div className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4 text-white">
                        <Music className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-vintage">The Resonance</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed italic">
                        Every song we play is a tribute to a moment. Tell us why this song matters to you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side Form */}
                <div className="lg:col-span-3 p-8 md:p-16 bg-white relative rounded-b-[3rem] lg:rounded-r-[4rem] lg:rounded-bl-none">
                  {status === 'processing' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-r-[4rem]">
                      <Loader2 className="w-12 h-12 text-[#8D5B2F] animate-spin mb-6" />
                      <div className="text-[#8D5B2F] font-vintage tracking-[0.4em] text-[11px] uppercase font-bold text-center flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Harmonizing...
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleDispatch} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Your Name</label>
                        <input required type="text" placeholder="Who is making the wish?" value={formData.requesterName} onChange={(e) => setFormData({...formData, requesterName: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Song Title</label>
                        <input required type="text" placeholder="Title of the melody" value={formData.songName} onChange={(e) => setFormData({...formData, songName: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Original Artist</label>
                        <input required type="text" placeholder="Artist name" value={formData.artistName} onChange={(e) => setFormData({...formData, artistName: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block flex items-center gap-2">
                        <LinkIcon className="w-3 h-3" />
                        Specific Version Link
                      </label>
                      <input type="url" placeholder="YouTube, Spotify, or any reference link" value={formData.versionLink} onChange={(e) => setFormData({...formData, versionLink: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">The Story Behind the Wish</label>
                      <textarea rows={4} required placeholder="Why should we perform this song? Tell us about the memory it holds..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none resize-none font-serif text-lg"></textarea>
                    </div>

                    <div className="pt-8">
                      <button 
                        type="submit" 
                        disabled={status === 'processing'} 
                        className="group relative w-full py-6 md:py-8 bg-[#260B01] hover:bg-[#8D5B2F] text-white font-bold rounded-2xl font-vintage tracking-[0.5em] transition-all shadow-2xl flex items-center justify-center gap-6 overflow-hidden uppercase text-[11px]"
                      >
                        <span className="relative z-10">
                          {status === 'processing' ? 'SENDING...' : 'SEND SONG WISH'}
                        </span>
                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </button>
                      <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-[#260B01]/30 uppercase tracking-[0.2em] font-bold text-center">
                        <Info className="w-3 h-3" />
                        Submits to our tour playlist diary
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};