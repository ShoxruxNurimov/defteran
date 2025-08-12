module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3fbf6',
          100: '#e3f7ed',
          500: '#10b981', // ana yeşil (tailwind emerald benzeri)
          600: '#059669'
        }
      },
      boxShadow: {
        soft: '0 6px 20px rgba(16,24,40,0.06)'
      },
      borderRadius: {
        xl: '12px'
      }
    }
  },
  plugins: []
}
