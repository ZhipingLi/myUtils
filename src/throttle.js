export default function throttle(fn, interval, leading = true, trailing = false, resultCallback) {
  let lastTime = 0, timer = null

  const _throttle = function(...args) {
    const nowTime = new Date().getTime()
    if (!lastTime && !leading) lastTime = nowTime
    const remainTime = interval - (nowTime - lastTime)

    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      const result = fn.apply(this, args)
      if (resultCallback) resultCallback(result)
      lastTime = nowTime
      return
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = !leading ? 0 : new Date().getTime()
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
      }, remainTime)
    }
  }

  _throttle.cancel = function() {
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    lastTime = 0
  }
  
  return _throttle
}


export function throttleWithPromise(fn, interval, leading = true, trailing = true) {
  let lastTime = 0, timer = null

  const _throttle = function(...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime
      const remainTime = interval - (nowTime - lastTime)

      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        try {
          const result = fn.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
          try {
            const result = fn.apply(this, args)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function() {
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    lastTime = 0
  }
  
  return _throttle
}
