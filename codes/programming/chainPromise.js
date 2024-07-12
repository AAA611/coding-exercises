const promiseArray = [
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  }),
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  }),
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(3)
    }, 1000)
  }),
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(4)
    }, 1000)
  }),
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  }),
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(6)
    }, 1000)
  })
]

promiseArray.reduce((chain, cur) => {
  return chain.then((data) => {
    console.log('data', data);
    return cur()
  })
}, Promise.resolve())