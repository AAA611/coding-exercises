function throttle(fn, wait, immediate = false, last = true) {
  let timer = null
  let lastInvokeTime = 0
  return function (...args) {
    if (immediate) {
      fn.call(this, ...args)
      lastInvokeTime = Date.now()
    }

    const d = Date.now() - lastInvokeTime

    if (!lastInvokeTime || d >= wait) {

      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      fn.call(this, ...args)
      lastInvokeTime = Date.now()
    } else if (last) {
      timer = setTimeout(() => {
        fn.call(...args)
        lastInvokeTime = Date.now()
      })
    }
  }
}

const fetchData = throttle(() => {
  console.log('Fetch Data');
}, 1500)


let i = 0
const task = () => {
  if (i === 100) return
  setTimeout(() => {
    fetchData()
    task()
    i++
  }, 500)
}

task()