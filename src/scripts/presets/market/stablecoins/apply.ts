import { createTimer } from '@solid-primitives/timer'
import { PriceScaleMode } from 'lightweight-charts'

import {
  chartState,
  colors,
  createChart,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  // resetLeftPriceScale(chart, {
  //   visible: true,
  //   halved: true,
  // })
  // createEffect(
  //   (alreadyFetched) => {
  //     const nowFetched = datasets.stablecoinsMarketCaps.values()?.length
  //     if (!alreadyFetched && nowFetched) {
  //       createTimer(() => chartState.reset?.(), 50, setTimeout)
  //     }
  //   },
  //   !!datasets.stablecoinsMarketCaps.values()?.length,
  // )
  // datasets.stablecoinsMarketCaps.values()?.forEach(({ name, dataset }) => {
  //   const series = createLineSeries(chart, {
  //     title: name,
  //     priceScaleId: 'left',
  //     color:
  //       typeof (colors as any)[name] === 'string'
  //         ? ((colors as any)[name] as string)
  //         : colors.green[500],
  //   })
  //   series.setData(dataset)
  // })
  // const series = createLineSeries(chart, {
  //   title: 'Combined',
  //   priceScaleId: 'left',
  //   color: colors.white(),
  // })
  // createEffect(() =>
  //   series.setData(datasets.combinedStablecoinsMarketCaps.values() || []),
  // )
  // return {
  //   halved: true,
  // }
}
