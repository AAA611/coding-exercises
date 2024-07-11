function listToTree(list) {
  const idToSelfMap = Object.create(null)
  list.forEach(item => idToSelfMap[item.id] = item)

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const parent = idToSelfMap[item.parentId]
    if (parent) {
      if (Array.isArray(parent.children)) {
        parent.children.push(item)
      } else {
        parent.children = [item]
      }
      list.splice(i, 1)
      i--
    }
  }

  return list
}

const list = [
  {
    id: 1001,
    parentId: 0,
    name: 'AA'
  }, {
    id: 1002,
    parentId: 1001,
    name: 'BB'
  }, {
    id: 1003,
    parentId: 1001,
    name: 'CC'
  }, {
    id: 1004,
    parentId: 1003,
    name: 'DD'
  }, {
    id: 1004,
    parentId: 1003,
    name: 'EE'
  }, {
    id: 1005,
    parentId: 1003,
    name: 'FF'
  }, {
    id: 1006,
    parentId: 1002,
    name: 'GG'
  }
]

console.log(listToTree(list))