const obj = {
  a: {
    b: 1,
    c: {
      d: [1, 2, 3]
    }
  },
  fn() {
    console.log('obj fn');
  }
}

const _toString = Object.prototype.toString
const isObject = (v) => _toString.call(v) === '[Object object]'

function deepClone(obj) {
  if (obj && typeof obj === 'object') {
    const clone = {}
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        clone[i] = deepClone(obj[i])
      }
    } else if (isObject(obj)) {
      Object.keys(obj).forEach(key => {
        clone[key] = deepClone(obj[key])
      })
    } else if (typeof obj === 'function') {
      return obj.bind()
    }
    return clone
  } else {
    return obj
  }
}

const copy = deepClone(obj)
copy.a = 1
console.log(obj.a);
console.log(copy.a);