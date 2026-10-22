import React, { useEffect, useRef, useState } from 'react';

export const BackgroundMusic = ({
  isLoaderFinished = false,
  isPlaying: externalIsPlaying,
  setIsPlaying: externalSetIsPlaying,
  audioRef: externalAudioRef,
}) => {
  const internalAudioRef = useRef(null);
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);

  const audioRef = externalAudioRef || internalAudioRef;
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const setIsPlaying = externalSetIsPlaying || setInternalIsPlaying;

  useEffect(() => {
    // Only attempt to start playing when loader screen has finished
    if (!isLoaderFinished) return;

    const audio = audioRef.current;
    if (!audio) return;

    // Reduce volume to 70% of standard/previous level (0.35) for comfortable ambient listening
    audio.volume = 0.35;

    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
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
  }, [isLoaderFinished, audioRef, setIsPlaying]);

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
};
