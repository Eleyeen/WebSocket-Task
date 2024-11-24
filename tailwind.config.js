/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screen/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundImage: {
        'shine': 'linear-gradient(120deg,transparent,rgba(146,148,248,.4),transparent)',
      },
      colors: {
        'background-primary': '#732DD9',
        'background-secondary': '#F2F2F2',
        'background-tertiary': '#F8F8F8',
        'border-primary': '#DDDDDD',
        'border-secondary': '#732DD9',

        'purple': {
          50: '#732DD9',
          100: '#732DD9',
          200: '#732DD9',
          300: '#732DD9',
          400: '#732DD9',
          500: '#732DD9',
          600: '#732DD9',
          700: '#732DD9',
          800: '#732DD9',
          900: '#732DD9',
        },
        'text-primary': '#2A2A2A',
        'text-secondary': '#888888',
        'text-tertiary': '#732DD9',

      },
      fontFamily: {
        // Inter: ['Inter', ...defaultTheme.fontFamily.sans],
        calibreBold: ['inter-Bold'],
        interBlack: ['inter-Black'],
        interLight: ['inter-Light'],
        interMedium: ['inter-Medium'],
        interRegular: ['inter-Regular'],
        interSemibold: ['inter-SemiBold'],
        interThin: ['inter-Thin'],
      },
    },
  },
  plugins: [],
}

 