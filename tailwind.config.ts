import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
    },
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          "primary": "oklch(49.12% 0.3096 275.75)",
          "secondary": "oklch(69.71% 0.329 342.55)",
          "secondary-content": "oklch(98.71% 0.0106 342.55)",
          "accent": "oklch(76.76% 0.184 183.61)",
          "neutral": "#1677ff",
          "neutral-content": "#D7DDE4",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
      }, 
      "dark",
      "cupcake",
      "pastel",
      "valentine"
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
