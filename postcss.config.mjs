const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      fontFamily: {
        bodoni: ["var(--font-bodoni-moda)", "serif"],
      }
    }
  }
};

export default config;
