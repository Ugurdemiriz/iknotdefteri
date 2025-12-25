// postcss.config.js@import "tailwindcss";
import "tailwindcss";
import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};