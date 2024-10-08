function get(obj, path, defaultValue) {
  const pathArray = path.split(/\.|\[|\]/).filter(Boolean)
  return pathArray.reduce((acc, key) => {
    if (acc && acc.hasOwnProperty(key)) {
      return acc[key]
    }
  }, obj) ?? defaultValue
}

function get2(obj, path, defaultValue) {
  const pathArray = path.replace(/\[(\d+)\]/g,'.$1').split('.')
  return pathArray.reduce((acc, key) => {
    if (acc && acc.hasOwnProperty(key)) {
      return acc[key]
    }
  }, obj) ?? defaultValue
}

let obj = {a: [{b: {c: 3}}]};
console.log(get(obj, "a[0].b.c")); // => 3
console.log(get(obj, "a.0.b.c")); // => 3
console.log(get(obj, "a.b.c", "default")); // => "default"

console.log(get2(obj, "a[0].b.c")); // => 3
console.log(get2(obj, "a.0.b.c")); // => 3
console.log(get2(obj, "a.b.c", "default")); // => "default"