/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#2196F3",
        accent: "#FF9800",
        background: "#F5F5F5",
        textPrimary: "#333333",
        textSecondary: "#666666",
      },
    },
  },
  plugins: [],
};
