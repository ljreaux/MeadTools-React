/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        textColor: "hsl(var(--color-textColor))",
        sidebar: "hsl(var(--color-sidebar))",
      },
    },
  },
  plugins: [],
};
