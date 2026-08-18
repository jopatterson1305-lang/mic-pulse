import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mic: {
          bg: "#070b12",
          surface: "#0c121c",
          text: "#f4f7fb",
          muted: "#8b98aa",
          blue: "#2f7cff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
