export default class EventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName]
    if(!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName]
    if(!handlers) return
    this.eventBus[eventName] = handlers.filter(handler => {
      if(handler.eventCallback === eventCallback) return false
      return true
    })
  }

  emit(eventName, ...payLoad) {
    const handlers = this.eventBus[eventName]
    if(!handlers) return
    handlers.forEach(({eventCallback, thisArg}) => {
      eventCallback.apply(thisArg, payLoad)
    });
  }
}