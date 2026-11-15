import React, { useState } from 'react';
import { SafariPackage, AccommodationTier } from '../types/safari';
import { formatPrice, getWhatsAppBookingUrl } from '../data/safariData';
import {
  X,
  Clock,
  Users,
  Calendar,
  Check,
  Ban,
  ArrowRight,
  Printer,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Utensils,
  Car,
  Compass,
  MessageSquare,
} from 'lucide-react';

interface PackageDetailModalProps {
  safari: SafariPackage | null;
  currentCurrency: string;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (safari: SafariPackage, selectedTier: AccommodationTier) => void;
  onRequestCustomQuote: (safari: SafariPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  safari,
  currentCurrency,
  isOpen,
  onClose,
  onBookNow,
  onRequestCustomQuote,
}) => {
  const [selectedTier, setSelectedTier] = useState<AccommodationTier>('midRange');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!isOpen || !safari) return null;

  const currentTierPriceUSD =
    selectedTier === 'budget'
      ? safari.pricing.budgetUSD
      : selectedTier === 'midRange'
      ? safari.pricing.midRangeUSD
      : safari.pricing.luxuryUSD;

  const depositUSD = Math.round(currentTierPriceUSD * 0.3);

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative max-h-[92vh]">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#211A13]/95 backdrop-blur-md border-b border-[#382B1E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              {safari.durationDays}-Day Signature Itinerary
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-[#B8AA96] hidden sm:inline">
              KATO Bonded Protected Safari
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-xs font-medium text-[#B8AA96] hover:text-white hover:bg-[#2E2318] rounded-lg transition-colors flex items-center gap-1.5"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#B8AA96] hover:text-white hover:bg-[#2E2318] rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
          {/* 1. Hero Section */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[280px] bg-[#241C14] border border-[#3E2F21]">
            <img
              src={safari.featuredImage}
              alt={safari.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18130E] via-[#18130E]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              {safari.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37] text-[#14100B] inline-block shadow">
                  {safari.badge}
                </span>
              )}
              <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-white leading-tight">
                {safari.title}
              </h1>
              <p className="text-sm text-[#EFE7DA] max-w-2xl hidden sm:block">
                {safari.tagline}
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#211A12] border border-[#3B2D20]">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#9B8A74] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Duration</span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {safari.durationDays} Days / {safari.durationNights} Nights
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#9B8A74] flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Group Size</span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5">{safari.groupSize}</div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#9B8A74] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Best Travel Season</span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5 truncate">{safari.bestSeason}</div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#9B8A74] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Emergency Cover</span>
              </div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">AMREF Flying Doctors</div>
            </div>
          </div>

          {/* 2. Tiered Pricing Selector */}
          <div className="bg-[#1E1711] border border-[#423222] rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-editorial">
                  <span>Select Accommodation Tier & Experience</span>
                </h3>
                <p className="text-xs text-[#B8AA96] mt-0.5">
                  Choose between Camping, Mid-Range Eco-Lodge, or Luxury Fly-in. Prices recalculate instantly.
                </p>
              </div>

              <div className="text-left sm:text-right bg-[#271F16] p-3 rounded-2xl border border-[#473726]">
                <div className="text-[11px] uppercase tracking-wider text-[#9B8A74]">Total Package Price</div>
                <div className="font-editorial text-3xl font-bold text-[#D4AF37] font-mono-tabular">
                  {formatPrice(currentTierPriceUSD, currentCurrency)}
                </div>
                <div className="text-[11px] text-[#4ADE80]">
                  Or lock in with 30% deposit: {formatPrice(depositUSD, currentCurrency)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Budget */}
              <button
                type="button"
                onClick={() => setSelectedTier('budget')}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedTier === 'budget'
                    ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#211A12] border-[#382B1E] hover:border-[#523E2B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EFE7DA]">
                    Budget / Camping
                  </span>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    {formatPrice(safari.pricing.budgetUSD, currentCurrency)}
                  </span>
                </div>
                <p className="text-[11px] text-[#B8AA96] mt-1.5 leading-snug">
                  Quality canvas tented camps with en-suite flush toilets and hot bush showers.
                </p>
              </button>

              {/* Mid-Range */}
              <button
                type="button"
                onClick={() => setSelectedTier('midRange')}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedTier === 'midRange'
                    ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#211A12] border-[#382B1E] hover:border-[#523E2B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Mid-Range Lodge
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#14100B] font-bold">
                      Popular
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    {formatPrice(safari.pricing.midRangeUSD, currentCurrency)}
                  </span>
                </div>
                <p className="text-[11px] text-[#B8AA96] mt-1.5 leading-snug">
                  4-Star safari lodges (Serena / Sopa), swimming pools, and chef-curated 3-course dinners.
                </p>
              </button>

              {/* Luxury Fly-in */}
              <button
                type="button"
                onClick={() => setSelectedTier('luxury')}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedTier === 'luxury'
                    ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#211A12] border-[#382B1E] hover:border-[#523E2B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">
                    Luxury Fly-In
                  </span>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    {formatPrice(safari.pricing.luxuryUSD, currentCurrency)}
                  </span>
                </div>
                <p className="text-[11px] text-[#B8AA96] mt-1.5 leading-snug">
                  5-Star private conservancy camps (Governors / Angama), fine cellar wines & bush flights.
                </p>
              </button>
            </div>
          </div>

          {/* 3. Interactive Day-by-Day Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#382B1E] pb-3">
              <h3 className="text-xl font-bold text-white font-editorial">
                Interactive Day-by-Day Expedition Itinerary
              </h3>
              <span className="text-xs text-[#D4AF37]">
                {safari.itinerary.length} Days Mapped
              </span>
            </div>

            <div className="space-y-3">
              {safari.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                const assignedAccom =
                  selectedTier === 'budget'
                    ? day.accommodation.budget
                    : selectedTier === 'midRange'
                    ? day.accommodation.midRange
                    : day.accommodation.luxury;

                return (
                  <div
                    key={day.day}
                    className="bg-[#1D1711] border border-[#382B1E] rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleDay(day.day)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#251D15] transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] font-mono shrink-0">
                          Day {day.day}
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white font-editorial">
                            {day.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-[#9B8A74] mt-0.5 flex-wrap">
                            <span className="text-[#D4AF37]">{day.location}</span>
                            <span>·</span>
                            <span>{day.meals}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-1 rounded-full bg-[#2A2017] text-[#B8AA96] shrink-0 ml-2">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-[#33271B] bg-[#16110C] space-y-4 text-xs sm:text-sm">
                        <div className="flex items-start gap-2 text-xs text-[#D4AF37] bg-[#221A12] p-3 rounded-xl border border-[#3B2D20] mt-4">
                          <Car className="w-4 h-4 shrink-0 mt-0.5" />
                          <span><strong>Transit Route:</strong> {day.routeLeg}</span>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider block">
                            Daily Schedule & Game Drives:
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {day.activities.map((act, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#EFE7DA]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#211A12] p-3 rounded-xl border border-[#35281C]">
                            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                              <Utensils className="w-3.5 h-3.5" />
                              <span className="font-semibold">Meal Plan</span>
                            </div>
                            <div className="text-xs text-white mt-1">{day.meals} included</div>
                          </div>

                          <div className="bg-[#211A12] p-3 rounded-xl border border-[#35281C]">
                            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                              <Compass className="w-3.5 h-3.5" />
                              <span className="font-semibold">Lodge ({selectedTier.toUpperCase()})</span>
                            </div>
                            <div className="text-xs text-white mt-1 font-medium">{assignedAccom}</div>
                          </div>
                        </div>

                        <div className="text-xs text-[#E09B4B] italic">
                          <strong>Day Highlight:</strong> {day.highlight}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Inclusions & Exclusions Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1E1711] border border-[#3E2F21] rounded-3xl p-6 sm:p-7">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-400">
                <Check className="w-4 h-4 text-amber-400" />
                <span>What's Explicitly Included</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#EFE7DA]">
                {safari.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l border-[#35281C] pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#E07A54]">
                <Ban className="w-4 h-4 text-[#E07A54]" />
                <span>What's Not Included</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#B8AA96]">
                {safari.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E07A54] shrink-0 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 bg-[#211A13]/95 backdrop-blur-md border-t border-[#382B1E] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#9B8A74]">
              {selectedTier.toUpperCase()} Tier · {formatPrice(currentTierPriceUSD, currentCurrency)}
            </div>
            <div className="text-xs text-white">
              Lock in with <strong className="text-[#D4AF37]">30% Deposit ({formatPrice(depositUSD, currentCurrency)})</strong>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={getWhatsAppBookingUrl({
                safariTitle: safari.title,
                tier: selectedTier,
                durationDays: safari.durationDays,
                totalPrice: formatPrice(currentTierPriceUSD, currentCurrency),
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#14100B] bg-[#25D366] hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md shadow-[#25D366]/20"
              title="Chat with Mountain Peak Adventures on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => onRequestCustomQuote(safari)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#292017] hover:bg-[#382B1E] border border-[#473726] transition-colors whitespace-nowrap"
            >
              Custom Quote
            </button>

            <button
              onClick={() => onBookNow(safari, selectedTier)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
