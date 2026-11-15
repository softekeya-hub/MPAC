import React, { useState } from 'react';
import { SAFARI_FLEET } from '../data/safariData';
import {
  Wifi,
  Gauge,
  Check,
  Info,
  Plane,
  Car,
  Compass,
  MessageCircle,
  MapPin,
  Layers,
  Sparkles,
  Camera,
} from 'lucide-react';

export const FleetShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vehicle' | 'aircraft'>('all');
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number>(0);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const filteredFleet = activeCategory === 'all'
    ? SAFARI_FLEET
    : SAFARI_FLEET.filter((v) => v.category === activeCategory);

  const currentVehicle = filteredFleet[selectedVehicleIndex] || filteredFleet[0] || SAFARI_FLEET[0];
  const activeHotspot = currentVehicle.features[activeHotspotIndex] || currentVehicle.features[0];

  const currentGallery = currentVehicle.gallery && currentVehicle.gallery.length > 0
    ? currentVehicle.gallery
    : [currentVehicle.image];

  const currentActiveImage = currentGallery[activeImageIndex] || currentVehicle.image;

  const handleCategorySwitch = (category: 'all' | 'vehicle' | 'aircraft') => {
    setActiveCategory(category);
    setSelectedVehicleIndex(0);
    setActiveHotspotIndex(0);
    setActiveImageIndex(0);
  };

  const handleVehicleSelect = (index: number) => {
    setSelectedVehicleIndex(index);
    setActiveHotspotIndex(0);
    setActiveImageIndex(0);
  };

  const inquiryMessage = encodeURIComponent(
    `Hello Mountain Peak Adventures, I am planning a Kenya safari and would like to inquire about booking/utilizing the ${currentVehicle.name} (${currentVehicle.type}) for our upcoming safari trip.`
  );
  const whatsappUrl = `https://wa.me/254718020833?text=${inquiryMessage}`;

  return (
    <section id="fleet-section" className="py-20 sm:py-28 bg-[#16110C] text-[#EFE7DA] border-b border-[#35281C] relative overflow-hidden">
      {/* Ambient Savannah sunset glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C85A32]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#35281C] pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
              <Gauge className="w-3.5 h-3.5" />
              <span>Overland Safari Fleet & Scenic Bush Flights</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Safari Vehicles & Aerial Connectors
            </h2>
            <p className="text-sm sm:text-base text-[#B8AA96] leading-relaxed">
              Explore Kenya with the exact authentic fleet we operate: heavy-duty 4x4 Land Cruiser safari wagons, pop-up safari tour vans, open-sided wildlife game viewers, and direct scheduled bush & coastal aircraft.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#211A12] border border-[#3B2D20] rounded-2xl self-start lg:self-auto shadow-inner">
            <button
              onClick={() => handleCategorySwitch('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#14100B] font-bold shadow-md shadow-[#D4AF37]/20'
                  : 'text-[#B8AA96] hover:text-white hover:bg-[#2E2318]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Fleet ({SAFARI_FLEET.length})</span>
            </button>
            <button
              onClick={() => handleCategorySwitch('vehicle')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
                activeCategory === 'vehicle'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#14100B] font-bold shadow-md shadow-[#D4AF37]/20'
                  : 'text-[#B8AA96] hover:text-white hover:bg-[#2E2318]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>4x4 Safari Overland (3)</span>
            </button>
            <button
              onClick={() => handleCategorySwitch('aircraft')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
                activeCategory === 'aircraft'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#14100B] font-bold shadow-md shadow-[#D4AF37]/20'
                  : 'text-[#B8AA96] hover:text-white hover:bg-[#2E2318]'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Bush & Coastal Flights (2)</span>
            </button>
          </div>
        </div>

        {/* Model Selection Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {filteredFleet.map((v, idx) => {
            const isSelected = idx === selectedVehicleIndex;
            return (
              <button
                key={v.id}
                onClick={() => handleVehicleSelect(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]/40'
                    : 'bg-[#1D1711] border-[#382B1E] hover:border-[#55412E] hover:bg-[#241C14]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      v.category === 'aircraft'
                        ? 'bg-sky-950/80 text-sky-400 border border-sky-800/60'
                        : 'bg-amber-950/80 text-[#D4AF37] border border-amber-800/60'
                    }`}
                  >
                    {v.category === 'aircraft' ? <Plane className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                    <span>{v.category === 'aircraft' ? 'Fly-In' : '4x4'}</span>
                  </span>

                  <span className="text-[10px] text-[#9B8A74] font-mono">
                    Max {v.passengerCapacity} pax
                  </span>
                </div>

                <div className="space-y-1">
                  <h4
                    className={`text-xs sm:text-sm font-bold line-clamp-1 transition-colors ${
                      isSelected ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'
                    }`}
                  >
                    {v.name}
                  </h4>
                  <p className="text-[11px] text-[#B8AA96] line-clamp-1">{v.type}</p>
                </div>

                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] text-[#D4AF37] font-semibold">
                    <span>Active Selection</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Vehicle & Aircraft Canvas Container */}
        <div className="bg-[#1D1711] border border-[#3B2D20] rounded-3xl p-5 sm:p-8 relative shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#33271B]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full ${
                    currentVehicle.category === 'aircraft'
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  }`}
                >
                  {currentVehicle.category === 'aircraft' ? 'Safari Flight Connector' : 'Overland Safari Vehicle'}
                </span>
                <span className="text-xs text-[#9B8A74]">·</span>
                <span className="text-xs text-[#9B8A74]">{currentVehicle.type}</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                {currentVehicle.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8AA96]">{currentVehicle.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 bg-[#251D15] px-3 py-1.5 rounded-xl border border-[#423222]">
                <Check className="w-4 h-4 shrink-0" />
                <span className="font-semibold">Guaranteed Window Seat (Max {currentVehicle.passengerCapacity})</span>
              </div>

              {currentVehicle.category === 'aircraft' ? (
                <div className="flex items-center gap-1.5 text-sky-400 bg-[#0E202B] px-3 py-1.5 rounded-xl border border-sky-800/40">
                  <Plane className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">STOL Dirt Runway Certified</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#D4AF37] bg-[#251D15] px-3 py-1.5 rounded-xl border border-[#423222]">
                  <Wifi className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">VHF / Starlink Sat Equipped</span>
                </div>
              )}
            </div>
          </div>

          {currentVehicle.routeHighlight && (
            <div className="my-4 px-4 py-2.5 bg-[#241C14] border border-[#3E2F21] rounded-xl flex items-center gap-2.5 text-xs text-[#EFE7DA]">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong className="text-white font-semibold">Typical Deployments & Routes:</strong>{' '}
                {currentVehicle.routeHighlight}
              </span>
            </div>
          )}

          {/* Interactive Image Display with Hotspots */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden my-4 border border-[#3A2C1E] bg-[#14100B] group">
            <img
              src={currentActiveImage}
              alt={currentVehicle.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0A] via-transparent to-black/30 pointer-events-none" />

            {currentGallery.length > 1 && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center gap-2 bg-[#14100B]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#3A2C1E]">
                <div className="text-[10px] text-[#B8AA96] px-2 font-semibold flex items-center gap-1">
                  <Camera className="w-3 h-3 text-[#D4AF37]" />
                  <span>Views:</span>
                </div>
                {currentGallery.map((img, gIdx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(gIdx)}
                    className={`relative w-12 h-9 rounded-lg overflow-hidden border transition-all ${
                      gIdx === activeImageIndex
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] scale-105'
                        : 'border-[#453524] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="View thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {currentVehicle.features.map((feat, idx) => {
              const isCurrent = idx === activeHotspotIndex;
              return (
                <button
                  key={feat.title}
                  onClick={() => setActiveHotspotIndex(idx)}
                  style={{ left: `${feat.hotspotX}%`, top: `${feat.hotspotY}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                  aria-label={feat.title}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full transition-all ${
                        isCurrent
                          ? 'bg-[#D4AF37]/50 animate-ping'
                          : 'bg-black/50 group-hover/pin:bg-[#D4AF37]/30'
                      }`}
                    />
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition-all ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#14100B] border-white scale-125 shadow-lg shadow-[#D4AF37]/60'
                          : 'bg-[#211A12] text-[#EFE7DA] border-[#D4AF37] group-hover/pin:scale-110'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-6 sm:max-w-md bg-[#14100B]/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl z-30">
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#D4AF37] font-semibold mb-1">
                <span className="uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Feature 0{activeHotspotIndex + 1} of 0{currentVehicle.features.length}</span>
                </span>
                <span className="text-[10px] text-[#B8AA96]">Tap numbered pins to inspect</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white font-editorial">
                {activeHotspot.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#EFE7DA] mt-1 leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 pb-6 border-b border-[#35281C]">
            {currentVehicle.features.map((feat, idx) => (
              <button
                key={feat.title}
                onClick={() => setActiveHotspotIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all text-xs ${
                  idx === activeHotspotIndex
                    ? 'bg-[#2B2118] border-[#D4AF37] text-white shadow-md'
                    : 'bg-[#221A12] border-[#382B1E] text-[#B8AA96] hover:text-white hover:bg-[#292017]'
                }`}
              >
                <div className="font-bold text-[#D4AF37] text-[10px] font-mono">0{idx + 1}</div>
                <div className="font-semibold text-white mt-0.5 truncate">{feat.title}</div>
              </button>
            ))}
          </div>

          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B8AA96] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Full Engineering & Operational Specifications</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Engine / Powerplant</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.engine}>
                  {currentVehicle.specs.engine}
                </span>
              </div>
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Drivetrain / Speed</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.drive}>
                  {currentVehicle.specs.drive}
                </span>
              </div>
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Roof / Aerial Optics</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.roof}>
                  {currentVehicle.specs.roof}
                </span>
              </div>
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Electrical / Cabin</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.power}>
                  {currentVehicle.specs.power}
                </span>
              </div>
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Comms & Navigation</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.connectivity}>
                  {currentVehicle.specs.connectivity}
                </span>
              </div>
              <div className="bg-[#241C14] p-3 rounded-xl border border-[#3E2F21]">
                <span className="text-[#9B8A74] block text-[10px] uppercase">Climate & Cooling</span>
                <span className="font-semibold text-white mt-1 block truncate" title={currentVehicle.specs.cooling}>
                  {currentVehicle.specs.cooling}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#33271B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#B8AA96] text-center sm:text-left">
              <span className="text-white font-semibold block">Want to reserve this vehicle or fly-in package?</span>
              Direct WhatsApp chat connects you immediately with our Nairobi transport coordinator.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] font-bold text-xs shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Inquire on WhatsApp (+254 718 020833)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informational Callout: Road vs Fly-In Safaris */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[#1D1711] border border-[#382B1E] space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs tracking-wider uppercase">
              <Car className="w-4 h-4" />
              <span>4x4 Overland Expeditions</span>
            </div>
            <h4 className="font-editorial text-xl font-bold text-white">
              The Classic Ground Safari Experience
            </h4>
            <p className="text-xs sm:text-sm text-[#B8AA96] leading-relaxed">
              Travel across Kenya’s scenic countryside through the Great Rift Valley escarpment. Our custom Land Cruisers and Pop-Up Vans let you stop for local roasted maize, scenic photo viewpoints, and immersive community interactions on the journey between parks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1D1711] border border-[#382B1E] space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase">
              <Plane className="w-4 h-4" />
              <span>Fly-In Bush & Coast Connectors</span>
            </div>
            <h4 className="font-editorial text-xl font-bold text-white">
              Direct Air Access to Remote Reserves
            </h4>
            <p className="text-xs sm:text-sm text-[#B8AA96] leading-relaxed">
              Maximize your wildlife game drive time by cutting travel days to minutes. Fly out of Nairobi Wilson Airport directly onto remote park airstrips in the Maasai Mara, Amboseli, or Samburu, or fly straight from the savanna to the white sands of Diani Beach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
