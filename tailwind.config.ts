import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors based on logo green (#10d9a3)
        brand: {
          50: '#f0fdf9',
          100: '#ccfbeb',
          200: '#99f6d8',
          300: '#5cedc0',
          400: '#2dd9a3',
          500: '#10d9a3', // Primary brand color
          600: '#0db894',
          700: '#0f9178',
          800: '#127260',
          900: '#135c50',
          950: '#052e2b',
        },
        // Keep existing colors for specific features
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;