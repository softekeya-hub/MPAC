import React, { useState } from 'react';
import { SafariPackage, AccommodationTier } from '../types/safari';
import { formatPrice, TRUST_CREDENTIALS, getWhatsAppBookingUrl, CURRENCIES } from '../data/safariData';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Lock,
  Download,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
} from 'lucide-react';

interface BookingModalProps {
  safari: SafariPackage | null;
  selectedTier: AccommodationTier;
  currentCurrency: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  safari,
  selectedTier,
  currentCurrency,
  isOpen,
  onClose,
}) => {
  const [paymentFlow, setPaymentFlow] = useState<'deposit' | 'full'>('deposit');
  const [paymentGateway, setPaymentGateway] = useState<'dpo_card' | 'pesapal' | 'mpesa'>('mpesa');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('2026-08-15');

  // Customer Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [copiedMpesa, setCopiedMpesa] = useState(false);

  // Processing & Confirmation States
  const [isProcessing, setIsProcessing] = useState(false);
  const [stkPushStep, setStkPushStep] = useState<'idle' | 'prompted' | 'pin_entered' | 'confirmed'>('idle');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  if (!isOpen || !safari) return null;

  const perPersonPriceUSD =
    selectedTier === 'budget'
      ? safari.pricing.budgetUSD
      : selectedTier === 'midRange'
      ? safari.pricing.midRangeUSD
      : safari.pricing.luxuryUSD;

  const totalBaseUSD = perPersonPriceUSD * guestCount;
  const depositUSD = Math.round(totalBaseUSD * 0.3);
  const dueNowUSD = paymentFlow === 'deposit' ? depositUSD : totalBaseUSD;
  const balanceDueUSD = paymentFlow === 'deposit' ? totalBaseUSD - depositUSD : 0;
  const dueNowKES = Math.round(dueNowUSD * CURRENCIES.KES.rateAgainstUSD);

  const handleCopyMpesaNumber = () => {
    navigator.clipboard?.writeText('0718020833');
    setCopiedMpesa(true);
    setTimeout(() => setCopiedMpesa(false), 2000);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsProcessing(true);

    if (paymentGateway === 'mpesa') {
      setStkPushStep('prompted');
      setTimeout(() => {
        setStkPushStep('pin_entered');
        setTimeout(() => {
          completeBooking();
        }, 1800);
      }, 2000);
    } else {
      setTimeout(() => {
        completeBooking();
      }, 2200);
    }
  };

  const completeBooking = () => {
    const refCode = `MPA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(refCode);
    setIsProcessing(false);
    setBookingConfirmed(true);
    setStkPushStep('confirmed');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C85A32', '#F4EFE6', '#8C5E3C'],
      });
    } catch {
      // noop
    }
  };

  const resetAndClose = () => {
    setBookingConfirmed(false);
    setIsProcessing(false);
    setStkPushStep('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in">
      <div className="bg-[#18130E] border border-[#3E2F21] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative max-h-[94vh]">
        {/* Header */}
        <div className="bg-[#211A13] border-b border-[#382B1E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="text-sm font-bold text-white">
                {bookingConfirmed ? 'Booking Confirmation Voucher' : 'Secure Safari Checkout'}
              </span>
              <span className="text-xs text-[#9B8A74] block">
                KATO Bond Protected · M-Pesa Direct ({TRUST_CREDENTIALS.mpesaNumber}) & Card Checkout
              </span>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {bookingConfirmed ? (
            /* Confirmation Voucher View */
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#4ADE80] flex items-center justify-center mx-auto border border-[#22C55E]/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Jambo, {name}! Your Expedition is Secured
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                  Safari Booking Confirmed
                </h2>
                <div className="inline-block mt-2 px-3 py-1 bg-[#261D15] border border-[#4D3B28] rounded-lg font-mono text-sm text-[#D4AF37]">
                  Reference ID: {bookingReference}
                </div>
              </div>

              {/* Voucher Card */}
              <div className="bg-[#211912] border border-[#3B2D20] rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-[#33271B] pb-3">
                  <div>
                    <span className="text-xs text-[#9B8A74] uppercase tracking-wider">Safari Program</span>
                    <h4 className="text-base font-bold text-white font-editorial">{safari.title}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-semibold uppercase">
                    {selectedTier} Tier
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#9B8A74]">Departure Date</span>
                    <div className="font-semibold text-white mt-0.5">{travelDate}</div>
                  </div>
                  <div>
                    <span className="text-[#9B8A74]">Guests</span>
                    <div className="font-semibold text-white mt-0.5">{guestCount} Travelers</div>
                  </div>
                  <div>
                    <span className="text-[#9B8A74]">Amount Paid</span>
                    <div className="font-bold text-[#4ADE80] mt-0.5">
                      {formatPrice(dueNowUSD, currentCurrency)} ({paymentFlow === 'deposit' ? '30% Deposit' : 'Full Payment'})
                    </div>
                  </div>
                  <div>
                    <span className="text-[#9B8A74]">Remaining Balance</span>
                    <div className="font-semibold text-[#B8AA96] mt-0.5">
                      {formatPrice(balanceDueUSD, currentCurrency)}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#261D14] rounded-xl text-xs text-[#EFE7DA] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    A confirmation voucher, payment receipt, and official itinerary pack have been routed to <strong>{email}</strong>. Our head safari naturalist will contact you within 4 hours.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={getWhatsAppBookingUrl({
                    safariTitle: safari.title,
                    tier: selectedTier,
                    durationDays: safari.durationDays,
                    travelDate,
                    guests: guestCount,
                    totalPrice: formatPrice(dueNowUSD, currentCurrency),
                    customerName: name,
                    customerPhone: phone,
                    bookingRef: bookingReference,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect via WhatsApp (+254 718 020833)</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-[#2D2218] hover:bg-[#3A2C1F] text-white text-xs font-semibold flex items-center gap-2 border border-[#4D3B28]"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download Voucher</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider"
                >
                  Return to Safaris
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSimulatePayment} className="space-y-8">
              {/* Top Package Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#221A12] border border-[#3B2D20]">
                <div>
                  <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                    {safari.durationDays} Days · {selectedTier.toUpperCase()} Accommodation Tier
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
                    {safari.title}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase text-[#9B8A74]">Rate Per Person</span>
                  <div className="font-editorial text-xl font-bold text-[#D4AF37] font-mono-tabular">
                    {formatPrice(perPersonPriceUSD, currentCurrency)}
                  </div>
                </div>
              </div>

              {/* 1. Dual-Payment Flow Option (30% Deposit vs 100% Full) */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#9B8A74] block">
                  Select Payment Option (Flexible Booking Guarantee)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 30% Deposit */}
                  <div
                    onClick={() => setPaymentFlow('deposit')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentFlow === 'deposit'
                        ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-[#1D1610] border-[#35281C] hover:border-[#523E2B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-[#D4AF37]">
                          {paymentFlow === 'deposit' && (
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                          )}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-white">
                          Pay 30% Deposit Now
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono-tabular">
                        {formatPrice(depositUSD, currentCurrency)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8AA96] mt-2">
                      Locks in your dates and private 4x4 cruiser. Remaining balance of {formatPrice(totalBaseUSD - depositUSD, currentCurrency)} is due 30 days before departure.
                    </p>
                  </div>

                  {/* 100% Full Payment */}
                  <div
                    onClick={() => setPaymentFlow('full')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentFlow === 'full'
                        ? 'bg-[#292017] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-[#1D1610] border-[#35281C] hover:border-[#523E2B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center border-[#D4AF37]">
                          {paymentFlow === 'full' && (
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                          )}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wide text-white">
                          Pay 100% Full Upfront
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono-tabular">
                        {formatPrice(totalBaseUSD, currentCurrency)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8AA96] mt-2">
                      All-inclusive settlement. Instant automated safari vouchers and priority camp lodge placement.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Guest Count & Date Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Number of Travelers</span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Solo Traveler' : 'Travelers'} (Private 4x4 Cruiser)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9B8A74] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Preferred Safari Start Date</span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min="2026-11-15"
                    className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              {/* 3. Customer Details */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#9B8A74] block">
                  Lead Passenger Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Full Legal Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (for vouchers)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="tel"
                    placeholder="M-Pesa / WhatsApp Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* 4. Payment Gateway Selector (M-Pesa Direct, DPO, Pesapal) */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#9B8A74] block">
                  Choose Payment Gateway
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* M-Pesa */}
                  <div
                    onClick={() => setPaymentGateway('mpesa')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentGateway === 'mpesa'
                        ? 'bg-[#292017] border-[#22C55E] ring-1 ring-[#22C55E]/40'
                        : 'bg-[#1D1610] border-[#35281C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-xs font-bold text-white">M-Pesa Express</span>
                    </div>
                    <span className="text-[10px] text-[#4ADE80] font-mono block mt-1">
                      Direct No: {TRUST_CREDENTIALS.mpesaNumber}
                    </span>
                  </div>

                  {/* DPO */}
                  <div
                    onClick={() => setPaymentGateway('dpo_card')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentGateway === 'dpo_card'
                        ? 'bg-[#292017] border-[#D4AF37]'
                        : 'bg-[#1D1610] border-[#35281C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-xs font-bold text-white">DPO Pay (Visa / MC)</span>
                    </div>
                    <span className="text-[10px] text-[#B8AA96] block mt-1">
                      Direct Pay Online · Zero foreign fee
                    </span>
                  </div>

                  {/* Pesapal */}
                  <div
                    onClick={() => setPaymentGateway('pesapal')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentGateway === 'pesapal'
                        ? 'bg-[#292017] border-[#D4AF37]'
                        : 'bg-[#1D1610] border-[#35281C]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs font-bold text-white">Pesapal API (Amex)</span>
                    </div>
                    <span className="text-[10px] text-[#B8AA96] block mt-1">
                      East Africa's leading card gateway
                    </span>
                  </div>
                </div>

                {/* Gateway Specific Helper Box */}
                {paymentGateway === 'mpesa' ? (
                  <div className="p-4 bg-[#221A12] border border-[#473726] rounded-2xl space-y-2.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[#4ADE80] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" />
                        <span>Lipa na M-Pesa Direct / STK Push Engine</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white bg-[#16110C] px-2.5 py-0.5 rounded border border-[#3E2F21]">
                          Recipient: {TRUST_CREDENTIALS.mpesaNumber}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyMpesaNumber}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2E2318] hover:bg-[#3B2D20] text-[#D4AF37] border border-[#4E3C2B] text-[10px]"
                        >
                          {copiedMpesa ? <Check className="w-3 h-3 text-[#4ADE80]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedMpesa ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[#CFC3B2] leading-relaxed">
                      Enter your mobile number above and click <strong>"Send M-Pesa STK Push"</strong> to authorize{' '}
                      <strong className="text-[#D4AF37]">KSh {dueNowKES.toLocaleString('en-KE')}</strong> directly to{' '}
                      <strong className="text-white">{TRUST_CREDENTIALS.mpesaAccountName} ({TRUST_CREDENTIALS.mpesaNumber})</strong>. You can also send directly via M-Pesa Send Money to <strong className="text-[#4ADE80] font-mono">0718 020833</strong>.
                    </p>
                    {stkPushStep === 'prompted' && (
                      <div className="p-2.5 rounded-xl bg-[#16A34A]/15 border border-[#22C55E]/30 text-[#86EFAC] text-[11px]">
                        STK Prompt dispatched to {phone} for Mountain Peak Adventures (0718 020833)...
                      </div>
                    )}
                    {stkPushStep === 'pin_entered' && (
                      <div className="p-2.5 rounded-xl bg-[#16A34A]/20 border border-[#22C55E]/40 text-[#86EFAC] text-[11px]">
                        PIN authorized! Verifying Safaricom M-Pesa receipt...
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-[#221A12] border border-[#473726] rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#D4AF37] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        <span>{paymentGateway === 'pesapal' ? 'Pesapal 3D Secure Gateway' : 'Direct Pay Online (DPO) 3D Secure Checkout'}</span>
                      </span>
                      <span>Visa · Mastercard · Amex</span>
                    </div>
                    <p className="text-[#B8AA96]">
                      Your payment will be processed securely in {currentCurrency}. Your booking is protected under the Kenya Association of Tour Operators (KATO) financial bond.
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Company WhatsApp Booking Integration */}
              <div className="p-4 rounded-2xl bg-[#211912] border border-[#3E2F21] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#25D366]/20 text-[#25D366] shrink-0">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex flex-wrap items-center gap-2">
                      <span>Prefer to Book or Confirm M-Pesa via WhatsApp?</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-mono font-semibold">
                        +254 718 020833
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8AA96] mt-0.5 leading-snug">
                      Chat directly with our Nairobi desk to confirm availability or share your M-Pesa confirmation message to 0718 020833.
                    </p>
                  </div>
                </div>

                <a
                  href={getWhatsAppBookingUrl({
                    safariTitle: safari.title,
                    tier: selectedTier,
                    durationDays: safari.durationDays,
                    travelDate,
                    guests: guestCount,
                    totalPrice: formatPrice(dueNowUSD, currentCurrency),
                    customerName: name || undefined,
                    customerPhone: phone || undefined,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-md shadow-[#25D366]/20 whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>

              {/* Total Calculation & Action */}
              <div className="border-t border-[#35281C] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#9B8A74]">
                    Total Payment Due Now
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <div className="font-editorial text-3xl font-bold text-[#D4AF37] font-mono-tabular">
                      {formatPrice(dueNowUSD, currentCurrency)}
                    </div>
                    {paymentGateway === 'mpesa' && currentCurrency !== 'KES' && (
                      <span className="text-xs font-mono text-[#4ADE80]">
                        (≈ KSh {dueNowKES.toLocaleString('en-KE')})
                      </span>
                    )}
                  </div>
                  {paymentFlow === 'deposit' && (
                    <div className="text-[11px] text-[#B8AA96]">
                      (30% Deposit for {guestCount} travelers · Balance due 30 days prior)
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                    paymentGateway === 'mpesa'
                      ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[#16A34A]/25'
                      : 'text-[#14100B] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] hover:brightness-110 shadow-[#D4AF37]/25'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>
                        {paymentGateway === 'mpesa' ? 'Waiting for M-Pesa PIN...' : 'Authorizing Payment...'}
                      </span>
                    </>
                  ) : (
                    <>
                      {paymentGateway === 'mpesa' ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4 text-[#14100B]" />
                      )}
                      <span>
                        {paymentGateway === 'mpesa' ? 'Send M-Pesa STK Push' : 'Confirm & Pay Securely'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
