function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload=(res)=>{
      resolve(res)
    }

    img.onerror=(err)=>{
      reject(err)
    }

    img.src=url
  })
}