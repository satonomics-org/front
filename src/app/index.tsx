import { Title } from '@solidjs/meta'
import { LineStyle } from 'lightweight-charts'

import {
  colors,
  getCandleToColor,
  krakenAPI,
  priceToUSLocale,
  run,
} from '/src/scripts'

import { createAutoscaleInfoProvider, setMinMaxMarkers } from './scripts'

import { Chart } from '/src/components'

import { Menu } from './components/Menu'

export const App = () => {
  const [state, setState] = createStore({
    chart: null as LightweightCharts.IChartApi | null,
    candlesticks: {
      list: [],
      last: null,
    } as CandlesticksProp,
    indicators: {},
  })

  let ws: WebSocket | null = null

  let cleanup: (() => void) | undefined

  createEffect(
    on(
      () => state.chart,
      async (chart) => {
        if (!chart) {
          ws?.close()
          return
        }

        setState('candlesticks', 'list', await krakenAPI.fetchCandlesticks())

        const candlesticks = state.candlesticks.list

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: colors.green,
          downColor: colors.red,
          wickUpColor: colors.green,
          wickDownColor: colors.red,
          borderVisible: false,
          priceLineVisible: false,
          lastValueVisible: false,
          autoscaleInfoProvider: createAutoscaleInfoProvider(true),
        })

        const priceLineOptions: LightweightCharts.PriceLineOptions = {
          price: 0,
          color: 'transparent',
          lineVisible: true,
          lineWidth: 1,
          lineStyle: LineStyle.SparseDotted,
          axisLabelVisible: true,
          title: '',
          axisLabelColor: '',
          axisLabelTextColor: '',
        }

        const priceLine = candlestickSeries.createPriceLine(priceLineOptions)

        const updatePriceLine = (candle: CandlestickDataWithVolume) =>
          priceLine.applyOptions({
            price: candle.close,
            color: getCandleToColor(candle),
          })

        const lastCandle = candlesticks.at(-1)

        if (!lastCandle) return

        setState('candlesticks', 'last', lastCandle)

        updatePriceLine(lastCandle)

        candlestickSeries.setData(
          candlesticks.map((data) => ({
            ...data,
          }))
        )

        setMinMaxMarkers(chart, candlestickSeries, candlesticks)

        const initWebSocket = () => {
          ws = krakenAPI.createLiveCandleWebsocket((candle) => {
            if (!state.candlesticks.last) return

            setState('candlesticks', 'last', { ...candle })

            try {
              candlestickSeries.update({ ...candle })
            } catch (error) {}

            updatePriceLine({ ...candle })

            if (candlesticks.at(-1)?.time !== candle.time) {
              candlesticks.push(candle)
            }
          })

          ws.addEventListener('open', () => console.log('ws: open'))
          ws.addEventListener('close', () => console.log('ws: close'))
        }

        initWebSocket()

        const reinitWebSocket = () => {
          if (!ws || ws.readyState === ws.CLOSED) {
            console.log('ws: focus reopen')
            initWebSocket()
          }
        }

        document.addEventListener('focus', reinitWebSocket)

        cleanup = () => {
          document.removeEventListener('focus', reinitWebSocket)
          ws?.close()
        }
      }
    )
  )

  onCleanup(() => cleanup?.())

  return (
    <>
      <Title>
        {run(() => {
          const { last } = state.candlesticks
          return `${last ? `${priceToUSLocale(last.close)} | ` : ''}sholong`
        })}
      </Title>
      <div class="mr-[1px] h-screen border border-white">
        <div class="flex h-full w-full">
          <Menu chart={state.chart} candlesticks={state.candlesticks} />
          <div class="h-full w-full flex-1 overflow-x-hidden">
            <Chart
              onChartCreated={(chart) => {
                !chart && ws?.close()
                setState('chart', chart)
              }}
              class={[state.candlesticks.last ? 'opacity-100' : 'opacity-0']}
            />
          </div>
        </div>
      </div>
    </>
  )
}
