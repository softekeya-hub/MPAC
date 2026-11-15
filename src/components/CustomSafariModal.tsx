import React, { useState } from 'react';
import { X, Compass, CheckCircle2, Send, ArrowRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomSafariModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSafariTitle?: string;
}

export const CustomSafariModal: React.FC<CustomSafariModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [destinations, setDestinations] = useState<string[]>(['Maasai Mara']);
  const [durationDays, setDurationDays] = useState<number>(7);
  const [travelMonth, setTravelMonth] = useState<string>('August 2026');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [safariBeachSplit, setSafariBeachSplit] = useState<number>(70);
  const [budgetTier, setBudgetTier] = useState<string>('Mid-Range ($2,500 - $4,000 / pp)');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const destinationOptions = [
    'Maasai Mara',
    'Amboseli (Mt. Kilimanjaro)',
    'Ol Pejeta & Rhinos',
    'Mount Kenya Trek',
    'Samburu Special Five',
    'Lake Nakuru & Naivasha',
    'Tsavo Red Elephants',
    'Diani Beach (Indian Ocean)',
    'Lamu Archipelago',
  ];

  const toggleDestination = (dest: string) => {
    setDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C85A32', '#F4EFE6'],
      });
    } catch {
      // noop
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in">
      <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative max-h-[92vh]">
        <div className="bg-[#211A13] border-b border-[#382B1E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="text-sm font-bold text-white font-editorial">
                Plan Your Custom Tailor-Made Safari
              </span>
              <span className="text-xs text-[#9B8A74] block">
                Bespoke Itinerary Curation · Guaranteed Response within 4 Hours
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#4ADE80] flex items-center justify-center mx-auto border border-[#22C55E]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-white">
                Asante Sana, {clientName}!
              </h3>
              <p className="text-sm text-[#B8AA96] leading-relaxed">
                Your custom expedition blueprint has been transmitted to our Chief Safari Specialist, <strong>Jackson Ole Kiprono</strong>. We will prepare your day-by-day tailored quote, flight timings, and lodge recommendations and deliver them to <strong>{clientEmail}</strong>.
              </p>
              <div className="p-4 bg-[#221A12] rounded-2xl border border-[#3B2D20] text-xs text-[#D4AF37] text-left space-y-1">
                <div><strong>Safari Duration:</strong> ~{durationDays} Days ({destinations.join(', ')})</div>
                <div><strong>Party:</strong> {adults} Adults, {children} Children</div>
                <div><strong>Safari / Beach Split:</strong> {safariBeachSplit}% Wildlife / {100 - safariBeachSplit}% Indian Ocean Beach</div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href={`https://wa.me/254718020833?text=${encodeURIComponent(
                    `Jambo Mountain Peak Adventures! I submitted a custom safari request:\n• Name: ${clientName}\n• Destinations: ${destinations.join(', ')}\n• Duration: ~${durationDays} Days\n• Travel Month: ${travelMonth}\n• Party: ${adults} Adults, ${children} Children\n• Budget Tier: ${budgetTier}\n• Notes: ${notes || 'None'}\n\nPlease prepare a tailored quote for us!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#25D366]/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+254 718 020833)</span>
                </a>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#35281C] text-xs">
                <span className="font-semibold text-[#D4AF37]">
                  Step {step} of 3: {step === 1 ? 'Destinations & Timeframe' : step === 2 ? 'Party & Travel Style' : 'Your Contact Details'}
                </span>
                <span className="text-[#9B8A74]">Takes under 2 minutes</span>
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EFE7DA] block mb-2">
                      Where would you love to explore in Kenya? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {destinationOptions.map((dest) => {
                        const isSelected = destinations.includes(dest);
                        return (
                          <button
                            type="button"
                            key={dest}
                            onClick={() => toggleDestination(dest)}
                            className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                              isSelected
                                ? 'bg-[#292017] border-[#D4AF37] text-white font-medium'
                                : 'bg-[#211A12] border-[#382B1E] text-[#B8AA96] hover:text-white'
                            }`}
                          >
                            <span>{dest}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider">
                        Ideal Total Duration: {durationDays} Days
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="21"
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        className="w-full accent-[#D4AF37]"
                      />
                      <div className="flex justify-between text-[10px] text-[#9B8A74]">
                        <span>3 Days</span>
                        <span>7 Days (Classic)</span>
                        <span>14 Days</span>
                        <span>21 Days</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider">
                        Target Travel Month / Year
                      </label>
                      <input
                        type="text"
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        placeholder="e.g. July 2026 or Dec 2026"
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Continue to Style</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider">
                        Number of Adults (12+ yrs)
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n} Adults</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider">
                        Children (Under 12 yrs)
                      </label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n} Children</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-[#221A12] border border-[#3E2F21] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Preferred Wildlife vs Beach Split</span>
                      <span className="text-[#D4AF37] font-bold">
                        {safariBeachSplit}% Safari / {100 - safariBeachSplit}% Beach
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={safariBeachSplit}
                      onChange={(e) => setSafariBeachSplit(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                    <div className="flex justify-between text-[10px] text-[#9B8A74]">
                      <span>100% Pure Beach (Diani/Lamu)</span>
                      <span>50/50 Bush & Beach</span>
                      <span>100% Pure Savannah Safari</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider block">
                      Target Budget Range (Per Person, excluding intl. flights)
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="Explorer ($1,500 - $2,500 / pp)">Explorer Tier ($1,500 - $2,500 / person)</option>
                      <option value="Mid-Range ($2,500 - $4,000 / pp)">Signature Mid-Range ($2,500 - $4,000 / person)</option>
                      <option value="Luxury Fly-in ($4,000 - $7,500 / pp)">Luxury Fly-in Lodge ($4,000 - $7,500 / person)</option>
                      <option value="Ultra-Luxe Private ($7,500+ / pp)">Ultra-Luxe Exclusive Villa / Camp ($7,500+ / person)</option>
                    </select>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-[#271E15] text-[#B8AA96] text-xs font-semibold hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Continue to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-[#9B8A74]">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-[#9B8A74]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#9B8A74]">Mobile Phone / WhatsApp (+Country Code) *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+254 718 020833"
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#9B8A74]">Special Wishes / Dietary / Honeymoon notes</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Honeymoon trip, vegetarian meals, preference for private conservancies."
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-[#271E15] text-[#B8AA96] text-xs font-semibold hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Send className="w-4 h-4 text-[#14100B]" />
                      <span>Submit Custom Safari Request</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
