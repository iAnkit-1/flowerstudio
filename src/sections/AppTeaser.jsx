import React from 'react';
import { Sparkles, CheckCircle2, Award, Download } from 'lucide-react';
import Logo from '../components/Logo';

export default function AppTeaser({ onTriggerGoldPopup }) {
  const appFeatures = [
    'One-click checkout via WhatsApp or UPI',
    'Real-time delivery tracking across Chandigarh sectors',
    'Exclusive pre-order slot booking for Pooja and Mother’s Day flowers',
    'Special early-bird app discounts and referral points'
  ];

  return (
    <section id="app" className="py-20 bg-gradient-to-br from-slate-900 to-lotus-dark text-white relative overflow-hidden">
      {/* Decorative colored glow spots */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-lotus-pink/20 filter blur-3xl -z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-lotus-green/15 filter blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Teaser Text & Gold Membership Button */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Launch badge */}
            <div className="inline-flex items-center gap-2 bg-lotus-pink/15 border border-lotus-pink/30 text-lotus-pink rounded-full py-1.5 px-4 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launching Soon</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Flower Studio App is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lotus-pink to-lotus-green">
                Coming to Chandigarh!
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Soon, ordering fresh flowers, custom anniversary hampers, and surprise birthday cakes in Chandigarh will be right in your pocket. Get ready for an ultra-fast local gifting experience.
            </p>

            {/* Features list */}
            <ul className="space-y-3 pt-2">
              {appFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-lotus-green flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Gold Membership Promotion (Replaced Email Registration) */}
            <div className="pt-6 max-w-md space-y-3.5">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Exclusive Launch Promotion:
              </p>
              <button
                onClick={onTriggerGoldPopup}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 px-8 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-slate-950" />
                <span>Claim Free Gold Membership Now</span>
              </button>
            </div>

            {/* App Store Mock Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-400 cursor-not-allowed">
                <Download className="w-5 h-5 text-slate-500" />
                <div className="text-left leading-none">
                  <p className="text-[9px] uppercase tracking-wide">Soon on</p>
                  <p className="text-xs font-bold text-slate-300 mt-0.5">App Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-400 cursor-not-allowed">
                <Download className="w-5 h-5 text-slate-500" />
                <div className="text-left leading-none">
                  <p className="text-[9px] uppercase tracking-wide">Soon on</p>
                  <p className="text-xs font-bold text-slate-300 mt-0.5">Google Play</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium CSS Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[540px] bg-slate-950 rounded-[45px] p-3 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900/50 flex flex-col items-center">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-xl z-20 flex justify-center items-center">
                <span className="w-2 h-2 rounded-full bg-slate-900 mr-2"></span>
                <span className="w-8 h-1 rounded-full bg-slate-950"></span>
              </div>

              {/* Phone Screen Mockup */}
              <div className="w-full h-full bg-slate-50 rounded-[35px] overflow-hidden flex flex-col justify-between p-4 pt-8 text-slate-800 font-sans select-none relative">
                
                {/* Simulated App Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1">
                    <Logo size={22} />
                    <span className="font-serif font-bold text-xs text-slate-900">Flower Studio</span>
                  </div>
                  <span className="text-[9px] bg-lotus-pink-light text-lotus-pink px-2 py-0.5 rounded-full font-bold">
                    CHD
                  </span>
                </div>

                {/* Simulated Screen Content Body */}
                <div className="flex-1 py-3 flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <Logo size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Your Local Florist App</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Order bouquets & hampers</p>
                  </div>
                  {/* Decorative category cards inside phone */}
                  <div className="grid grid-cols-2 gap-1.5 w-full pt-1">
                    <div className="bg-white p-2 rounded-lg border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
                      <span className="text-base">🌹</span>
                      <span className="text-[9px] font-bold">Flowers</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-100 flex flex-col items-center gap-1 shadow-sm">
                      <span className="text-base">🎂</span>
                      <span className="text-[9px] font-bold">Cakes</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Tabbar */}
                <div className="border-t border-slate-200 pt-2 flex justify-around items-center text-[9px] text-slate-400 font-semibold">
                  <span className="text-lotus-pink flex flex-col items-center">
                    <span>🏠</span>
                    <span>Home</span>
                  </span>
                  <span className="flex flex-col items-center">
                    <span>🛍️</span>
                    <span>Shop</span>
                  </span>
                  <span className="flex flex-col items-center">
                    <span>💬</span>
                    <span>Order</span>
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
