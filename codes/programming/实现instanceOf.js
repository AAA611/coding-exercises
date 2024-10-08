function myInstanceOf(ins, Ctor) {
  let proto = Object.getPrototypeOf(ins)

  while (proto) {
    if (proto === Ctor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto) // ⭐ 注意这里
  }

  return false
}

console.log(myInstanceOf([], Array));
console.log(myInstanceOf([], Object));
console.log(myInstanceOf([], Function));
console.log(myInstanceOf(() => { }, Function));