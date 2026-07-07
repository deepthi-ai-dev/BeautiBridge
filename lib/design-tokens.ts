export const designTokens = {
  colors: {
    beige: {
      50: "#fffaf3",
      100: "#f8f1e8",
      200: "#efe6d8",
      300: "#e3d5c4",
    },
    plum: {
      950: "#2b1729",
      900: "#351b31",
      800: "#45213b",
      700: "#542843",
      600: "#6a3657",
    },
    salmon: {
      300: "#f0b3ad",
      400: "#e69791",
      500: "#d9827d",
    },
    gold: "#dcae5b",
    teal: "#20c6d4",
  },
  radii: {
    xs: "0.375rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    pill: "999px",
  },
  shadows: {
    soft: "0 18px 60px rgb(84 40 67 / 0.1)",
    card: "0 20px 48px rgb(53 27 49 / 0.12)",
    premium: "0 28px 90px rgb(53 27 49 / 0.18)",
  },
  spacing: {
    section: "clamp(4.5rem, 8vw, 8rem)",
    page: "min(100% - 2rem, 75rem)",
  },
  breakpoints: {
    xs: "30rem",
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "96rem",
  },
} as const;
