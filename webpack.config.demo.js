const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist', 'demo');

const entry = {
  index: './demo/index.tsx',
  todolistapp: './demo/todo-list-app.tsx',
  countersapp: './demo/counters-app.tsx',
};

module.exports = {

  entry,

  output: {
    filename: '[name].bundle.js',
    path: distPath,
  },
  // entry: './demo/index.tsx',
  // output: {
  //   filename: 'demo.js',
  //   path: distPath,
  // },
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
  // plugins: [new HtmlWebpackPlugin({
  //   inject: false,
  //   templateContent: ({ htmlWebpackPlugin }) => `
  //   <html>
  //     <head>
  //       ${htmlWebpackPlugin.tags.headTags}
  //     </head>
  //     <body>
  //
  //       <div id="app">App placeholder</div>
  //       ${htmlWebpackPlugin.tags.bodyTags}
  //     </body>
  //   </html>
  // `,
  // })],
  plugins: [
    ...Object.keys(entry).map(entryName => {
      return new HtmlWebpackPlugin({
        inject: false,
        template: './demo/index.html',
        filename: `${entryName}.html`,
        chunks: [entryName],
      });
    }),
    new CopyPlugin({
      patterns: [
        { from: './demo/index.css', to: path.resolve(distPath, 'index.css') },
      ],
    }),
  ],
  // plugins: [new HtmlWebpackPlugin({ template: path.resolve(distPath, 'index.html') })],
};
