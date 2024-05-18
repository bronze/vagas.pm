import {defineConfig} from "astro/config";
import netlify from "@astrojs/netlify/functions";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // adapter: netlify(),
  integrations: [tailwind(), icon(), alpinejs({entrypoint: '/src/entrypoint'})]
});