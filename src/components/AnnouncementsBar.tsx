import { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { Megaphone, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AnnouncementsBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const active = data.announcements.filter((a: Announcement) => a.isActive);
          setAnnouncements(active);
        }
      })
      .catch((err) => console.error('Error fetching announcements:', err));
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const getColorClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-950 text-emerald-100 border-emerald-800';
      case 'warning':
        return 'bg-amber-950 text-amber-100 border-amber-800';
      case 'info':
      default:
        return 'bg-slate-900 text-slate-100 border-slate-800';
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div id="announcement-bar" className={`border-b text-xs py-2 px-4 flex items-center justify-between transition-all ${getColorClass(current.type)}`}>
      <div className="flex items-center gap-2 max-w-[85%] overflow-hidden">
        <span className="flex items-center justify-center p-1 bg-amber-500 text-emerald-950 rounded-full animate-pulse flex-shrink-0">
          <Megaphone className="w-3.5 h-3.5" />
        </span>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 font-medium"
            >
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-[10px] bg-emerald-900/40 px-1.5 py-0.5 rounded border border-emerald-800">
                Live Notice
              </span>
              <span className="truncate">{current.title}: {current.content}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {announcements.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
              title="Previous Announcement"
              id="ann-prev-btn"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 min-w-[24px] text-center">
              {currentIndex + 1}/{announcements.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
              title="Next Announcement"
              id="ann-next-btn"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors flex-shrink-0"
          title="Dismiss"
          id="ann-close-btn"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
