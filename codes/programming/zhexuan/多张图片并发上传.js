const urls = Array(60).fill().map((_, index) => `http://${index}.jpg`)

const uploadImage = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve()
      } else {
        reject()
      }
    }, Math.random() * 1000 + 2000)
  })
}
const uploadImages = (urls, limit) => {
  if (urls.length < limit) {
    return Promise.all(url.map(uploadImage))
  }

  return new Promise((resolve) => {
    let finishedCount = 0
    let isUploadingCount = 0
    let i = 0
    const fn = () => {
      while (isUploadingCount < limit && i < urls.length) {
        const url = urls[i]
        uploadImage(url)
          .then(() => {
            console.log(`${url}✅`)
          }).catch(() => {
            console.log(`${url}❌`);
          }).finally(() => {
            isUploadingCount--
            finishedCount++
            if (finishedCount === url.length) {
              resolve('finished')
            }
            fn()
          })
        isUploadingCount++
        i++
      }
    }

    fn()
  })
}

uploadImages(urls, 30)