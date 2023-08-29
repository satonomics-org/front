import { createResizeObserver } from '@solid-primitives/resize-observer'
import {
  CrosshairMode,
  PriceScaleMode,
  createChart as _createChart,
} from 'lightweight-charts'

import { getCurrentWhiteColor, priceToUSLocale } from '/src/scripts'

import { classPropToString } from '/src/components'

interface Props {
  onResetChartCreated: (reset: ChartResetter) => void
  class?: ClassProp
}

export const Chart = (props: Props) => {
  const [div, setDiv] = createSignal(undefined as HTMLDivElement | undefined)

  let chart: IChartApi | undefined

  const createChart = () => {
    try {
      chart?.remove()
    } catch {}

    console.log('chart: create')

    const white = getCurrentWhiteColor()

    chart = _createChart('chart', {
      layout: {
        fontFamily: window
          .getComputedStyle(document.body)
          .getPropertyValue('font-family'),
        background: { color: 'transparent' },
        textColor: white,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      leftPriceScale: {
        borderColor: white,
      },
      rightPriceScale: {
        scaleMargins: { bottom: 0.2, top: 0.2 },
        mode: PriceScaleMode.Logarithmic,
        borderColor: white,
      },
      timeScale: {
        borderColor: white,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        horzLine: {
          color: white,
          labelBackgroundColor: white,
        },
        vertLine: {
          color: white,
          labelBackgroundColor: white,
        },
      },
      localization: {
        priceFormatter: priceToUSLocale,
        locale: 'en-us',
      },
    })

    return chart
  }

  onMount(() => props.onResetChartCreated(createChart))

  createResizeObserver(div, (div) => chart?.resize(div.width, div.height))

  onCleanup(() => {
    chart?.remove()

    props.onResetChartCreated(null)
  })

  return (
    <div
      id="chart"
      ref={setDiv}
      class={classPropToString([
        'h-full w-full cursor-crosshair transition-opacity duration-300 ease-out',
        props.class,
      ])}
    />
  )
}
