import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        "5v": "5vh",
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      maxWidth: {
        "10": "10%",
        "20": "20%",
        "30": "30%",
        "40": "40%",
        "50": "50%",
        "60": "60%",
        "70": "70%",
        "80": "80%",
        "90": "90%",
      },
      colors: {
        "red": "#fb0301",
        "red-b": "#fb010193",
        "black": "#000000",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
export default config
