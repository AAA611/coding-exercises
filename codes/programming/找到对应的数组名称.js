// 比如这个函数输入一个1，那么要求函数返回A

// const A = [1,2,3];
// const B = [4,5,6];
// const C = [7,8,9];

const obj = {
  A: [1, 2, 3],
  B: [4, 5, 6],
  C: [7, 8, 9],
}

const valToNameMap = {}
Object.keys(obj).forEach(key => {
  const values = obj[key]
  for (const val of values) {
    valToNameMap[val] = key
  }
})
function test(num) {
  return valToNameMap[num]
}

console.log(test(1));
console.log(test(2));
console.log(test(3));
console.log(test(4));
console.log(test(5));
console.log(test(6));
console.log(test(7));
console.log(test(8));
console.log(test(9));