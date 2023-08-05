import {
  colors,
  createHistogramSeries,
  resetLeftPriceScale,
} from '/src/scripts'

export const applyPreset: ApplyPreset = ({ chart, datasets }) => {
  resetLeftPriceScale(chart, {
    visible: true,
    scaleMargins: {
      top: 0.2,
      bottom: 0,
    },
  })

  const series = createHistogramSeries({
    chart,
  })

  const { vddMultiple } = datasets

  vddMultiple.fetch()

  createEffect(() => {
    series.setData(
      (vddMultiple.values() || []).map((data) => {
        const color = `${
          data.value >= 3
            ? colors.red
            : data.value >= 1
            ? colors.orange
            : colors.green
        }88`

        return {
          ...data,
          value: data.value * 100,
          color: color,
        }
      })
    )
  })
}
