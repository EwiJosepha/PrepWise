import type { Config } from "tailwindcss";

export default {
  content: [
   "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
     " primary": "#8cc2fc",
      'lighter-blue': '#F7FBFF',
      'dark-blue': '#0A112F',
      'blue-gray': '#8897AD',
      'thick-blue': "#020202"



    },
  },
  plugins: [],
} satisfies Config;
