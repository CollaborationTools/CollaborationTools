/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.vue',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#5b21b6', // violet.800
          'primary-content': '#ffffff', // white
          secondary: '#16A34A', // green.600
          'secondary-content': '#f0fdf4', // green.50
          accent: '#22d3ee', // cyan.400
          'accent-content': '#000000', // black
          neutral: '#d4d4d4', // neutral.300
          'neutral-content': '#000000', // black
          'base-100': '#f5f5f4', // stone.100
          info: '#0ea5e9', // sky.500
          'info-content': '#000000', // black
          success: '#84cc16', // lime.500
          'success-content': '#000000', // black
          warning: '#fbbf24', // amber.400
          'warning-content': '#000000', // black
          error: '#ef4444', // red.500
          'error-content': '#000000', // black
        },
      },
      {
        dark: {
          primary: '#5b21b6', // violet.800
          'primary-content': '#ffffff', // white
          secondary: '#16A34A', // green.600
          'secondary-content': '#ffffff', // white
          accent: '#22d3ee', // cyan.400
          'accent-content': '#000000', // black
          neutral: '#71717a', // zinc.500
          'neutral-content': '#FFFFFF', // white
          'base-100': '#262626', // neutral.800
          info: '#0284c7', // sky.600
          'info-content': '#ffffff', // white
          success: '#65a30d', // lime.600
          'success-content': '#ffffff', // white
          warning: '#f59e0b', // amber.500
          'warning-content': '#000000', // black
          error: '#b91c1c', // red.700
          'error-content': '#ffffff', // white
        },
      },
    ],
  },
  darkMode: 'class',
  theme: {
    darkSelector: '.dark-mode',
    fontFamily: {
      sans: [
        'Open Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {},
  },
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover',
      'responsive',
    ],
    borderColor: [
      'dark',
      'dark-focus',
      'dark-focus-within',
      'hover',
      'responsive',
    ],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
