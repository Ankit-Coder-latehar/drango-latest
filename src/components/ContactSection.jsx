import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    city: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Prepare WhatsApp message
    const messageParts = [
      '*DRANGO CUSTOM BUILD INQUIRY*',
      '',
      `*Name:* ${formData.name}`,
      `*Mobile Number:* ${formData.phone}`,
      `*Car Make & Model:* ${formData.carModel}`,
      `*City:* ${formData.city}`,
    ];
    if (formData.notes) {
      messageParts.push(`*Special Notes:* ${formData.notes}`);
    }
    const message = encodeURIComponent(messageParts.join('\n'));
    const whatsappUrl = `https://wa.me/919779443821?text=${message}`;

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-maharaja-950 relative border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">

          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-black text-gold-bright tracking-tight mb-3 sm:mb-4 capitalize">
            contact for custom build
          </h2>
          <p className="text-amber-200/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light">
            Book a one-on-one consultation with our Master Automotive Stylists at our Chandigarh Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">

              {/* Factory Location Chandigarh */}
              <div className="glass-maharaja-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gold font-bold tracking-widest uppercase">Factory Location</span>
                  <h4 className="font-royal text-lg font-bold text-amber-50 mb-1">
                    Chandigarh
                  </h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    DRANGO, Manufacture of Premium Custom Auto Parts, Plot No. 458, Industrial Area Phase-2, Chandigarh, 160002
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
                    <a href="tel:+919779443821" className="hover:text-gold transition-colors">
                      +91 97794 43821
                    </a>
                  </h4>
                  <p className="text-xs text-amber-200/70">
                    Mon - Sat: 10:00 AM - 8:30 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Feature Badge */}

          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-maharaja p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-gold/40 shadow-royal relative">

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
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', carModel: '', city: '', notes: '' });
                    }}
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
                        Full Name *
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
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 97794 43821"
                        className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                        Car Make and Model *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        placeholder="e.g. Mahindra Thar Roxx / Scorpio-N"
                        className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chandigarh, Delhi, Mumbai"
                        className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                      Special Modification Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your colour preference or specific custom requests..."
                      className="w-full px-4 py-3 rounded-xl bg-maharaja-900/90 border border-gold/30 text-amber-100 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-gradient text-maharaja-950 font-black text-sm tracking-widest uppercase hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
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
