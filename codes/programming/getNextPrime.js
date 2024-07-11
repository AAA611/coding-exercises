// 📘:每次返回下一个质数

const getNextPrime = (function () {
  let cur = 2

  const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }
    return num > 1;
  }

  return () => {
    while (true) {
      if (isPrime(cur)) {
        const prime = cur
        cur++
        return prime
      } else {
        cur++
      }
    }
  }
})()