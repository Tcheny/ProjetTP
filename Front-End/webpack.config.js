const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDasboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true
          }
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"]
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [{
      //         loader: 'file-loader',
      //         options: {},
      //     }, ],
      // },
    ]
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    proxy:
      {
        '/': 'http://localhost:8081'
      }
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    new WebpackDasboardPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ]
};
