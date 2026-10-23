/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#07060B",
        surface: "#100E1D",
        card: "#17142A",
        elevated: "#211D3B",
        borderSubtle: "rgba(255, 255, 255, 0.08)",
        gold: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#B45309"
        },
        amethyst: {
          light: "#C084FC",
          DEFAULT: "#8B5CF6",
          dark: "#6D28D9"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
