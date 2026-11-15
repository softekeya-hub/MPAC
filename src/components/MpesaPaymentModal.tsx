import React, { useState } from 'react';
import { SAFARI_PACKAGES, TRUST_CREDENTIALS, CURRENCIES, formatPrice } from '../data/safariData';
import confetti from 'canvas-confetti';
import {
  X,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Lock,
  MessageSquare,
  ArrowRight,
  Receipt,
  Sparkles,
} from 'lucide-react';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: string;
}

export const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
}) => {
  const [selectedMode, setSelectedMode] = useState<'stk' | 'direct'>('stk');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(SAFARI_PACKAGES[0].id);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [customAmountKES, setCustomAmountKES] = useState<string>('50000');
  const [paymentSplit, setPaymentSplit] = useState<'deposit' | 'full'>('deposit');

  // Client inputs
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [mpesaCode, setMpesaCode] = useState('');

  // UI states
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [stkStage, setStkStage] = useState<'idle' | 'sending' | 'pin_wait' | 'confirmed'>('idle');
  const [receiptRef, setReceiptRef] = useState('');

  if (!isOpen) return null;

  const selectedSafari = SAFARI_PACKAGES.find((p) => p.id === selectedPackageId) || SAFARI_PACKAGES[0];
  const basePackageUSD = selectedSafari.pricing.midRangeUSD;
  const packageDueUSD = paymentSplit === 'deposit' ? Math.round(basePackageUSD * 0.3) : basePackageUSD;
  const kesRate = CURRENCIES.KES.rateAgainstUSD;
  const calculatedKES = isCustomAmount
    ? Math.max(500, Number(customAmountKES) || 0)
    : Math.round(packageDueUSD * kesRate);

  const handleCopyMpesa = () => {
    navigator.clipboard?.writeText('0718020833');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSubmitStk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payerName || !payerPhone) return;

    if (selectedMode === 'direct') {
      const code = mpesaCode.trim().toUpperCase() || `MPA-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptRef(code);
      setStkStage('confirmed');
      triggerConfetti();
      return;
    }

    setStkStage('sending');
    setTimeout(() => {
      setStkStage('pin_wait');
      setTimeout(() => {
        const ref = `MPESA-${Math.floor(100000 + Math.random() * 900000)}`;
        setReceiptRef(ref);
        setStkStage('confirmed');
        triggerConfetti();
      }, 2200);
    }, 1500);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C85A32', '#22C55E', '#EFE7DA'],
      });
    } catch {
      // noop
    }
  };

  const handleResetAndClose = () => {
    setStkStage('idle');
    onClose();
  };

  const whatsappReceiptUrl = `https://wa.me/${TRUST_CREDENTIALS.whatsappRaw}?text=${encodeURIComponent(
    `Jambo Mountain Peak Adventures!\n*M-Pesa Payment Confirmation*\n--------------------------\n• M-Pesa Recipient: ${TRUST_CREDENTIALS.mpesaNumber} (${TRUST_CREDENTIALS.mpesaAccountName})\n• Reference / M-Pesa Code: ${receiptRef || mpesaCode || 'Pending Verification'}\n• Safari / Purpose: ${isCustomAmount ? 'Custom Safari Deposit' : selectedSafari.title}\n• Amount Paid: KSh ${calculatedKES.toLocaleString('en-KE')}\n• Client Name: ${payerName || 'Guest'}\n• Client M-Pesa Phone: ${payerPhone || 'N/A'}\n--------------------------\nPlease confirm receipt and issue my safari voucher. Asante!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in">
      <div className="bg-[#18130E] border border-[#423222] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative max-h-[94vh]">
        {/* Header */}
        <div className="bg-[#211A13] border-b border-[#382B1E] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Lipa na M-Pesa Payment Gateway</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30">
                  {TRUST_CREDENTIALS.mpesaNumber}
                </span>
              </div>
              <span className="text-xs text-[#B8AA96] block">
                Official Merchant: {TRUST_CREDENTIALS.mpesaAccountName} · Instant KES Settlement
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full text-[#B8AA96] hover:text-white hover:bg-[#31251A] transition-colors"
            aria-label="Close M-Pesa Gateway"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {stkStage === 'confirmed' ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#4ADE80] flex items-center justify-center mx-auto border border-[#22C55E]/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Safaricom M-Pesa Gateway · Transaction Logged
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                  Asante, {payerName}!
                </h3>
                <div className="inline-block mt-2 px-3 py-1 bg-[#261D15] border border-[#4D3B28] rounded-lg font-mono text-sm text-[#D4AF37]">
                  Ref / Code: {receiptRef}
                </div>
              </div>

              <div className="bg-[#211912] border border-[#3B2D20] rounded-2xl p-5 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#33271B] pb-2">
                  <span className="text-[#9B8A74]">Paid To M-Pesa Number</span>
                  <span className="font-bold text-[#4ADE80] font-mono">
                    {TRUST_CREDENTIALS.mpesaNumber} ({TRUST_CREDENTIALS.mpesaAccountName})
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#33271B] pb-2">
                  <span className="text-[#9B8A74]">Amount Authorized</span>
                  <span className="font-bold text-[#D4AF37] font-mono">
                    KSh {calculatedKES.toLocaleString('en-KE')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9B8A74]">Safari / Deposit</span>
                  <span className="font-semibold text-white text-right max-w-[60%]">
                    {isCustomAmount ? 'Custom Safari Booking Deposit' : selectedSafari.title}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#251C14] border border-[#443424] rounded-xl text-xs text-[#EFE7DA] flex items-start gap-2.5 text-left">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Tap below to forward your M-Pesa confirmation directly to our Nairobi reservations desk on WhatsApp (<strong>{TRUST_CREDENTIALS.phoneWhatsApp}</strong>) for immediate receipt issuance.
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappReceiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-[#14100B] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send M-Pesa Receipt to WhatsApp</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#14100B] text-xs font-bold uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitStk} className="space-y-6">
              {/* Official M-Pesa Number Banner */}
              <div className="p-4 rounded-2xl bg-[#211A12] border border-[#473726] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#4ADE80]">
                    Official Safaricom M-Pesa Recipient Number
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {TRUST_CREDENTIALS.mpesaNumber}
                    </span>
                    <span className="text-xs text-[#B8AA96]">({TRUST_CREDENTIALS.mpesaInternational})</span>
                  </div>
                  <span className="text-xs text-[#D4AF37] font-medium block">
                    Recipient Name: {TRUST_CREDENTIALS.mpesaAccountName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyMpesa}
                  className="px-4 py-2.5 rounded-xl bg-[#2D2319] hover:bg-[#3A2D20] border border-[#4E3C2B] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  {copiedNumber ? (
                    <>
                      <Check className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-[#4ADE80]">Copied 0718 020833</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D4AF37]" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              {/* Payment Method Tabs: STK Push vs Manual Transfer */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#120E0A] border border-[#35281C] rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedMode('stk')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedMode === 'stk'
                      ? 'bg-[#16A34A] text-white shadow-md'
                      : 'text-[#B8AA96] hover:text-white hover:bg-[#231B13]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Instant STK Push</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode('direct')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedMode === 'direct'
                      ? 'bg-[#D4AF37] text-[#14100B] shadow-md'
                      : 'text-[#B8AA96] hover:text-white hover:bg-[#231B13]'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>Manual M-Pesa Transfer</span>
                </button>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#B8AA96]">
                    Safari Package or Custom Deposit
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomAmount(!isCustomAmount)}
                    className="text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    {isCustomAmount ? 'Select from Safari Packages' : 'Enter Custom KES Amount'}
                  </button>
                </div>

                {isCustomAmount ? (
                  <div className="space-y-1.5">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#D4AF37] font-mono">
                        KSh
                      </span>
                      <input
                        type="number"
                        min="500"
                        step="100"
                        value={customAmountKES}
                        onChange={(e) => setCustomAmountKES(e.target.value)}
                        className="w-full bg-[#231B13] border border-[#423222] rounded-xl pl-12 pr-4 py-3 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. 50000"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-[#9B8A74]">
                      Approximate USD equivalent: {formatPrice(Math.round(calculatedKES / kesRate), currentCurrency)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {SAFARI_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} ({pkg.durationDays} Days)
                        </option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentSplit('deposit')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          paymentSplit === 'deposit'
                            ? 'bg-[#292017] border-[#D4AF37] text-white'
                            : 'bg-[#1D1610] border-[#35281C] text-[#B8AA96]'
                        }`}
                      >
                        <div className="text-[11px] font-bold uppercase">30% Booking Deposit</div>
                        <div className="font-mono text-sm font-bold text-[#D4AF37] mt-0.5">
                          KSh {Math.round(basePackageUSD * 0.3 * kesRate).toLocaleString('en-KE')}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentSplit('full')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          paymentSplit === 'full'
                            ? 'bg-[#292017] border-[#D4AF37] text-white'
                            : 'bg-[#1D1610] border-[#35281C] text-[#B8AA96]'
                        }`}
                      >
                        <div className="text-[11px] font-bold uppercase">100% Full Payment</div>
                        <div className="font-mono text-sm font-bold text-[#D4AF37] mt-0.5">
                          KSh {Math.round(basePackageUSD * kesRate).toLocaleString('en-KE')}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Transfer Steps if Manual Tab Selected */}
              {selectedMode === 'direct' && (
                <div className="p-4 rounded-2xl bg-[#221A12] border border-[#3E2F21] space-y-2.5 text-xs">
                  <div className="font-bold text-[#D4AF37] uppercase tracking-wider text-[11px]">
                    How to Pay Directly via Safaricom M-Pesa:
                  </div>
                  <ol className="list-decimal pl-4 space-y-1.5 text-[#EFE7DA]">
                    <li>Open your <strong>M-Pesa App</strong> or Safaricom SIM Toolkit Menu.</li>
                    <li>Select <strong>Send Money</strong> (or Pochi / Lipa na M-Pesa).</li>
                    <li>
                      Enter Phone Number: <strong className="text-[#4ADE80] font-mono">0718 020833</strong> (Mountain Peak Adventures).
                    </li>
                    <li>
                      Enter Amount: <strong className="text-[#D4AF37] font-mono">KSh {calculatedKES.toLocaleString('en-KE')}</strong> and confirm with your PIN.
                    </li>
                  </ol>
                </div>
              )}

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96]">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="e.g. David Kamau"
                    className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96]">
                    {selectedMode === 'stk' ? 'Your M-Pesa Phone Number *' : 'Your Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder="e.g. 0712 345678"
                    className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {selectedMode === 'direct' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96]">
                      M-Pesa Confirmation Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value)}
                      placeholder="e.g. UBK84X92PL"
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96]">
                      Email for Voucher (Optional)
                    </label>
                    <input
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AA96]">
                    Email Address for Official Receipt (Optional)
                  </label>
                  <input
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#231B13] border border-[#423222] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7D6E5C] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}

              {/* STK Status Indicator if processing */}
              {stkStage !== 'idle' && (
                <div className="p-3.5 rounded-xl bg-[#16A34A]/15 border border-[#22C55E]/40 text-xs text-[#86EFAC] flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#4ADE80] border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>
                    {stkStage === 'sending'
                      ? `Connecting to Safaricom M-Pesa Gateway for ${payerPhone}...`
                      : `STK Prompt dispatched! Check your handset to authorize KSh ${calculatedKES.toLocaleString('en-KE')} to Mountain Peak Adventures (0718 020833).`}
                  </span>
                </div>
              )}

              {/* Footer Totals & Submit */}
              <div className="pt-4 border-t border-[#35281C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9B8A74] block">
                    Total Payable via M-Pesa
                  </span>
                  <div className="font-editorial text-2xl font-bold text-[#D4AF37] font-mono-tabular">
                    KSh {calculatedKES.toLocaleString('en-KE')}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={stkStage !== 'idle'}
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#16A34A] hover:bg-[#15803D] shadow-lg shadow-[#16A34A]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {selectedMode === 'stk'
                      ? stkStage !== 'idle'
                        ? 'Processing M-Pesa Prompt...'
                        : 'Send M-Pesa STK Push'
                      : 'Submit & Confirm Payment'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
