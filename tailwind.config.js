/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8026ff",
        secondary: "#461f62",
        accent: "#f4f0ea",
        light: "#fffefd",
        dark: "#030014"
      }
    },
  },
  plugins: [],
}

