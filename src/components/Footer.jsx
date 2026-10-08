import React from 'react';
import { ShieldCheck, Award, Heart, Phone, Mail, Sparkles } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-maharaja-950 text-amber-100 border-t-2 border-gold/40 relative overflow-hidden">
      
      {/* Top Gold Accent Line */}
      <div className="h-1 bg-gold-gradient"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-maharaja-800 shadow-gold-sm">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <span className="font-royal text-2xl font-black text-gold-gradient tracking-widest block uppercase">
                  DRANGO
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold/80 uppercase block -mt-1 font-semibold">
                  Maharaja Automotive Customs
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/70 font-light leading-relaxed max-w-sm">
              India's premier bespoke coachbuilder & customization house specializing in Mahindra Thar ROXX, Thar 3D, and luxury 4x4 SUVs. Bringing Maharaja grandeur to the open roads.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 bg-maharaja-900 flex items-center justify-center text-gold hover:border-gold hover:bg-maharaja-800 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 bg-maharaja-900 flex items-center justify-center text-gold hover:border-gold hover:bg-maharaja-800 transition-all"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 bg-maharaja-900 flex items-center justify-center text-gold hover:border-gold hover:bg-maharaja-800 transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/80">
              <li><a href="#categories" className="hover:text-gold transition-colors">Thar ROXX 5-Door</a></li>
              <li><a href="#categories" className="hover:text-gold transition-colors">Thar (3-Door) Beast</a></li>
              <li><a href="#categories" className="hover:text-gold transition-colors">Mahindra Scorpio-N</a></li>
              <li><a href="#categories" className="hover:text-gold transition-colors">Suzuki Jimny G-Kit</a></li>
              <li><a href="#featured" className="hover:text-gold transition-colors">Our Latest Products</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider mb-4">
              Modification Parts
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/80">
              <li><a href="#products" className="hover:text-gold transition-colors">Signature Gold Grilles</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">Starlight Ceilings</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">Nappa Leather Cabins</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">20" Forged Wheels</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">Matrix Bi-LED Headlights</a></li>
            </ul>
          </div>

          {/* Support & Warranty */}
          <div>
            <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider mb-4">
              Royal Assurance
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/80">
              <li className="flex items-center gap-1.5 text-gold-bright font-medium">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>3-Year Warranty</span>
              </li>
              <li className="flex items-center gap-1.5 text-gold-bright font-medium">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>100% OEM Fit Guarantee</span>
              </li>
              <li><span className="text-amber-200/60">Pan-India Courier Service</span></li>
              <li><span className="text-amber-200/60">Direct Video Fitment Support</span></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Book Jaipur Studio</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-maharaja-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <div>
            © {new Date().getFullYear()} DRANGO AUTOMOTIVE CUSTOMS. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-gold">
            <span>Crafted with Royal Pride for Thar Enthusiasts</span>
            <span className="text-sm">👑</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
