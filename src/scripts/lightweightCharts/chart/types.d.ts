interface PriceSeriesOptions {
  halved?: boolean
  lowerOpacity?: boolean
  inverseColors?: boolean
  seriesOptions?: DeepPartial<SeriesOptionsCommon>
  priceScaleOptions?: DeepPartial<PriceScaleOptions>
  priceMode?: 'normal' | 'sats' | 'gold'
}
