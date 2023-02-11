/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#5500ff',
        surface: '#0E0D0D',
        background: '#050505',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Unbounded', 'sans-serif'],
      },
      screens: {
        'min-size': '530px',
      },
    },
  },
  plugins: [],
};
