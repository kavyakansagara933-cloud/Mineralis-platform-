/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f8fb",
        surface: "#ffffff",
        card: "#ffffff",
        "card-hover": "#f8fafc",
        border: "#e2e8f0",
        "border-subtle": "#edf2f7",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          foreground: "#ffffff",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        accent: {
          DEFAULT: "#4f46e5",
          foreground: "#ffffff",
        },
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        'ambient': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.03)',
        'ambient-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)',
        'copilot-glow': '0 0 25px -4px rgba(99, 102, 241, 0.18), 0 0 15px -3px rgba(245, 158, 11, 0.12)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
