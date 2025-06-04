/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
  animation: {
    blob: 'blob 8s infinite',
    float: 'float 6s ease-in-out infinite',
    shimmer: 'shimmer 4s linear infinite',
    'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
  },
  keyframes: {
    blob: {
      '0%': { transform: 'translate(0px, 0px) scale(1)' },
      '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
      '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
      '100%': { transform: 'translate(0px, 0px) scale(1)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-12px)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-100% 0' },
      '100%': { backgroundPosition: '100% 0' },
    },
    fadeInUp: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
}
}
,
  plugins: [daisyui],
  safelist: ["transform"], 
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
