import React, { useState } from 'react';
import { TRUST_REVIEWS } from '../data/safariData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'All' | 'TripAdvisor' | 'SafariBookings' | 'Google Reviews'>('All');

  const filteredReviews = activePlatform === 'All'
    ? TRUST_REVIEWS
    : TRUST_REVIEWS.filter((r) => r.platform === activePlatform);

  return (
    <section id="reviews-section" className="py-20 bg-[#14100B] text-[#EFE7DA] border-b border-[#35281C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Traveler Endorsements</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Words from the Wild
            </h2>
            <p className="text-sm sm:text-base text-[#B8AA96]">
              Real reviews from international guests and local residents across TripAdvisor, SafariBookings, and Google.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#211A12] border border-[#3A2C1E] rounded-xl">
            {(['All', 'TripAdvisor', 'SafariBookings', 'Google Reviews'] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activePlatform === platform
                    ? 'bg-[#D4AF37] text-[#14100B] shadow-sm'
                    : 'text-[#B8AA96] hover:text-white hover:bg-[#2F241A]'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1D1711] border border-[#3A2C1E] rounded-3xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      rev.platform === 'TripAdvisor'
                        ? 'bg-[#00AA6C]/20 text-[#00AA6C] border border-[#00AA6C]/30'
                        : rev.platform === 'SafariBookings'
                        ? 'bg-[#C85A32]/20 text-[#E07A54] border border-[#C85A32]/30'
                        : 'bg-[#4285F4]/20 text-[#60A5FA] border border-[#4285F4]/30'
                    }`}
                  >
                    {rev.platform}
                  </span>

                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                <Quote className="w-6 h-6 text-[#D4AF37]/30" />

                <h4 className="font-editorial text-base font-bold text-white leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#B8AA96] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#33271B] mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2C2218] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-sm text-[#D4AF37] shrink-0 font-mono">
                  {rev.avatarLetter}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{rev.author}</div>
                  <div className="text-[10px] text-[#9B8A74]">{rev.location}</div>
                  <div className="text-[10px] text-[#D4AF37] truncate mt-0.5 max-w-[180px]">
                    {rev.safariTaken}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
