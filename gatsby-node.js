exports.modifyWebpackConfig = function (config, env) {
  config._config.entry.unshift('babel-polyfill')
  return config
}
