
const fn1 = async (next) => {
  console.log('1-1');
  await next()
  console.log('1-2');
  //   await next()
  //   console.log('1-3');
}

const fn2 = async (next) => {
  console.log('2-1');
  await next()
  console.log('2-2');
}

const fn3 = async (next) => {
  console.log('3-1');
  await next()
  console.log('3-2');
}

const compose = (middlewares) => {

  return function (next) {
    let index = -1

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('不能重复调用 next'))

      index = i

      let fn = middlewares[index]

      if (index === middlewares.length) {
        fn = next
      }

      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    dispatch(0)
  }
}

// compose([fn1, fn2, fn3])()

function compose1(middlewares) {
  return function () {

    let index = -1
    function dispatch(i) {
      if (i <= index) return Promise.reject('不能多次调用 next')
      index = i
      const fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    dispatch(0)
  }
}

compose1([fn1, fn2, fn3])()