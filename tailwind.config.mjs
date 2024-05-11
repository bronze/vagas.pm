/** @type {import('tailwindcss').Config} */
const defaultTheme=require("tailwindcss/defaultTheme");
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        //   mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
        //   source: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
        //   'nunito': ["Nunito Variable", ...defaultTheme.fontFamily.sans],
        //   'quincy': ["Quincy CF", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [
    // ...
    // require('@tailwindcss/line-clamp'),
    // warn-As of Tailwind CSS v3.3, the`@tailwindcss/line-clamp` plugin is now included by default.
    // warn-Remove it from the `plugins` array in your configuration to eliminate this warning.
  ],
}
