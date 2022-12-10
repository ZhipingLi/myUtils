function isObject(value) {
  const type = typeof value
  return (value !== null) && (type === "function" || type === "object")
}

export default function deepClone(originValue, map = new WeakMap()) {
  // 基本数据类型
  if(!isObject(originValue)) return originValue
  // 函数类型
  if(typeof originValue === "function") return originValue
  // Symbol作为值
  if(typeof originValue === "symbol") return Symbol(originValue.description)
  // Set类型
  if(originValue instanceof Set) return new Set([...originValue])
  // Map类型
  if(originValue instanceof Map) return new Map([...originValue])
  // Date类型
  if(originValue instanceof Date) return new Date(originValue.getTime())
  // 解决循环引用
  if(map.has(originValue)) return map.get(originValue)
  const newValue = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newValue)
  // 递归拷贝属性
  for(const key in originValue) {
    newValue[key] = deepClone(originValue[key], map)
  }
  // Symbol作为键
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for(const sKey of symbolKeys){
    const newSKey = Symbol(sKey.description)
    newValue[newSKey] = deepClone(originValue[sKey], map)
  }
  return newValue
}