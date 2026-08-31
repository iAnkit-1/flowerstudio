import React from 'react';
import { X, Smartphone } from 'lucide-react';

// Official multi-colored Google Play Store SVG Icon
const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.25 1.55c-.17.18-.25.49-.25.88v19.14c0 .39.08.7.25.88l.06.06L14.07 12l-10.76-10.39-.06-.06z" fill="#00a0e9" />
    <path d="M17.65 8.43L14.07 12l3.58 3.57.06-.03 4.24-2.4c1.21-.69 1.21-1.8 0-2.49l-4.24-2.4-.06.18z" fill="#ffbb00" />
    <path d="M14.07 12L3.25 22.46c.39.41 1.05.46 1.77.05l12.63-7.15L14.07 12z" fill="#ea4335" />
    <path d="M14.07 12l3.58-3.57L5.02 1.28c-.72-.41-1.38-.36-1.77.05L14.07 12z" fill="#34a853" />
  </svg>
);

export default function AppDownloadModal({ isOpen, onClose, selectedProduct = null }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl md:max-w-3xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 border border-pink-100/50 animate-scaleUp my-auto">
        {/* Top Header Glow Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-lotus-pink via-rose-500 to-lotus-pink-dark" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Image Banner (Visible on desktop/tablet) */}
          <div className="hidden md:flex md:col-span-5 bg-[#FFF2F4] items-center justify-center border-r border-pink-100/20 relative overflow-hidden">
            <img
              src="/app_screenshot.png"
              alt="Flower Studio App Mockup"
              className="w-full h-full object-cover select-none"
              loading="eager"
            />
          </div>

          {/* Right Column: Redesigned Content & CTA */}
          <div className="col-span-1 md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 relative overflow-hidden bg-gradient-to-br from-white via-rose-50/10 to-white">
            {/* Ambient decorative background glows */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-lotus-pink/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-lotus-green/5 rounded-full filter blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Header & Title */}
              <div className="space-y-1">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Get the <span className="text-lotus-pink">Flower Studio</span> App
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                This feature is only accessible on our mobile app. Enjoy <span className="text-slate-800 font-semibold">exclusive offers</span>, <span className="text-slate-800 font-semibold">premium gifts</span> and <span className="text-slate-800 font-semibold">direct delivery</span> at your doorsteps.
              </p>

              {/* Product context overlay if product was selected */}
              {selectedProduct && (
                <div className="flex items-center gap-3 p-2.5 bg-pink-50/30 rounded-2xl border border-pink-100/40 shadow-xs">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-10 h-10 rounded-lg object-cover border border-white shadow-xs flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 leading-none">
                      Selected Gifting
                    </p>
                    <h4 className="text-xs font-bold text-slate-700 truncate mt-1">
                      {selectedProduct.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-extrabold text-slate-900">₹{selectedProduct.price}</span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-[9px] text-slate-400 line-through">₹{selectedProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* App Features List to fill whitespace and add value */}
              <div className="border-t border-b border-slate-100/80 py-3.5">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">App Key Features</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-pink-50 text-lotus-pink text-[10px] font-bold">✓</span>
                    <span>Flat ₹100 App Discount</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-green-50 text-lotus-green text-[10px] font-bold">✓</span>
                    <span>60-Min Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">✓</span>
                    <span>Live GPS Order Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">✓</span>
                    <span>UPI & COD Payments</span>
                  </div>
                </div>
              </div>

              {/* Play Store CTA and Button */}
              <div className="pt-1">
                <a
                  href="https://play.google.com/apps/testing/com.flowerstudiobypushpraj.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#0F0F10] hover:bg-[#1e1e20] text-white py-2 px-4 rounded-xl border border-white/10 shadow-md shadow-slate-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <GooglePlayIcon />
                  <div className="text-left leading-tight">
                    <p className="text-[8px] font-extrabold tracking-widest text-slate-400 uppercase">GET IT ON</p>
                    <p className="text-xs sm:text-sm font-black text-white tracking-wide mt-0.5">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Footer Trust Markers */}
            <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2.5 border-t border-slate-100 relative z-10">
              <span className="flex items-center gap-1 font-semibold">
                🛡️ Verified Secure
              </span>
              <span>Available for Android</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
