import { SATS_PER_BITCOIN } from '/src/scripts'

export const convertNormalCandleToSatCandle = ({
  date,
  open,
  high,
  low,
  close,
}: DatedCandlestickData) => ({
  date,
  time: date,
  open: SATS_PER_BITCOIN / open,
  high: SATS_PER_BITCOIN / low,
  low: SATS_PER_BITCOIN / high,
  close: SATS_PER_BITCOIN / close,
})

export const convertNormalCandleToGoldPerBitcoinCandle = (
  { date, open, high, low, close }: DatedCandlestickData,
  goldPrice?: number,
) => ({
  date,
  time: date,
  open: open / (goldPrice || 1),
  high: high / (goldPrice || 1),
  low: low / (goldPrice || 1),
  close: close / (goldPrice || 1),
})
