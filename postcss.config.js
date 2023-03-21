module.exports = {
  plugins: [
    [
      require('postcss-preset-env'),
      {
        autoprefixer: {
          browserslits: ['> 1%'],
        },
      },
    ],
    require('rucksack-css'),
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss'),
  ],
}
