type DatasetWithRatio = Dataset<SingleValueData> & RatiosAddOn

type RatiosAddOn = {
  ratios: {
    values: Accessor<SingleValueData[]>
    offset: Accessor<number>
  }
}
