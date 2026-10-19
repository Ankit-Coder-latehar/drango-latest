import React, { useState } from 'react';
import { Phone, MapPin, ExternalLink, Navigation, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

const POLICIES_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    badge: 'Customer Data Protection',
    content: [
      {
        heading: 'Information We Collect',
        body: 'When you contact Drango Automotive Customs for custom builds, bespoke inquiries, or purchases, we collect details such as your name, contact phone/WhatsApp number, delivery address, and vehicle specification notes.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'Your information is used strictly to fulfill bespoke parts fabrication, organize insured transit, communicate order updates, and coordinate with our styling team in Chandigarh. We never sell, rent, or trade your personal details with third-party advertisers.',
      },
      {
        heading: 'WhatsApp & Hotline Communication',
        body: 'Inquiries routed through WhatsApp and direct phone hotlines are encrypted in transit. Vehicle modification photographs shared for consultations are stored securely within our design studio.',
      },
      {
        heading: 'Your Rights & Contact',
        body: 'You may request data access, correction, or deletion at any time by contacting our coordinator at dango@gmail.com or calling +91 97794 43821.',
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    badge: 'Legal Agreement & Terms of Service',
    content: [
      {
        heading: 'Welcome to Drango Customs',
        body: 'Welcome to Drango Customs. By accessing our website and placing orders, you agree to these terms:',
      },
      {
        heading: 'Intellectual Property',
        body: 'All designs and content are owned by Drango Customs. No reproduction or resale is allowed without permission.',
      },
      {
        heading: 'Orders & Payments',
        body: 'Orders start production after full payment. You’ll receive confirmation via email.',
      },
      {
        heading: 'Shipping & Delivery',
        body: 'We provide estimated timelines, but delays can occur. Risk transfers to you upon delivery.',
      },
      {
        heading: 'Returns & Refunds',
        body: 'Custom products are non-refundable unless defective. Contact us directly via the phone number on our website for any issues.',
      },
      {
        heading: 'User Conduct',
        body: 'Users agree not to misuse the site or engage in illegal activities.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'We are not liable for delays, errors, or losses beyond our control.',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by the laws of Chandigarh.',
      },
      {
        heading: 'Changes',
        body: 'We may update these terms, and continued use means acceptance of any updates.',
      },
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    badge: 'Shipping Information & Guidelines',
    content: [
      {
        heading: 'Shipping Policy Overview',
        body: "A Shipping Policy comes with a number of benefits for both you and your customers. Some benefits are that people will be more likely to shop with you if you have a clear Shipping Policy in place since there won't be any questions about your shipping timeframes or processes.",
      },
      {
        heading: 'In general, what should you cover in your Shipping Policy?',
        body: '• Order processing times.\n• Shipping costs.\n• Domestic and international shipping options.\n• Potential service interruptions.',
      },
      {
        heading: 'Legal Disclaimer',
        body: 'The explanations and information provided herein are only general explanations, information and samples. You should not rely on this article as legal advice or as recommendations regarding what you should actually do. We recommend that you seek legal advice to help you understand and to assist you in the creation of your shipping policy.',
      },
    ],
  },
  refund: {
    title: 'Return & Refund Policy',
    badge: 'Satisfaction & Quality Guarantee',
    content: [
      {
        heading: 'Returns Eligibility',
        body: 'We accept returns only if the product arrives damaged due to manufacturing defects or damage in shipping. You must contact us within 7 days of delivery.',
      },
      {
        heading: 'Custom Products',
        body: 'Due to the personalized nature, custom-made products are non-refundable, except in cases of damage or defect.',
      },
      {
        heading: 'Refund Process',
        body: 'If eligible, contact our support team with your order number and photos of the issue. Approved returns may be resolved with a replacement or store credit—no cash refunds on custom items.',
      },
      {
        heading: 'Contact Us',
        body: 'For any issues, reach out to us and we’ll guide you through the steps!',
      },
    ],
  },
};

const locations = [
  {
    id: 'chd',
    city: 'Chandigarh (HQ)',
    name: 'DRANGO',
    subtitle: 'Manufacture of Premium Custom Auto Parts',
    address: 'Plot No. 458, Industrial Area Phase-2, Chandigarh, 160002',
    hours: 'Mon – Sat: 10:00 AM – 8:30 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=DRANGO%2C+Manufacture+of+Premium+Custom+Auto+Parts%2C+Plot+No.+458%2C+Industrial+Area+Phase-2%2C+Chandigarh%2C+160002',
    embedUrl: 'https://maps.google.com/maps?q=30.696781,76.781686+(DRANGO+-+Plot+No.+458,+Industrial+Area+Phase-2,+Chandigarh)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  },
];

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export const Footer = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activePolicy, setActivePolicy] = useState(null);
  const activeLoc = locations[selectedLocation];
  const policyData = activePolicy ? POLICIES_CONTENT[activePolicy] : null;

  return (
    <footer className="bg-maharaja-950 text-amber-100 border-t-2 border-gold/40 relative overflow-hidden">

      {/* Top Gold Accent Line */}
      <div className="h-1 bg-gold-gradient"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <div>
              <span className="font-royal text-2xl font-black text-gold-gradient tracking-widest block uppercase">
                DRANGO
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/70 font-light leading-relaxed max-w-sm">
              Drango brings you everything you need to make your ride stand out with the pride, style, and personality you deserve.
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
                href="https://wa.me/919779443821"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 bg-maharaja-900 flex items-center justify-center text-gold hover:border-gold hover:bg-maharaja-800 transition-all"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-200/80">
              <li>
                <a
                  href="#products"
                  className="hover:text-gold transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Product</span>
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-gold transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Reviews</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider mb-4">
              Policies & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-200/80">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('privacy')}
                  className="hover:text-gold transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('terms')}
                  className="hover:text-gold transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('shipping')}
                  className="hover:text-gold transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Shipping Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('refund')}
                  className="hover:text-gold transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                  <span>Return & Refund Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Interactive Map (Replaced Royal Assurance) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-royal text-sm font-bold text-gold-bright uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  Our Factory Location
                </h4>

              </div>
            </div>

            {/* Location Selector Tabs (shown if multiple locations) */}
            {locations.length > 1 && (
              <div className="flex items-center gap-2 pt-1">
                {locations.map((loc, idx) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocation(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${selectedLocation === idx
                      ? 'bg-gold text-maharaja-950 font-bold shadow-gold-sm border border-gold'
                      : 'bg-maharaja-900/80 text-amber-200/70 border border-gold/25 hover:border-gold/60 hover:text-gold'
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedLocation === idx ? 'bg-maharaja-950' : 'bg-gold/60'}`} />
                    {loc.city}
                  </button>
                ))}
              </div>
            )}

            {/* Map Frame Card */}
            <div className="rounded-xl overflow-hidden border border-gold/30 bg-maharaja-900/70 shadow-lg relative group">
              <div className="relative w-full h-36 sm:h-40 bg-maharaja-950 overflow-hidden">
                <iframe
                  title={`Map location for ${activeLoc.name}`}
                  src={activeLoc.embedUrl}
                  className="w-full h-full border-0 filter contrast-105 opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location Details Footer */}
              <div className="p-3 bg-gradient-to-b from-maharaja-900/95 to-maharaja-950 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-amber-50 flex items-center gap-1.5 flex-wrap">
                    <span>{activeLoc.name}</span>
                    {activeLoc.subtitle && (
                      <span className="text-[10px] text-gold/80 font-normal">
                        • {activeLoc.subtitle}
                      </span>
                    )}
                  </h5>
                  <p className="text-[11px] text-amber-200/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gold shrink-0" />
                    <span>{activeLoc.address}</span>
                  </p>
                  <p className="text-[10px] text-amber-200/50 mt-0.5 pl-4">
                    {activeLoc.hours}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeLoc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gold/15 hover:bg-gold hover:text-maharaja-950 text-gold-bright border border-gold/40 text-[11px] font-semibold transition-all shadow-sm"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-70" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-maharaja-800 hover:bg-maharaja-750 text-amber-100 border border-gold/25 hover:border-gold/50 text-[11px] font-medium transition-all"
                  >
                    <span>Visit</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-maharaja-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <div>
            @2026 Drango
          </div>

        </div>

      </div>

      {/* Policy Modal */}
      {policyData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePolicy(null)}
        >
          <div
            className="relative w-full max-w-2xl glass-maharaja rounded-3xl border-2 border-gold/50 shadow-royal overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gold/25 flex items-center justify-between bg-maharaja-900/90">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                  {policyData.badge}
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-gold-bright">
                  {policyData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-full bg-maharaja-900/80 hover:bg-maharaja-800 text-gold-bright border border-gold/40 transition-all"
                aria-label="Close policy modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              {policyData.content.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-maharaja-900/50 border border-gold/15">
                  <h4 className="font-royal text-sm font-bold text-amber-50 mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{item.heading}</span>
                  </h4>
                  <p className="text-amber-200/80 font-light text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-maharaja-950 border-t border-gold/20 flex items-center justify-between text-xs text-amber-200/60">
              <span>Drango Automotive Customs • Chandigarh HQ</span>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="px-4 py-1.5 rounded-lg bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase hover:brightness-110 transition-all shadow-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
