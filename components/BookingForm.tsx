import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Mail, ChevronDown, CheckCircle2, Loader2, Sparkles, Check, Info, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const BookingForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'sent' | 'error'>('idle');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    location: '',
    address: '',
    eventType: 'House Concert',
    message: ''
  });

  const europeanCountries = [
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", 
    "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
    "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", 
    "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", 
    "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", 
    "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", 
    "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", 
    "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
  ].sort();

  const julyDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDate = (day: number) => {
    setSelectedDates(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');

    try {
      const dateString = String(selectedDates.length > 0 
        ? `Proposed dates in July 2026: ${selectedDates.map(d => `July ${d}`).join(', ')}`
        : 'Open to various dates in July 2026');

      let bodyContent = String(formData.message);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const promptText = String(`
          Draft a very brief (25 words), poetic stop request for a ${formData.eventType} in ${formData.location}, ${formData.country} from ${formData.name}.
          Timing preference: ${dateString}.
          Venue: ${formData.address}.
          Personal note: "${formData.message}".
          Target: Ann & McBryan.
          Return ONLY the body text.
        `);

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [{ text: promptText }] },
          config: { maxOutputTokens: 80 }
        });
        
        const aiText = response.text;
        if (aiText && typeof aiText === 'string') {
          bodyContent = String(aiText);
        }
      } catch (aiError) {
        console.warn("AI polishing failed", aiError);
      }

      // Endpoint for Stop Request
      const formspreeEndpoint = "https://formspree.io/f/xgovjbjk";
      const payload = {
        name: String(formData.name),
        email: String(formData.email),
        country: String(formData.country),
        city: String(formData.location),
        address: String(formData.address),
        eventType: String(formData.eventType),
        originalMessage: String(formData.message),
        aiPolishedLetter: String(bodyContent),
        selectedDates: String(dateString),
        _subject: String(`Songs Across Europe 2026 request: ${formData.location}, ${formData.country} (${formData.name})`)
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
      const mailtoUrl = `mailto:annmcbryan@gmail.com?subject=Songs Across Europe 2026 request&body=${encodeURIComponent(`Name: ${formData.name}\nCountry: ${formData.country}\nLocation: ${formData.location}\nAddress: ${formData.address}\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setStatus('sent');
    }
  };

  const copyEmailAddress = () => {
    navigator.clipboard.writeText('annmcbryan@gmail.com');
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', country: '', location: '', address: '', eventType: 'House Concert', message: '' });
    setSelectedDates([]);
    setStatus('idle');
  };

  return (
    <section id="wishlist" className="py-32 bg-[#DBD5CA] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white shadow-[0_50px_100px_-20px_rgba(38,11,1,0.15)] rounded-[3rem] md:rounded-[4rem] border border-[#260B01]/5 relative overflow-visible">
          
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div 
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 md:p-32 flex flex-col items-center justify-center text-center min-h-[600px]"
              >
                <div className="w-24 h-24 bg-[#8D5B2F]/10 rounded-full flex items-center justify-center mb-10 border border-[#8D5B2F]/20">
                  <CheckCircle2 className="w-12 h-12 text-[#8D5B2F]" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-[#260B01] mb-6 italic">Request Sent</h3>
                <p className="text-[#260B01]/60 max-w-lg font-serif italic text-lg mb-12 leading-relaxed">
                  "Your request has been sent successfully. We have received your message and will review our travel diary to see if our paths can cross."
                </p>
                <button 
                  onClick={resetForm}
                  className="px-12 py-6 bg-[#260B01] text-white rounded-2xl font-vintage tracking-[0.4em] text-[10px] uppercase font-bold hover:bg-[#8D5B2F] transition-all shadow-xl"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left Side Info */}
                <div className="lg:col-span-2 bg-[#260B01] p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden rounded-t-[3rem] lg:rounded-l-[4rem] lg:rounded-tr-none min-h-[400px]">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#8D5B2F]/20 rounded-xl flex items-center justify-center mb-10 border border-[#8D5B2F]/30 shadow-lg">
                      <Heart className="w-5 h-5 text-[#8D5B2F]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight font-bold italic tracking-tight">Request a stop <br/>on our path.</h2>
                    <p className="text-white/60 text-lg font-serif italic leading-relaxed mb-10">
                      "Help us find the stages hidden in the heart of your city. We seek acoustic spaces and warm gatherings."
                    </p>
                    
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4 text-[#8D5B2F]">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-vintage">July 2026 Windows</span>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed italic">
                        Select dates from the grid to indicate when your space is available for a session.
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10 pt-12">
                    <button 
                      onClick={copyEmailAddress}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#8D5B2F]/20 transition-all">
                        {copyFeedback ? <Check className="w-4 h-4 text-[#8D5B2F]" /> : <Mail className="w-4 h-4" />}
                      </div>
                      <span className="text-[9px] font-vintage tracking-[0.2em] uppercase font-bold text-white/40 group-hover:text-white transition-all">
                        {copyFeedback ? 'COPIED' : 'annmcbryan@gmail.com'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Side Form */}
                <div className="lg:col-span-3 p-8 md:p-16 bg-white relative rounded-b-[3rem] lg:rounded-r-[4rem] lg:rounded-bl-none">
                  {status === 'processing' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-r-[4rem]">
                      <Loader2 className="w-12 h-12 text-[#8D5B2F] animate-spin mb-6" />
                      <div className="text-[#8D5B2F] font-vintage tracking-[0.4em] text-[11px] uppercase font-bold text-center flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Transcribing...
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleDispatch} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Name</label>
                        <input required type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Email</label>
                        <input required type="email" placeholder="Return Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Country</label>
                        <div className="relative">
                          <select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] outline-none appearance-none font-serif text-lg cursor-pointer">
                            <option value="">Select Country</option>
                            {europeanCountries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D5B2F] pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">City / Town</label>
                        <input required type="text" placeholder="Where are you?" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Venue Address</label>
                        <input required type="text" placeholder="Street, Number, etc." value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none font-serif text-lg" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Event Style</label>
                        <div className="relative">
                          <select required value={formData.eventType} onChange={(e) => setFormData({...formData, eventType: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] outline-none appearance-none font-serif text-lg cursor-pointer">
                            <option value="House Concert">House Concert</option>
                            <option value="Private Session">Private Session</option>
                            <option value="Public Venue">Public Venue</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D5B2F] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Proposed July 2026 Dates</label>
                      <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                          <div key={d} className="text-[8px] text-center font-bold text-[#260B01]/20 pb-1">{d}</div>
                        ))}
                        {[null, null, null].map((_, i) => <div key={`o-${i}`}></div>)}
                        {julyDays.map(day => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDate(day)}
                            className={`
                              aspect-square flex items-center justify-center text-[10px] md:text-xs font-serif rounded-full transition-all border
                              ${selectedDates.includes(day) 
                                ? 'bg-[#8D5B2F] text-white border-[#8D5B2F] shadow-lg' 
                                : 'bg-transparent text-[#260B01] border-transparent hover:border-[#8D5B2F]/30'}
                            `}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      <div className="min-h-[20px]">
                        {selectedDates.length > 0 && (
                          <span className="text-[9px] text-[#8D5B2F] font-bold uppercase tracking-widest italic">
                            {selectedDates.map(d => `July ${d}`).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-[#8D5B2F] font-bold block">Message</label>
                      <textarea rows={3} required placeholder="Tell us about the atmosphere..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 focus:border-[#8D5B2F] py-3 text-[#260B01] transition-all outline-none resize-none font-serif text-lg"></textarea>
                    </div>

                    <div className="pt-8">
                      <button 
                        type="submit" 
                        disabled={status === 'processing'} 
                        className="group relative w-full py-6 md:py-8 bg-[#260B01] hover:bg-[#8D5B2F] text-white font-bold rounded-2xl font-vintage tracking-[0.5em] transition-all shadow-2xl flex items-center justify-center gap-6 overflow-hidden uppercase text-[11px]"
                      >
                        <span className="relative z-10">
                          {status === 'processing' ? 'SENDING...' : 'SEND REQUEST'}
                        </span>
                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </button>
                      <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-[#260B01]/30 uppercase tracking-[0.2em] font-bold text-center">
                        <Info className="w-3 h-3" />
                        Submits via Formspree to Ann & McBryan
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