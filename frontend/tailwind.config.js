import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Poppins gives a modern, premium look.
        sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        // Custom branding for One2One
        one2one: {
          "primary": "#0ea5e9",        // Professional Sky Blue
          "primary-content": "#ffffff",
          "secondary": "#6366f1",      // Indigo
          "accent": "#f59e0b",         // Amber for notifications/highlights
          "neutral": "#1e293b",        // Slate Gray
          "base-100": "#ffffff",       // Main background
          "base-200": "#f8fafc",       // Sidebar/Secondary background
          "base-300": "#f1f5f9",       // Borders/Hover states
          "info": "#3b82f6",
          "success": "#22c55e",        // Used for the 'Online' green dot
          "warning": "#facc15",
          "error": "#ef4444",
        },
      },
      // Register the common DaisyUI themes so Settings can apply them
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    // This tells DaisyUI to use your One2One colors by default
    darkTheme: "business",
    base: true,
    utils: true,
    logs: false, // Cleaner console
    prefix: "",
  },
};