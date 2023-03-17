/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': "10px"
      },
      backgroundImage: {
        'wallpaper': "url('./images/screen-bg.jpg')"
      },
      colors: {
        'light' : {
          100: "#FFFFFF",
          200: "#7A7A7A"
        },
        'dark' : {
          100: "#2A2A2A",
          200: "#202020",
          300: "#151515",
          400: "#000000"
        }
      },
      // For Chat-Room-Height
      maxHeight: {
        '600': '613px'
      },
      // For Messages-List-Height
      height: {
        '400': '443px'
      }
    }
  },
  plugins: [],
}
