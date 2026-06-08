/** @type {import('tailwindcss').Config} */
const appColors = require('./src/colors-tw');

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        text:       { DEFAULT: appColors.light.text,       dark: appColors.dark.text },
        background: { DEFAULT: appColors.light.background, dark: appColors.dark.background },
        surface:    { DEFAULT: appColors.light.surface,    dark: appColors.dark.surface },
        primary:    { DEFAULT: appColors.light.primary,    dark: appColors.dark.primary },
        secondary:  { DEFAULT: appColors.light.secondary,  dark: appColors.dark.secondary },
        accent:     { DEFAULT: appColors.light.accent,     dark: appColors.dark.accent },
        muted:      { DEFAULT: appColors.light.muted,      dark: appColors.dark.muted },
        link:       { DEFAULT: appColors.light.link,       dark: appColors.dark.link },
      },
    },
  },
  plugins: [],
};
