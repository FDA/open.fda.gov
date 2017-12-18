var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

exports.modifyWebpackConfig = function (config, env) {
  config.config.plugin('inventory-copy-plugin', CopyWebpackPlugin, [[
    { from: path.join(__dirname, 'src/pages/data.json') , to: path.join(__dirname, 'public/data.json')}
  ]]);
  return config;
}
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /datamaps/,
      loader: "null-loader",
    })
  }
}
