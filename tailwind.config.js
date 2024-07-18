/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#37348f",
        "secondary-blue": "#4b489a",
        "text-black": "#344054",
        "placeholder-gray": "#667085",
        "border-gray": "#D0D5DD"
      }
    },
  },
  plugins: [],
}

