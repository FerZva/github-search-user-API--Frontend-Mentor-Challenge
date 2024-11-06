/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class",
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
      },
    },
    // colors: {
    //   'textLightColor': '#697C9A',
    //   'buttonColor':  '#0079FF',
    //   'lightBackgroundColor': '#F6F8FF',
    // },
  },
  plugins: [],
}