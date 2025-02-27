import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       // background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#0D47A1',       // Azul Oscuro
        secondary: '#1976D2',     // Azul Medio
        background: '#F5F5F5',    // Fondo Neutro
        action: '#FF9800',        // CTA (Naranja Vibrante)
        emphasis: '#424242',      // Gris Oscuro
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Encabezados
        roboto: ['Roboto', 'sans-serif'],         // Texto del cuerpo
      },
    },
  },
  plugins: [],
} satisfies Config;
