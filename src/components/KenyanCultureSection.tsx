import React, { useState } from 'react';
import { KENYAN_CULTURE_ITEMS } from '../data/safariData';
import { KenyanCultureItem } from '../types/safari';
import { Utensils, Sparkles, HeartHandshake, Flame, MapPin, X, ArrowRight, Check } from 'lucide-react';

export const KenyanCultureSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Gastronomy' | 'Culture & Traditions'>('All');
  const [selectedItem, setSelectedItem] = useState<KenyanCultureItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? KENYAN_CULTURE_ITEMS
    : KENYAN_CULTURE_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="culture-section" className="py-24 bg-[#120E0A] text-[#EFE7DA] border-b border-[#35281C] relative overflow-hidden">
      {/* Warm Savanna background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C85A32]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37] bg-[#211A12] border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Authentic African Hospitality & Roots</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Kenyan Heritage & Gastronomy
            </h2>
            <p className="text-sm sm:text-base text-[#B8AA96] leading-relaxed">
              A quintessential East African expedition transcends wildlife game drives. Immerse all your senses in centuries of Coastal Swahili trade aromas, celebratory highland charcoal feasts under acacia canopies, and living ancestral traditions.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-[#211A12] border border-[#3A2C1E] rounded-2xl self-start md:self-auto">
            {(['All', 'Gastronomy', 'Culture & Traditions'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#14100B] shadow-md shadow-[#D4AF37]/20 font-bold'
                    : 'text-[#B8AA96] hover:text-white hover:bg-[#2E2318]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner: Bush Banquet Marquee Feature */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1D1711] border border-[#423222] shadow-2xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[220px] sm:min-h-[320px] overflow-hidden">
              <img
                src="/assets/images/nyama_choma_feast_1794395340417.jpg"
                alt="Kenyan Nyama Choma Safari Bush Feast"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1711] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#1D1711]/40 lg:to-[#1D1711]" />
              <div className="absolute top-4 left-4 bg-[#14100B]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>The Safari Bush Banquet Tradition</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#E07A54] font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Maasai Mara & Central Highlands</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Nyama Choma, Kachumbari & Savanna Dining
                </h3>
                <p className="text-sm text-[#CFC3B2] leading-relaxed">
                  Slow-roasted over fragrant acacia charcoal embers on the open savannah, tender cuts of prime meat are carved table-side onto rustic olive-wood platters, accompanied by fresh vine-ripened tomato-chili kachumbari and warm ugali.
                </p>
                <div className="p-3.5 rounded-xl bg-[#261D14] border border-[#423222] text-xs text-[#EFE7DA] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    Included as a complimentary bush dinner under the African stars on all our 8-Day and 10-Day private itineraries.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedItem(KENYAN_CULTURE_ITEMS[0])}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2"
                >
                  <span>Explore Bush Feast Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#1D1711] border border-[#3A2C1E] rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#261D14]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1711] via-transparent to-black/25" />

                  <div className="absolute top-3 left-3 bg-[#14100B]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#D4AF37] border border-white/10">
                    {item.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-[11px] text-[#EFE7DA] flex items-center gap-1 font-medium drop-shadow">
                    <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{item.origin}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-editorial text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    {item.swahiliName && (
                      <span className="text-[11px] text-[#E09B4B] italic block mt-0.5">
                        Swahili: {item.swahiliName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#B8AA96] line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#33271B] mt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8A74] font-semibold">
                  Tasting & Heritage Note
                </span>
                <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-4 lg:p-8 animate-in fade-in">
          <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
            <div className="bg-[#211A13] px-6 py-4 border-b border-[#382B1E] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedItem.category} · Authentic Kenyan Experience</span>
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#3E2F21]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-[#D4AF37] font-semibold">
                  {selectedItem.origin}
                </div>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-white">
                  {selectedItem.title}
                </h3>
                {selectedItem.swahiliName && (
                  <span className="text-sm text-[#E07A54] italic block mt-0.5">
                    Original Swahili Designation: {selectedItem.swahiliName}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#EFE7DA] leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="p-4 bg-[#241C14] border border-[#3E2F21] rounded-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>The Traveler's Experience:</span>
                </span>
                <p className="text-xs text-[#CFC3B2] leading-relaxed">
                  {selectedItem.tastingNotesOrDetails}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#9B8A74]">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% community-sourced ingredients and licensed indigenous cultural guides.</span>
              </div>
            </div>

            <div className="p-4 border-t border-[#382B1E] bg-[#211A13] text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
