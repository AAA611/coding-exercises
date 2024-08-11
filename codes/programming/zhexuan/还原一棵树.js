// https://eizwbs2n02l.feishu.cn/docx/W21Dd5SZ9ozqkbxNdtoctWVKnih

function buildTree(list) {
  const idToNodeMap = {}
  for (const node of list) {
    idToNodeMap[node.id] = node
  }

  for (const node of list) {
    const pNode = pidToNodeMap[node.pid]
    if (pNode) {
      if (pNode.children) {
        pNode.children.push(node)
      } else {
        pNode.children = [node]
      }
    }
  }
}