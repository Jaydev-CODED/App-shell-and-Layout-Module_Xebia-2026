export const colorPalette = {
  neutral: {
    50: "#FFFFFF",
    100: "#F7F7FB",
    200: "#EDEDED",
    300: "#DADCEA",
    400: "#B8AFCF",
    500: "#9D92B2",
    600: "#855889",
    700: "#793B74",
    800: "#5B1E53",
    900: "#4A1E47",
  },

  brand: {
    100: "#D3CCEC",
    200: "#B8AFCF",
    300: "#9D92B2",
    400: "#855889",
    500: "#6C1D5F",
    600: "#5B1E53",
    700: "#4A1E47",
  },

  accent: {
    500: "#84117C",
  },

  semantic: {
    success: "#01AC9F",
    warning: "#FF6200",
    danger: "#D32F2F",
    info: "#6C1D5F",
  },
} as const;


export const typography = {
  fontFamily: {
    sans: 'Inter, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "SFMono-Regular", monospace',
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
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  pill: "999px",
} as const;

export const shadows = {
  sm: "0 2px 6px rgba(74, 30, 71, 0.08)",
md: "0 8px 24px rgba(74, 30, 71, 0.12)",
lg: "0 16px 40px rgba(74, 30, 71, 0.18)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;
