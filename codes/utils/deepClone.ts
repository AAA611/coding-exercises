function deepClone(obj, cache = new Map()) {
  if (!obj) return obj
  if (cache.has(obj)) return cache.get(obj)
  if (isObject(obj)) {
    const clone = {}
    for (const key in obj) {
      clone[key] = deepClone(obj[key], cache)
    }
    cache.set(obj, clone)
    return clone
  } else if (isArray(obj)) {
    const clone = new Array()
    obj.forEach((_, index) => clone[index] = deepClone(obj[index], cache))
    cache.set(obj, clone)
    return clone
  } else if (isDate(obj)) {
    return new Date(obj.getTime())
  } else if (isRegExp(obj)) {
    return new RegExp(obj.source, obj.flags)
  } else if (isBasicType(obj)) {
    return obj
  }
  return obj
}

const _toString = Object.prototype.toString

function isArray(val) {
  return _toString.call(val) === '[object Array]'
}

function isObject(val) {
  return _toString.call(val) === '[object Object]'
}

function isDate(val) {
  return _toString.call(val) === '[object Date]'
}

function isMap(val) {
  return _toString.call(val) === '[object Map]'
}

function isSet(val) {
  return _toString.call(val) === '[object Set]'
}

function isRegExp(val): val is RegExp {
  return _toString.call(val) === '[object RegExp]'
}

function isBasicType(val) {
  return typeof val === 'number'
    || typeof val === 'boolean'
    || typeof val === 'string'
    || typeof val === 'undefined'
}