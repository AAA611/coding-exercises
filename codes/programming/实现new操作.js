function myNew(Ctor, ...args) {
  if (typeof Ctor !== 'function') {
    throw new TypeError('Ctor must be a function!')
  }

  const ins = {}

  const res = Ctor.call(ins, ...args)

  if (res && typeof res === 'object') {
    return res
  }

  Object.setPrototypeOf(ins, Ctor.prototype)
  return ins
}

function Person(name) {
  this.name = name
}

const p1 = myNew(Person, 'zs')
console.log(p1);
console.log(p1.__proto__);


function myNew2(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const ins = Ctor.call(obj, ...args)
  return ins instanceof Object ? ins : obj
}