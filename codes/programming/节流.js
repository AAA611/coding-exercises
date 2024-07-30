// function throttle(fn, wait = 1000) {
//   let flag = true
//   return function (...args) {
//     if (!flag) return
//     flag = false
//     const timer = setTimeout(() => {
//       flag = true
//       clearTimeout(timer)
//       return fn.call(this, ...args)
//     }, wait)
//   }
// }


function throttle(fn, {
  time = 3000,
  leading = false,
  trailing = false
} = {}) {
  let timer = null
  let lastInvokeTime = 0
  return function (...args) {
    const remainTime = time - (Date.now() - lastInvokeTime)
    if ((leading && lastInvokeTime === 0) || remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      fn.call(this, ...args)
      lastInvokeTime = Date.now()
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        fn.call(this, ...args)
        lastInvokeTime = leading ? 0 : Date.now()
      }, remainTime)
    }
  }
}

// function throttle(fn, time, options = { leading: false, trailing: true }) {
//   const { leading, trailing } = options;
//   let lastTime = 0;
//   let timer;   //保存定时器
//   return function (...args) {
//     const nowTime = new Date().getTime();
//     if (lastTime === 0 && leading === false) lastTime = nowTime;
//     const remainTime = time - (nowTime - lastTime);
//     if (remainTime <= 0) {
//       //如果执行函数的时候，时间间隔大于time，就执行一次
//       //如果有定时器的话，我们清除掉定时器，因为我们不希望定时器执行函数
//       if (timer) {
//         clearTimeout(timer);
//         timer = null;
//       }
//       fn.apply(this, args);
//       lastTime = nowTime;
//     } else if (trailing && !timer) {
//       //我们只需要设置一个定时器就足够了
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//         timer = null; //在定时器触发函数的时候，不要忘了重置timer和lastTime
//         //如果不希望下一次执行时第一次触发的话，需要将lastTime设置为0
//         //设置为0的时候，会在前面经过判断，重新设置为nowTime的
//         lastTime = !leading ? 0 : new Date().getTime() + time;
//       }, remainTime);
//     }
//   };
// }

const fn = throttle(() => {
  console.log(1);
})

for (let i = 0; i < 100; i++) {
  fn()
}
