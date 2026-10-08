import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Award, Wrench, Sparkles, Volume2, VolumeX, Play, Pause, ChevronDown, Phone, Truck, Headphones } from 'lucide-react';

export const Hero = ({ onNavigateProducts }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-badge', {
          y: -30,
          opacity: 0,
          duration: 0.9,
          delay: 0.2
        })
        .from(titleRef.current, {
          x: -40,
          opacity: 0,
          duration: 1.1,
        }, '-=0.5')
        .from(ctaRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.4')
        .from('.hero-stat-card', {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
        }, '-=0.4');

      }, heroRef);
    } catch (e) {
      console.warn("GSAP context setup notice:", e);
    }

    // Guaranteed autoplay on load
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay muted fallback:", err);
          });
      }
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') {
        ctx.revert();
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      
      {/* Background Video & Fallback Poster */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_roxx_maharaja.jpg"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        >
          {/* Custom Maharaja Red & Gold Thar ROXX Cinematic Video Loop */}
          <source src="/videos/thar_roxx_maharaja_loop.mp4" type="video/mp4" />
        </video>

        {/* Maharaja Deep Red & Imperial Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-maharaja-950 via-maharaja-950/70 to-maharaja-950/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-maharaja-950/90 via-transparent to-maharaja-950/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,17,32,0.3)_0%,rgba(14,2,4,0.85)_100%)] pointer-events-none"></div>

        {/* Video Control Buttons in Corner */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-maharaja-900/80 hover:bg-maharaja-800 border border-gold/40 text-gold-bright transition-all shadow-md backdrop-blur"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full bg-maharaja-900/80 hover:bg-maharaja-800 border border-gold/40 text-gold-bright transition-all shadow-md backdrop-blur"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col items-start w-full">
        
        {/* Maharaja Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/50 bg-maharaja-900/80 backdrop-blur-md shadow-gold-sm mb-6">
          <Sparkles className="w-4 h-4 text-gold-bright animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase">
            Maharaja Edition • Royal Automotive Craft
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
        </div>

        {/* Exact Requested Heading - Left Aligned */}
        <h1
          ref={titleRef}
          className="font-royal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-10 text-left drop-shadow-2xl"
        >
          <span className="block text-gold-bright uppercase tracking-wider">
            Drango :
          </span>
          <span className="block text-gold-gradient font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-3 tracking-normal capitalize font-bold">
            The ultimate modification of the cars
          </span>
        </h1>

        {/* CTA Buttons - Left Aligned */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto mb-16">
          <a
            href="#products"
            onClick={(e) => {
              if (onNavigateProducts) {
                e.preventDefault();
                onNavigateProducts();
              }
            }}
            className="px-8 py-4 rounded-full bg-gold-gradient text-maharaja-950 font-bold text-sm sm:text-base tracking-widest uppercase hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            <span>Our Products</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-gold/70 bg-maharaja-900/70 hover:bg-maharaja-800 text-gold-bright font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-1 backdrop-blur flex items-center justify-center gap-2"
          >
            <span>Contact Us</span>
            <Phone className="w-4 h-4 text-gold-bright" />
          </a>
        </div>

        {/* Trust Badges / Stats Bar */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          
          <div className="hero-stat-card glass-maharaja p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm md:text-base font-bold text-gold-bright leading-snug">
                Handicraft in Chandigarh
              </div>
              <div className="text-[10px] sm:text-xs text-amber-200/70 uppercase tracking-wider">
                Precision Craft
              </div>
            </div>
          </div>

          <div className="hero-stat-card glass-maharaja p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm md:text-base font-bold text-gold-bright leading-snug">
                Fast & Free Shipping
              </div>
              <div className="text-[10px] sm:text-xs text-amber-200/70 tracking-wide">
                Orders Over ₹20,000
              </div>
            </div>
          </div>

          <div className="hero-stat-card glass-maharaja p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm md:text-base font-bold text-gold-bright leading-snug">
                Quality Checked
              </div>
              <div className="text-[10px] sm:text-xs text-amber-200/70 uppercase tracking-wider">
                Before Dispatch
              </div>
            </div>
          </div>

          <div className="hero-stat-card glass-maharaja p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-bright shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm md:text-base font-bold text-gold-bright leading-snug">
                Customer Support
              </div>
              <div className="text-[10px] sm:text-xs text-amber-200/70 uppercase tracking-wider">
                Dedicated Care
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
