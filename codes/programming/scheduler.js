
//JS实现一个带并发限制的异步调度器Scheduler,
//保证同时运行的任务最多有两个。
//完善代码中Scheduler类,使得以下程序能正确输出：
//Scheduler内部可以写其他的方法
class Scheduler {
  constructor() {
    this.tasks = []; // 任务队列
    this.executing = 0; // 当前正在执行的任务数
  }

  async add(promiseCreator) {
    return new Promise((resolve) => {
      this.tasks.push(() => promiseCreator().then(resolve))
      this.start()
    })
  }

  start() {
    while (this.tasks.length && this.executing < 2) {
      const task = this.tasks.shift()
      this.executing++
      task().then(() => {
        this.executing--
        this.start()
      })
    }
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4


