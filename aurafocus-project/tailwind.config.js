
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4FD1C5", 
        "primary-light": "#13ecc8",
        "background-light": "#f6f8f8",
        "background-dark": "#1A202C",
        "background-darker": "#10221f",
        "background-darkest": "#0A192F",
        "card-light": "#FFFFFF",
        "card-dark": "#2D3748",
        "card-darker": "#1a2d2a",
        "card-darkest": "#172A45",
        "text-light": "#1A202C",
        "text-dark": "#F7FAFC",
        "muted-light": "#718096",
        "muted-dark": "#A0AEC0",
        "teal-accent": "#48B5A3",
        "success-light": "#4CAF50",
        "success-dark": "#66BB6A",
        "failure-light": "#F44336",
        "failure-dark": "#EF5350",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
          "DEFAULT": "0.5rem",
          "lg": "0.75rem",
          "xl": "1rem",
          "full": "9999px"
      },
    },
  },
  plugins: [],
}
