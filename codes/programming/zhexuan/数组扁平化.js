const arr = [1, [1, 2, 3, [1, 1, 1, [3, 4]]], 1, [1, 2, [0]]]

function flat1(arr) {
  return arr.flat(Infinity)
}

// console.log(flat1(arr));

function flat2(arr) {
  return arr.reduce((res, cur) => {
    return Array.isArray(cur) ? [...res, ...flat2(cur)] : [...res, cur]
  }, [])
}

// console.log(flat2(arr));

