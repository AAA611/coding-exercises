const m1 = async (context, next) => {
  console.log('m1 start');
  await next()
  console.log('m1 end');
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

      let fn = middlewares.shift()
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