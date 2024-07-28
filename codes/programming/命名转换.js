
// useName => use-name

const name = 'useNameCase'

/**
 * 
 * @param {string} s 
 */
function transform1(s) {
  let res = ''
  let index = 0
  while (index < s.length) {
    const c = s[index]
    const cLowerCase = c.toLowerCase()
    if (cLowerCase !== c) {
      if (index === 0) {
        res += cLowerCase
      } else {
        res += '-' + cLowerCase
      }
    } else {
      res += c
    }
    index++
  }
  return res
}

console.log(transform1(name));

function transform2(s) {
  return s.replace(/([A-Z])/g, (_, p1) => {
    return '-' + p1.toLowerCase()
  })
}

console.log(transform2(name));

// TODO:其他相关的命名转换