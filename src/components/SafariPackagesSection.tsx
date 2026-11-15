import React from 'react';
import { SafariPackage } from '../types/safari';
import { formatPrice, getWhatsAppBookingUrl } from '../data/safariData';
import { Clock, Users, MapPin, Star, ArrowRight, Check, Sparkles, MessageSquare } from 'lucide-react';

interface SafariPackagesSectionProps {
  packages: SafariPackage[];
  currentCurrency: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onSelectPackage: (pkg: SafariPackage) => void;
  onBookPackage: (pkg: SafariPackage) => void;
}

export const SafariPackagesSection: React.FC<SafariPackagesSectionProps> = ({
  packages,
  currentCurrency,
  activeFilter,
  onFilterChange,
  onSelectPackage,
  onBookPackage,
}) => {
  const filterTabs = [
    { id: 'all', label: 'All Safaris' },
    { id: 'Maasai Mara', label: 'Maasai Mara & Migration' },
    { id: 'Amboseli', label: 'Amboseli & Kilimanjaro' },
    { id: 'Mount Kenya', label: 'Mount Kenya & Rhinos' },
    { id: 'Diani Beach', label: 'Bush to Beach' },
  ];

  const filteredPackages = packages.filter((pkg) => {
    if (activeFilter === 'all') return true;
    return pkg.destinations.some((d) => d.toLowerCase().includes(activeFilter.toLowerCase())) ||
      pkg.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
      pkg.primaryPark.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="safaris-section" className="py-20 bg-[#16110C] text-[#EFE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke African Journeys</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Signature Safari Packages
            </h2>
            <p className="text-sm sm:text-base text-[#B8AA96]">
              Every itinerary is operated in our custom-extended 4x4 Land Cruisers with guaranteed window seats, certified Gold naturalist guides, and 100% deposit protection via KATO bonding.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#211A12] border border-[#3B2D20] rounded-xl self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#D4AF37] text-[#14100B] shadow-sm'
                    : 'text-[#B8AA96] hover:text-white hover:bg-[#2F241A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#1D1711] border border-[#3A2C1E] rounded-3xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image Cover Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#261D14]">
                  <img
                    src={pkg.featuredImage}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1711] via-transparent to-black/30" />

                  {pkg.badge && (
                    <div className="absolute top-4 left-4 bg-[#14100B]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 text-white border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{pkg.rating}</span>
                    <span className="text-[#B8AA96]">({pkg.reviewCount})</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#EFE7DA]">
                    <div className="flex items-center gap-2 bg-[#14100B]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                    </div>

                    <div className="flex items-center gap-2 bg-[#14100B]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium flex-wrap">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{pkg.destinations.join(' → ')}</span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B8AA96] line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {pkg.highlightAnimals.slice(0, 5).map((animal) => (
                      <span
                        key={animal}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#261D14] text-[#D6C9B8] border border-[#3F3022]"
                      >
                        {animal}
                      </span>
                    ))}
                    {pkg.highlightAnimals.length > 5 && (
                      <span className="text-[11px] px-2 py-0.5 text-[#9B8A74]">
                        +{pkg.highlightAnimals.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#33271B] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#B8AA96]">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>All National Park Entry Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>4x4 Cruiser with Starlink Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>AMREF Flying Doctors Evacuation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Full Board Chef Meals & Lodges</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 sm:p-7 pt-0 border-t border-[#33271B] mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#9B8A74]">Starting From</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-editorial text-2xl font-bold text-[#D4AF37] font-mono-tabular">
                      {formatPrice(pkg.pricing.midRangeUSD, currentCurrency)}
                    </span>
                    <span className="text-xs text-[#B8AA96]">/ person</span>
                  </div>
                  <div className="text-[10px] text-[#9B8A74]">Mid-Range Lodge Tier (Twin Share)</div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={getWhatsAppBookingUrl({
                      safariTitle: pkg.title,
                      durationDays: pkg.durationDays,
                      totalPrice: formatPrice(pkg.pricing.midRangeUSD, currentCurrency),
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-[#14100B] bg-[#25D366] hover:bg-[#20BA5A] transition-colors flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/20"
                    title={`Book ${pkg.title} via WhatsApp (+254 718 020833)`}
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </a>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#292017] hover:bg-[#382B1E] border border-[#473726] transition-colors whitespace-nowrap text-center"
                  >
                    Itinerary
                  </button>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 shadow-md shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
