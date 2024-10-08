const arr = [1, 1, 2, 2, 6, 6, 3, 3]

/**
 * 方法 1
 * 📘 利用 Set 数据结构特性
 * @param {*} arr 
 */
function deduplicateArray1(arr) {
  return [...new Set(arr)]
}

// console.log(deduplicateArray1(arr));

/**
 * 方法 2
 * @param {*} arr 
 */
function deduplicateArray2(arr) {
  const res = []
  const hashMap = Object.create(null)

  for (let i = 0; i < arr.length; i++) {
    if (!hashMap[arr[i]]) {
      res.push(arr[i])
      hashMap[arr[i]] = true
    }
  }

  return res
}

// console.log(deduplicateArray2(arr));


/**
 * 方法 3
 * @param {*} arr 
 */
function deduplicateArray3(arr) {
  res = []
  arr.sort((a, b) => a - b)

  // [1,1,2,2,3,3,6,6]
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      continue
    } else {
      res.push(arr[i])
    }
  }
  res.push(arr[arr.length - 1])

  return res
}

// console.log(deduplicateArray3(arr));


/**
 * 方法 4
 * @param {*} arr 
 */
function deduplicateArray4(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur)
    }
    return acc
  }, [])
}

// console.log(deduplicateArray4(arr));


/**
 * 方法 5
 * @param {*} arr 
 */
function deduplicateArray5(arr) {
  return arr.filter((val, index, selfArr) => selfArr.indexOf(val) === index)
}

// console.log(deduplicateArray5(arr));
