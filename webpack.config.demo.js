const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist', 'demo');

module.exports = {
  entry: './demo/index.tsx',
  output: {
    filename: 'demo.js',
    path: distPath,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  devServer: {
    static: distPath,
    compress: true,
    port: 4000,
  },
  plugins: [new HtmlWebpackPlugin({
    inject: false,
    templateContent: ({ htmlWebpackPlugin }) => `
    <html>
      <head>
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
        <div id="app">App placeholder</div>
        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
    </html>
  `,
  })],
  // plugins: [new HtmlWebpackPlugin({ template: './demo/index.html' })],
  // plugins: [new HtmlWebpackPlugin({ template: path.resolve(distPath, 'index.html') })],
};
