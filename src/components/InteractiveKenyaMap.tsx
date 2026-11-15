import React, { useState } from 'react';
import { KENYA_MAP_DESTINATIONS, formatPrice } from '../data/safariData';
import { Sun, Plane, Car, Compass, ArrowUpRight, Sparkles } from 'lucide-react';

interface InteractiveKenyaMapProps {
  currentCurrency: string;
  onFilterDestination: (destName: string) => void;
}

export const InteractiveKenyaMap: React.FC<InteractiveKenyaMapProps> = ({
  currentCurrency,
  onFilterDestination,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>('mara');

  const selectedDestination =
    KENYA_MAP_DESTINATIONS.find((d) => d.id === selectedDestId) || KENYA_MAP_DESTINATIONS[0];

  return (
    <section id="map-section" className="py-20 bg-[#120E0A] text-[#EFE7DA] border-b border-[#35281C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Wilderness Geography</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Explore Kenya’s Legendary Wildlife Corridors
          </h2>
          <p className="text-sm sm:text-base text-[#B8AA96] leading-relaxed">
            Hover or tap any landmark pin on our interactive map of Kenya to view live weather, wildlife sightings, travel times from Wilson Airport, and starting safari prices.
          </p>
        </div>

        {/* 2-Column Split: Interactive SVG Map on Left + Dynamic Reveal Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Stylized Kenya Map (SVG) */}
          <div className="lg:col-span-7 bg-[#1A140E] border border-[#3A2C1E] rounded-3xl p-4 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Ambient savanna dust texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="flex items-center justify-between pb-4 border-b border-[#33271B] relative z-10">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#9B8A74]">
                Interactive Geographic Radar
              </span>
              <span className="text-xs text-[#D4AF37] font-medium flex items-center gap-1.5">
                Tap any region to inspect
              </span>
            </div>

            {/* Map Canvas with SVG Silhouette and Interactive Hotspots */}
            <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center z-10">
              <svg
                viewBox="0 0 500 450"
                className="w-full h-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Kenya Boundary Stylized Path - Warm Savanna Earth */}
                <path
                  d="M130,50 L260,30 L360,90 L390,190 L420,240 L380,310 L300,380 L230,370 L190,320 L150,300 L110,240 L100,160 Z"
                  fill="#271D14"
                  stroke="#6E5438"
                  strokeWidth="2.5"
                  className="transition-colors"
                />

                {/* Lake Victoria Basin Indication */}
                <path
                  d="M95,200 C80,220 85,260 105,270 C110,250 115,220 95,200 Z"
                  fill="#1A3442"
                  stroke="#2B596F"
                  strokeWidth="1.5"
                />
                <text x="50" y="240" fill="#60A5FA" fontSize="10" opacity="0.7" fontFamily="sans-serif">
                  Lake Victoria
                </text>

                {/* Indian Ocean Coastline Indication */}
                <path
                  d="M380,310 C400,340 415,380 430,420"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                <text x="390" y="380" fill="#38BDF8" fontSize="10" opacity="0.8" fontFamily="sans-serif">
                  Indian Ocean
                </text>

                {/* Equator Line */}
                <line
                  x1="80"
                  y1="225"
                  x2="440"
                  y2="225"
                  stroke="#D4AF37"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.35"
                />
                <text x="445" y="228" fill="#D4AF37" fontSize="9" opacity="0.55" fontFamily="monospace">
                  EQUATOR 0°
                </text>

                {/* Hotspot Circles */}
                {KENYA_MAP_DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === selectedDestId;
                  const cx = (dest.coordinates.x / 100) * 500;
                  const cy = (dest.coordinates.y / 100) * 450;

                  return (
                    <g
                      key={dest.id}
                      onClick={() => setSelectedDestId(dest.id)}
                      className="cursor-pointer group"
                    >
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="18"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="1.5"
                          className="animate-ping origin-center opacity-75"
                        />
                      )}

                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 10 : 7}
                        fill={isSelected ? '#D4AF37' : '#3A2B1D'}
                        stroke={isSelected ? '#FFFFFF' : '#D4AF37'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      <circle
                        cx={cx}
                        cy={cy}
                        r="3"
                        fill={isSelected ? '#14100B' : '#FFFFFF'}
                      />

                      <text
                        x={cx}
                        y={cy - 12}
                        textAnchor="middle"
                        fill={isSelected ? '#D4AF37' : '#EFE7DA'}
                        fontSize={isSelected ? '12' : '10'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        className="pointer-events-none drop-shadow-md select-none transition-all"
                      >
                        {dest.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick region selector tabs below map */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#33271B] relative z-10">
              {KENYA_MAP_DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestId(dest.id)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    selectedDestId === dest.id
                      ? 'bg-[#D4AF37] text-[#14100B] font-bold shadow-sm'
                      : 'bg-[#261D14] text-[#B8AA96] hover:text-white hover:bg-[#33271B]'
                  }`}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Deep-Dive Region Card */}
          <div className="lg:col-span-5 bg-[#1D1711] border border-[#423222] rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#261D14]">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1711] via-transparent to-black/30" />
                <div className="absolute top-4 left-4 bg-[#14100B]/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedDestination.type}</span>
                </div>
                <div className="absolute bottom-3 right-4 text-right">
                  <div className="text-[10px] uppercase tracking-wider text-[#B8AA96]">Starting From</div>
                  <div className="font-editorial text-2xl font-bold text-[#D4AF37] font-mono-tabular drop-shadow">
                    {formatPrice(selectedDestination.startingUSD, currentCurrency)}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                    {selectedDestination.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EFE7DA] leading-relaxed mt-2">
                    {selectedDestination.description}
                  </p>
                </div>

                {/* Metric Strips */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#241C14] border border-[#3E2F21] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                      <Sun className="w-3.5 h-3.5" />
                      <span className="font-semibold">Current Weather</span>
                    </div>
                    <p className="text-xs text-white mt-1 font-medium">{selectedDestination.weather}</p>
                  </div>

                  <div className="bg-[#241C14] border border-[#3E2F21] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#60A5FA]">
                      <Plane className="w-3.5 h-3.5" />
                      <span className="font-semibold">Wilson Bush Flight</span>
                    </div>
                    <p className="text-xs text-white mt-1 font-medium">{selectedDestination.flightTimeWilson}</p>
                  </div>

                  <div className="bg-[#241C14] border border-[#3E2F21] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#E07A54]">
                      <Car className="w-3.5 h-3.5" />
                      <span className="font-semibold">4x4 Cruiser Transit</span>
                    </div>
                    <p className="text-xs text-white mt-1 font-medium">{selectedDestination.driveTimeNairobi}</p>
                  </div>

                  <div className="bg-[#241C14] border border-[#3E2F21] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#FBBF24]">
                      <Compass className="w-3.5 h-3.5" />
                      <span className="font-semibold">Prime Season</span>
                    </div>
                    <p className="text-xs text-white mt-1 font-medium">{selectedDestination.bestTime}</p>
                  </div>
                </div>

                {/* Key Animal Encounters & Sightings */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase tracking-wider text-[#9B8A74] font-semibold">
                    Marquee Sightings & Wildlife Highlights:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.keySightings.map((animal) => (
                      <span
                        key={animal}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#2A2017] border border-[#453524] text-[#EFE7DA]"
                      >
                        {animal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Filter CTA */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onFilterDestination(selectedDestination.name)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#D4AF37]/20"
              >
                <span>View All {selectedDestination.name} Safaris</span>
                <ArrowUpRight className="w-4 h-4 text-[#14100B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
