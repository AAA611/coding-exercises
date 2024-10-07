class Scheduler {
  constructor() {
    this.queue = []
    this.running = 0
  }

  async add(promiseFunc) {
    return new Promise((resolve) => {
      this.queue.push({
        func: promiseFunc,
        resolve
      })
      this.run()
    })
  }

  run() {
    if (this.queue.length && this.running < 2) {
      const { func, resolve } = this.queue.shift()
      this.running++
      func().then(() => {
        this.running--
        resolve()
        this.run()
      })
    }
  }
}
const scheduler = new Scheduler()
const timeout = (time) => {
  return new Promise(r => setTimeout(r, time))
}
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}
addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)
// log: 2 3 1 4