import { dateToString } from '/src/scripts'

export const krakenAPI = {
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
