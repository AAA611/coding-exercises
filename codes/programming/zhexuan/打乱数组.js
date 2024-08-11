const arr = [1, 2, 3, 4, 5, 6, 7, 8]

/**
 * 📘方法一思路：每次从 arr 中选一个随机元素，随后删除这个元素。继续下一轮选择
 * @param {*} arr 
 * @returns 
 */
function fn1(arr) {
  const res = []
  const copy = [...arr]
  while (copy.length) {
    const index = Math.floor(Math.random() * copy.length)
    res.push(copy[index])
    copy.splice(index, 1)
  }

  return res
}

// console.log(fn1(arr));


function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * 📘方法二思路：每次从 i ~ arr.length-1 区间内选一个随机数，将其与 i 位置的元素做交换
 * @param {*} arr 
 * @returns 
 */
function fn2(arr) {
  const copy = [...arr]

  for (let i = 0; i < copy.length; i++) {
    const index = Math.floor(Math.random() * (copy.length - i) + i)
    swap(copy, index, i)
  }

  return copy
}

// console.log(fn2(arr));


/**
 * 📘方法三思路：每次从 arr.length-1 ~ i 范围内选一个随机数，将其与 i 位置元素交换
 * @param {*} arr 
 * @returns 
 */
function fn3(arr) {
  const copy = [...arr]

  for (let i = copy.length - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * i)
    swap(copy, index, i)
    i--
  }

  return copy
}

console.log(fn3(arr));