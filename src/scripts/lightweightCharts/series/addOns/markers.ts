import {
  colors,
  computeNumberOfDaysBetweenTwoDates,
  GENESIS_DAY,
  priceToUSLocale,
  sortWhitespaceDataArray,
} from '/src/scripts'

export const setMinMaxMarkers = (
  chart: IChartApi,
  series: ISeriesApi<'Line' | 'Candlestick'>,
  candlesticks: DatedCandlestickData[],
  range: LogicalRange | null,
) => {
  const isLeftPriceScaleVisible = chart.priceScale('left').options().visible

  const offset = computeNumberOfDaysBetweenTwoDates(
    new Date(candlesticks.at(0)?.date || 0),
    new Date(GENESIS_DAY),
  )

  const slicedDataList = range
    ? candlesticks.slice(
        Math.ceil(range.from - offset < 0 ? 0 : range.from - offset),
        Math.floor(range.to - offset) + 1,
      )
    : []

  if (slicedDataList.length) {
    const markers: (SeriesMarker<Time> & Dated)[] = []

    const seriesIsCandlestick = series.seriesType() === 'Candlestick'

    ;[
      {
        mathFunction: 'min' as const,
        placementAttribute: seriesIsCandlestick
          ? ('low' as const)
          : ('close' as const),
        valueAttribute: 'low' as const,
        markerOptions: {
          position: 'belowBar' as const,
          shape: 'arrowUp' as const,
        },
      },
      {
        mathFunction: 'max' as const,
        placementAttribute: seriesIsCandlestick
          ? ('high' as const)
          : ('close' as const),
        valueAttribute: 'high' as const,
        markerOptions: {
          position: 'aboveBar' as const,
          shape: 'arrowDown' as const,
        },
      },
    ].map(
      ({ mathFunction, placementAttribute, valueAttribute, markerOptions }) => {
        const value = Math[mathFunction](
          ...slicedDataList.map((data) => data[valueAttribute] || 0),
        )

        const placement = Math[mathFunction](
          ...slicedDataList.map((data) => data[placementAttribute] || 0),
        )

        const candle = slicedDataList.find(
          (data) => data[placementAttribute] === placement,
        )

        return (
          candle &&
          markers.push({
            ...markerOptions,
            date: candle.date,
            time: candle.time,
            color: isLeftPriceScaleVisible ? colors.offWhite() : colors.white(),
            size: 0,
            text: priceToUSLocale(value),
          })
        )
      },
    )

    series.setMarkers(sortWhitespaceDataArray(markers))
  }
}
