import React, { useState } from 'react';
import { COMPANY_GALLERY_PHOTOS } from '../data/safariData';
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface GallerySectionProps {
  onSelectSafariById?: (safariId: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectSafariById }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Field Photos', count: COMPANY_GALLERY_PHOTOS.length },
    {
      id: 'tuskers',
      label: 'Super Tuskers',
      count: COMPANY_GALLERY_PHOTOS.filter((p) => p.category === 'tuskers').length,
    },
    {
      id: 'kilimanjaro',
      label: 'Kilimanjaro Backdrops',
      count: COMPANY_GALLERY_PHOTOS.filter((p) => p.category === 'kilimanjaro').length,
    },
    {
      id: 'sunsets',
      label: 'Savanna Sunsets',
      count: COMPANY_GALLERY_PHOTOS.filter((p) => p.category === 'sunsets').length,
    },
    {
      id: 'wildlife',
      label: 'Wildlife Encounters',
      count: COMPANY_GALLERY_PHOTOS.filter((p) => p.category === 'wildlife').length,
    },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? COMPANY_GALLERY_PHOTOS
      : COMPANY_GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const currentModalPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  };

  return (
    <section id="gallery-section" className="py-20 bg-[#120E0A] text-[#EFE7DA] border-b border-[#35281C] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
            <Camera className="w-3.5 h-3.5" />
            <span>Field Photography & Wildlife Encounters</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Through the Lens of Mountain Peak Adventures
          </h2>
          <p className="text-sm sm:text-base text-[#B8AA96] leading-relaxed">
            Every photograph in this collection was captured on real expeditions by our professional safari naturalists and guests across Amboseli, Maasai Mara, and Tsavo.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#211A12] border border-[#3E2F21] px-3.5 py-1.5 rounded-full text-xs text-[#EFE7DA]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>100% Authentic Expedition Photography · Zero Stock Stockpiling</span>
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#14100B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                    : 'bg-[#1D1711] text-[#B8AA96] border-[#382B1E] hover:bg-[#2A2118] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#14100B]/20 text-[#14100B]' : 'bg-[#2E241A] text-[#9B8A74]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo, idx) => {
            const isWide = photo.aspect === 'landscape' || photo.aspect === 'panoramic';
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`group relative rounded-2xl overflow-hidden bg-[#1D1711] border border-[#382B1E] hover:border-[#D4AF37]/60 cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isWide ? 'sm:col-span-2' : 'col-span-1'
                }`}
              >
                <div className={`w-full overflow-hidden ${isWide ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[4/5]'}`}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-black/60 backdrop-blur-md text-[#D4AF37] px-2.5 py-1 rounded-full border border-white/10 shadow">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.location}</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow">
                    <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                    {photo.wildlifeSubject}
                  </div>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#B8AA96] line-clamp-1 opacity-90">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Bottom CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#211A12] via-[#2B2218] to-[#211A12] border border-[#473726] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-center md:text-left">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
              Experience These Wildlife Wonders in Person
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
              Ready to witness Kenya's iconic tuskers and Kilimanjaro sunsets?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8AA96]">
              Our expert driver-guides know the precise territories where these legendary bulls roam. Custom tailor your expedition today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/254718020833?text=Jambo%20Mountain%20Peak%20Adventures!%20I%20saw%20your%20Amboseli%20tusker%20wildlife%20gallery%20and%20would%20love%20to%20book%20a%20safari."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Inquire on WhatsApp (+254 718 020833)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentModalPhoto.location}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/80">{currentModalPhoto.wildlifeSubject}</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-2xl font-bold text-white mt-0.5">
                {currentModalPhoto.title}
              </h3>
            </div>

            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="flex-1 relative flex items-center justify-center my-3 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#14100B] text-white border border-white/20 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={currentModalPhoto.image}
              alt={currentModalPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#14100B] text-white border border-white/20 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-7xl mx-auto w-full pt-3 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="text-[#CFC3B2] leading-relaxed max-w-2xl">
                {currentModalPhoto.description}
              </p>
              <div className="text-[11px] text-[#9B8A74]">
                Photo {selectedPhotoIndex! + 1} of {filteredPhotos.length} · Mountain Peak Adventures Expedition Archive
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {currentModalPhoto.safariId && onSelectSafariById && (
                <button
                  onClick={() => {
                    const id = currentModalPhoto.safariId!;
                    setSelectedPhotoIndex(null);
                    onSelectSafariById(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View Matching Itinerary</span>
                </button>
              )}

              <a
                href={`https://wa.me/254718020833?text=${encodeURIComponent(
                  `Jambo Mountain Peak Adventures! I love this wildlife photo "${currentModalPhoto.title}" taken at ${currentModalPhoto.location}. Can you help me plan a safari to experience this?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#25D366]/20"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
