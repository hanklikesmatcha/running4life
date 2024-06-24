/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always"
};
