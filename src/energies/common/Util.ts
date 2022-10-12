export const groupBy = <K, V>(array: V[], grouper: (item: V) => K) => {
  return array.reduce((store, item) => {
    var key = grouper(item)
    if (store.has(key)) {
      // @ts-ignore
      store.get(key).push(item)
    } else {
      store.set(key, [item])
    }
    return store
  }, new Map<K, V[]>())
}

export const transformMap = <K, V, R>(source: Map<K, V>, transformer: (value: V, key: K) => R) => {
  return new Map(Array.from(source, v => [v[0], transformer(v[1], v[0])]))
}