import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        "bg-alt": "#141416",
        "bg-alt-2": "#1C1C1F",
        fg: "#F4F3EF",
        muted: "#8C8C8C",
        red: "#E30613",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        body: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
