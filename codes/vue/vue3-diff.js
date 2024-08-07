function patchKeyedChildren(n1, n2, container) {
  const newChildren = []
  const oldChildren = []

  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]

  while (oldVNode.key === newVNode.key) {
    // patch
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }

  let oldEnd = oldChildren.length - 1
  let newEnd = newChildren.length - 1

  oldVNode = oldChildren[oldEnd]
  newVNode = newChildren[newEnd]
  while (oldVNode.key === newVNode.key) {
    // patch
    oldEnd--
    newEnd--
    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]
  }

  if (j > oldEnd && j <= newEnd) {
    // j > oldEnd 说明老的节点遍历完了
    // j <= newEnd 说明新的节点还没有遍历完
    // 说明新的节点比旧的多，所以要处理新增节点

    const anchor = newEnd + 1 // 锚点元素，是新增元素的下一个元素，新增的元素使用 insertBefore 插入到这个锚点元素的前面

    while (j <= newEnd) {
      // patch 添加新元素
      j++
    }
  } else if (j > newEnd && j <= oldEnd) {
    // j > newEnd 说明新的元素遍历完了
    // j <= oldEnd 说明老的元素没有遍历完
    // 所以老的节点比新的多，需要卸载一些多余的老节点

    while (j <= oldEnd) {
      // unmount 卸载多余的老的节点
      j++
    }
  } else {
    // 处理非理想情况

    // 是否有节点需要移动
    let moved = false

    // 未处理的新节点的数量
    const count = newEnd - j + 1
    const sources = Array(count).fill(-1) // -1 表示节点未处理
    const oldStart = j
    const newStart = j

    const keyIndex = {}
    for (let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i
    }

    let pos = 0
    let patched = 0
    for (let i = oldStart; i <= oldEnd; i++) {
      if (patched <= count) {
        const oldVNode = oldChildren[i]
        const indexInNew = keyIndex[oldVNode.key]
        if (typeof indexInNew !== 'undefined') {
          // 旧节点在新节点中可以找到
          const newVNode = newChildren[indexInNew]
          // patch 操作，(patch 操作会使用到上面定义的 newVNode)
          patched++

          // source 里面存的是新节点对应的旧节点的索引
          sources[indexInNew - newStart] = i

          if (indexInNew < pos) {
            moved = true
          } else {
            pos = indexInNew
          }
        } else {
          // 旧节点在新节点中找不到了
          // unmount 操作
        }
      } else {
        // 新的节点都已经被处理了，剩下的旧节点都是多余的，直接卸载了
        // unmount 操作
      }
    }

    if (moved) {
      const seq = getSequence(sources)

      // 从下到上处理新节点
      let i = count - 1
      for (i; i >= 0; i--) {
        if (sources[i] === -1) {
          // 说明索引为 i 的节点是全新的节点，应该将其挂载

          const pos = i + newStart // 该节点在 newChildren 中的真实索引
          const newVNode = newChildren[pos]
          const nextPos = pos + 1 // 要挂载的节点的下一个节点的索引
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null

          // 挂载操作 patch
        } else if (i !== seq[s]) {
          // 说明节点需要移动

          const pos = i + newStart
          const newVNode = newChildren[pos]
          const nextPos = pos + 1
          const anchor = nextPos < newChildren.length ? newChildren[nextPos] : null

          // 移动操作 insert
        } else {
          // 节点不需要动
          s--
        }
      }
    }
  }
}

/**
 * 求最长递增子序列
 * @param {*} arr 
 * @returns 
 */
function getSequence(arr) {
  let res = []
  const dp = Array(arr.length).fill().map((_, index) => [index])
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] > arr[j]) {
        if (dp[i].length < dp[j].length + 1) {
          dp[i] = [...dp[j], i]
        }
      }
    }
    if (dp[i].length > res.length) {
      res = dp[i]
    }
  }
  return res
}

console.log(getSequence([2, 31, 4, 5, 6]));
