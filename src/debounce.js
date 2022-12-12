export default function debounce(fn, delay, immediate = true, resultCallback) {
  let timer = null, isInvoked = false

  const _debounce = function(...args) {
    if (timer) clearTimeout(timer)

    if (immediate && !isInvoked) {
      const result = fn.apply(this, args)
      if (resultCallback) resultCallback(result)
      isInvoked = true
    } else {
      timer = setTimeout(() => {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        isInvoked = false
      }, delay)
    }
  }

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    isInvoked = false
  }

  return _debounce
}

export function debounceWithPromise(fn, delay, immediate = true) {
  let timer = null, isInvoked = false

  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)

      if (immediate && !isInvoked) {
        try {
          const result = fn.apply(this, args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        isInvoked = true
      } else {
        timer = setTimeout(() => {
          try {
            const result = fn.apply(this, args)
            resolve(result)
          } catch (error) {
            reject(error)
          }
          isInvoked = false
        }, delay)
      }
    })
  }

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    isInvoked = false
  }

  return _debounce
}