interface ResourcesWS {
  latestCandle: ResourceWS<CandlestickDataWithVolume>
}

interface ResourceWS<T> {
  live: Accessor<boolean>
  latest: Accessor<T | null>
  open: VoidFunction
  close: VoidFunction
}
