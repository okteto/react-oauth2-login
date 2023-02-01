const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'LoginOAuth2',
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
    }],
  },
  externals: {
    react: 'react',
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
