import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Concert } from '../types';
import { 
  LogOut, Plus, Trash2, Edit3, Save, Copy, Check, 
  MapPin, Calendar, Clock, Lock, ShieldCheck, 
  ArrowLeft, Layout, ListMusic, FileText, Code, Camera, Sparkles
} from 'lucide-react';

interface AdminPanelProps {
  sessions: Concert[];
  setSessions: React.Dispatch<React.SetStateAction<Concert[]>>;
  storyTitle: string;
  setStoryTitle: React.Dispatch<React.SetStateAction<string>>;
  onRegenerateImages: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ sessions, setSessions, storyTitle, setStoryTitle, onRegenerateImages }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entryCode, setEntryCode] = useState('');
  const [activeTab, setActiveTab] = useState<'sessions' | 'story' | 'assets' | 'export'>('sessions');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [regenFeedback, setRegenFeedback] = useState(false);

  // Form State
  const [form, setForm] = useState<Partial<Concert>>({
    city: '', country: '', venue: '', date: '', time: '', status: 'upcoming', 
    coordinates: { lat: 0, lng: 0 }
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (entryCode === 'acoustic2026') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Entry Code. Please consult the Logbook Records.");
    }
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = {
      ...form,
      id: editingId || Math.random().toString(36).substr(2, 9)
    } as Concert;

    let updated;
    if (editingId) {
      updated = sessions.map(s => s.id === editingId ? newSession : s);
    } else {
      updated = [...sessions, newSession];
    }
    
    updated.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setSessions(updated);
    localStorage.setItem('ann_mcbryan_sessions', JSON.stringify(updated));
    resetForm();
  };

  const deleteSession = (id: string) => {
    if (confirm("Permanently archive this session from the public record?")) {
      const updated = sessions.filter(s => s.id !== id);
      setSessions(updated);
      localStorage.setItem('ann_mcbryan_sessions', JSON.stringify(updated));
    }
  };

  const resetForm = () => {
    setForm({ city: '', country: '', venue: '', date: '', time: '', status: 'upcoming', coordinates: { lat: 0, lng: 0 } });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleRegen = () => {
    onRegenerateImages();
    setRegenFeedback(true);
    setTimeout(() => setRegenFeedback(false), 3000);
  };

  const exportCode = () => {
    const code = `export const TOUR_DATA: Concert[] = ${JSON.stringify(sessions, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#260B01] z-[1000] flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#8D5B2F]/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#8D5B2F]/30">
            <Lock className="w-8 h-8 text-[#8D5B2F]" />
          </div>
          <h1 className="text-3xl font-serif text-white mb-4 italic">Logbook Authentication</h1>
          <p className="text-[#DBD5CA]/40 font-vintage text-[10px] tracking-[0.4em] uppercase mb-12">Authorized Personnel Only</p>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="password" autoFocus placeholder="ENTRY CODE" value={entryCode} onChange={e => setEntryCode(e.target.value)}
              className="w-full bg-white/5 border-b border-[#8D5B2F]/30 text-white text-center py-4 tracking-[0.5em] outline-none focus:border-[#8D5B2F] transition-all font-bold"
            />
            <button className="w-full py-5 bg-[#8D5B2F] text-white font-vintage tracking-[0.3em] text-xs uppercase font-bold rounded-xl hover:bg-[#A67D59] transition-all">
              Verify Credentials
            </button>
          </form>
          <button onClick={() => window.location.hash = ''} className="mt-12 text-[#DBD5CA]/20 hover:text-white transition-colors text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
            <ArrowLeft className="w-3 h-3" />
            Back to Public View
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DBD5CA] text-[#260B01]">
      <div className="fixed top-0 bottom-0 left-0 w-80 bg-[#260B01] p-10 flex flex-col z-50">
        <div className="mb-20">
          <h2 className="text-2xl font-serif text-white italic font-bold mb-2">Command</h2>
          <p className="text-[#8D5B2F] font-vintage text-[9px] tracking-[0.4em] uppercase">Control Center v1.1</p>
        </div>

        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('sessions')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'sessions' ? 'bg-[#8D5B2F] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <ListMusic className="w-5 h-5" />
            <span className="font-vintage text-[10px] uppercase tracking-widest font-bold">Manage Sessions</span>
          </button>
          <button onClick={() => setActiveTab('story')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'story' ? 'bg-[#8D5B2F] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <FileText className="w-5 h-5" />
            <span className="font-vintage text-[10px] uppercase tracking-widest font-bold">Edit Odyssey</span>
          </button>
          <button onClick={() => setActiveTab('assets')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'assets' ? 'bg-[#8D5B2F] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <Camera className="w-5 h-5" />
            <span className="font-vintage text-[10px] uppercase tracking-widest font-bold">PR Likeness Assets</span>
          </button>
          <button onClick={() => setActiveTab('export')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'export' ? 'bg-[#8D5B2F] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <Code className="w-5 h-5" />
            <span className="font-vintage text-[10px] uppercase tracking-widest font-bold">Export Config</span>
          </button>
        </nav>

        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-3 text-white/30">
            <ShieldCheck className="w-4 h-4 text-green-500/50" />
            <span className="text-[8px] font-vintage uppercase tracking-widest">System Secure</span>
          </div>
          <button onClick={() => window.location.hash = ''} className="w-full py-4 bg-white/5 border border-white/10 text-white font-vintage tracking-[0.2em] text-[10px] uppercase font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <Layout className="w-4 h-4" />
            Site Preview
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="w-full py-4 text-[#8D5B2F] font-vintage tracking-[0.2em] text-[10px] uppercase font-bold flex items-center justify-center gap-3 hover:text-white transition-all">
            <LogOut className="w-4 h-4" />
            Lock Console
          </button>
        </div>
      </div>

      <div className="ml-80 p-20">
        <header className="flex items-center justify-between mb-20">
          <div>
            <h1 className="text-5xl font-serif font-bold italic mb-4">
              {activeTab === 'sessions' ? 'Tour Sessions' : activeTab === 'story' ? 'Odyssey Narrative' : activeTab === 'assets' ? 'PR Asset Likeness' : 'Database Sync'}
            </h1>
            <p className="text-[#260B01]/40 text-lg font-serif italic">Management of the official nomadic record.</p>
          </div>
          {activeTab === 'sessions' && (
            <button onClick={() => setIsAdding(true)} className="px-10 py-5 bg-[#260B01] text-white font-vintage tracking-[0.3em] text-[10px] uppercase font-bold rounded-full flex items-center gap-4 hover:bg-[#8D5B2F] transition-all shadow-2xl">
              <Plus className="w-5 h-5" />
              New Session
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'sessions' && (
            <motion.div key="sess" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-12 gap-6 px-10 mb-4 text-[9px] font-vintage uppercase tracking-[0.3em] font-bold text-[#260B01]/30">
                <div className="col-span-3">Destination</div>
                <div className="col-span-3">Venue</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {sessions.map((s) => (
                <div key={s.id} className="grid grid-cols-12 gap-6 items-center p-8 bg-white rounded-3xl border border-[#260B01]/5 shadow-sm hover:shadow-xl transition-all group">
                  <div className="col-span-3">
                    <div className="font-serif text-xl font-bold">{s.city}</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#8D5B2F] font-bold">{s.country}</div>
                  </div>
                  <div className="col-span-3 text-[#260B01]/50 font-serif italic">{s.venue}</div>
                  <div className="col-span-2">
                    <div className="font-serif font-bold">{s.date}</div>
                    <div className="text-[10px] opacity-40">{s.time}</div>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border ${s.status === 'upcoming' ? 'bg-green-50 border-green-200 text-green-700' : s.status === 'sold-out' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingId(s.id); setForm(s); setIsAdding(true); }} className="p-3 text-[#260B01]/40 hover:text-[#8D5B2F] hover:bg-[#8D5B2F]/10 rounded-xl transition-all"><Edit3 className="w-5 h-5" /></button>
                    <button onClick={() => deleteSession(s.id)} className="p-3 text-[#260B01]/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-12 bg-white p-16 rounded-[3rem] shadow-xl border border-[#260B01]/5">
              <div className="space-y-4">
                <label className="text-[10px] font-vintage uppercase tracking-[0.4em] text-[#8D5B2F] font-bold">Public Headline</label>
                <textarea 
                  rows={4} value={storyTitle} onChange={e => { setStoryTitle(e.target.value); localStorage.setItem('ann_mcbryan_story_title', e.target.value); }}
                  className="w-full bg-[#DBD5CA]/20 rounded-2xl p-8 font-serif text-3xl italic outline-none focus:ring-2 ring-[#8D5B2F]/20 transition-all leading-tight"
                />
                <p className="text-[10px] text-[#260B01]/30 font-serif italic">Use \n for line breaks. Changes apply instantly to the homepage Odyssey section.</p>
              </div>
              <div className="flex items-center gap-6 p-10 bg-[#8D5B2F]/5 rounded-3xl border border-[#8D5B2F]/10">
                <Check className="w-6 h-6 text-green-600" />
                <span className="font-serif italic text-lg">Narrative updated in the local voyage records.</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'assets' && (
            <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-12 bg-white p-16 rounded-[3rem] shadow-xl border border-[#260B01]/5 text-center">
              <div className="w-20 h-20 bg-[#8D5B2F]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Camera className="w-10 h-10 text-[#8D5B2F]" />
              </div>
              <h3 className="text-3xl font-serif font-bold italic mb-6">Process Likeness Assets</h3>
              <p className="text-[#260B01]/60 text-lg font-serif italic leading-relaxed mb-12 max-w-2xl mx-auto">
                "Our current PR portraits are generated based on specific physical markers from your snapshots (Ann's strawberry curls, McBryan's mohawk and glasses). Trigger a re-process to update these assets with professional filters."
              </p>
              
              <div className="p-10 border-2 border-dashed border-[#8D5B2F]/20 rounded-3xl bg-[#8D5B2F]/5">
                <button 
                  onClick={handleRegen}
                  className="px-16 py-6 bg-[#260B01] text-white rounded-full font-vintage tracking-[0.4em] text-[12px] uppercase font-bold flex items-center gap-4 mx-auto hover:bg-[#8D5B2F] transition-all shadow-xl group"
                >
                  {regenFeedback ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
                  {regenFeedback ? 'Re-processed Likeness' : 'RE-GENERATE PR IMAGES'}
                </button>
              </div>
              <p className="text-[10px] text-[#260B01]/30 font-serif italic mt-6">
                *Uses Gemini 2.5 Flash Image to replace screenshot backgrounds with professional studio environments.
              </p>
            </motion.div>
          )}

          {activeTab === 'export' && (
            <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-10">
              <div className="bg-white p-16 rounded-[3rem] shadow-xl border border-[#260B01]/5">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-serif font-bold italic">Synchronize Code</h3>
                  <button onClick={exportCode} className="flex items-center gap-3 px-8 py-4 bg-[#260B01] text-white rounded-xl hover:bg-[#8D5B2F] transition-all font-vintage text-[10px] uppercase tracking-widest font-bold">
                    {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copyFeedback ? 'Copied' : 'Copy JSON for constants.ts'}
                  </button>
                </div>
                <div className="relative">
                  <pre className="bg-[#260B01] text-[#DBD5CA]/60 p-10 rounded-2xl text-[10px] overflow-x-auto font-mono max-h-[400px]">
                    {`export const TOUR_DATA: Concert[] = ${JSON.stringify(sessions, null, 2)};`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#260B01]/80 backdrop-blur-md" onClick={resetForm} />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-[#DBD5CA] rounded-[3rem] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10">
                <h2 className="text-4xl font-serif italic font-bold mb-10">{editingId ? 'Edit Session' : 'Chart New Session'}</h2>
                <form onSubmit={handleSaveSession} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">City</label>
                      <input required type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Country</label>
                      <input required type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Venue Name</label>
                    <input required type="text" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Date</label>
                      <input required type="text" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Time</label>
                      <input required type="text" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Status</label>
                      <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]">
                        <option value="upcoming">Upcoming</option>
                        <option value="sold-out">Sold Out</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Lat</label>
                      <input required type="number" step="any" value={form.coordinates?.lat} onChange={e => setForm({...form, coordinates: { ...form.coordinates!, lat: parseFloat(e.target.value) }})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-vintage uppercase tracking-widest text-[#8D5B2F] font-bold">Lng</label>
                      <input required type="number" step="any" value={form.coordinates?.lng} onChange={e => setForm({...form, coordinates: { ...form.coordinates!, lng: parseFloat(e.target.value) }})} className="w-full bg-transparent border-b border-[#260B01]/10 py-3 font-serif text-xl outline-none focus:border-[#8D5B2F]" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-10">
                    <button type="submit" className="flex-1 py-6 bg-[#260B01] text-white rounded-2xl font-vintage tracking-[0.4em] text-[10px] uppercase font-bold hover:bg-[#8D5B2F] transition-all flex items-center justify-center gap-4">
                      <Save className="w-5 h-5" />
                      Save to Logbook
                    </button>
                    <button type="button" onClick={resetForm} className="px-12 py-6 border border-[#260B01]/10 rounded-2xl font-vintage tracking-[0.4em] text-[10px] uppercase font-bold text-[#260B01]/40 hover:text-red-500 transition-all">
                      Discard
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};