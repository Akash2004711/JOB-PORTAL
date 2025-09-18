/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-500
        background: 'var(--color-background)', // slate-50
        foreground: 'var(--color-foreground)', // slate-900
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)', // slate-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // emerald-600
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // slate-900
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // slate-900
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-500
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)', // white
        },
        // Analytics specific colors
        analytics: {
          blue: 'var(--color-analytics-blue)', // blue-700
          'blue-foreground': 'var(--color-analytics-blue-foreground)', // white
          green: 'var(--color-analytics-green)', // emerald-600
          'green-foreground': 'var(--color-analytics-green-foreground)', // white
          orange: 'var(--color-analytics-orange)', // orange-600
          'orange-foreground': 'var(--color-analytics-orange-foreground)', // white
        },
        // Text colors
        text: {
          primary: 'var(--color-text-primary)', // slate-900
          secondary: 'var(--color-text-secondary)', // slate-500
          muted: 'var(--color-text-muted)', // slate-400
        },
        // Surface colors
        surface: {
          DEFAULT: 'var(--color-surface)', // white
          secondary: 'var(--color-surface-secondary)', // slate-50
          tertiary: 'var(--color-surface-tertiary)', // slate-100
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'analytics-xs': ['0.75rem', { lineHeight: '1rem' }],
        'analytics-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'analytics-base': ['1rem', { lineHeight: '1.5rem' }],
        'analytics-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'analytics-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'analytics-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'analytics-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      boxShadow: {
        'analytics': '0 1px 3px rgba(0,0,0,0.1)',
        'analytics-lg': '0 4px 6px rgba(0,0,0,0.1)',
        'analytics-xl': '0 10px 15px rgba(0,0,0,0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '1000': '1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}