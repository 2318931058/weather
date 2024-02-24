/** @type {import('tailwindcss').Config} */
module.exports = {
  //设置tailwind作用的路径
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //配置默认颜色
      colors:{
        "weather-primary":"#00668A",
        "weather-secondary":"#004E71"
      },
      //配置容器默认外边距和居中
      container:{
        padding:'10rem',
        center:true
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
