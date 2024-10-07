const {nextui} = require('@nextui-org/theme');
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-blue-1': '#2E5EAA',
        'custom-blue-2': '#4A8FE2',
        lightYellow: '#F9D356',
        darkYellow: '#8F7715',
        darkBlue: '#194D95',
        lightBlue: '#7BC8FF',
        greenCustom: '#45C87A',
        tealDark: '#14634F',
        customOrange: '#FF9B00',
      },
    },
  },
  plugins: [
    nextui(),
    flowbite.plugin()],
};
