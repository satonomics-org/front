import { createResizeObserver } from '@solid-primitives/resize-observer'
import { CrosshairMode, PriceScaleMode, createChart } from 'lightweight-charts'

import { getCurrentWhiteColor, priceToUSLocale } from '/src/scripts'

import { classPropToString } from '..'

interface Props {
  onResetChartCreated: (reset: ChartResetter) => void
  class?: ClassProp
}

export const Chart = (props: Props) => {
  let chart: LightweightCharts.IChartApi | undefined
  let div: HTMLDivElement | undefined

  const computeChartDimensions = () => ({
    width: div?.clientWidth || 0,
    height: div?.clientHeight || 0,
  })

  const buildChart = () => {
    if (!div) return null

    try {
      chart?.remove()
    } catch {}

    console.log('chart: create')

    const dimensions = computeChartDimensions()

    const white = getCurrentWhiteColor()

    chart = createChart(div, {
      ...dimensions,
      layout: {
        fontFamily: window
          .getComputedStyle(document.body)
          .getPropertyValue('font-family'),
        background: { color: '#00000000' },
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

  onMount(() => props.onResetChartCreated(buildChart))

  createResizeObserver(
    () => div as HTMLDivElement,
    () => {
      const chartDimensions = computeChartDimensions()

      chart?.resize(chartDimensions.width, chartDimensions.height)
    },
  )

  onCleanup(() => {
    chart?.remove()

    props.onResetChartCreated(null)
  })

  return (
    <div
      ref={div}
      class={classPropToString([
        'h-full w-full cursor-crosshair transition-opacity duration-300 ease-out',
        props.class,
      ])}
    />
  )
}
