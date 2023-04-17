/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "10px",
        sm: "12px"
      },
      colors: {
        cosretGreen: "#00FF85",
        cosretBlue: "#6197FF",
        "cosretBlue-300": "#F7FAFF",
      },
    },
  },
  plugins: [],
};
