const path = require('path')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

const { NODE_ENV } = process.env

const ROOT_PATH = __dirname
const INPUT_PATH = path.resolve(ROOT_PATH, 'src')
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-map',
  entry: {
    index: INPUT_PATH,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
    library: {
      type: 'umd',
      name: 'observation',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()],
  },
  externals: ['@yellfage/events'],
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [INPUT_PATH],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'esnext',
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
  ],
}
