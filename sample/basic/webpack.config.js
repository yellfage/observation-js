const path = require('path')
const { SourceMapDevToolPlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const ROOT_PATH = __dirname
const INPUT_PATH = path.resolve(ROOT_PATH, 'src')
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist')
const TS_CONFIG_PATH = path.resolve(ROOT_PATH, '../../tsconfig.json')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: INPUT_PATH,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    port: 5003,
    historyApiFallback: true,
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'esnext',
              tsconfigRaw: require(TS_CONFIG_PATH),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ForkTsCheckerPlugin({
      typescript: { configFile: TS_CONFIG_PATH },
    }),
    new HtmlPlugin({
      hash: false,
      template: `${INPUT_PATH}/index.html`,
      filename: 'index.html',
    }),
  ],
}
