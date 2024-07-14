// 异步加法
function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b)
  }, Math.random() * 1000)
}
const cache = {}
async function total() {
  const res1 = await sum(1, 2, 3, 4, 5, 6, 4)
  const res2 = await sum(1, 2, 3, 4, 5, 6, 4)
  console.log(cache);
  return [res1, res2]
}
// 实现下sum函数。注意不能使用加法，在sum中借助asyncAdd完成加法。尽可能的优化这个方法的时间。
function sum(...nums) {
  return new Promise((resolve, reject) => {
    let res = 0
    let finished = 0
    const needFinished = Math.floor(nums.length / 2)
    let l = 0
    let r = 1
    while (r < nums.length) {
      const cacheKey = `${nums[l]}-${nums[r]}`
      if (cache[cacheKey]) {
        res += cache[cacheKey]
        finished++
        if (finished === needFinished) {
          l += 2
          if (nums[l] !== undefined) {
            asyncAdd(res, nums[l], (err, addRes) => {
              resolve(addRes)
            })
          }
        }
      } else {
        asyncAdd(nums[l], nums[r], (err, addRes) => {
          res += addRes
          cache[cacheKey] = addRes
          finished++
          if (finished === needFinished) {
            if (nums[l] !== undefined) {
              asyncAdd(res, nums[l], (err, addRes) => {
                resolve(addRes)
              })
            }
          }
        })
      }
      l += 2
      r += 2
    }
  })
}

console.log(total());