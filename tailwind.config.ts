import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // ACM Blue
        secondary: "#1e293b",
      },
    },
  },
  plugins: [],
};

export default config;
