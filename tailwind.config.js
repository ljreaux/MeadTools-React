/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        notes: "5% 64% 16% 5%",
      },
      colors: {
        background: "hsl(var(--color-background))",
        textColor: "hsl(var(--color-textColor))",
        sidebar: "hsl(var(--color-sidebar))",
      },
    },
  },
  plugins: [],
};
