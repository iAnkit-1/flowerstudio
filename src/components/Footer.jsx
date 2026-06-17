import React from 'react';
import Logo from './Logo';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-350 pt-16 pb-8 border-t-4 border-lotus-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo size={36} className="bg-white/10 p-1 rounded-lg" />
            <span className="font-serif font-bold text-xl tracking-wide text-white">
              Flower <span className="text-lotus-pink">Studio</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Serving Chandigarh since 1985, Flower Studio is the region's favorite shop for fresh flowers, bouquets, gift plants, customized hampers, delicious cakes, and spiritual pooja essentials.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-lotus-pink hover:text-white flex items-center justify-center transition-colors text-slate-400 cursor-pointer" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-lotus-pink hover:text-white flex items-center justify-center transition-colors text-slate-400 cursor-pointer" aria-label="Instagram">
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://wa.me/919815493338" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-lotus-green hover:text-white flex items-center justify-center transition-colors text-slate-400 cursor-pointer" aria-label="WhatsApp">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-4 pb-2 border-b border-slate-800">
            Our Specialties
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#products" onClick={(e) => handleScroll(e, '#products')} className="text-slate-400 hover:text-lotus-pink transition-colors">Fresh Bouquets</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScroll(e, '#products')} className="text-slate-400 hover:text-lotus-pink transition-colors">Custom Gifting Hampers</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScroll(e, '#products')} className="text-slate-400 hover:text-lotus-pink transition-colors">Artisan Birthday Cakes</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScroll(e, '#products')} className="text-slate-400 hover:text-lotus-pink transition-colors">Indoor Air-Purifying Plants</a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleScroll(e, '#products')} className="text-slate-400 hover:text-lotus-pink transition-colors">Flower-Based Pooja Items</a>
            </li>
          </ul>
        </div>

        {/* Shop Hours Column */}
        <div>
          <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-4 pb-2 border-b border-slate-800">
            Delivery Hours
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-lotus-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-300">Daily Delivery Slots</p>
                <p className="text-xs text-slate-400 mt-0.5">8:00 AM to 10:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-lotus-pink mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-300">Midnight Delivery</p>
                <p className="text-xs text-slate-400 mt-0.5">Available on booking (11:30 PM - 12:15 AM)</p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-xs text-slate-400">Order online, delivery within 2-3 Days</span>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h3 className="text-white font-semibold tracking-wider text-sm uppercase mb-4 pb-2 border-b border-slate-800">
            Studio Details
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-lotus-pink mt-0.5 flex-shrink-0" />
              <div className="text-slate-450 leading-snug">
                <p className="font-semibold text-slate-350">Flower Studio Shop</p>
                <p className="text-slate-400 mt-0.5">Sco-52, Sector 29,</p>
                <p className="text-slate-400">Chandigarh, Pin 160029</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4.5 h-4.5 text-lotus-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-350">Direct Helplines</p>
                <p className="text-slate-400 mt-0.5"><a href="tel:9815493338" className="hover:text-lotus-pink">9815493338</a></p>
                <p className="text-slate-400"><a href="tel:9872005054" className="hover:text-lotus-pink">9872005054</a></p>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
              <a href="mailto:info@flowerstudiochd.com" className="text-slate-400 hover:text-lotus-pink mt-0.5 truncate">
                info@flowerstudiochd.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright and developer credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Flower Studio. All Rights Reserved.</p>
        <p className="mt-1">
          Address: Sco-52, Sector 29, Chandigarh. Serving Chandigarh exclusively.
        </p>
      </div>
    </footer>
  );
}
