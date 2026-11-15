import React, { useState } from 'react';
import { SAFARI_PACKAGES } from './data/safariData';
import { SafariPackage, AccommodationTier } from './types/safari';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TrustSignalsBar } from './components/TrustSignalsBar';
import { InteractiveKenyaMap } from './components/InteractiveKenyaMap';
import { SafariPackagesSection } from './components/SafariPackagesSection';
import { PackageDetailModal } from './components/PackageDetailModal';
import { BookingModal } from './components/BookingModal';
import { FleetShowcase } from './components/FleetShowcase';
import { KenyanCultureSection } from './components/KenyanCultureSection';
import { JournalSection } from './components/JournalSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CustomSafariModal } from './components/CustomSafariModal';
import { MpesaPaymentModal } from './components/MpesaPaymentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Modals state
  const [selectedSafariForDetail, setSelectedSafariForDetail] = useState<SafariPackage | null>(null);
  const [bookingState, setBookingState] = useState<{
    safari: SafariPackage | null;
    tier: AccommodationTier;
    isOpen: boolean;
  }>({
    safari: null,
    tier: 'midRange',
    isOpen: false,
  });
  const [isCustomSafariOpen, setIsCustomSafariOpen] = useState<boolean>(false);
  const [isMpesaOpen, setIsMpesaOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroQuickSearch = (filter: { destination: string; duration: string; month: string }) => {
    if (filter.destination !== 'all') {
      setActiveFilter(filter.destination);
    } else {
      setActiveFilter('all');
    }
    scrollToSection('safaris-section');
  };

  const handleSelectSafariFromHero = (safariId: string) => {
    const found = SAFARI_PACKAGES.find((s) => s.id === safariId) || SAFARI_PACKAGES[0];
    setSelectedSafariForDetail(found);
  };

  const handleFilterDestinationFromMap = (destName: string) => {
    setActiveFilter(destName);
    scrollToSection('safaris-section');
  };

  const handleOpenBooking = (safari: SafariPackage, tier: AccommodationTier = 'midRange') => {
    setSelectedSafariForDetail(null);
    setBookingState({
      safari,
      tier,
      isOpen: true,
    });
  };

  const handleRequestCustomQuote = (safari: SafariPackage) => {
    setSelectedSafariForDetail(null);
    setIsCustomSafariOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#14100B] text-[#EFE7DA] font-sans selection:bg-[#D4AF37]/30 selection:text-white flex flex-col">
      {/* 1. Global Navigation Bar with Top M-Pesa Trigger, Multi-Currency & Official Logo */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={(curr) => setCurrentCurrency(curr)}
        onOpenCustomSafari={() => setIsCustomSafariOpen(true)}
        onOpenMpesaPay={() => setIsMpesaOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* 2. 4K Ambient Video / Cinematic Hero Slider - The Big Five */}
      <HeroSlider
        currentCurrency={currentCurrency}
        onExploreSafaris={() => scrollToSection('safaris-section')}
        onSelectSafari={handleSelectSafariFromHero}
        onSearchFilter={handleHeroQuickSearch}
      />

      {/* 3. Top Lipa na M-Pesa Payment Strip + Legal & Trust Signals */}
      <TrustSignalsBar onOpenMpesaPay={() => setIsMpesaOpen(true)} />

      {/* 4. Interactive Kenya Wilderness Map (Svg Radar & Weather / Sightings) */}
      <InteractiveKenyaMap
        currentCurrency={currentCurrency}
        onFilterDestination={handleFilterDestinationFromMap}
      />

      {/* 5. Safari Package Architecture & Catalog */}
      <SafariPackagesSection
        packages={SAFARI_PACKAGES}
        currentCurrency={currentCurrency}
        activeFilter={activeFilter}
        onFilterChange={(filter) => setActiveFilter(filter)}
        onSelectPackage={(pkg) => setSelectedSafariForDetail(pkg)}
        onBookPackage={(pkg) => handleOpenBooking(pkg, 'midRange')}
      />

      {/* 6. Authentic Wildlife Expedition Gallery (17 Company Field Photos) */}
      <GallerySection onSelectSafariById={handleSelectSafariFromHero} />

      {/* 7. Safari Fleet & Aerial Bush Flight Showcase */}
      <FleetShowcase />

      {/* 8. Kenyan Culture & Gastronomy Hub */}
      <KenyanCultureSection />

      {/* 9. Editorial Content & Travel Journal */}
      <JournalSection />

      {/* 10. Verified Traveler Reviews & Endorsements */}
      <ReviewsSection />

      {/* 11. Bottom M-Pesa Payment Gateway & Regulatory Footer */}
      <Footer onOpenMpesaPay={() => setIsMpesaOpen(true)} />

      {/* Interactive Floating WhatsApp Specialist Widget */}
      <FloatingWhatsApp />

      {/* Single Package Detailed Itinerary Landing Modal */}
      <PackageDetailModal
        safari={selectedSafariForDetail}
        currentCurrency={currentCurrency}
        isOpen={!!selectedSafariForDetail}
        onClose={() => setSelectedSafariForDetail(null)}
        onBookNow={(safari, tier) => handleOpenBooking(safari, tier)}
        onRequestCustomQuote={handleRequestCustomQuote}
      />

      {/* Dual-Payment Gateway Checkout Modal (M-Pesa 0718 020833 / DPO / Pesapal & 30% Deposit) */}
      <BookingModal
        safari={bookingState.safari}
        selectedTier={bookingState.tier}
        currentCurrency={currentCurrency}
        isOpen={bookingState.isOpen}
        onClose={() => setBookingState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Dedicated Lipa na M-Pesa Payment Modal (Accessible Top & Below) */}
      <MpesaPaymentModal
        isOpen={isMpesaOpen}
        onClose={() => setIsMpesaOpen(false)}
        currentCurrency={currentCurrency}
      />

      {/* Custom Tailor-Made Safari Wizard Modal */}
      <CustomSafariModal
        isOpen={isCustomSafariOpen}
        onClose={() => setIsCustomSafariOpen(false)}
      />
    </div>
  );
}
