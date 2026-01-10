import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Concert } from '../types';
import { MapPin, Navigation, Sparkles, X, ExternalLink, Loader2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import L from 'leaflet';

interface TourMapProps {
  sessions: Concert[];
}

export const TourMap: React.FC<TourMapProps> = ({ sessions }) => {
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [placeInfo, setPlaceInfo] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<{title: string, uri: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [50, 10],
      zoom: 4,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB'
    }).addTo(map);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #8D5B2F; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(141, 91, 47, 0.5);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    const points: L.LatLngExpression[] = [];
    sessions.forEach(concert => {
      const latLng: L.LatLngExpression = [concert.coordinates.lat, concert.coordinates.lng];
      points.push(latLng);

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);
      marker.on('click', () => handleMarkerClick(concert));
    });

    L.polyline(points, {
      color: '#8D5B2F',
      weight: 2,
      opacity: 0.4,
      dashArray: '5, 10'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [sessions]);

  const handleMarkerClick = async (concert: Concert) => {
    setSelectedConcert(concert);
    setPlaceInfo(null);
    setGroundingLinks([]);
    setIsAiLoading(true);

    if (mapRef.current) {
      mapRef.current.flyTo([concert.coordinates.lat, concert.coordinates.lng], 7, {
        duration: 1.5
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [{ text: `Ann & McBryan are performing at ${concert.venue} in ${concert.city}, ${concert.country}. Describe the atmosphere of this specific venue or area for a nomadic acoustic concert in 45 words. Be poetic.` }]
        },
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: concert.coordinates.lat,
                longitude: concert.coordinates.lng
              }
            }
          }
        }
      });

      const text = response.text;
      if (text) setPlaceInfo(String(text));

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter((c: any) => c.maps)
        .map((c: any) => ({
          title: String(c.maps.title || concert.city),
          uri: String(c.maps.uri)
        }));
      setGroundingLinks(links);

    } catch (err) {
      console.error("Map search error:", err);
      setPlaceInfo("The map is quiet today, but the resonance of the strings remains.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section className="py-32 bg-[#260B01] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-[#8D5B2F] mb-6"
            >
              <Navigation className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-vintage tracking-[0.5em] uppercase font-bold">Interactive Explorer</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#DBD5CA] mb-6 font-bold leading-none tracking-tight">Tour Navigator</h2>
            <p className="text-[#DBD5CA]/50 text-xl font-serif italic">
              "Every pin is a destination, every line a story. Connected to the real-world pulse of our voyage."
            </p>
          </div>
          <div className="flex items-center gap-4 text-[#8D5B2F] font-vintage tracking-[0.2em] text-[10px] font-bold uppercase pb-4">
            <div className="w-8 h-px bg-[#8D5B2F]/40"></div>
            Live Google Maps Data
          </div>
        </div>

        <div className="relative h-[600px] md:h-[700px] bg-[#DBD5CA] rounded-[3rem] md:rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />

          <div className="absolute top-8 left-8 z-10 pointer-events-none">
             <div className="bg-[#260B01]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-1">
                <span className="text-[8px] font-vintage tracking-[0.5em] uppercase text-[#8D5B2F] font-bold">Active Voyage</span>
                <span className="text-[#DBD5CA] font-serif italic text-lg">Europe 2026</span>
             </div>
          </div>

          <AnimatePresence>
            {selectedConcert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="absolute top-4 right-4 bottom-4 left-4 md:top-8 md:right-8 md:bottom-auto md:left-auto w-auto md:w-[400px] bg-[#260B01]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl z-40 overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedConcert(null)}
                  className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col h-full">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 text-[#8D5B2F] mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[10px] font-vintage tracking-[0.4em] uppercase font-bold">{String(selectedConcert.country)}</span>
                    </div>
                    <h3 className="text-4xl font-serif text-white mb-2 leading-none">{String(selectedConcert.city)}</h3>
                    <p className="text-white/40 font-vintage text-[10px] tracking-widest uppercase mb-6">{String(selectedConcert.venue)}</p>
                    <div className="h-px w-12 bg-[#8D5B2F]/30"></div>
                  </div>

                  <div className="flex-1">
                    {isAiLoading ? (
                      <div className="flex flex-col items-center justify-center py-20 text-[#8D5B2F]">
                        <Loader2 className="w-10 h-10 animate-spin mb-6" />
                        <span className="text-[9px] font-vintage tracking-[0.4em] uppercase font-bold opacity-50">Connecting to Google Maps...</span>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        <div className="relative">
                          <Sparkles className="absolute -top-6 -left-2 w-4 h-4 text-[#8D5B2F] opacity-40" />
                          <p className="text-white/80 font-serif italic text-lg leading-relaxed">
                            "{String(placeInfo || 'A silent port on our musical journey.')}"
                          </p>
                        </div>

                        {groundingLinks.length > 0 && (
                          <div className="pt-8 border-t border-white/5">
                            <h4 className="text-[9px] font-vintage tracking-[0.4em] uppercase font-bold text-[#8D5B2F] mb-6">Verified Place Links</h4>
                            <div className="space-y-4">
                              {groundingLinks.map((link, i) => (
                                <a 
                                  key={i} href={String(link.uri)} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-[#8D5B2F]/10 transition-all border border-white/5 group"
                                >
                                  <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold mb-1">GOOGLE MAPS</span>
                                    <span className="text-white/70 text-sm font-serif italic truncate pr-4">{String(link.title)}</span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-[#8D5B2F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4">
                          <button 
                            onClick={() => {
                              const el = document.getElementById(`concert-${selectedConcert.id}`);
                              el?.scrollIntoView({ behavior: 'smooth' });
                              setSelectedConcert(null);
                            }}
                            className="py-5 bg-white/5 text-white/70 font-vintage tracking-[0.4em] text-[9px] uppercase font-bold rounded-xl hover:bg-white/10 transition-all border border-white/5"
                          >
                            Logbook
                          </button>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedConcert.venue} ${selectedConcert.city}`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="py-5 bg-[#8D5B2F] text-white font-vintage tracking-[0.4em] text-[9px] uppercase font-bold rounded-xl hover:bg-[#A67D59] transition-all flex items-center justify-center gap-2"
                          >
                            <Maximize2 className="w-3 h-3" />
                            Navigate
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-12 text-[#DBD5CA]/30">
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8D5B2F] border border-white/20 group-hover:scale-125 transition-transform"></div>
            <span className="text-[8px] font-vintage tracking-[0.3em] uppercase font-bold">Live Pin</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#8D5B2F]/40 border-t border-dashed"></div>
            <span className="text-[8px] font-vintage tracking-[0.3em] uppercase font-bold">Travel Route</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] italic font-serif">Click any node to explore with AI Grounding</span>
          </div>
        </div>
      </div>
    </section>
  );
};