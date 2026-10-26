import React, { useState } from 'react';
import { Sparkles, Building2, Gift, ShoppingBag, Truck, CheckCircle2, ChevronDown, ChevronUp, MessageSquare, PhoneCall } from 'lucide-react';

export default function SeoWholesaleRetailSection({ onExploreProducts }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Which is the best flower shop in Chandigarh for bouquets and gift delivery?',
      a: 'Flower Studio by Pushpraj (located at Sco-52, Sector 29D, Chandigarh) has been recognized as the region’s premier florist since 1985. We offer hand-tied fresh rose bouquets, exotic lilies, orchids, custom hampers, and 100% eggless cakes with express 60-minute delivery across Chandigarh, Mohali, and Panchkula.'
    },
    {
      q: 'Do you supply wholesale flowers in Chandigarh at mandi rates?',
      a: 'Yes! Operating right in Sector 29D near Chandigarh’s renowned flower hub, we are a leading wholesale flower distributor. We supply fresh cut roses, loose marigolds (genda phool), carnations, lilies, orchids, and decorative foliage in bulk crates at competitive wholesale prices to wedding decorators, event planners, hotels, and corporate clients.'
    },
    {
      q: 'Do you provide flower delivery in Mohali and Panchkula as well?',
      a: 'Yes, Flower Studio provides seamless same-day flower and gift delivery across the entire Tricity. Whether you need an anniversary bouquet delivered to Sector 70 Mohali, a birthday cake in Panchkula Sector 20, or fresh flowers in Chandigarh Sector 17, our dedicated logistics team ensures prompt hand-delivery.'
    },
    {
      q: 'How fast can I get a bouquet delivered in Chandigarh?',
      a: 'We offer express 60-minute delivery for our bestselling flower arrangements within Chandigarh, as well as scheduled 2-hour slots and special midnight delivery (11:30 PM to 12:15 AM) for birthday and anniversary surprises.'
    },
    {
      q: 'Can I order custom corporate gift hampers or bulk pooja flower supplies?',
      a: 'Absolutely. We curate customized luxury hampers with gourmet chocolates, dry fruits, and indoor plants for corporate gifting. For religious ceremonies, weddings, and festivals, we provide daily fresh pooja garlands, bulk loose petals, and lotus flowers.'
    }
  ];

  return (
    <section id="wholesale-retail" className="py-20 bg-gradient-to-b from-white via-[#FFF8FA] to-white border-t border-pink-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lotus-pink/10 border border-lotus-pink/20 text-lotus-pink text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tricity's #1 Florist & Gifting Hub Since 1985</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Best Flower Shop in Chandigarh, Mohali & Panchkula
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From single handcrafted luxury bouquets to wholesale bulk mandi supplies for grand weddings, 
            Flower Studio is the trusted name across Chandigarh Tricity for fresh blossoms, gourmet gift hampers, 
            artisan cakes, and exotic plants.
          </p>
        </div>

        {/* Dual Cards: Retail Luxury Gifting vs Wholesale Flower Supply */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Retail Bouquets & Gifting */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-pink-50 text-lotus-pink flex items-center justify-center font-bold">
                  <Gift className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60">
                  Retail Gifting
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                  Luxury Handcrafted Bouquets & Gifts
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Celebrate love, birthdays, and milestones with hand-picked Dutch roses, Asiatic lilies, orchids, 
                  carnations, and customized gourmet hampers.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lotus-pink flex-shrink-0 mt-0.5" />
                  <span><strong>Signature Bouquets:</strong> Handcrafted wrapped arrangements & glass vase displays.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lotus-pink flex-shrink-0 mt-0.5" />
                  <span><strong>Luxury Gift Hampers:</strong> Chocolates, teddy bears, dry fruits & custom notes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lotus-pink flex-shrink-0 mt-0.5" />
                  <span><strong>100% Eggless Cakes:</strong> Freshly baked truffle, red velvet & fruit cakes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lotus-pink flex-shrink-0 mt-0.5" />
                  <span><strong>Express & Midnight Delivery:</strong> 60-min delivery across Chandigarh, Mohali & Panchkula.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={onExploreProducts}
                className="flex-1 bg-lotus-pink hover:bg-lotus-pink/90 text-white font-semibold text-sm py-3 px-5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Retail Collection</span>
              </button>
            </div>
          </div>

          {/* Card 2: Wholesale Flower Supply */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  Wholesale & Bulk
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                  Wholesale Flower Mandi Supply
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Direct farm-to-shop floral supply at mandi rates for wedding decorators, event planners, 
                  hotel banquet halls, florists, and institutional clients.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Bulk Cut Flowers:</strong> Roses by bundle, carnations, gerberas, lilies, gypsophila & chrysanthemums.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Wedding & Event Florals:</strong> Mandap decor flowers, loose marigolds (genda phool), and rose petals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Competitive Mandi Rates:</strong> Unmatched wholesale pricing directly from Sector 29D hub.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Regular Commercial Dispatch:</strong> Daily bulk supply for temples, banquet halls & hotels in Tricity.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <a
                href="https://wa.me/919335401435?text=Hello%20Flower%20Studio!%20I%20am%20interested%20in%20wholesale%20flowers%20and%20bulk%20supply%20in%20Chandigarh."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm py-3 px-5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Wholesale Inquiry (WhatsApp)</span>
              </a>
              <a
                href="tel:9815493338"
                className="px-4 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-700 text-sm font-semibold flex items-center gap-2"
                title="Call Wholesale Manager"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Coverage Badges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Prime Delivery & Service Locations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-700">
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Chandigarh Sector 1 to 60</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Sector 29D Market</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Mohali (Phases 1-11 & Sectors 68-82)</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Panchkula (Sectors 1-21 & MDC)</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Zirakpur & Kharar</span>
            <span className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">Chandigarh IT Park & Manimajra</span>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="font-serif font-bold text-2xl text-slate-900">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about ordering flowers, wholesale rates, and delivery across Tricity.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 text-sm sm:text-base hover:text-lotus-pink transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-lotus-pink flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
