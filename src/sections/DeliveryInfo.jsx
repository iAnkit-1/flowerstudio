import React, { useState } from 'react';
import { Truck, ShieldCheck, Clock, MailCheck, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { validatePincode } from '../data/mockData';

export default function DeliveryInfo() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const res = validatePincode(pincode);
    setResult(res);
  };

  const benefits = [
    {
      icon: Truck,
      title: 'Hand-Delivered Fresh',
      description: 'Our delivery executives handle bouquets with care in specialized moisturizing wraps to ensure they arrive pristine.',
      color: 'text-lotus-pink bg-lotus-pink-light'
    },
    {
      icon: Clock,
      title: 'Flexible Delivery Slots',
      description: 'Select standard day slots or schedule a midnight delivery surprise for birthdays and anniversaries.',
      color: 'text-lotus-green bg-lotus-green-light'
    },
    {
      icon: ShieldCheck,
      title: '100% Satisfaction Guarantee',
      description: 'If you are not satisfied with flower freshness or cake quality, contact our direct line for instant resolution.',
      color: 'text-slate-800 bg-slate-100'
    },
    {
      icon: MailCheck,
      title: 'Free Personal Message Card',
      description: 'Every arrangement comes with a premium printed card carrying your personal custom greeting message.',
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  return (
    <section id="delivery" className="py-20 bg-slate-50/50 relative overflow-hidden">
      {/* Soft gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-slate-200/30 filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-3 mb-16 text-center">
          <span className="text-xs font-bold text-lotus-pink uppercase tracking-widest">Local Deliveries</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Chandigarh Region <span className="text-lotus-pink">Coverage</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            We operate exclusively within the Tricity/Chandigarh sector network to maintain freshness and speed.
          </p>
        </div>

        {/* Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${benefit.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-slate-800 text-base">{benefit.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Pincode Checker Card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-lg flex flex-col justify-between relative overflow-hidden">
              {/* Top background accent stripe */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-lotus-pink to-lotus-green"></div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-lotus-pink">
                    <MapPin className="w-5 h-5 animate-bounce text-lotus-pink" />
                    <span className="text-xs font-bold uppercase tracking-widest">Pin Code Checker</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">Is your sector eligible?</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Type your 6-digit Chandigarh postal pin code below to verify delivery availability and estimated timelines.
                  </p>
                </div>

                {/* Form input */}
                <form onSubmit={handleCheck} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 160029"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value.replace(/\D/g, ''));
                        setResult(null); // Reset result on change
                      }}
                      className="w-full pl-4 pr-20 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-lotus-pink text-sm bg-slate-50"
                    />
                    <button
                      type="submit"
                      disabled={pincode.length !== 6}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      Verify
                    </button>
                  </div>
                </form>

                {/* Validation Results Display */}
                {result && (
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 animate-scaleIn ${
                      result.valid
                        ? 'bg-emerald-55 text-emerald-800 border-emerald-200'
                        : 'bg-rose-55 text-rose-800 border-rose-200'
                    }`}
                  >
                    {result.valid ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-xs leading-none">
                        {result.valid ? 'Service Available!' : 'Delivery Limitation'}
                      </p>
                      <p className="text-[11px] mt-1.5 leading-relaxed font-medium">
                        {result.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Physical Shop Location Card snippet */}
              <div className="mt-8 pt-6 border-t border-slate-150 space-y-3 text-xs text-slate-500">
                <p className="font-bold text-slate-800 text-xs">Pickup Location / Main Studio</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span>Sco-52, Sector 29, Chandigarh (opposite Main Market)</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>Helplines: <a href="tel:9815493338" className="font-bold text-slate-700 hover:text-lotus-pink">9815493338</a></span>
                  <span><a href="tel:9872005054" className="font-bold text-slate-700 hover:text-lotus-pink">9872005054</a></span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
