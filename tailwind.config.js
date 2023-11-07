const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xs: '200px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        extend: "dark",
        colors: {
          background: "#000000",
          primary: "#331D2C", 
          secondary: "#5f3c54",
          content1: "#331D2C",
          content2: "#e7e7e7",
          content3: "white"
        }
      },
      light: {
        colors: {
          background: "white",
          primary: "#331D2C",
          secondary: "#5f3c54",
          content1: "#E9ECEF",
          content2: "#331D2C",
          content3: "#331D2C",
          
        }
      },
    }
  })],
}