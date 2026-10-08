import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, ShieldCheck, Quote, Sparkles, ThumbsUp, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-20 bg-maharaja-950 relative border-t border-gold/20">
      
      {/* Decorative Gold Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/40 bg-maharaja-900/80 text-gold text-xs font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>REAL OWNER FEEDBACK</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-5xl font-black text-gold-bright tracking-tight mb-4">
          Reviews Section
        </h2>
        <p className="text-amber-200/80 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Real reviews and verified experiences from proud owners who transformed their vehicles with Drango.
        </p>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => {
            const isLiked = likes[item.id];

            return (
              <div
                key={item.id}
                className="glass-maharaja-card rounded-2xl p-7 flex flex-col justify-between relative group hover:border-gold/70 transition-all duration-300"
              >
                {/* Royal Quote Icon in Background */}
                <Quote className="w-16 h-16 text-gold/10 absolute top-4 right-4 pointer-events-none group-hover:text-gold/20 transition-colors" />

                <div>
                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-gold-bright" />
                      ))}
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-400 bg-green-950/60 border border-green-800/60 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Owner
                      </span>
                    )}
                  </div>

                  {/* Review Title */}
                  <h4 className="font-royal text-lg font-bold text-amber-50 group-hover:text-gold-bright transition-colors mb-3">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-gold-bright hover:text-amber-100 transition-colors"
                      >
                        "{item.title}"
                      </a>
                    ) : (
                      `"${item.title}"`
                    )}
                  </h4>

                  {/* Review Body */}
                  <p className="text-sm text-amber-100/80 leading-relaxed font-light mb-6">
                    {item.content}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-maharaja-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-maharaja-750 to-maharaja-900 border border-gold/50 flex items-center justify-center text-xl shadow-gold-sm">
                      {item.avatar}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gold-bright">
                        {item.name}
                      </h5>
                      <p className="text-xs text-amber-200/60">
                        {item.vehicle}
                      </p>
                      <p className="text-[10px] text-amber-300/40">
                        {item.location} • {item.date}
                      </p>
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`p-2 rounded-full border transition-all ${
                      isLiked
                        ? 'bg-gold-gradient text-maharaja-950 border-gold shadow-gold-sm'
                        : 'border-maharaja-700 text-amber-200/60 hover:text-gold hover:border-gold/40'
                    }`}
                    title="Helpful Review"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Maharaja Assurance Bar */}
        <div className="mt-14 p-6 rounded-2xl glass-maharaja border-gold-glow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-gradient text-maharaja-950 flex items-center justify-center font-bold text-2xl shadow-gold-sm shrink-0">
              👑
            </div>
            <div>
              <h4 className="font-royal text-lg font-bold text-amber-50">
                100% Satisfaction & Royal Fitment Assurance
              </h4>
              <p className="text-xs text-amber-200/70">
                Every component is road-tested under extreme conditions before handover.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Drango!%20I%20want%20to%20consult%20for%20my%20vehicle%20modifications."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-xs uppercase tracking-wider hover:shadow-gold-sm transition-all whitespace-nowrap"
          >
            Speak to Chief Mod Specialist
          </a>
        </div>

      </div>
    </section>
  );
};
