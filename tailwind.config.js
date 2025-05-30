
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#DDE5D4',
          50: '#f5f8f3',
        },
        rose: {
          DEFAULT: '#F2D6D3',
          50: '#fbefee',
        },
        amber: {
          DEFAULT: '#F9E6C3',
          50: '#fef8ec',
        },
        taupe: {
          DEFAULT: '#E9E3DF',
          50: '#f7f5f3',
        },
        powder: {
          DEFAULT: '#DCE7EC',
          50: '#f4f8fa',
        },
        grayText: '#4a4a4a',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        livvic: ['Livvic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
