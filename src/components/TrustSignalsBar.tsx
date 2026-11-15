import React, { useState } from 'react';
import { TRUST_CREDENTIALS } from '../data/safariData';
import { ShieldCheck, Award, HeartPulse, Star, CheckCircle2, Smartphone, Copy, Check, ArrowRight } from 'lucide-react';

interface TrustSignalsBarProps {
  onOpenMpesaPay?: () => void;
}

export const TrustSignalsBar: React.FC<TrustSignalsBarProps> = ({ onOpenMpesaPay }) => {
  const [copiedMpesa, setCopiedMpesa] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText('0718020833');
    setCopiedMpesa(true);
    setTimeout(() => setCopiedMpesa(false), 2000);
  };

  return (
    <section className="bg-[#17120D] border-y border-[#35281C] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Lipa na M-Pesa Direct Gateway Banner */}
        <div className="bg-gradient-to-r from-[#231B13] via-[#281F15] to-[#231B13] border border-[#453524] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-11 h-11 rounded-xl bg-[#16A34A]/20 border border-[#22C55E]/40 text-[#4ADE80] flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Instant Lipa na M-Pesa Payment Gateway
                </span>
                <span className="px-2 py-0.5 rounded bg-[#16A34A]/20 text-[#4ADE80] border border-[#22C55E]/30 font-mono text-xs font-bold">
                  {TRUST_CREDENTIALS.mpesaNumber}
                </span>
              </div>
              <p className="text-xs text-[#B8AA96]">
                Pay safari deposits or full balances directly via Safaricom M-Pesa to{' '}
                <strong className="text-[#EFE7DA]">{TRUST_CREDENTIALS.mpesaAccountName}</strong> ({TRUST_CREDENTIALS.mpesaInternational}).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={handleCopyNumber}
              className="px-3.5 py-2 rounded-xl bg-[#2E241A] hover:bg-[#3A2E21] border border-[#4D3C2B] text-xs font-semibold text-[#EFE7DA] flex items-center gap-1.5 transition-colors"
            >
              {copiedMpesa ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Copied 0718 020833</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Copy {TRUST_CREDENTIALS.mpesaNumber}</span>
                </>
              )}
            </button>

            {onOpenMpesaPay && (
              <button
                onClick={onOpenMpesaPay}
                className="px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#16A34A]/20 transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Pay with M-Pesa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Row 1: Accredited Regulatory & Safety Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Badge 1: KATO Bonded */}
          <div className="bg-[#1E1711] border border-[#382B1E] rounded-xl p-4 flex items-start gap-3.5 hover:border-[#D4AF37]/50 transition-colors">
            <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">KATO Bonded</span>
                <span className="text-[10px] text-[#D4AF37] font-mono">#584</span>
              </div>
              <p className="text-[11px] text-[#B8AA96] mt-0.5 leading-snug">
                Kenya Association of Tour Operators financial bonding guarantees 100% deposit protection.
              </p>
            </div>
          </div>

          {/* Badge 2: TRA Licensed */}
          <div className="bg-[#1E1711] border border-[#382B1E] rounded-xl p-4 flex items-start gap-3.5 hover:border-[#D4AF37]/50 transition-colors">
            <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">TRA Registered</span>
                <span className="text-[10px] text-[#D4AF37] font-mono">Lic. 2024/0892</span>
              </div>
              <p className="text-[11px] text-[#B8AA96] mt-0.5 leading-snug">
                Fully vetted and audited class "A" tour operator by the Kenya Tourism Regulatory Authority.
              </p>
            </div>
          </div>

          {/* Badge 3: AMREF Flying Doctors */}
          <div className="bg-[#1E1711] border border-[#382B1E] rounded-xl p-4 flex items-start gap-3.5 hover:border-[#D4AF37]/50 transition-colors">
            <div className="p-2.5 rounded-lg bg-[#C85A32]/15 text-[#E07A54] shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">AMREF Evacuation</span>
                <span className="text-[10px] text-[#E07A54] font-mono">500km Cover</span>
              </div>
              <p className="text-[11px] text-[#B8AA96] mt-0.5 leading-snug">
                Emergency 24/7 bush aeromedical evacuation cover provided for every passenger on our safaris.
              </p>
            </div>
          </div>

          {/* Badge 4: KTB Magical Kenya */}
          <div className="bg-[#1E1711] border border-[#382B1E] rounded-xl p-4 flex items-start gap-3.5 hover:border-[#D4AF37]/50 transition-colors">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Magical Kenya</span>
                <span className="text-[10px] text-amber-400 font-mono">KTB Gold</span>
              </div>
              <p className="text-[11px] text-[#B8AA96] mt-0.5 leading-snug">
                Official accreditation from Kenya Tourism Board and Gold Eco-Rating for conservation ethics.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Live Verified Review Scores Across Major Platforms */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#32261A] text-xs">
          <span className="text-[#9B8A74] font-medium tracking-wide uppercase text-[11px]">
            Independently Verified Traveler Ratings
          </span>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* TripAdvisor */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00AA6C]" />
              <span className="font-semibold text-white">TripAdvisor</span>
              <div className="flex items-center text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span className="font-bold ml-1 text-white">4.9 / 5.0</span>
              </div>
              <span className="text-[#9B8A74] text-[11px]">(Traveler's Choice 2026)</span>
            </div>

            {/* SafariBookings */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32]" />
              <span className="font-semibold text-white">SafariBookings</span>
              <div className="flex items-center text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span className="font-bold ml-1 text-white">4.98 / 5.0</span>
              </div>
              <span className="text-[#9B8A74] text-[11px]">(Top Rated Kenya Operator)</span>
            </div>

            {/* Google Business */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
              <span className="font-semibold text-white">Google Reviews</span>
              <div className="flex items-center text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span className="font-bold ml-1 text-white">4.9 / 5.0</span>
              </div>
              <span className="text-[#9B8A74] text-[11px]">(480+ Reviews)</span>
            </div>

            {/* Facebook Community */}
            <a
              href={TRUST_CREDENTIALS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-85 transition-opacity"
              title="Visit Mountain Peak Adventures Facebook"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
              <span className="font-semibold text-white">Facebook Page</span>
              <span className="text-[#9B8A74] text-[11px]">(@MountainPeakAdventures)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
