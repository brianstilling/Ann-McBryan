import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, History, Sparkles, Mic2, Guitar, Camera, MapPin } from 'lucide-react';

// @ts-ignore
import img8652 from '../src/assets/images/IMG_8652.jpg';
// @ts-ignore
import img4879 from '../src/assets/images/IMG_4879.jpg';
// @ts-ignore
import img8193 from '../src/assets/images/IMG_8193.jpg';
// @ts-ignore
import img8659 from '../src/assets/images/IMG_8659.jpg';
// @ts-ignore
import img8641 from '../src/assets/images/IMG_8641.jpg';
// @ts-ignore
import img8203 from '../src/assets/images/IMG_8203.jpg';

interface ChroniclePhoto {
  id: string;
  src: string;
  fallbackSrc: string;
  filename: string;
  title: string;
  location: string;
  caption: string;
}

const CHRONICLE_PHOTOS: ChroniclePhoto[] = [
  {
    id: 'img-8652',
    src: img8652,
    fallbackSrc: '/IMG_8652.jpg',
    filename: 'IMG_8652.jpg',
    title: 'Vondelpark Gate',
    location: 'Amsterdam, The Netherlands',
    caption: 'Ann & McBryan at the iconic gilded entrance gate of Vondelpark.'
  },
  {
    id: 'img-4879',
    src: img4879,
    fallbackSrc: '/IMG_4879.jpg',
    filename: 'IMG_4879.jpg',
    title: 'Acoustic Live in the Park',
    location: 'Vondelpark, Amsterdam',
    caption: 'Live acoustic session under the trees with listeners relaxing on the lawn.'
  },
  {
    id: 'img-8193',
    src: img8193,
    fallbackSrc: '/IMG_8193.jpg',
    filename: 'IMG_8193.jpg',
    title: 'Guitar on the Move',
    location: 'European City Streets',
    caption: 'Walking cobblestone streets with flight case in hand toward the next venue.'
  },
  {
    id: 'img-8659',
    src: img8659,
    fallbackSrc: '/IMG_8659.jpg',
    filename: 'IMG_8659.jpg',
    title: 'Canal Sunlight',
    location: 'Amsterdam, The Netherlands',
    caption: 'Sunlit waters and canal boats on a bright summer afternoon.'
  },
  {
    id: 'img-8641',
    src: img8641,
    fallbackSrc: '/IMG_8641.jpg',
    filename: 'IMG_8641.jpg',
    title: 'Half-Timbered Village',
    location: 'Historic Village, Germany',
    caption: 'Touring through historic half-timbered architecture on the southern route.'
  },
  {
    id: 'img-8203',
    src: img8203,
    fallbackSrc: '/IMG_8203.jpg',
    filename: 'IMG_8203.jpg',
    title: 'Thomann Music Stop',
    location: 'Treppendorf, Germany',
    caption: 'Stopping outside the world-famous Thomann musician headquarters.'
  }
];

interface AboutProps {
  prImages?: string[];
}

export const About: React.FC<AboutProps> = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [photos, setPhotos] = useState<ChroniclePhoto[]>(CHRONICLE_PHOTOS);

  React.useEffect(() => {
    const updated = CHRONICLE_PHOTOS.map(p => {
      const custom = localStorage.getItem(`ann_mcbryan_photo_${p.id}`);
      if (custom) {
        return { ...p, src: custom };
      }
      return p;
    });
    setPhotos(updated);
  }, []);

  return (
    <section id="about" className="py-28 sm:py-32 bg-[#DBD5CA] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Visual Showcase Side - 100% Pure, Unaltered Photos */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="space-y-6">
              {/* Primary 100% Untouched Photo Frame */}
              <motion.div
                key={`primary-${selectedPhotoIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-3 sm:p-4 rounded-3xl border border-[#8D5B2F]/20 shadow-lg"
              >
                <div className="w-full rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center">
                  <img 
                    src={photos[selectedPhotoIndex].src} 
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = photos[selectedPhotoIndex].fallbackSrc;
                    }}
                    alt={photos[selectedPhotoIndex].title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[520px] object-contain block"
                  />
                </div>
                
                {/* Clean metadata bar beneath photo — completely outside the image */}
                <div className="mt-3.5 px-2 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#260B01]">
                      {photos[selectedPhotoIndex].title}
                    </h4>
                    <p className="text-xs text-[#8D5B2F] font-vintage uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8D5B2F]" />
                      {photos[selectedPhotoIndex].location}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#260B01]/60 bg-[#DBD5CA]/60 px-3 py-1.5 rounded-lg font-semibold">
                    {photos[selectedPhotoIndex].filename}
                  </span>
                </div>
              </motion.div>

              {/* Grid of 2 Companion Photos */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((offset) => {
                  const companionIdx = (selectedPhotoIndex + offset) % photos.length;
                  const item = photos[companionIdx];
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPhotoIndex(companionIdx)}
                      className="bg-white p-2.5 rounded-2xl border border-[#8D5B2F]/20 shadow-md cursor-pointer hover:border-[#8D5B2F] transition-all"
                    >
                      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
                        <img 
                          src={item.src} 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = item.fallbackSrc;
                          }}
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover block hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="mt-2 px-1 flex items-center justify-between">
                        <p className="text-xs font-serif font-bold text-[#260B01] truncate">{item.title}</p>
                        <p className="text-[9px] font-mono text-[#8D5B2F] truncate">{item.filename}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Photo Selector Thumbnail Strip */}
              <div className="bg-white/90 p-3.5 rounded-2xl border border-[#8D5B2F]/20 shadow-sm">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-[10px] font-vintage uppercase tracking-[0.2em] font-bold text-[#8D5B2F] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    All 6 Authentic Photos
                  </span>
                  <span className="text-[9px] font-vintage uppercase tracking-wider text-[#260B01]/50">
                    Click to switch main view
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {photos.map((p, idx) => {
                    const isSelected = selectedPhotoIndex === idx;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white ${
                          isSelected 
                            ? 'border-[#8D5B2F] ring-2 ring-[#8D5B2F]/40 scale-105 shadow' 
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                        title={`${p.title} (${p.filename})`}
                      >
                        <img 
                          src={p.src} 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = p.fallbackSrc;
                          }}
                          alt={p.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-lg block"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-6 flex flex-col order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 text-[#8D5B2F] mb-6 sm:mb-8">
                <History className="w-6 h-6" />
                <span className="text-[11px] font-vintage tracking-[0.6em] uppercase font-bold text-clay">The Chronicles</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#260B01] mb-6 sm:mb-8 leading-tight font-bold tracking-tight">
                The Geometry of a Song: <br />
                <span className="italic font-normal text-[#8D5B2F]">A 365-Day Resonance.</span>
              </h2>

              <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
                <p className="text-base sm:text-lg text-[#260B01]/85 font-serif leading-relaxed italic border-l-4 border-[#8D5B2F]/40 pl-5 sm:pl-6">
                  "Ann & McBryan are the architects of the intimate. Since 1998, they have explored the dialogue between a single guitar and a shared breath."
                </p>
                <div className="h-px w-20 bg-[#8D5B2F]/30"></div>
                <p className="text-[#260B01]/75 text-sm sm:text-base font-serif leading-relaxed">
                  Their YouTube series, <span className="text-[#260B01] font-bold underline decoration-[#8D5B2F]/40 underline-offset-4">"A Song A Day"</span>, wasn't just a project—it was a vow. For 365 consecutive sunsets, Ann and McBryan recorded a raw, unedited acoustic session, proving that music doesn't need a stage to find its soul.
                </p>
                <p className="text-[#260B01]/75 text-sm sm:text-base font-serif leading-relaxed">
                  This odyssey through folk, rock, and pop transformed their studio into a global crossroads, connecting hearts across continents and setting the stage for their nomadic European voyage in the Black Berlingo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-white/90 border border-[#8D5B2F]/15 shadow-sm">
                  <Mic2 className="w-6 h-6 text-[#8D5B2F] mb-3" />
                  <h4 className="text-[11px] font-vintage tracking-[0.3em] uppercase font-bold text-[#260B01] mb-1.5">Ann</h4>
                  <p className="text-xs text-[#260B01]/65 italic font-serif leading-relaxed">A voice of amber and silk, carrying the weight of 25 years of nomadic stories.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/90 border border-[#8D5B2F]/15 shadow-sm">
                  <Guitar className="w-6 h-6 text-[#8D5B2F] mb-3" />
                  <h4 className="text-[11px] font-vintage tracking-[0.3em] uppercase font-bold text-[#260B01] mb-1.5">McBryan</h4>
                  <p className="text-xs text-[#260B01]/65 italic font-serif leading-relaxed">The pulse behind the strings. Architect of the 365-day musical journey.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <motion.a 
                  href="https://www.youtube.com/@AnnMcBryan/videos" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#260B01] text-white rounded-full font-vintage tracking-[0.3em] text-[11px] uppercase font-bold shadow-lg hover:bg-[#8D5B2F] transition-all"
                >
                  <Youtube className="w-5 h-5 text-red-500" />
                  Explore the 365 Days
                  <Sparkles className="w-3.5 h-3.5 text-[#8D5B2F]" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
