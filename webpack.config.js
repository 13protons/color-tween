var webpack = require('webpack');


module.exports = [{
    entry: './index.js',
    output: {
      filename: './dist/color-tween.js',
      library: 'ColorTween',
      libraryTarget: 'umd'
    }
  },{
    entry: './index.js',
    output: {
      filename: './dist/color-tween.min.js',
      library: 'ColorTween',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
}];
