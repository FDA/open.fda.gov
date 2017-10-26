/* @flow */

exports.loadContext = (cb: Function): Function => {
  const ctx = require.context('./src/pages', true)

  if (module.hot) {
    module.hot.accept(ctx.id, function() {
      const ctx = require.context('./src/pages', true)
      return cb(ctx)
    })
  }

  return cb(ctx)
}
