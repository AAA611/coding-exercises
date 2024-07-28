// 1237455.789 => 123,455.789

/**
 * 千分位转换
 * @param {string} s 
 */
function transform(s) {
  const [intPart, decimalPart] = s.split('.')
  if (intPart.length <= 3) {
    return s
  }
  let index = intPart.length - 1
  let cur = ''
  let transformedIntPart = ''
  while (index >= 0) {
    cur = s[index] + cur
    index--
    if (cur.length === 3) {
      transformedIntPart = cur + ',' + transformedIntPart
      cur = ''
    }
  }

  if (cur) {
    transformedIntPart = cur + ',' + transformedIntPart
  }

  if (transformedIntPart.startsWith(',')) {
    transformedIntPart = transformedIntPart.substring(1)
  }
  if (transformedIntPart.endsWith(',')) {
    transformedIntPart = transformedIntPart.substring(0, transformedIntPart.length - 1)
  }

  return transformedIntPart + '.' + decimalPart
}

console.log(transform('1234567891011.724289'));

// 方法二
// TODO:支持小数点
function transform2(s) {
  const re = /(?!^)(?=(\d{3})+$)/g

  return s.replace(re, ',')
}

console.log(transform2('13145467311'));