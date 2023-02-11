module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: [
    require('prettier-plugin-astro'),
    require('prettier-plugin-svelte'),
    require('prettier-plugin-tailwindcss'),
  ],
  pluginSearchDirs: false,
  tailwindConfig: './app/blog-ui/tailwind.config.cjs',
};
