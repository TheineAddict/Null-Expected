/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            lineHeight: '1.75',
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'normal',
              color: theme('colors.gray.700'),
              borderLeftColor: theme('colors.indigo.300'),
              backgroundColor: theme('colors.indigo.50'),
              padding: '1.5rem',
              borderRadius: '0.5rem',
            },
            a: {
              color: theme('colors.indigo.900'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.purple.800'),
              },
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: theme('colors.indigo.600'),
              borderRadius: '50%',
              width: '0.375rem',
              height: '0.375rem',
              top: '0.6875rem',
              left: '0.25rem',
            },
            ol: {
              paddingLeft: '1.25rem',
            },
            'ol > li': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};