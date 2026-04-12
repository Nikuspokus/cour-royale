import type { Config } from 'tailwindcss'
import tailwindForms from '@tailwindcss/forms'

export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#735c00",
        "primary-container": "#d4af37",
        "secondary": "#C5A02E",
        "tertiary": "#7B0C0C",
        "background": "#fbf9f4",
        "on-background": "#121212",
        "surface": "#fbf9f4",
        "surface-container-low": "#f7f5ef",
        "surface-container-high": "#efede6",
        "surface-container-highest": "#e8e5dc",
        "outline": "#7f7663",
        "outline-variant": "#d0c5af",
        "royal-ink": "#1B1B1B",
      },
      fontFamily: {
        serif: ["'Noto Serif'", 'serif'],
        headline: ["'Noto Serif'", 'serif'],
        body: ["'Newsreader'", 'serif'],
        label: ["'Work Sans'", 'sans-serif'],
        cursive: ["'Pinyon Script'", 'cursive'],
        typewriter: ["'Special Elite'", 'serif'],
      },
    },
  },
  plugins: [
    tailwindForms,
  ],
} satisfies Config

