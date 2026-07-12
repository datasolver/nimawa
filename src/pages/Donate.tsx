import React, { useState, useEffect } from 'react';
import { Landmark, Smartphone, CreditCard, ShieldCheck, Heart, Receipt, AlertCircle, Sparkles } from 'lucide-react';
import { Donation } from '../types';

export default function Donate() {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [target, setTarget] = useState('Islamic Center Acquisition Fund');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [message, setMessage] = useState('');

  // Simulated credit card form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Status handlers
  const [loading, setLoading] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<Donation | null>(null);
  const [personalHistory, setPersonalHistory] = useState<Donation[]>([]);

  // Predefined options
  const predefinedAmounts = [20, 50, 100, 250, 500];

  // Targets
  const donationTargets = [
    'Islamic Center Acquisition Fund',
    'General Community Welfare & Aid',
    'Ramadan Joint Iftar Tray Sponsorship',
    'Education & Quran Academy Fund',
    'Sadaqah Jariyah General'
  ];

  useEffect(() => {
    // Load personal donation history from local storage
    const saved = localStorage.getItem('nimawa_donations');
    if (saved) {
      setPersonalHistory(JSON.parse(saved));
    }
  }, []);

  const handleAmountChange = (amt: number) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || amount <= 0) return;

    setLoading(true);

    fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donorName,
        donorEmail,
        amount,
        type: 'One-time',
        target,
        paymentMethod,
        message
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessReceipt(data.donation);
          
          // Save to local storage for user's history
          const updatedHistory = [data.donation, ...personalHistory];
          setPersonalHistory(updatedHistory);
          localStorage.setItem('nimawa_donations', JSON.stringify(updatedHistory));

          // Clear form
          setDonorName('');
          setDonorEmail('');
          setMessage('');
          setCardNumber('');
          setCardExpiry('');
          setCardCVV('');
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDownloadReceipt = () => {
    if (!successReceipt) return;
    const txt = `===========================================
      OFFICIAL DONATION RECEIPT - NiMAWA
===========================================
Receipt No:    ${successReceipt.receiptNumber}
Date Issued:   ${new Date(successReceipt.createdAt).toLocaleDateString()}
Donor Name:    ${successReceipt.donorName}
Donor Email:   ${successReceipt.donorEmail}
Contribution:  $${successReceipt.amount}.00 AUD
Target Fund:   ${successReceipt.target}
Payment Mode:  ${successReceipt.paymentMethod}
===========================================
May Allah accept this contribution as a 
Sadaqah Jariyah and bless your household.
Nigerian Muslims' Association of WA`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NiMAWA_Donation_Receipt_${successReceipt.receiptNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16" id="donate-page">
      {/* Page Title Header */}
      <section className="bg-emerald-950 text-white py-16 text-center relative overflow-hidden border-b border-amber-400">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded border border-emerald-800">
            Sadaqah & Support
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Support the Association & center Project
          </h1>
          <p className="text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Every contribution helps establish our permanent Islamic Center, host Joint Iftars, support newly arrived families, and run our Quran Academy.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Bank and payID details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Bank transfer box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base">Direct Bank Transfer</h3>
                  <p className="text-[10px] text-slate-500">Zero commission or transaction fees</p>
                </div>
              </div>
              <div className="w-full bg-slate-50 rounded-xl p-4 border text-xs text-slate-700 font-mono space-y-2">
                <p><strong>Bank:</strong> Westpac Banking Corporation</p>
                <p><strong>Account Name:</strong> Nigerian Muslims WA Association</p>
                <p><strong>BSB Code:</strong> 036-081</p>
                <p><strong>Account Number:</strong> 482104</p>
                <p><strong>Reference:</strong> "Donation" + Your Surname</p>
              </div>
              <p className="text-[10px] text-slate-400">
                * If you transfer via Bank, you can submit the form on the right to trigger an automatic receipt matching for your records, or email receipt requests to info@nimawa.org.au.
              </p>
            </div>

            {/* PayID transfer box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base">PayID Transfer</h3>
                  <p className="text-[10px] text-slate-500">Instant mobile bank verification</p>
                </div>
              </div>
              <div className="w-full bg-slate-50 rounded-xl p-4 border text-xs text-slate-700 font-mono flex items-center justify-between">
                <div>
                  <p><strong>PayID Identifier:</strong></p>
                  <p className="text-sm font-bold text-emerald-900 mt-1">finance@nimawa.org.au</p>
                </div>
                <Smartphone className="w-8 h-8 text-slate-300" />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Secure Contributions</h4>
              </div>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                All donations are processed securely. Your details are private and registered under our constitutional guidelines for non-profits in Western Australia. Financial statements are audited and presented to members annually.
              </p>
              <blockquote className="border-l-2 border-amber-500 pl-3 italic text-[10px] text-amber-200">
                "Charity does not decrease wealth." - Sahih Muslim
              </blockquote>
            </div>

            {/* Personal donation history tracker */}
            {personalHistory.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Receipt className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-bold font-serif text-sm">Your Donation History</h4>
                </div>
                <div className="space-y-2.5 max-h-56 overflow-y-auto">
                  {personalHistory.map((h, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <span className="block font-semibold text-slate-900">${h.amount} AUD</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[180px] block">{h.target}</span>
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {new Date(h.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Donation checkout Form */}
          <div className="lg:col-span-7">
            {successReceipt ? (
              /* Donation Success Card with Receipt */
              <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-900/40 p-8 text-center space-y-6" id="donation-success-panel">
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">Jazakallah Khair!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your contribution of <strong>${successReceipt.amount} AUD</strong> has been successfully registered. An official receipt has been sent to your outbox.
                  </p>
                </div>

                {/* Printable receipt model */}
                <div className="bg-stone-50 border-2 border-dashed border-slate-300 p-6 rounded-xl text-left text-xs text-slate-700 font-mono space-y-3 max-w-md mx-auto shadow-inner relative">
                  <div className="flex justify-between border-b pb-3 font-bold text-[10px] text-slate-400">
                    <span>NIMAWA FINANCIAL OFFICE</span>
                    <span>{successReceipt.receiptNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="font-bold text-slate-500">Date Issued:</span>
                    <span className="text-right">{new Date(successReceipt.createdAt).toLocaleDateString()}</span>
                    
                    <span className="font-bold text-slate-500">Donor Name:</span>
                    <span className="text-right font-semibold text-slate-900">{successReceipt.donorName}</span>
                    
                    <span className="font-bold text-slate-500">Fund Destination:</span>
                    <span className="text-right truncate">{successReceipt.target}</span>
                    
                    <span className="font-bold text-slate-500">Payment Mode:</span>
                    <span className="text-right">{successReceipt.paymentMethod}</span>
                  </div>
                  <div className="border-t pt-3 text-center">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Total Contribution</span>
                    <span className="text-2xl font-black text-emerald-800">${successReceipt.amount}.00 AUD</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleDownloadReceipt}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs rounded-xl transition-all"
                    id="download-receipt-btn"
                  >
                    Download Receipt Text
                  </button>
                  <button
                    onClick={() => setSuccessReceipt(null)}
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all"
                    id="donate-again-btn"
                  >
                    Donate Again
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form Box */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Make a Contribution</h3>
                  <p className="text-xs text-slate-500 mt-1">Specify your donation details and choose your payment method.</p>
                </div>

                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Amount Selector */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Select Donation Amount (AUD) *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountChange(amt)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                            amount === amt && customAmount === ''
                              ? 'bg-emerald-900 border-emerald-900 text-white font-black scale-105'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                          id={`amount-btn-${amt}`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-2">
                      <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        placeholder="Custom Amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className={`w-full bg-slate-50 border rounded-xl py-2 px-3 pl-8 text-xs focus:outline-none focus:border-emerald-800 transition-colors font-bold ${
                          customAmount !== '' ? 'border-emerald-800 text-emerald-900' : 'border-slate-200'
                        }`}
                        id="custom-amount-input"
                      />
                    </div>
                  </div>

                  {/* Funding destination Target */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Where would you like to direct your donation? *
                    </label>
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                      id="donation-target-select"
                    >
                      {donationTargets.map((tgt) => (
                        <option key={tgt} value={tgt}>{tgt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Personal info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Ibrahim Adesanya"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="donor-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="e.g. ibrahim@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                        id="donor-email-input"
                      />
                    </div>
                  </div>

                  {/* Payment Method selector */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Credit Card')}
                        className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                          paymentMethod === 'Credit Card'
                            ? 'bg-emerald-50 border-emerald-800 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                        id="payment-method-card"
                      >
                        <CreditCard className="w-4 h-4" />
                        Credit Card (Simulated)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Bank Transfer')}
                        className={`py-3.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                          paymentMethod === 'Bank Transfer'
                            ? 'bg-emerald-50 border-emerald-800 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                        id="payment-method-bank"
                      >
                        <Landmark className="w-4 h-4" />
                        Direct Bank/PayID
                      </button>
                    </div>
                  </div>

                  {/* Conditional Credit Card inputs */}
                  {paymentMethod === 'Credit Card' && (
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors font-mono"
                          id="cc-number-input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors font-mono"
                            id="cc-expiry-input"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            placeholder="***"
                            maxLength={3}
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors font-mono"
                            id="cc-cvv-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Bank Transfer' && (
                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-2.5 text-xs text-slate-700">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Please proceed to transfer exactly <strong>${amount} AUD</strong> to our Westpac Bank account or PayID listed on the left. Submit this notification form and we will verify the transaction against our statements.
                      </p>
                    </div>
                  )}

                  {/* Message / Prayer request */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Message / Prayer Request (Optional)
                    </label>
                    <textarea
                      placeholder="e.g. Please pray for my household / Sadaqah for my late father"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-800 transition-colors"
                      id="donor-message-input"
                    ></textarea>
                  </div>

                  {/* Submission CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-1.5"
                      id="submit-donation-btn"
                    >
                      <Heart className="w-4 h-4 text-amber-400" />
                      {loading ? 'Authorising Contribution...' : `Donate $${amount}.00 AUD Now`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
