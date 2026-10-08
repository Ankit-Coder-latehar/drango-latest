import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Prepare WhatsApp URL
    const message = `👑 *DRANGO CUSTOM BUILD INQUIRY*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Special Notes:* ${formData.notes || 'Please contact me with quotation'}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/40 bg-maharaja-900/80 text-gold text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>BESPOKE APPOINTMENT & CONSULTATION</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-black text-gold-bright tracking-tight mb-4 capitalize">
            contact for custom build
          </h2>
          <p className="text-amber-200/80 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Book a one-on-one consultation with our Master Automotive Stylists at our Jaipur Haveli or Delhi NCR Studios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">

              {/* Studio Jaipur */}
              <div className="glass-maharaja-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold tracking-widest uppercase">Factory Location</span>
                  <h4 className="font-royal text-lg font-bold text-amber-50 mb-1">
                    Chadigarh
                  </h4>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    Sector 21 , Chandigarh
                  </p>
                </div>
              </div>

              {/* Studio Delhi */}
              <div className="glass-maharaja-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold tracking-widest uppercase">NCR MOD HUB</span>
                  <h4 className="font-royal text-lg font-bold text-amber-50 mb-1">
                    Delhi NCR Experience Center
                  </h4>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    Sector 29, Golf Course Road Corridor, Gurugram, Delhi NCR - 122002
                  </p>
                </div>
              </div>

              {/* Hotlines */}
              <div className="glass-maharaja-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0 mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold tracking-widest uppercase">DIRECT CONTACT</span>
                  <h4 className="font-royal text-lg font-bold text-amber-50 mb-1">
                    +91 98765 43210 / +91 91234 56789
                  </h4>
                  <p className="text-xs text-amber-200/70">
                    Email: dango@gmail.com • Mon - Sat: 10:00 AM - 8:30 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Feature Badge */}
            <div className="p-4 rounded-xl border border-gold/30 bg-maharaja-900/60 flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <p className="text-xs text-amber-100">
                Doorstep pickup and insured carrier transport available across 180+ Indian cities.
              </p>
            </div>
          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-maharaja p-8 sm:p-10 rounded-3xl border-2 border-gold/40 shadow-royal relative">

              {submitted ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-gold-gradient text-maharaja-950 flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-royal text-2xl font-black text-gold-bright mb-2">
                    Inquiry Dispatched to Chief Stylist!
                  </h3>
                  <p className="text-sm text-amber-200/80 max-w-md mx-auto mb-6">
                    WhatsApp has opened with your selected specifications. Our master modification coordinator will respond within 15 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full border border-gold text-gold hover:bg-maharaja-800 text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-amber-50 mb-4">
                    Direct Inquiry & Quotation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kunwar Pratap Singh"
                        className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                      Special Modification Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your colour preference, delivery city, or specific custom requests..."
                      className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-gradient text-maharaja-950 font-black text-sm tracking-widest uppercase hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Commission Request via WhatsApp</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
