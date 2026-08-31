import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { useProductsContext } from '../context/ProductsContext';
import { Phone, ShoppingCart, Menu, X, MapPin, Trash2, ArrowRight, Smartphone, Sparkles } from 'lucide-react';

export default function Navbar({ cart, onRemoveFromCart, onUpdateQuantity, cartOpen, setCartOpen, onOpenAppDownloadModal }) {
  const { currentPage, navigateToPage } = useProductsContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNavClick = (page, category = null) => {
    setMobileMenuOpen(false);
    navigateToPage(page, category);
  };


  const handleCheckoutClick = () => {
    setCartOpen(false);
    if (onOpenAppDownloadModal) {
      onOpenAppDownloadModal(cart.length > 0 ? cart[0] : null);
    }
  };

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full glass-nav shadow-sm transition-all duration-300">
        {/* Top Announcement Bar - Tricity Region */}
        <div className="bg-gradient-to-r from-lotus-pink via-rose-600 to-lotus-pink-dark text-white text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <MapPin className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="font-semibold">Express Delivery in Chandigarh • Mohali • Panchkula</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] justify-center md:justify-end">
            <span>Hours: 8:00 AM - 10:00 PM</span>
            <span className="h-3 w-px bg-white/30 hidden sm:block"></span>
            <button
              onClick={() => onOpenAppDownloadModal && onOpenAppDownloadModal()}
              className="flex items-center gap-1 font-bold text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Get Android App</span>
            </button>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo & Brand */}
          <div onClick={() => handleNavClick('home')} className="cursor-pointer">
            <Logo size={42} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-bold transition-colors cursor-pointer text-sm ${
                currentPage === 'home' ? 'text-lotus-pink' : 'text-slate-700 hover:text-lotus-pink'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('products', 'all')}
              className={`font-bold transition-colors cursor-pointer text-sm ${
                currentPage === 'products' ? 'text-lotus-pink' : 'text-slate-700 hover:text-lotus-pink'
              }`}
            >
              All Products
            </button>

            <button
              onClick={() => handleNavClick('products', 'flower')}
              className="font-medium text-slate-700 hover:text-lotus-pink transition-colors text-sm cursor-pointer"
            >
              Flowers
            </button>

            <button
              onClick={() => handleNavClick('products', 'hamper')}
              className="font-medium text-slate-700 hover:text-lotus-pink transition-colors text-sm cursor-pointer"
            >
              Hampers
            </button>

            <button
              onClick={() => handleNavClick('products', 'cake')}
              className="font-medium text-slate-700 hover:text-lotus-pink transition-colors text-sm cursor-pointer"
            >
              Cakes
            </button>

            <button
              onClick={() => handleNavClick('products', 'plants')}
              className="font-medium text-slate-700 hover:text-lotus-pink transition-colors text-sm cursor-pointer"
            >
              Plants
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => onOpenAppDownloadModal && onOpenAppDownloadModal()}
              className="hidden sm:flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-lotus-pink border border-pink-200/80 font-bold px-3.5 py-2 rounded-xl text-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-lotus-pink" />
              <span>Get App</span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-2xl hover:bg-slate-100/80 text-slate-700 hover:text-lotus-pink transition-colors cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lotus-pink text-white text-[11px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden hover:bg-slate-100 text-slate-700 hover:text-lotus-pink transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-pink-100 py-6 px-6 shadow-xl flex flex-col gap-4 animate-fadeIn">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left font-bold text-slate-800 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('products', 'all')}
              className="text-left font-bold text-slate-800 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              All Products
            </button>
            <button
              onClick={() => handleNavClick('products', 'flower')}
              className="text-left font-medium text-slate-700 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              Flowers
            </button>
            <button
              onClick={() => handleNavClick('products', 'hamper')}
              className="text-left font-medium text-slate-700 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              Hampers
            </button>
            <button
              onClick={() => handleNavClick('products', 'cake')}
              className="text-left font-medium text-slate-700 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              Cakes
            </button>
            <button
              onClick={() => handleNavClick('products', 'plants')}
              className="text-left font-medium text-slate-700 hover:text-lotus-pink text-base py-1.5 border-b border-slate-100 cursor-pointer"
            >
              Plants
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAppDownloadModal) onOpenAppDownloadModal();
              }}
              className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold py-3 rounded-xl shadow-md text-sm cursor-pointer"
            >
              <Smartphone className="w-4.5 h-4.5" />
              <span>Download Android App</span>
            </button>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-2xl flex flex-col">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5.5 h-5.5 text-lotus-pink" />
                  <h2 className="text-lg font-bold text-slate-900">Your Cart ({cartItemsCount})</h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center gap-4">
                    <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-lotus-pink">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="font-bold text-slate-800 text-lg">Your cart is empty</h3>
                      <p className="text-xs text-slate-500 mt-1">Explore our fresh flowers, hampers & cakes catalog!</p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        handleNavClick('products', 'all');
                      }}
                      className="mt-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-bold px-6 py-2.5 rounded-full text-sm cursor-pointer shadow-md"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-slate-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">₹{item.price} each</p>
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
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
                          <span className="font-extrabold text-sm text-slate-900">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-slate-100 px-6 py-6 bg-slate-50 space-y-4">
                  <div className="flex justify-between items-center text-slate-800 font-semibold">
                    <span>Subtotal</span>
                    <span className="text-xl font-black text-slate-900">₹{cartTotal}</span>
                  </div>

                  <div className="p-3 bg-pink-50/70 border border-pink-100 rounded-2xl flex items-center gap-2.5 text-xs text-lotus-pink font-semibold">
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    <span>Order via mobile app for express delivery & COD</span>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-lotus-pink to-lotus-pink-dark text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-pink-500/20 hover:scale-[1.01] transition-all cursor-pointer text-sm"
                  >
                    <span>Proceed to Order (Download App)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
