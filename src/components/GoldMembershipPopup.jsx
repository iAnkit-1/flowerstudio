import React, { useState, useEffect } from 'react';
import { Sparkles, X, User, Phone, Mail, MapPin, CheckCircle2, Award, Send } from 'lucide-react';
import Logo from './Logo';

export default function GoldMembershipPopup({ isOpen, setIsOpen }) {
  const [step, setStep] = useState(1); // 1: Invitation, 2: Form, 3: Gold Card Success
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleDismiss = () => {
    sessionStorage.setItem('gold_member_dismissed', 'true');
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validation
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Save success state in localStorage
    localStorage.setItem('gold_member_joined', 'true');
    setStep(3);

    // Send membership alert to WhatsApp in background or just show gold card (we show the card in modal!)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={handleDismiss}
      ></div>

      {/* Popup Dialog container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-955 rounded-3xl overflow-hidden shadow-2xl border border-amber-400/40 z-10 animate-scaleIn p-6 md:p-8 text-white">
        
        {/* Close Button */}
        {step !== 3 && (
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Decorative Golden Aura Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-500/20 filter blur-xl rounded-full"></div>

        {step === 1 && (
          /* STEP 1: Exclusive invitation to join Gold Membership */
          <div className="space-y-6 text-center pt-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/15 animate-pulse">
              <Award className="w-9 h-9 text-slate-900" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                Exclusive Invitation
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Early Bird <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Gold Membership
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Join our free early bird membership today to unlock priority dispatch, free printed greeting cards, and exclusive VIP discount offers launching soon!
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left grid grid-cols-1 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✨</span>
                <span>Free lifetime activation (No hidden charges)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">⚡</span>
                <span>Priority delivery slots in Chandigarh region</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">🎁</span>
                <span>Premium voucher alerts direct to WhatsApp/Email</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/15 transition-all hover:scale-[1.01] cursor-pointer text-sm"
              >
                Claim Free Gold Membership Now
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-slate-450 hover:text-slate-350 underline transition-colors cursor-pointer py-1.5"
              >
                No thanks, I will browse first
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          /* STEP 2: Registration Form */
          <div className="space-y-4 pt-2 text-left">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Membership Form</span>
            </div>
            
            <div>
              <h3 className="font-serif font-bold text-xl text-white">Join Gold Club</h3>
              <p className="text-[11px] text-slate-400 mt-1">Avail premium offers launching soon by completing your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Contact Number *</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="10-Digit Mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white"
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Delivery Address *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="House No, Society, Sector name in Chandigarh"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-xs text-white"
                />
              </div>

              {/* Error warning block */}
              {errorMsg && (
                <div className="bg-rose-500/10 text-rose-300 p-2.5 rounded-lg text-xs flex items-center gap-2 border border-rose-500/20">
                  <Sparkles className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-550 text-slate-950 font-bold py-3 rounded-xl hover:opacity-95 shadow-md shadow-amber-500/10 cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Activate My Gold Membership</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          /* STEP 3: Display Gold Membership Card Success View */
          <div className="space-y-6 text-center pt-2">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-white">Welcome to the Club!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your Gold Membership is active. Here is your virtual card.
              </p>
            </div>

            {/* GOLD CARD MOCKUP */}
            <div className="relative w-full h-44 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 rounded-2xl p-5 shadow-2xl flex flex-col justify-between border border-amber-200/30 overflow-hidden text-slate-900 select-none animate-fadeIn">
              {/* Card glossy reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"></div>
              
              {/* Logo & Category tag */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-1.5">
                  <Logo size={24} className="bg-slate-950/10 p-0.5 rounded" />
                  <span className="font-serif font-extrabold text-sm tracking-wide">Flower Studio</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
                  GOLD CLUB MEMBER
                </span>
              </div>

              {/* Card Details */}
              <div className="text-left z-10 space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-slate-800 font-semibold block">Member Name</span>
                <span className="font-serif font-bold text-lg leading-none truncate block max-w-[200px]">{name}</span>
              </div>

              {/* ID and Date details */}
              <div className="flex justify-between items-center text-[8px] z-10 uppercase tracking-wider font-semibold border-t border-slate-950/10 pt-2.5">
                <div className="flex flex-col text-left">
                  <span className="text-slate-800">Phone ID</span>
                  <span className="font-bold text-slate-950">{phone}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-slate-800">Join Date</span>
                  <span className="font-bold text-slate-950">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Subtext info */}
            <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-normal">
              Vouchers and early bird premium access codes will be dispatched directly to <strong>{email}</strong>. Reach out to our helpline on WhatsApp anytime!
            </p>

            {/* Close CTA */}
            <div className="pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer text-xs"
              >
                Close & Start Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
