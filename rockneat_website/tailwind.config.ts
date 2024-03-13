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
      fontFamily: {
        body: ['BS']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "red": "#960018",
        "red-b": "#fb010193",
        "black": "#000000",
      },
      keyframes: {
          "slide-left": {
              "0%": {
                  transform: "translateX(-5%)",
                  opacity: "0"
              },
              to: {
                  transform: "translateX(0%)",
                  opacity: "1"
              }
          },
          "slide-right": {
              "0%": {
                  transform: "translateX(5%)",
                  opacity: "0"
              },
              to: {
                  transform: "translateX(0%)",
                  opacity: "1"
              }
          },
          "slide-top": {
              "0%": {
                  transform: "translateY(-15%)",
                  opacity: "0"
              },
              to: {
                  transform: "translateY(0%)",
                  opacity: "1"
              }
          },
          "slide-bottom": {
              "0%": {
                  transform: "translateY(15%)",
                  opacity: "0"
              },
              to: {
                  transform: "translateY(0%)",
                  opacity: "1"
              }
          },
          "scale-up-ver-top": {
              "0%": {
                  transform: "scaleY(1)",
                  "transform-origin": "100% 0%"
              },
              to: {
                  transform: "scaleY(10)",
                  "transform-origin": "100% 0%"
              }
          }
      },
      animation: {
        "slide-right": "slide-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left": "slide-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-top": "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bottom": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bottom-d1": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both",
        "slide-bottom-d2": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both",
        "slide-bottom-d3": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both",
        "slide-bottom-d4": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both",
        "slide-bottom-d5": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.6s both",
        "slide-bottom-d6": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.7s both",
        "scale-up-ver-top": "scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
export default config
