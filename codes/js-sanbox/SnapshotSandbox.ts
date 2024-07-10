function iter(obj: typeof window | Record<any, any>, callbackFn: (prop: any) => void) {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const prop in obj) {
    // patch for clearInterval for compatible reason, see #1490
    if (obj.hasOwnProperty(prop) || prop === 'clearInterval') {
      callbackFn(prop);
    }
  }
}

export default class SnapshotSandbox {
  proxy: WindowProxy
  name: string
  type: any
  sandboxRunning = true

  private windowSnapshot!: Window
  private modifyPropsMap: Record<any, any> = {}
  private deletePropsSet: Set<any> = new Set()
  constructor(name: string) {
    this.name = name
    this.proxy = window
    this.type = 'SnapshotSandbox'
  }

  /**
   * 激活沙箱
   */
  active() {
    // 记录当前的快照
    this.windowSnapshot = {} as Window
    // 遍历 window 对象赋值属性
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop]
    })

    this.sandboxRunning = true
  }

  /**
   * 失活沙箱
   */
  inactive() {
    this.modifyPropsMap = {}
    this.deletePropsSet.clear()

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 说明在运行脚本的过程中改变了 window 上面的属性
        // 将改变的属性记录下来,后面再执行这个脚本的时候恢复它之前修的属性
        this.modifyPropsMap[prop] = window[prop]
        // 根据快照恢复 window 原来的属性
        window[prop] = this.windowSnapshot[prop]
      }
    })

    iter(this.windowSnapshot, prop => {
      if (!window.hasOwnProperty(prop)) {
        // 脚本运行时删除了某个属性也要记录下来
        this.deletePropsSet.add(prop)
        window[prop] = this.windowSnapshot[prop]
      }
    })

    this.sandboxRunning = false
  }
}