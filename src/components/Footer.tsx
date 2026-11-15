import React, { useState } from 'react';
import { TRUST_CREDENTIALS } from '../data/safariData';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Award,
  HeartPulse,
  X,
  ExternalLink,
  MessageSquare,
  Smartphone,
  Copy,
  Check,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

interface FooterProps {
  onOpenMpesaPay?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMpesaPay }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'cancellation' | 'medical' | null>(null);
  const [copiedMpesa, setCopiedMpesa] = useState(false);

  const handleCopyMpesa = () => {
    navigator.clipboard?.writeText('0718020833');
    setCopiedMpesa(true);
    setTimeout(() => setCopiedMpesa(false), 2000);
  };

  return (
    <footer className="bg-[#100C08] text-[#B8AA96] border-t border-[#35281C] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Bottom M-Pesa & Global Payment Gateway Hub */}
        <div
          id="mpesa-payment-gateway"
          className="rounded-3xl bg-gradient-to-br from-[#211912] via-[#261D15] to-[#1A140E] border border-[#473726] p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4ADE80]">
                <Smartphone className="w-4 h-4" />
                <span>Safaricom M-Pesa & International Checkout</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                Direct Lipa na M-Pesa Payment Gateway
              </h3>
              <p className="text-xs sm:text-sm text-[#CFC3B2] leading-relaxed">
                Settle your 30% safari deposit or full expedition balance directly via M-Pesa Express (STK Push) or Send Money to our verified merchant line. Every payment is protected under our KATO Financial Bond.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="px-3.5 py-2 rounded-xl bg-[#16110C] border border-[#3C2E20] flex items-center gap-2.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#9B8A74]">M-Pesa No:</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#4ADE80]">
                    {TRUST_CREDENTIALS.mpesaNumber}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#16110C] border border-[#3C2E20] flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#9B8A74]">Account:</span>
                  <span className="text-xs font-semibold text-[#D4AF37]">
                    {TRUST_CREDENTIALS.mpesaAccountName}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#16110C] border border-[#3C2E20] flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-xs text-[#EFE7DA]">Also: DPO Visa/MC · Pesapal Amex</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              {onOpenMpesaPay && (
                <button
                  onClick={onOpenMpesaPay}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#16A34A]/25 transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Pay Now via M-Pesa ({TRUST_CREDENTIALS.mpesaNumber})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  onClick={handleCopyMpesa}
                  className="py-2.5 px-3 rounded-xl bg-[#2B2117] hover:bg-[#382B1E] border border-[#4D3C2B] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedMpesa ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Copy 0718 020833</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${TRUST_CREDENTIALS.whatsappRaw}?text=${encodeURIComponent(
                    `Jambo Mountain Peak Adventures! I have sent / would like to make an M-Pesa payment to ${TRUST_CREDENTIALS.mpesaNumber}. Please assist with my safari confirmation.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Receipt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Top Brand & Regulatory Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Official Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/jeff-logo-art-work__1__07478fac.png"
                alt="Mountain Peak Adventures"
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#CFC3B2] leading-relaxed">
              "We Table Your Expectations With Exquisite Experience." Premier Kenyan tour and safari operator orchestrating bespoke Big Five wildlife expeditions, high-altitude mountain trekking, and luxury bush stays.
            </p>
            <div className="text-[11px] text-[#9B8A74] font-mono">
              Reg: {TRUST_CREDENTIALS.companyReg}
            </div>
          </div>

          {/* Col 2: Accreditation & Bonds */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Accreditations
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>KATO Bonded Scheme:</strong> {TRUST_CREDENTIALS.katoNumber} (100% Client Financial Protection)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Tourism Regulatory Authority:</strong> Lic. {TRUST_CREDENTIALS.traLicense}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kenya Tourism Board:</strong> Magical Kenya Accredited
                </span>
              </li>
              <li className="flex items-start gap-2">
                <HeartPulse className="w-4 h-4 text-[#E07A54] shrink-0 mt-0.5" />
                <span>
                  <strong>AMREF Flying Doctors:</strong> 500km Emergency Evacuation included on all safaris
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Nairobi Registered Office & Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Head Office
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{TRUST_CREDENTIALS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${TRUST_CREDENTIALS.phoneLocal}`} className="hover:text-white transition-colors">
                  {TRUST_CREDENTIALS.phoneLocal} / {TRUST_CREDENTIALS.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>
                  M-Pesa Direct: <strong className="text-[#4ADE80] font-mono">{TRUST_CREDENTIALS.mpesaNumber}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${TRUST_CREDENTIALS.whatsappRaw}?text=${encodeURIComponent('Jambo Mountain Peak Adventures! I would like to book a safari.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:brightness-125 transition-all font-medium"
                >
                  WhatsApp: {TRUST_CREDENTIALS.phoneWhatsApp}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${TRUST_CREDENTIALS.email}`} className="hover:text-white transition-colors break-all">
                  {TRUST_CREDENTIALS.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={TRUST_CREDENTIALS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1877F2]/15 hover:bg-[#1877F2]/30 border border-[#1877F2]/35 text-white text-xs font-medium transition-all group shadow-sm"
                  title="Visit Mountain Peak Adventures official Facebook page"
                >
                  <svg
                    className="w-4 h-4 fill-[#1877F2] shrink-0 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook: {TRUST_CREDENTIALS.facebook}</span>
                  <ExternalLink className="w-3 h-3 text-[#B8AA96] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Legal & Policy Advisories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Travel Advisories & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveLegalModal('cancellation')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Deposit & Cancellation Policy (30% Rule) →
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('medical')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Yellow Fever & Medical Insurance Advisory →
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Safari Terms & Conditions of Contract →
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#8E7D68]">
                Payment Gateways: Direct Pay Online (DPO), Pesapal, Safaricom M-Pesa ({TRUST_CREDENTIALS.mpesaNumber}).
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#2E2318] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Mountain Peak Adventures Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Kenya Tour Operator License: {TRUST_CREDENTIALS.traLicense}</span>
            <span>·</span>
            <span>KATO Bonded</span>
          </div>
        </div>
      </div>

      {/* Legal Information Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-4 lg:p-8 animate-in fade-in">
          <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
            <div className="bg-[#211A13] px-6 py-4 border-b border-[#382B1E] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                {activeLegalModal === 'cancellation'
                  ? 'Deposit & Cancellation Policies'
                  : activeLegalModal === 'medical'
                  ? 'Yellow Fever & Medical Insurance Advisory'
                  : 'Safari Terms & Conditions'}
              </span>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#EFE7DA] leading-relaxed">
              {activeLegalModal === 'cancellation' && (
                <>
                  <h4 className="font-editorial text-lg font-bold text-white">
                    30% Deposit & Refund Schedule
                  </h4>
                  <p>
                    1. <strong>Booking Deposit:</strong> A deposit of 30% of the total tour cost is required at the time of booking to secure luxury lodge reservations, domestic bush flights, and private 4x4 Land Cruiser allocation.
                  </p>
                  <p>
                    2. <strong>Balance Payment:</strong> The remaining balance of 70% is due thirty (30) days prior to the scheduled date of departure.
                  </p>
                  <p>
                    3. <strong>Cancellation Schedule:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#B8AA96]">
                    <li>More than 60 days before departure: 100% of deposit refunded, minus banking transfer fees.</li>
                    <li>31 to 60 days before departure: 50% of the deposit retained; balance refunded or credited toward future travel.</li>
                    <li>Under 30 days before departure: Deposit non-refundable due to pre-paid non-recoverable park fees and lodge allocations.</li>
                  </ul>
                  <p>
                    4. <strong>KATO Financial Guarantee:</strong> All client deposits held by Mountain Peak Adventures are insured under the Kenya Association of Tour Operators (KATO) Bonding scheme (Member #584).
                  </p>
                </>
              )}

              {activeLegalModal === 'medical' && (
                <>
                  <h4 className="font-editorial text-lg font-bold text-white">
                    Medical & Yellow Fever Requirements for Kenya
                  </h4>
                  <p>
                    1. <strong>Yellow Fever Certificate:</strong> Kenya requires a valid International Certificate of Vaccination or Prophylaxis (ICVP) for Yellow Fever only if arriving from or transiting more than 12 hours through countries with risk of yellow fever transmission. Travelers arriving directly from Europe, North America, or Asia without transit in endemic zones do not legally require a certificate.
                  </p>
                  <p>
                    2. <strong>Malaria Prophylaxis:</strong> The Kenyan savanna and coast are malaria-endemic zones. Guests are advised to consult their personal physician or travel clinic for suitable oral prophylactic medications (such as Atovaquone/Proguanil or Doxycycline).
                  </p>
                  <p>
                    3. <strong>AMREF Flying Doctors Aeromedical Evacuation:</strong> Mountain Peak Adventures automatically enrols every guest in our 500km Emergency Aeromedical Evacuation plan, providing 24/7 fixed-wing ICU aircraft rescue from remote national park airstrips directly to Nairobi hospital trauma units.
                  </p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <h4 className="font-editorial text-lg font-bold text-white">
                    General Contract Conditions
                  </h4>
                  <p>
                    1. <strong>Park Entry Regulations:</strong> All game drives are conducted under strict Kenya Wildlife Service (KWS) and county reserve bylaws. Off-road driving is prohibited inside national reserves to protect delicate savanna flora, except in designated private conservancies.
                  </p>
                  <p>
                    2. <strong>Luggage Restrictions:</strong> Scheduled domestic bush flights (Wilson to Mara/Amboseli/Diani) impose a strict weight limit of 15 kg (33 lbs) in soft-sided bags. Hard-shell suitcases cannot be accommodated in aircraft cargo pods. Excess luggage can be stored securely and free of charge in our Nairobi office vaults.
                  </p>
                  <p>
                    3. <strong>Force Majeure:</strong> In the unforeseen event of natural disasters, government airspace closures, or extreme weather, Mountain Peak Adventures will work cooperatively with lodge partners to reroute itineraries or provide travel vouchers.
                  </p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-[#382B1E] bg-[#211A13] text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#14100B] text-xs font-bold uppercase tracking-wider"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
