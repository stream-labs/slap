const path = require('path');

module.exports = {
  entry: './inspector/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist-inspector/inspector'),
    clean: true,
    library: 'slap-inspector',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this', // for usage in node-js
  },
  devtool: 'source-map',

  // TODO: minimize
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: true,
              outDir: 'dist-inspector',
            },
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  externals: {
    react: 'react', // Case matters here
    'react-dom': 'react-dom', // Case matters here
  },

};
