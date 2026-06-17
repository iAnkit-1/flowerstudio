import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { Phone, ShoppingCart, Menu, X, MapPin, Trash2, ArrowRight, ChevronLeft, AlertCircle } from 'lucide-react';

export default function Navbar({ cart, onRemoveFromCart, onUpdateQuantity, cartOpen, setCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Cart Checkout Form States
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custSector, setCustSector] = useState('');
  const [custPincode, setCustPincode] = useState('');
  const [formError, setFormError] = useState('');

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Products', href: '#products' },
    { name: 'Delivery Info', href: '#delivery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Mobile App', href: '#app' }
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  const handleOpenCart = () => {
    setCheckoutMode(false);
    setFormError('');
    setCartOpen(true);
  };

  const handleCartCheckoutSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!custName.trim() || !custPhone.trim() || !custAddress.trim() || !custSector.trim() || !custPincode.trim()) {
      setFormError('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(custPhone.trim())) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^160\d{3}$/.test(custPincode.trim())) {
      setFormError('We only deliver within Chandigarh (Pincode must start with 160).');
      return;
    }

    const itemsString = cart.map(item => `- ${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`).join('\n');
    const message = `Hello Flower Studio! I would like to place an order:

*Items Ordered:*
${itemsString}

*Total Amount:* ₹${cartTotal}

*Delivery Details:*
*Name:* ${custName.trim()}
*Phone:* ${custPhone.trim()}
*Address:* ${custAddress.trim()}
*Sector:* ${custSector.trim()}
*Pincode:* ${custPincode.trim()}

*Payment Mode:* Cash on Delivery (COD)

Please confirm my order.`;

    const whatsappLink = `https://wa.me/919815493338?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    
    // Close Drawer & reset state
    setCartOpen(false);
    setCheckoutMode(false);
  };

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full glass-nav shadow-sm transition-all duration-300">
        {/* Top bar with quick news/location */}
        <div className="bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <MapPin className="w-3.5 h-3.5 text-lotus-green animate-pulse" />
            <span>Delivering fresh flowers and gifts only in Chandigarh region within 2-3 Days</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] justify-center md:justify-end">
            <span>Hours: 8:00 AM - 10:00 PM</span>
            <span className="h-3 w-px bg-white/30 hidden sm:block"></span>
            <span className="font-semibold text-lotus-green-light">Est. 1985</span>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo & Brand Name */}
          <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center gap-2 group">
            <Logo size={42} className="transform group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-wide text-lotus-dark leading-none">
                Flower <span className="text-lotus-pink">Studio</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-slate-500 uppercase leading-none mt-1">
                Chandigarh's Florist
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-medium text-slate-600 hover:text-lotus-pink transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact & Cart Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Phone Hotlines */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Call Studio</span>
              <div className="flex items-center gap-1.5 text-slate-700 hover:text-lotus-pink transition-colors font-semibold">
                <Phone className="w-3.5 h-3.5 text-lotus-green" />
                <a href="tel:9815493338" className="text-xs md:text-sm">9815493338</a>
              </div>
            </div>

            {/* Shopping Cart Trigger */}
            <button
              onClick={handleOpenCart}
              className="relative p-2.5 rounded-full hover:bg-slate-100/80 text-slate-700 hover:text-lotus-pink transition-colors cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-lotus-pink text-white text-[11px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden hover:bg-slate-100 text-slate-700 hover:text-lotus-pink transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-100 py-6 px-6 shadow-xl flex flex-col gap-5 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-medium text-slate-700 hover:text-lotus-pink text-lg py-1 border-b border-slate-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            {/* Mobile Phone Contacts */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Contact/Order Helpline:</span>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-4 h-4 text-lotus-green" />
                <a href="tel:9815493338" className="hover:text-lotus-pink">9815493338</a>
                <span className="text-slate-300">/</span>
                <a href="tel:9872005054" className="hover:text-lotus-pink">9872005054</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar Drawer Panel Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setCartOpen(false)}
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-2xl flex flex-col">
              {/* Cart Header */}
              <div className="px-6 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5.5 h-5.5 text-lotus-pink" />
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    {!checkoutMode ? `Your Cart (${cartItemsCount})` : 'Delivery Information'}
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Drawer Main Viewport */}
              {!checkoutMode ? (
                /* STEP 1: Standard Cart list items */
                <>
                  <div className="flex-1 overflow-y-auto py-6 px-6 no-scrollbar">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                          <ShoppingCart className="w-10 h-10" />
                        </div>
                        <div className="max-w-[240px]">
                          <h3 className="font-bold text-slate-800 text-lg">Your cart is empty</h3>
                          <p className="text-sm text-slate-400 mt-1">Add fresh flowers, hampers, and cakes to make someone's day!</p>
                        </div>
                        <button
                          onClick={() => {
                            setCartOpen(false);
                            const el = document.querySelector('#products');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="mt-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm cursor-pointer shadow-md"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-start gap-4 pb-5 border-b border-slate-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">₹{item.price} each</p>
                              <div className="flex items-center justify-between mt-2.5">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold animate-pulse"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 text-xs font-semibold text-slate-800">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2.5 py-1 text-slate-500 hover:bg-slate-200 transition-colors text-xs font-bold animate-pulse"
                                  >
                                    +
                                  </button>
                                </div>
                                {/* Delete button */}
                                <button
                                  onClick={() => onRemoveFromCart(item.id)}
                                  className="text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-sm text-slate-800">₹{item.price * item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-slate-100 px-6 py-6 bg-slate-50">
                      <div className="flex justify-between items-center text-slate-800 font-semibold mb-4">
                        <span>Subtotal</span>
                        <span className="text-xl font-bold text-slate-900">₹{cartTotal}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                        Delivery to all pincodes in Chandigarh within 2-3 days. Payment can be processed on delivery.
                      </p>
                      <button
                        onClick={() => {
                          setCheckoutMode(true);
                          setFormError('');
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold py-3.5 rounded-xl hover:opacity-95 shadow-md shadow-pink-200 hover:shadow-lg transition-all cursor-pointer text-sm"
                      >
                        <span>Checkout via WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* STEP 2: Checkout details form inside Cart drawer */
                <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
                  <div className="py-6 px-6 space-y-4">
                    {/* Back header */}
                    <button
                      onClick={() => setCheckoutMode(false)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-lotus-pink transition-colors font-bold mb-3 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Cart List</span>
                    </button>

                    <p className="text-[11px] text-slate-450 leading-relaxed">
                      Fill out your delivery details. We will compile your cart list and contact details, and open WhatsApp.
                    </p>

                    {/* Form elements */}
                    <form className="space-y-3 pt-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          placeholder="10-Digit Mobile"
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Address *</label>
                          <input
                            type="text"
                            required
                            placeholder="House No, Street name"
                            value={custAddress}
                            onChange={(e) => setCustAddress(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Sector *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 15"
                            value={custSector}
                            onChange={(e) => setCustSector(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Pincode *</label>
                          <input
                            type="text"
                            maxLength={6}
                            required
                            placeholder="e.g. 160015"
                            value={custPincode}
                            onChange={(e) => setCustPincode(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-lotus-pink text-xs bg-slate-50"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wide block mb-1">Payment Mode</label>
                          <div className="w-full px-3 py-2 border border-slate-250 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center">
                            Cash on Delivery (COD)
                          </div>
                        </div>
                      </div>

                      {formError && (
                        <div className="bg-rose-50 text-rose-800 p-2.5 rounded-lg text-xs flex items-center gap-1.5 border border-rose-100 mt-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <p className="text-[10px] text-slate-400 italic leading-normal pt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        💡 <strong>Note:</strong> Cash or UPI can be paid to delivery agent. You can also make online payment and send the screenshot here once order is confirmed.
                      </p>
                    </form>
                  </div>

                  <div className="border-t border-slate-100 px-6 py-6 bg-slate-50 space-y-4">
                    <div className="flex justify-between items-center text-slate-800 font-semibold">
                      <span>Total Amount</span>
                      <span className="text-xl font-bold text-slate-900">₹{cartTotal}</span>
                    </div>

                    <button
                      onClick={handleCartCheckoutSubmit}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-green-dark to-lotus-green text-white font-bold py-3.5 rounded-xl hover:opacity-95 shadow-md shadow-green-200 transition-all cursor-pointer text-sm"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      <span>Place Order via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
