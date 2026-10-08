/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maharaja: {
          950: '#0E0204',
          900: '#1C0407',
          850: '#2A060C',
          800: '#420A13',
          750: '#560D19',
          700: '#6E1120',
          600: '#8A1528',
          500: '#B01C34',
        },
        gold: {
          light: '#FFF0BA',
          bright: '#F9D874',
          DEFAULT: '#D4AF37',
          dark: '#B08820',
          antique: '#8A6812',
          border: 'rgba(212, 175, 55, 0.28)',
          glow: 'rgba(249, 216, 116, 0.25)',
        }
      },
      fontFamily: {
        royal: ['"Cinzel"', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.2)',
        'inner-gold': 'inset 0 0 15px rgba(212, 175, 55, 0.12)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF0BA 0%, #F5CE62 40%, #D4AF37 70%, #9B7817 100%)',
        'gold-text': 'linear-gradient(135deg, #FFF2BE 0%, #F3D270 30%, #D4AF37 70%, #C49826 100%)',
        'royal-gradient': 'linear-gradient(145deg, #2A060C 0%, #150204 60%, #0A0102 100%)',
        'card-gradient': 'linear-gradient(160deg, rgba(66, 10, 19, 0.6) 0%, rgba(20, 3, 6, 0.85) 100%)',
      }
    },
  },
  plugins: [],
}
