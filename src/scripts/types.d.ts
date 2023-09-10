interface CandlestickDataWithVolume extends CandlestickData {
  time: string
  volume: number
}

type GroupedSingleValues = {
  name: string
  dataset: SingleValueData[]
}
