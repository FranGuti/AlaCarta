/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#F26B3F",
        customBeige: "#EFE5CE",
        customPink: "#F3AA97",
        customRed: "#CE5160",
        customDarkRed: "#750707",
        customYellow: "#FDBE5D",
        customLightBlue: "#48C4D3",
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        '5xl': '0 0 40px rgba(0, 0, 0, 0.4)'
      },
    },
  },
  plugins: [],
}

