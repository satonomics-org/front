interface ResourcesWS {
  latestCandle: ResourceWS<FullCandlestick>
}

interface ResourceWS<T> {
  live: Accessor<boolean>
  latest: Accessor<T | null>
  open: VoidFunction
  close: VoidFunction
}
