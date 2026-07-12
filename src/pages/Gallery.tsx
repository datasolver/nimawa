import { useState, useEffect } from 'react';
import { Camera, Play, X, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [albums, setAlbums] = useState<string[]>(['All']);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.items);
          setFilteredItems(data.items);

          const uniqueAlbums = ['All', ...new Set(data.items.map((i: GalleryItem) => i.album))];
          setAlbums(uniqueAlbums);
        }
      })
      .catch((err) => console.error('Error fetching gallery:', err));
  }, []);

  useEffect(() => {
    if (selectedAlbum === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.album === selectedAlbum));
    }
  }, [selectedAlbum, items]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="gallery-page">
      {/* Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Media Archives
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            NiMAWA Community Gallery
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Visual highlights of our historical events, social functions, children programs, and family gatherings across Western Australia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Album Filters toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-2 justify-center mb-8">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => {
                setSelectedAlbum(album);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAlbum === album
                  ? 'bg-emerald-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
              id={`album-filter-${album.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-xs">No media items found in this album.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md cursor-pointer group hover:scale-[1.01] transition-all relative"
                id={`gallery-item-${item.id}`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {item.type === 'video' ? (
                      <span className="p-3 bg-amber-500 rounded-full text-emerald-950 shadow-md">
                        <Play className="w-5 h-5 fill-current" />
                      </span>
                    ) : (
                      <span className="p-3 bg-white/90 rounded-full text-emerald-950 shadow-md">
                        <Camera className="w-5 h-5" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-amber-600 font-mono block">
                    {item.album}
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-sm truncate leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal overlay */}
      {currentLightboxItem && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col justify-between p-4" id="gallery-lightbox">
          {/* Header Controls */}
          <div className="flex justify-between items-center text-white py-2 px-4 border-b border-white/10">
            <div>
              <span className="text-amber-400 font-mono text-[10px] uppercase font-bold">{currentLightboxItem.album}</span>
              <h3 className="font-serif font-bold text-sm sm:text-base mt-0.5">{currentLightboxItem.title}</h3>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-none"
              title="Close"
              id="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Showcase media */}
          <div className="flex-grow flex items-center justify-between relative px-2 sm:px-12">
            {/* Left navigation slide button */}
            <button
              onClick={handlePrev}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors shrink-0"
              title="Previous"
              id="lightbox-prev-btn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Media wrapper */}
            <div className="max-w-4xl max-h-[70vh] flex items-center justify-center overflow-hidden mx-4">
              <img
                src={currentLightboxItem.mediaUrl}
                alt={currentLightboxItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right navigation slide button */}
            <button
              onClick={handleNext}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors shrink-0"
              title="Next"
              id="lightbox-next-btn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom stats footer bar */}
          <div className="text-center text-white/60 text-xs py-3 border-t border-white/10">
            Image {lightboxIndex !== null ? lightboxIndex + 1 : 0} of {filteredItems.length} &bull; NiMAWA Western Australia Community
          </div>
        </div>
      )}
    </div>
  );
}
