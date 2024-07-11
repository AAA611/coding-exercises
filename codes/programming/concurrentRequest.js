const fetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        resolve(url)
      } else {
        reject(url)
      }
    }, 1000)
  })
}

const urls = Array(1).fill().map((_, index) => `http://${index}`)
const concurrentRequest = (urls, maxRequest = 2, maxRetry = 2) => {
  if (urls.length <= maxRequest) {
    return Promise.all(urls.map(url => fetch(url)))
  }

  return new Promise((resolve, reject) => {
    const results = []
    let isFetchingCount = 0
    let finishedCount = 0
    let index = 0
    const retryMap = {}
    const run = () => {
      while (isFetchingCount < maxRequest && index < urls.length) {
        dispatchFetch(urls[index], index)
        index++
      }
    }

    const dispatchFetch = (url, index, isRetry = false) => {
      if (isRetry) {
        if ((retryMap[url] || 0) < maxRetry) {
          retryMap[url] = retryMap[url] + 1 || 1
        } else {
          return
        }
      }


      isFetchingCount++
      fetch(url).then(data => {
        results[index] = data
      }).catch(err => {
        results[index] = err
        dispatchFetch(url, index, true)
      }).finally(() => {
        isFetchingCount--
        finishedCount++
        if (finishedCount === url.length) {
          resolve(results)
        } else {
          run()
        }
      })
    }

    run()
  })
}

concurrentRequest(urls, 1)
