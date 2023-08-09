import {
  assignedColors,
  colors,
  createLineSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      bottom: 0,
      top: 0.75,
    },
  })

  const all = createLineSeries({
    chart,
    color: colors.white,
    options: {
      priceScaleId: 'left',
    },
    title: 'All',
  })

  const sth = createLineSeries({
    chart,
    color: assignedColors.sth,
    options: {
      priceScaleId: 'left',
    },
    title: 'STH',
  })

  const lth = createLineSeries({
    chart,
    color: assignedColors.lth,
    options: {
      priceScaleId: 'left',
    },
    title: 'LTH',
  })

  const { supplyInProfit, sthInProfit, lthInProfit } = datasets

  supplyInProfit.fetch()
  sthInProfit.fetch()
  lthInProfit.fetch()

  createEffect(() => {
    all.setData(supplyInProfit.values() || [])
    lth.setData(lthInProfit.values() || [])
    sth.setData(sthInProfit.values() || [])
  })
}
