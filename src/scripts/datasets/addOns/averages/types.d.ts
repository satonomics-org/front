type DatasetWithAverages<
  Value extends DatedWhitespaceData = DatedSingleValueData,
> = Dataset<Value> & AveragesAddOn

type AveragesAddOn = {
  averages: Averages<DatedSingleValueData>
}

type Averages<
  Value = DatedSingleValueData,
  Values = Accessor<Value[]>,
> = Record<MovingAverageKey, Values>

type AveragesSignals = Record<MovingAverageKey, Signal<DatedSingleValueData[]>>

type MovingAverageKey = 'weekly' | 'monthly' | 'yearly'
