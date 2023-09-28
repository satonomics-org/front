interface Dataset<T = DatedSingleValueData[]> {
  values: Accessor<T | null>
}

type Datasets = ReturnType<typeof import('./index').createDatasets>

type ExtremesDataset = Record<
  ExtremeQuantileKey,
  Accessor<DatedSingleValueData[] | null>
>

type GroupedDatasetsByEntityName = GroupedByEntity<
  Dataset<DatedSingleValueData[]>
>

type GroupedByEntity<T> = Record<EntityName, T>

type EntityName =
  | 'humpbacks'
  | 'whales'
  | 'sharks'
  | 'fish'
  | 'crabs'
  | 'shrimps'
  | 'plankton'
