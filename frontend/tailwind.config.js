/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Dancing Script"', 'cursive'],
        serifjp: ['"Noto Serif JP"', 'serif'],
      },
      colors: {
        weddingPink: '#f8dce0',
        weddingGold: '#f5deb3',
        softBrown: '#a97c50',
        ivory: '#fdfcf9',
      },
      backgroundImage: {
        texture: "url('/bg-texture.jpg')",
      },
    },
  },
  plugins: [],
};
