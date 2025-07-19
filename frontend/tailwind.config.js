// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#1d4ed8',
//         secondary: '#4f46e5',
//         accent: '#0ea5e9',
//       },
//     },
//   },
//   plugins: [require('daisyui')],
//   daisyui: {
//     themes: [
//       {
//         dark: {
//           primary: '#1d4ed8',
//           secondary: '#4f46e5',
//           accent: '#0ea5e9',
//           neutral: '#2a323c',
//           'base-100': '#1f2937',
//           'base-200': '#111827',
//           'base-300': '#0f172a',
//           info: '#3abff8',
//           success: '#36d399',
//           warning: '#fbbd23',
//           error: '#f87272',
//         },
//       },
//     ],
//     darkTheme: 'dark',
//   },
// }




import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
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