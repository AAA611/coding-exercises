class EventEmitter {
  constructor() {
    this.eventsMap = {}
  }

  emit(name, ...args) {
    if (this.eventsMap[name]) {
      this.eventsMap[name].forEach(cb => cb.call(this, ...args))
    }
  }

  on(name, cb) {
    if (this.eventsMap[name]) {
      this.eventsMap.push(cb)
    } else {
      this.eventsMap[name] = [cb]
    }
  }

  once(name, cb) {
    const that = this
    const onceCb = function (...args) {
      cb.call(this, ...args)
      that.off(name, onceCb)
    }
    this.on(name, onceCb)
  }

  off(name, cb) {
    if (this.eventsMap[name]) {
      const index = this.eventsMap[name].indexOf(cb)
      if (index > -1) {
        this.eventsMap[name].splice(index, 1)
      }
    }
  }
}

const emitter = new EventEmitter()

emitter.once('click',()=>{
  console.log('click');
})

emitter.emit('click')
emitter.emit('click')
emitter.emit('click')