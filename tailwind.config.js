/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────────────────
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          50:  '#E8EBF0',
          100: '#C5CCDA',
          200: '#9FAABB',
          300: '#78889C',
          400: '#556A84',
          500: '#324D6D',
          600: '#1E3655',
          700: '#0A1628',  // brand default
          800: '#071020',
          900: '#040A14',
        },
        gold: {
          DEFAULT: '#D4A853',
          50:  '#FBF5E8',
          100: '#F5E6C3',
          200: '#EDD49A',
          300: '#E5C270',
          400: '#D4A853',  // brand default
          500: '#BD8E36',
          600: '#9A7129',
          700: '#775520',
          800: '#543C16',
          900: '#31220C',
        },
        coral: {
          DEFAULT: '#E8734A',
          50:  '#FDF1EC',
          100: '#F9D9CE',
          200: '#F4BBAA',
          300: '#EF9D86',
          400: '#E8734A',  // brand default / CTA accent
          500: '#D95A2E',
          600: '#B54525',
          700: '#8E341C',
          800: '#672413',
          900: '#40140A',
        },
        offwhite: {
          DEFAULT: '#F5F5F5',
          100: '#FFFFFF',
          200: '#F5F5F5',  // brand soft grey
          300: '#EBEBEB',
          400: '#E0E0E0',
        },
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['clamp(2.5rem, 6vw, 5rem)',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'section': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },

      // ─── Spacing ────────────────────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '54':  '13.5rem',
        '58':  '14.5rem',
        '62':  '15.5rem',
        '66':  '16.5rem',
        '70':  '17.5rem',
        '72':  '18rem',
        '76':  '19rem',
        '80':  '20rem',
        '88':  '22rem',
        '96':  '24rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
      },

      // ─── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        '4xl':  '2rem',
        '5xl':  '2.5rem',
        '6xl':  '3rem',
      },

      // ─── Box Shadow ─────────────────────────────────────────────────────────
      boxShadow: {
        'gold':    '0 4px 24px 0 rgba(212, 168, 83, 0.25)',
        'gold-lg': '0 8px 40px 0 rgba(212, 168, 83, 0.35)',
        'navy':    '0 4px 24px 0 rgba(10, 22, 40, 0.25)',
        'navy-lg': '0 8px 40px 0 rgba(10, 22, 40, 0.40)',
        'coral':   '0 4px 24px 0 rgba(232, 115, 74, 0.30)',
        'soft':    '0 2px 16px 0 rgba(0, 0, 0, 0.08)',
        'card':    '0 4px 32px 0 rgba(0, 0, 0, 0.10)',
      },

      // ─── Background Gradients (via backgroundImage) ─────────────────────────
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #0A1628 0%, #1E3655 60%, #0A1628 100%)',
        'gold-gradient':    'linear-gradient(90deg, #D4A853 0%, #F5D78E 50%, #D4A853 100%)',
        'coral-gradient':   'linear-gradient(135deg, #E8734A 0%, #F0956F 100%)',
        'section-gradient': 'linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%)',
      },

      // ─── Animation ──────────────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,168,83,0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(212,168,83,0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.5s ease-out forwards',
        'shimmer':    'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },

      // ─── Container ──────────────────────────────────────────────────────────
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1440px',
      },
    },
  },
  plugins: [],
}
