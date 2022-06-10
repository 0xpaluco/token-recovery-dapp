module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-primary': '#b388ff',
        'c-d-primary': '#805acb',
        'c-l-primary': '#e7b9ff',
        'c-secondary': '#ffccbc',
        'c-d-secondary': '#cb9b8c',
        'c-l-secondary': '#ffffee',
        white: '#f8f8fc',
        black: "#121029",
        transparent: 'transparent'
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ],
}
