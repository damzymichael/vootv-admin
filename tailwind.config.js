/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {}
  },
  daisyui: { themes: ['aqua'] },
  plugins: [require('daisyui')]
}
