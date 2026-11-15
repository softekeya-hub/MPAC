import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { TRUST_CREDENTIALS } from '../data/safariData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const quickPrompts = [
    'Jambo! I would like to book a 2026 Kenya safari.',
    'Can you check 2026 Great Migration river crossing dates?',
    'I’d like a custom quote for a family safari in Amboseli & Mara.',
    `How do I confirm my safari deposit via M-Pesa (${TRUST_CREDENTIALS.mpesaNumber})?`,
  ];

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || userMsg || 'Jambo Mountain Peak Adventures! I want to plan and book a safari in Kenya.';
    const encoded = encodeURIComponent(finalMsg);
    const phoneClean = TRUST_CREDENTIALS.whatsappRaw;
    window.open(`https://wa.me/${phoneClean}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-[#18130E] border border-[#423222] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#231B13] p-4 border-b border-[#382B1E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#31251A] border border-[#D4AF37]/50 flex items-center justify-center font-bold text-white text-xs font-mono">
                  MPA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#231B13]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Mountain Peak Adventures</h4>
                <span className="text-[11px] text-[#25D366] block font-mono font-medium">
                  WhatsApp & M-Pesa: {TRUST_CREDENTIALS.phoneWhatsApp}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#B8AA96] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#14100B] max-h-72 overflow-y-auto text-xs">
            <div className="bg-[#221A12] p-3 rounded-2xl rounded-tl-sm border border-[#3B2D20] text-[#EFE7DA] leading-relaxed">
              <p>
                Jambo! Karibu Kenya. Welcome to Mountain Peak Adventures. Connect with our Safari Booking & M-Pesa Desk (<strong>{TRUST_CREDENTIALS.phoneWhatsApp}</strong>) to reserve or customize your expedition today.
              </p>
              <span className="text-[9px] text-[#9B8A74] block text-right mt-1">Just now</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-[#9B8A74] uppercase tracking-wider block font-semibold">
                Quick Inquiries:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-[#1D1711] hover:bg-[#2B2218] border border-[#35281C] text-[#EFE7DA] text-[11px] transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#1E1711] border-t border-[#35281C] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your WhatsApp message..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-[#14100B] border border-[#3B2D20] rounded-xl px-3 py-2 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] transition-colors shrink-0"
              title="Open WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] shadow-2xl flex items-center justify-center transition-all hover:scale-105 group relative"
        aria-label="Chat with Safari Specialist on WhatsApp"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#C85A32] border-2 border-[#14100B]" />
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
      </button>
    </div>
  );
};
