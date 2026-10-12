import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, ShieldCheck, Sparkles, Car } from 'lucide-react';

export const Navbar = ({
  cartCount,
  onOpenCart,
  onSelectVehicle,
  selectedCar,
  currentView = 'home',
  onNavigateHome,
  onNavigateProducts,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (link, e) => {
    if (link.name === 'Home') {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (onNavigateHome) onNavigateHome();
    } else if (link.name === 'Products' || link.name === 'Product') {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (onNavigateProducts) onNavigateProducts();
    } else if (link.name === 'Contact Us') {
      setMobileMenuOpen(false);
      if (currentView !== 'home' && onNavigateHome) {
        onNavigateHome();
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  const isLinkActive = (linkName) => {
    if (linkName === 'Home') return currentView === 'home';
    if (linkName === 'Products' || linkName === 'Product') {
      return currentView === 'products' || currentView === 'product' || currentView === 'product-detail';
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-maharaja-950/90 backdrop-blur-md border-b border-gold/30 shadow-royal py-3'
          : 'bg-gradient-to-b from-maharaja-950/95 via-maharaja-950/60 to-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/60 flex items-center justify-center bg-gradient-to-br from-maharaja-800 to-maharaja-950 shadow-gold-sm group-hover:border-gold transition-all duration-300">
              <span className="text-xl sm:text-2xl filter drop-shadow">👑</span>
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-2xl sm:text-3xl font-extrabold tracking-widest text-gold-gradient uppercase drop-shadow">
                DRANGO
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold/80 font-semibold uppercase -mt-1">
                Maharaja Customs
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`text-sm font-medium tracking-wide uppercase relative py-1 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold after:transition-all ${
                  isLinkActive(link.name)
                    ? 'text-gold-bright font-bold after:w-full'
                    : 'text-amber-100/80 hover:text-gold-bright after:w-0 hover:after:w-full'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-maharaja-850/90 border border-gold/40 text-gold-bright hover:border-gold hover:bg-maharaja-800 transition-all duration-300 shadow-gold-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Call/CTA */}
            <a
              href="https://wa.me/919876543210?text=Hello%20Drango%20Team!%20I%20am%20interested%20in%20customizing%20my%20vehicle"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs tracking-wider uppercase hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Contact</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-gold/40 text-gold hover:border-gold bg-maharaja-850"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-maharaja-950/95 backdrop-blur-xl border-b border-gold/30 px-6 py-6 transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`text-base font-semibold uppercase tracking-wider py-1 border-b border-maharaja-800 transition-colors ${
                  isLinkActive(link.name)
                    ? 'text-gold-bright font-bold'
                    : 'text-amber-100 hover:text-gold-bright'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="https://wa.me/919876543210?text=Hello%20Drango%20Team!%20I%20am%20interested%20in%20customizing%20my%20vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-gradient text-maharaja-950 font-bold text-sm tracking-wider uppercase shadow-gold-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                Contact Drango via WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
