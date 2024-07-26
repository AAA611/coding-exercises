const nums = [1, 2, 3, 4, 5, 6, 7, 8]

nums.reduce((p, num) => {
  return p.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(num);
        resolve()
      },2000)
    })
  })
}, Promise.resolve())

