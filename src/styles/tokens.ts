export const colorPalette = {
  neutral: {
    50: "#FFFFFF",
    100: "#f9f9fc",
    200: "#f3f3f6",
    300: "#eeedf0",
    400: "#e8e8eb",
    500: "#e2e2e5",
    600: "#dadadd",
    700: "#80737f",
    800: "#4e434e",
    900: "#1a1c1e",
  },
  brand: {
    primary: "#43004f",
    primaryContainer: "#5c1d67",
    primaryHover: "#4A164F",
    secondary: "#9a2e9d",
    secondaryContainer: "#fc87fb",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onPrimaryContainer: "#d289d9",
    onSecondaryContainer: "#7b0682",
  },
  accent: {
    tertiary: "#421600",
    tertiaryContainer: "#652600",
    onTertiary: "#ffffff",
    onTertiaryContainer: "#ff7f39",
  },
  semantic: {
    success: "#12A89D",
    warning: "#FFB020",
    danger: "#E5484D",
    info: "#3b82f6",
  },
  charts: {
    chart1: "#6C3FA1",
    chart2: "#7D4AB4",
    chart3: "#8B5CC7",
    chart4: "#9A74D6",
    chart5: "#B39CE3",
    chart6: "#D3C7F2",
  }
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", monospace',
    display: '"Space Grotesk", sans-serif',
    headline: '"Times New Roman", Times, serif',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  base: "8px",
  gutter: "24px",
  marginDesktop: "40px",
  marginMobile: "16px",
  containerMax: "1440px",
} as const;

export const radius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  xl2: "1.5rem",
  pill: "9999px",
} as const;

export const shadows = {
  sm: "0 2px 6px rgba(74, 30, 71, 0.05)",
  md: "0 4px 12px rgba(0, 0, 0, 0.05)",
  lg: "0 8px 32px rgba(0, 0, 0, 0.08)",
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
