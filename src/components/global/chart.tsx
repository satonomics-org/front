import { createResizeObserver } from '@solid-primitives/resize-observer'
import { CrosshairMode, PriceScaleMode, createChart } from 'lightweight-charts'

import { priceToUSLocale } from '/src/scripts'

import { classPropToString } from '..'

interface Props {
  onChartCreated: (chart: LightweightCharts.IChartApi | null) => void
  class?: ClassProp
}

export const Chart = (props: Props) => {
  let chart: LightweightCharts.IChartApi | undefined
  let div: HTMLDivElement | undefined

  const computeChartDimensions = () => ({
    width: div?.clientWidth || 0,
    height: div?.clientHeight || 0,
  })

  onMount(() => {
    if (!div) return

    const dimensions = computeChartDimensions()

    chart = createChart(div, {
      ...dimensions,
      layout: {
        fontFamily: window
          .getComputedStyle(document.body)
          .getPropertyValue('font-family'),
        background: { color: '#00000000' },
        textColor: '#fff',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      leftPriceScale: {
        borderColor: '#fff',
      },
      rightPriceScale: {
        scaleMargins: { bottom: 0.2, top: 0.2 },
        mode: PriceScaleMode.Logarithmic,
        borderColor: '#fff',
      },
      timeScale: {
        borderColor: '#fff',
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        horzLine: {
          color: '#fff',
          labelBackgroundColor: '#fff',
        },
        vertLine: {
          color: '#fff',
          labelBackgroundColor: '#fff',
        },
      },
      localization: {
        priceFormatter: priceToUSLocale,
        locale: 'en-us',
      },
    })

    props.onChartCreated(chart)

    createResizeObserver(
      () => div as HTMLDivElement,
      () => {
        const chartDimensions = computeChartDimensions()

        chart?.resize(chartDimensions.width, chartDimensions.height)
      }
    )
  })

  onCleanup(() => {
    chart?.remove()

    props.onChartCreated(null)
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
