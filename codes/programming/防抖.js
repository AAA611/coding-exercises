function debounce(fn, {
  time = 3000,
  immediate = false
} = {}) {
  let timer = null
  let isInvoked = false
  return function (...args) {
    if (!isInvoked && immediate) {
      fn.call(this, ...args)
    } else {
      clearInterval(timer)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        fn.call(this, ...args)
      })
    }
  }
}