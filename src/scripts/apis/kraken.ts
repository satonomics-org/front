import { createBaseAPI, dateToString } from '/src/scripts'

type KrakenCandlestickData = [
  time: number,
  open: string,
  high: string,
  low: string,
  close: string,
  vwap: string,
  volume: string,
  count: number
]

const api = createBaseAPI({
  baseUrl: 'https://api.kraken.com/0/public',
})

export const krakenAPI = {
  async fetchCandlesticks() {
    const candlesticks = await import('/src/assets/data/btcusd.json').then(
      (i) => i.default as CandlestickDataWithVolume[]
    )

    let last

    while ((last = candlesticks.at(-1))?.time !== dateToString(new Date())) {
      if (!last) break

      const since = new Date(last.time).valueOf() / 1000

      candlesticks.push(
        ...(
          (
            await api.fetchJSON(
              `/OHLC?pair=XBTUSD&interval=1440&since=${since}`
            )
          ).result.XXBTZUSD as KrakenCandlestickData[]
        ).map(
          ([
            time,
            open,
            high,
            low,
            close,
            _,
            volume,
          ]): CandlestickDataWithVolume => ({
            time: dateToString(new Date(time * 1000)),
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
            volume: Number(volume),
          })
        )
      )
    }

    return candlesticks
  },
  createLiveCandleWebsocket: function (
    callback: (candle: CandlestickDataWithVolume) => void
  ) {
    const ws = new WebSocket('wss://ws.kraken.com')

    ws.addEventListener('open', () => {
      ws.send(
        JSON.stringify({
          event: 'subscribe',
          pair: ['XBT/USD'],
          subscription: {
            name: 'ohlc',
            interval: 1440,
          },
        })
      )
    })

    ws.addEventListener('message', (message) => {
      const result = JSON.parse(message.data)

      if (!Array.isArray(result)) return

      const [time, _, open, high, low, close, __, volume] = result[1]

      const candle: CandlestickDataWithVolume = {
        time: dateToString(new Date(Number(time) * 1000)),
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
        volume: Number(volume),
      }

      candle && callback({ ...candle })
    })

    return ws
  },
}
