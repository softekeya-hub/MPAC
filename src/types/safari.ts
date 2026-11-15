export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'KES';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstUSD: number; // 1 USD = rate
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  routeLeg: string; // e.g. "Flight from Wilson Airport (Nairobi) to Mara Serena Airstrip (45 mins)"
  activities: string[];
  meals: 'Full Board' | 'Half Board' | 'Bed & Breakfast' | 'All Inclusive';
  accommodation: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  highlight: string;
}

export type AccommodationTier = 'budget' | 'midRange' | 'luxury';

export interface SafariPackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  durationDays: number;
  durationNights: number;
  groupSize: string;
  primaryPark: string;
  destinations: string[];
  featuredImage: string;
  galleryImages: string[];
  badge?: string;
  overview: string;
  highlightAnimals: string[];
  bestSeason: string;
  pricing: {
    budgetUSD: number;
    midRangeUSD: number;
    luxuryUSD: number;
  };
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  rating: number;
  reviewCount: number;
}

export interface VehicleSpec {
  id: string;
  name: string;
  tagline: string;
  type: string;
  category: 'vehicle' | 'aircraft';
  image: string;
  gallery?: string[];
  passengerCapacity: number | string;
  windowSeatsGuaranteed: boolean;
  routeHighlight?: string;
  features: {
    title: string;
    description: string;
    hotspotX: number; // percentage
    hotspotY: number; // percentage
  }[];
  specs: {
    engine: string;
    drive: string;
    roof: string;
    power: string;
    connectivity: string;
    cooling: string;
  };
}

export interface KenyanCultureItem {
  id: string;
  title: string;
  category: 'Gastronomy' | 'Culture & Traditions' | 'Wildlife Heritage';
  swahiliName?: string;
  description: string;
  image: string;
  origin: string;
  tastingNotesOrDetails: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  content: string[];
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  platform: 'TripAdvisor' | 'SafariBookings' | 'Google Reviews';
  rating: number;
  date: string;
  title: string;
  comment: string;
  safariTaken: string;
  avatarLetter: string;
}

export interface BookingRequest {
  packageId: string;
  tier: AccommodationTier;
  travelDate: string;
  guestsCount: number;
  paymentType: 'deposit' | 'full'; // 30% deposit or 100% full
  paymentGateway: 'dpo_card' | 'pesapal' | 'mpesa';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
}
