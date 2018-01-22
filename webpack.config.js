var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/public/index.html/',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/public/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
