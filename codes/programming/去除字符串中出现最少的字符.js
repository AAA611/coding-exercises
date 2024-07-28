// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”

function fn(s) {
  const cMap = {}
  for (const c of s) {
    if (cMap[c]) {
      cMap[c] = cMap[c] + 1
    } else {
      cMap[c] = 1
    }
  }

  let min = Infinity
  let keys = []
  Object.keys(cMap).forEach(key => {
    if (cMap[key] < min) {
      min = cMap[key]
      keys = [key]
    } else if (cMap[key] === min) {
      keys.push(key)
    }
  })

  let res = ''
  for (const c of s) {
    if (!keys.includes(c)) {
      res += c
    }
  }

  return res
}

console.log(fn('ababac'));
console.log(fn('aaabbbcceeff'));