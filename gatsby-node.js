var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

exports.modifyWebpackConfig = function (config, env) {
  config._config.entry.unshift('babel-polyfill');
  config.plugin('inventory-copy-plugin', CopyWebpackPlugin, [[
    { from: path.join(__dirname, 'pages/data.json') , to: path.join(__dirname, 'public/data.json')}
  ]]);
  return config;
}
