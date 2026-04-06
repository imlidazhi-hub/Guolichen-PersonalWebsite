import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'persona-gold': '#FFD900',
        'persona-purple': '#6B21A8',
        'persona-dark': '#1A1A2E',
        'cyber-teal': '#00CED1',
      },
    },
  },
  plugins: [],
}
export default config
