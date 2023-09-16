type DatasetWithAverages<
  T extends DatedWhitespaceData[] = DatedSingleValueData[],
> = Dataset<T> & AveragesAddOn

type AveragesAddOn = {
  averages: Averages<DatedSingleValueData>
}

type Averages<T = DatedSingleValueData> = Record<
  MovingAverageKey,
  Accessor<T[]>
>

type AveragesSignals = Record<MovingAverageKey, Signal<DatedSingleValueData[]>>

type MovingAverageKey = 'weekly' | 'monthly' | 'yearly'
