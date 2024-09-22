const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];

function convert(list) {
  const result = [];
  const map = {};

  // 先遍历 list，将每个元素放入 map 中，并初始化其 children 数组
  list.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // 再次遍历 list，组装树形结构
  list.forEach(item => {
    const parent = map[item.parentId];
    if (parent) {
      // 如果有父部门，添加到父部门的 children 数组中
      parent.children.push(map[item.id]);
    } else {
      // 否则直接作为顶级部门
      result.push(map[item.id]);
    }
  });

  return result;
}

console.log(convert(list));
