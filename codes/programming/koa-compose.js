const m1 = async (context, next) => {
  console.log('m1 start');
  await next()
  console.log('m1 end');
  await next()
  console.log('m1');

}

const m2 = async (context, next) => {
  console.log('m2 start');
  await next()
  console.log('m2 end');
}

middlewares = [m1, m2]

function compose(middlewares) {
  return function (context, next) {


    let index = -1

    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error(''))

      let fn = middlewares[i]
      if (index === middlewares.length) {
        fn = next
      }
      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1))) // 依赖于于下一个 middleware 中的 next() 返回值
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

const fn = compose(middlewares)
fn()


// 官方版
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
