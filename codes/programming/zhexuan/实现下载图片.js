
/**
 * 📘方法一：使用 canvas drawImage
 * @param {*} src 
 * @param {*} imageName 
 */
function downloadImage(src, imageName) {
  const image = new Image()
  image.src = src
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = () => {
    const c = document.createElement('canvas')
    c.width = image.width
    c.height = image.height
    c.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
    const a = document.createElement('a')
    a.download = imageName
    a.href = c.toDataURL('image/png')
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
  }
}

/**
 * 📘方法二：使用 response.blob()
 * @param {*} src 
 */
function downloadImage2(src) {
  fetch(src)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url); // 释放URL对象
      document.body.removeChild(link);
    });
}
