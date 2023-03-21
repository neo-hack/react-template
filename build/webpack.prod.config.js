const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { EsbuildPlugin } = require('esbuild-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const SizePlugin = require('size-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackBar = require('webpackbar')
const { merge } = require('webpack-merge')

const configs = require('./config')
const common = require('./webpack.common.config')

/**
 * @type import('webpack').Configuration
 */
const prod = {
  devtool: 'source-map',
  mode: 'production',
  stats: 'errors-only',
  output: {
    path: configs.path.output,
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[name].[chunkhash].async.js'),
    publicPath: './',
  },
  optimization: {
    moduleIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        async: {
          chunks: 'async',
          minChunks: 2,
          minSize: 0,
          filename: 'async/[name].[contenthash:8].js',
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        minify: true,
        drop: ['console', 'debugger'],
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.esbuildMinify,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]_[local]___[hash:base64:5]',
              },
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                sourceMap: true,
                use: configs.stylus.plugins,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/template.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      // Bump up the default maximum size (2mb) that's precached,
      // to make lazy-loading failure scenarios less likely.
      // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: ['vendors', 'main'],
    }),
    new MiniCSSExtractPlugin({
      filename: path.posix.join('static', 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join('static', 'css/[name].[contenthash].async.css'),
    }),

    ...(configs.analyzer
      ? [
          new BundleAnalyzerPlugin({
            openAnalyzer: true,
          }),
        ]
      : []),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
    }),
    new SizePlugin({
      writeFile: false,
    }),
    new WebpackBar({
      profile: true,
    }),
  ],
}

module.exports = merge(common, prod)
