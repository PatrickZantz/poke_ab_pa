/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'pokemon': ['Pokemon Solid', 'system-ui'],
        'pokemon-hollow': ['Pokemon Hollow', 'system-ui'],
        'game': ['"VT323"', 'monospace'],
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      keyframes: {
        popup: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-6px) rotate(-2deg)' },
          '75%': { transform: 'translateY(6px) rotate(2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100%) rotate(360deg)' }
        },
        glowPulse: {
          '0%, 100%': { filter: 'brightness(1) saturate(1)' },
          '50%': { filter: 'brightness(1.2) saturate(1.3)' }
        },
        spinBounce: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '30%': { transform: 'translateY(-20px) rotate(180deg)' },
          '50%': { transform: 'translateY(-25px) rotate(360deg)' },
          '70%': { transform: 'translateY(-15px) rotate(520deg)' },
          '100%': { transform: 'translateY(0) rotate(720deg)' }
        },
        breathing: {
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            filter: 'brightness(1) saturate(1)'
          },
          '50%': { 
            transform: 'scale(1.5) rotate(5deg)',
            filter: 'brightness(1.2) saturate(1.3)'
          }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        popup: 'popup 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
        shine: 'shine 2s linear infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        spinBounce: 'spinBounce 1s ease-in-out',
        breathing: 'breathing 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
};
