module.exports = {
  plugins: [
    [
      require('postcss-lightningcss'),
      {
        browsers: '> 1%',
        lightningcssOptions: {
          minify: false,
          // Individually enable various drafts
          drafts: {
            // Enable css nesting (default: undefined)
            nesting: false,
          },
        },
      },
    ],
    require('rucksack-css'),
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss'),
  ],
}
