import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/safariData';
import { savannaAudio } from '../utils/safariAudio';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Award,
  Maximize2,
  X,
  Eye,
  MessageSquare,
} from 'lucide-react';

interface HeroSliderProps {
  currentCurrency: string;
  onExploreSafaris: () => void;
  onSelectSafari: (safariId: string) => void;
  onSearchFilter: (filter: { destination: string; duration: string; month: string }) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  currentCurrency,
  onExploreSafaris,
  onSelectSafari,
  onSearchFilter,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Quick search states
  const [selectedDest, setSelectedDest] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('July - Oct (Great Migration)');

  // Touch swipe handling for mobile
  const touchStartX = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto advance every 8 seconds unless paused
  useEffect(() => {
    if (isPaused || lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen]);

  const toggleAudio = () => {
    const active = savannaAudio.toggle();
    setIsAudioPlaying(active);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter({
      destination: selectedDest,
      duration: selectedDuration,
      month: selectedMonth,
    });
    onExploreSafaris();
  };

  return (
    <div
      className="relative w-full bg-[#14100B]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* STAGE 1: 4K HERO VISUAL THEATER (THE BIG FIVE) */}
      <div
        className="relative w-full h-[52vh] sm:h-[68vh] lg:h-[84vh] overflow-hidden flex flex-col justify-between select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Background Images */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              style={{
                objectPosition: slide.mobilePosition || 'center center',
              }}
              className="w-full h-full object-cover transition-transform duration-[12000ms] ease-out scale-100 sm:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100B] via-[#14100B]/30 via-35% to-black/35 pointer-events-none" />
          </div>
        ))}

        {/* Top Floating Controls */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 flex items-center justify-between gap-2">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-medium border backdrop-blur-md transition-all shadow-lg ${
              isAudioPlaying
                ? 'bg-[#D4AF37]/25 border-[#D4AF37] text-[#D4AF37] shadow-[#D4AF37]/20'
                : 'bg-black/60 border-white/20 text-white/90 hover:bg-black/80'
            }`}
            title={isAudioPlaying ? 'Mute Savanna Ambient Audio' : 'Play Ambient African Savanna Audio'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span className="hidden xs:inline">Savanna Audio: Active</span>
                <span className="xs:hidden">Audio: On</span>
                <span className="flex gap-0.5 items-end h-2.5">
                  <span className="w-0.5 h-1.5 bg-[#D4AF37] animate-ping" />
                  <span className="w-0.5 h-2.5 bg-[#D4AF37] animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/70" />
                <span className="hidden xs:inline">Savanna Sound: Off</span>
                <span className="xs:hidden">Sound: Off</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLightboxOpen(true)}
              className="flex items-center gap-1.5 bg-black/60 hover:bg-[#D4AF37] hover:text-[#14100B] backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20 text-[11px] sm:text-xs text-white/90 transition-all shadow-lg"
              title="View full uncropped wildlife photograph"
            >
              <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden sm:inline font-medium">Uncropped View</span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[11px] sm:text-xs text-[#EFE7DA] shadow-lg">
              <span className="text-[#D4AF37] font-semibold">Big Five</span>
              <span>·</span>
              <span className="font-mono font-bold">0{currentSlideIndex + 1}/0{HERO_SLIDES.length}</span>
            </div>
          </div>
        </div>

        {/* Over-Photo Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-3 sm:pb-6">
          <div className="max-w-2xl space-y-1.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#D4AF37] bg-black/65 border border-[#D4AF37]/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-md shadow-md">
              <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span>{currentSlide.tag}</span>
              <span className="text-white/60">·</span>
              <span className="text-white/90 truncate max-w-[150px] sm:max-w-none">{currentSlide.subtitle}</span>
            </div>

            <h1
              className="font-editorial text-xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg"
              key={currentSlide.id}
            >
              {currentSlide.title}
            </h1>

            <p className="hidden lg:block text-base text-[#F4EFE6]/90 font-light leading-relaxed drop-shadow">
              "{currentSlide.quote}"
            </p>

            <div className="hidden lg:flex items-center gap-2 text-xs text-[#CFC3B2] bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 w-fit">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{currentSlide.facts}</span>
            </div>

            <div className="hidden lg:flex items-center gap-3 pt-2">
              <button
                onClick={onExploreSafaris}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 shadow-lg shadow-[#D4AF37]/30 transition-all"
              >
                <span>Explore Big Five Safaris</span>
                <ArrowRight className="w-4 h-4 text-[#14100B]" />
              </button>

              <button
                onClick={() => onSelectSafari(currentSlide.recommendedSafariId)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white bg-black/45 hover:bg-black/70 border border-white/20 backdrop-blur-md transition-all"
              >
                <span>View Itinerary</span>
              </button>

              <a
                href={`https://wa.me/254718020833?text=${encodeURIComponent(
                  `Jambo Mountain Peak Adventures! I would like to inquire about booking a safari to see ${currentSlide.title} (${currentSlide.subtitle}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-[#14100B] bg-[#25D366] hover:bg-[#20BA5A] transition-all shadow-md shadow-[#25D366]/20"
                title="Book or Inquire on WhatsApp (+254 718 020833)"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Animal Carousel Switcher */}
          <div className="mt-2.5 sm:mt-4 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
              {HERO_SLIDES.map((slide, idx) => {
                const label =
                  idx === 0
                    ? '🦁 Lion'
                    : idx === 1
                    ? '🐘 Elephant'
                    : idx === 2
                    ? '🐆 Leopard'
                    : idx === 3
                    ? '🦏 Rhino'
                    : '🐃 Buffalo';
                const isSelected = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0 border whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#14100B] border-[#D4AF37] shadow-md font-bold scale-105'
                        : 'bg-black/60 text-white/80 border-white/20 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePrev}
                className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#14100B] text-white border border-white/20 transition-all"
                aria-label="Previous animal"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#14100B] text-white border border-white/20 transition-all"
                aria-label="Next animal"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 2: DEDICATED MOBILE SPOTLIGHT & ACTION PANEL */}
      <div className="lg:hidden bg-[#18130E] border-b border-[#35281C] px-4 py-4 space-y-3">
        <div className="max-w-7xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm text-[#EFE7DA] italic leading-relaxed">
            "{currentSlide.quote}"
          </p>

          <div className="flex items-start gap-2 text-[11px] sm:text-xs text-[#B8AA96] bg-[#211A12] p-2.5 rounded-xl border border-[#3B2D20]">
            <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>{currentSlide.facts}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onExploreSafaris}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20"
            >
              <span>Explore Safaris</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onSelectSafari(currentSlide.recommendedSafariId)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#261E15] hover:bg-[#32271C] text-white border border-[#453524] text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Itinerary</span>
            </button>
          </div>

          <a
            href={`https://wa.me/254718020833?text=${encodeURIComponent(
              `Jambo Mountain Peak Adventures! I would like to book a safari for ${currentSlide.title} (${currentSlide.subtitle}). Please connect with me!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Book via WhatsApp (+254 718 020833)</span>
          </a>
        </div>
      </div>

      {/* STAGE 3: QUICK SAFARI FINDER & SEARCH BAR */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <form
          onSubmit={handleQuickSearch}
          className="bg-[#1D1711] border border-[#3E2F21] p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center"
        >
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span>Destination</span>
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full bg-[#14100B] border border-[#3B2D20] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Kenya Destinations</option>
              <option value="Maasai Mara">Maasai Mara (Big Five)</option>
              <option value="Amboseli">Amboseli (Mt. Kilimanjaro)</option>
              <option value="Mount Kenya">Mount Kenya & Ol Pejeta</option>
              <option value="Diani Beach">Bush to Beach (Coast)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96] flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>Duration</span>
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-[#14100B] border border-[#3B2D20] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Any Duration</option>
              <option value="short">4 - 5 Days (Fly-in Express)</option>
              <option value="classic">6 - 8 Days (Signature)</option>
              <option value="grand">10+ Days (Bush to Beach)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96] flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#D4AF37]" />
              <span>Travel Season</span>
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-[#14100B] border border-[#3B2D20] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="July - Oct (Great Migration)">July - Oct (Great Migration Peak)</option>
              <option value="Dec - March (Calving & Warm Dry)">Dec - March (Calving & Warm Dry)</option>
              <option value="June - Nov (General Safari Season)">June - Nov (Clear Skies)</option>
              <option value="April - May (Green Season Value)">April - May (Green Season Value)</option>
            </select>
          </div>

          <div className="pt-1 sm:pt-4">
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#14100B] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/25"
            >
              <span>Find Matching Safaris</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#14100B]" />
            </button>
          </div>
        </form>
      </div>

      {/* STAGE 4: FULL UNCROPPED WILDLIFE LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in">
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full pb-3 border-b border-white/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                  {currentSlide.tag}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/80 text-xs">{currentSlide.subtitle}</span>
              </div>
              <h3 className="font-editorial text-lg sm:text-2xl font-bold text-white mt-0.5">
                {currentSlide.title}
              </h3>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close uncropped view"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="max-w-7xl mx-auto w-full pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <p className="text-[#B8AA96] italic max-w-xl">
              "{currentSlide.quote}"
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  onSelectSafari(currentSlide.recommendedSafariId);
                }}
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium transition-colors"
              >
                View Recommended Safari
              </button>
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  onExploreSafaris();
                }}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:brightness-110 text-[#14100B] font-bold uppercase tracking-wider transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
