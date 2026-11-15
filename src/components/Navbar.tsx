import React, { useState } from 'react';
import { CURRENCIES, TRUST_CREDENTIALS } from '../data/safariData';
import { Globe, Phone, Menu, X, ShieldCheck, ChevronDown, Compass, MessageSquare, Smartphone } from 'lucide-react';

interface NavbarProps {
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
  onOpenCustomSafari: () => void;
  onOpenMpesaPay: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenCustomSafari,
  onOpenMpesaPay,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Safaris & Itineraries', target: 'safaris-section' },
    { label: 'Expedition Gallery', target: 'gallery-section' },
    { label: 'Interactive Map', target: 'map-section' },
    { label: 'Fleet & Bush Flights', target: 'fleet-section' },
    { label: 'Kenyan Heritage', target: 'culture-section' },
    { label: 'Travel Journal', target: 'journal-section' },
    { label: 'Trust & Reviews', target: 'reviews-section' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigateSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#14100B]/95 backdrop-blur-md border-b border-[#3A2C1E]">
      {/* Top Savanna Trust & M-Pesa Payment Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs text-[#B8AA96] bg-[#1A140E] border-b border-[#2F2318]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium">KATO Bonded Member #584</span>
          </div>
          <span className="text-[#5C4936]">·</span>
          <span>TRA: {TRUST_CREDENTIALS.traLicense}</span>
          <span className="text-[#5C4936]">·</span>
          <span className="text-[#EFE7DA]">Magical Kenya Certified</span>
          <span className="text-[#5C4936]">·</span>
          <span className="text-[#B8AA96]">AMREF Evacuation Included</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Top M-Pesa Payment Gateway Trigger */}
          <button
            onClick={onOpenMpesaPay}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#16A34A]/20 hover:bg-[#16A34A]/35 border border-[#22C55E]/40 text-[#4ADE80] font-semibold transition-all cursor-pointer"
            title="Launch Lipa na M-Pesa Payment Gateway"
          >
            <Smartphone className="w-3 h-3" />
            <span>M-Pesa Pay: {TRUST_CREDENTIALS.mpesaNumber}</span>
          </button>

          <span className="text-[#5C4936]">·</span>

          <a
            href={`tel:${TRUST_CREDENTIALS.phonePrimary.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D4AF37]" />
            <span>{TRUST_CREDENTIALS.phoneLocal}</span>
          </a>

          <span className="text-[#5C4936]">·</span>

          <a
            href={`https://wa.me/${TRUST_CREDENTIALS.whatsappRaw}?text=${encodeURIComponent('Jambo Mountain Peak Adventures! I would like to book a safari.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:brightness-125 transition-all"
          >
            <MessageSquare className="w-3 h-3 fill-current" />
            <span>WhatsApp: {TRUST_CREDENTIALS.phoneWhatsApp}</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand wordmark | Nav links | Action zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Brand lockup with official logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group shrink-0"
          >
            <img
              src="/assets/aistudio/mountain-peak-adventures__1__74d9459a.png"
              alt="Mountain Peak Adventures Logo"
              referrerPolicy="no-referrer"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="block font-editorial text-xl font-bold tracking-tight text-[#FFFDF9] group-hover:text-[#D4AF37] transition-colors">
                Mountain Peak Adventures
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#D4AF37]/90 font-medium">
                Kenya Savanna Safaris & Expeditions
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#EFE7DA]">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="whitespace-nowrap shrink-0 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Currency Switcher, M-Pesa quick trigger on mobile/tablet & Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Mobile/Tablet Quick M-Pesa Button */}
            <button
              onClick={onOpenMpesaPay}
              className="lg:hidden inline-flex items-center gap-1 px-2.5 py-2 text-[11px] font-bold text-[#4ADE80] bg-[#16A34A]/15 hover:bg-[#16A34A]/25 border border-[#22C55E]/40 rounded-lg transition-colors whitespace-nowrap"
              title="Pay via M-Pesa (0718 020833)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">M-Pesa</span>
            </button>

            {/* Multi-Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#231B13] hover:bg-[#2E2318] border border-[#443424] rounded-lg transition-colors whitespace-nowrap"
                title="Select Currency"
                aria-expanded={currencyDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold text-[#D4AF37]">{currentCurrency}</span>
                <span className="text-[#B8AA96]">({CURRENCIES[currentCurrency]?.symbol.trim()})</span>
                <ChevronDown className="w-3 h-3 text-[#B8AA96]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E1711] border border-[#443424] rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#9B8A74] uppercase tracking-wider border-b border-[#33271B]">
                    Choose Currency
                  </div>
                  {Object.values(CURRENCIES).map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#2C2218] transition-colors ${
                        currentCurrency === curr.code
                          ? 'bg-[#2C2218] text-[#D4AF37] font-semibold'
                          : 'text-[#EFE7DA]'
                      }`}
                    >
                      <span>{curr.name}</span>
                      <span className="font-mono text-[#D4AF37]">
                        {curr.code} ({curr.symbol.trim()})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCustomSafari}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:from-[#E5C158] hover:to-[#D4AF37] rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4 text-[#14100B]" />
              <span>Plan Custom Safari</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#B8AA96] hover:text-white hover:bg-[#231B13] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#18130E] border-b border-[#3A2C1E] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="text-left px-3 py-2.5 text-sm font-medium text-[#EFE7DA] hover:text-[#D4AF37] hover:bg-[#241C14] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#35281C] space-y-3">
            <button
              onClick={() => {
                onOpenCustomSafari();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-xs font-semibold tracking-wide uppercase text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-lg flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Plan Custom Safari</span>
            </button>

            <div className="pt-2 border-t border-[#2E2318] space-y-2 text-xs">
              <button
                onClick={() => {
                  onOpenMpesaPay();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between text-white font-bold p-2.5 rounded-xl bg-[#16A34A]/20 hover:bg-[#16A34A]/30 border border-[#22C55E]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#4ADE80]" />
                  <span>M-Pesa Pay ({TRUST_CREDENTIALS.mpesaNumber})</span>
                </div>
                <span className="text-[10px] uppercase text-[#4ADE80]">Pay Now</span>
              </button>

              <a
                href={`tel:${TRUST_CREDENTIALS.phonePrimary.replace(/\s+/g, '')}`}
                className="flex items-center justify-between text-white hover:text-[#D4AF37] p-2.5 rounded-xl bg-[#221A12] border border-[#3A2C1E]"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call Us: {TRUST_CREDENTIALS.phoneLocal}</span>
                </div>
                <span className="text-[10px] text-[#9B8A74]">24/7 Desk</span>
              </a>

              <a
                href={`https://wa.me/${TRUST_CREDENTIALS.whatsappRaw}?text=${encodeURIComponent('Jambo Mountain Peak Adventures! I would like to book a safari.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#14100B] font-bold p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Book via WhatsApp ({TRUST_CREDENTIALS.phoneWhatsApp})</span>
                </div>
                <span className="text-[10px] uppercase">Chat Now</span>
              </a>
            </div>

            <div className="text-center text-xs text-[#9B8A74]">
              TRA Lic: {TRUST_CREDENTIALS.traLicense} · KATO Bonded #584
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
