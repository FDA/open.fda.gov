/* @flow */

exports.loadContext = (cb: Function): Function => {
  const ctx = require.context('./pages', true)

  if (module.hot) {
    module.hot.accept(ctx.id, function() {
      const ctx = require.context('./pages', true)
      return cb(ctx)
    })
  }

  return cb(ctx)
}
