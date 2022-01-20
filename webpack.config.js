const path = require('path');

module.exports = {
  entry: './lib/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'redumbx',
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
              outDir: 'dist',
            },
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-redux': {
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux',
      root: 'ReactRedux',
    },
    '@reduxjs/toolkit': {
      commonjs: '@reduxjs/toolkit',
      commonjs2: '@reduxjs/toolkit',
      amd: '@reduxjs/toolkit',
      root: 'ReduxToolkit',
    },
  },
};
