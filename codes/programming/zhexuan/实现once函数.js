const fn = () => {
  console.log('fn called');
}

function once(fn) {
  let called = false
  return (...args) => {
    if (called) return
    called = true
    return fn.call(this, ...args)
  }
}
const onceFn = once(fn)

onceFn()
onceFn()