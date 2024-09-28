/**
 * run generator function
 */
function run(genFn) {
  return new Promise((resolve, reject) => {
    const gen = genFn();
    function step(nextFn) {
        try {
            const next = nextFn();
            if (next.done) {
                resolve(next.value);
            } else {
                Promise.resolve(next.value).then(
                    (v) => step(() => gen.next(v)),
                    (e) => step(() => gen.throw(e))
                );
            }
        } catch (error) {
            reject(error);
        }
    }
    step(() => gen.next());
});
}

function* fn() {
  const val1 = yield new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 3000)
  })
  console.log('val1', val1)
  yield 2
  yield 3
  yield 4
  yield 5
  yield 6
}

run(fn)