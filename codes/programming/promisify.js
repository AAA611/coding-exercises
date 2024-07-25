function promisify(func) {
  // your code here
  return function(...args){
    return Promise((resolve,reject)=>{
      try{
         const cb=(err,data)=>{
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
         }
         func(...args,cb)
      }catch(err){
        reject(err)
      }
    })
  }
}