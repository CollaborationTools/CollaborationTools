import colors from 'tailwindcss/colors'

export default {
  content: [
    './platform/framework/components/**/*.vue',
    './platform/framework/layouts/**/*.vue',
    './platform/framework/pages/**/*.vue',
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: colors.violet[800],
          'primary-content': colors.white,
          secondary: colors.green[600],
          'secondary-content': colors.white,
          accent: colors.cyan[400],
          'accent-content': colors.cyan[900],
          neutral: colors.neutral[300],
          'neutral-content': colors.black,
          'base-100': colors.stone[100],
          info: colors.blue[300],
          'info-content': colors.blue[900],
          success: colors.lime[400],
          'success-content': colors.lime[900],
          warning: colors.amber[400],
          'warning-content': colors.amber[900],
          error: colors.red[300],
          'error-content': colors.red[900],
          '.text-red': {
            color: colors.rose[700],
          },
          '.border-red': {
            'border-color': colors.rose[700],
          },
        },
      },
      {
        dark: {
          primary: colors.violet[800],
          'primary-content': colors.white,
          secondary: colors.green[600],
          'secondary-content': colors.white,
          accent: colors.cyan[400],
          'accent-content': colors.black,
          neutral: colors.zinc[500],
          'neutral-content': colors.white,
          'base-100': colors.neutral[800],
          info: colors.blue[900],
          'info-content': colors.blue[100],
          success: colors.lime[800],
          'success-content': colors.lime[100],
          warning: colors.amber[600],
          'warning-content': colors.black,
          error: colors.red[800],
          'error-content': colors.red[100],
          '.text-red': {
            color: colors.red[400],
          },
          '.border-red': {
            'border-color': colors.red[400],
          },
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
    extend: {
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
