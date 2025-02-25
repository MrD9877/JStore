/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-rgba": "rgba(0,0,200,0.2)",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.blue.200'),0 0 20px theme('colors.blue.700')",
        grayesh: "0 0 5px theme('colors.gray.200'),0 0 20px theme('colors.gray.700')",
      },
      width: {
        lg: "1024px",
        sm: "640px",
      },
      fontFamily: {
        amarante: ["Amarante", "serif"],
        ArchDaughter: ["Architects Daughter", "cursive"],
      },
    },
  },
  plugins: [],
};
