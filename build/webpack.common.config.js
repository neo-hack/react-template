const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { WebpackPluginReactPages } = require('webpack-plugin-react-pages')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const configs = require('./config')

const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * @type import('webpack').Configuration
 */
const common = {
  context: configs.path.context,
  entry: ['./src/index.tsx'],
  output: {
    path: configs.path.output,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?|[cm]?js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDevelopment,
                    refresh: isDevelopment,
                  },
                },
              },
            },
          },
        ],
      },
      // refs: https://react-svgr.com/docs/webpack/
      // import { ReactComponent as XXX } from 'xxx.svg?react'
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /react/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
              exportType: 'named',
            },
          },
        ],
      },
      // import url from 'xxx.svg'
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: {
          not: /react/,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: configs.path.public,
          to: '',
          // ignore copy .gitkeep
          filter: (filepath) => {
            return !/\.gitkeep$/.test(filepath)
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: configs.path.tsconfig,
      },
      async: true,
    }),
    new WebpackPluginReactPages({
      importMode: 'async',
    }),
  ],
}

module.exports = common
