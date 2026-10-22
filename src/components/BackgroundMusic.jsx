import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const BackgroundMusic = ({ isLoaderFinished = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Only attempt to start playing when loader screen has finished
    if (!isLoaderFinished) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // Comfortable background volume

    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            // Browser blocked autoplay without user gesture - listen for first user action
            console.log('Autoplay waiting for user gesture:', err.message);
            setIsPlaying(false);

            const handleFirstGesture = () => {
              audio
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setHasInteracted(true);
                })
                .catch((e) => console.log('Gesture play error:', e));

              window.removeEventListener('click', handleFirstGesture);
              window.removeEventListener('touchstart', handleFirstGesture);
              window.removeEventListener('scroll', handleFirstGesture);
              window.removeEventListener('keydown', handleFirstGesture);
            };

            window.addEventListener('click', handleFirstGesture, { passive: true });
            window.addEventListener('touchstart', handleFirstGesture, { passive: true });
            window.addEventListener('scroll', handleFirstGesture, { passive: true });
            window.addEventListener('keydown', handleFirstGesture, { passive: true });
          });
      }
    };

    attemptPlay();

    return () => {
      // Audio cleanup if unmounted
      if (audio) {
        audio.pause();
      }
    };
  }, [isLoaderFinished]);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  // Do not render controls while loading screen is active
  if (!isLoaderFinished) {
    return (
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/audio/drango-theme.mpeg" type="audio/mpeg" />
        <source src="/WhatsApp%20Audio%202026-10-22%20at%203.04.08%20PM.mpeg" type="audio/mpeg" />
      </audio>
    );
  }

  return (
    <>
      {/* Hidden audio element that persists across views */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/audio/drango-theme.mpeg" type="audio/mpeg" />
        <source src="/WhatsApp%20Audio%202026-10-22%20at%203.04.08%20PM.mpeg" type="audio/mpeg" />
      </audio>

      {/* Floating Royal Audio Controller */}
      <div
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 group select-none animate-fadeIn"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isPlaying ? 'Mute background theme' : 'Play background theme'}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-royal relative backdrop-blur-md border ${
            isPlaying
              ? 'glass-maharaja border-gold text-gold-bright hover:shadow-gold-glow scale-100 hover:scale-105'
              : 'bg-maharaja-950/80 border-gold/30 text-amber-200/50 hover:border-gold/60 hover:text-amber-100'
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center relative">
              <Volume2 className="w-5 h-5 text-gold-bright" />
              {/* Equalizer animation waves */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>

        {/* Hover / Tap Label Pill */}
        <div
          onClick={toggleAudio}
          className={`px-3 py-1.5 rounded-full glass-maharaja border border-gold/30 text-amber-100 text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-md ${
            showTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-2 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:translate-x-0'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-gold animate-bounce' : 'text-amber-200/40'}`} />
          <span className="text-[11px] whitespace-nowrap">
            {isPlaying ? 'Theme Audio: Playing' : 'Theme Audio: Paused'}
          </span>
        </div>
      </div>
    </>
  );
};
