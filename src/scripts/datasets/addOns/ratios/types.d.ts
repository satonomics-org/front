type DatasetWithRatio = Dataset<DatedSingleValueData> & RatiosAddOn

type RatiosAddOn = {
  ratios: {
    values: Accessor<DatedSingleValueData[]>
    offset: Accessor<number>
  }
}
