export const groupBy = <I, K, V>(array: I[], grouper: (item: I) => K, getter: (item: I) => V) => {
  return array.reduce((store, item) => {
    var key = grouper(item)
    var value = getter(item)
    if (store.has(key)) {
      // @ts-ignore
      store.get(key).push(value)
    } else {
      store.set(key, [value])
    }
    return store
  }, new Map<K, V[]>())
}

export const transformMap = <K, V, R>(source: Map<K, V>, transformer: (value: V, key: K) => R) => {
  return new Map(Array.from(source, v => [v[0], transformer(v[1], v[0])]))
}