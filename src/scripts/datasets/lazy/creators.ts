import { createLazyMemo } from '@solid-primitives/memo'

export const createLazyDataset = <T>(calc: () => T): Dataset<T> => ({
  values: createLazyMemo(calc),
})

export const createExtremeQuantilesDataset = (
  datasets: Accessor<ExtremeQuantiles[]>,
): ExtremesDataset => ({
  '0.1': createLazyExtremeValues(datasets, 0.1),
  '0.5': createLazyExtremeValues(datasets, 0.5),
  '1': createLazyExtremeValues(datasets, 1),
  '99': createLazyExtremeValues(datasets, 99),
  '99.5': createLazyExtremeValues(datasets, 99.5),
  '99.9': createLazyExtremeValues(datasets, 99.9),
})

const createLazyExtremeValues = (
  datasets: Accessor<ExtremeQuantiles[]>,
  quantileValue: ExtremeQuantileKey,
) =>
  createLazyMemo(() => {
    console.log('lazy extreme: computing...')

    const comparator = quantileValue < 50 ? Math.max : Math.min

    return datasets().some((dataset) => !dataset[quantileValue]()?.length)
      ? []
      : (
          datasets()
            .flatMap((dataset) => [dataset[quantileValue]() || []])
            .reduce(
              (shortest, current) =>
                !shortest || current.length < shortest.length
                  ? current
                  : shortest,
              null as DatedSingleValueData[] | null,
            ) || []
        ).map(({ time, date }, index) => ({
          time,
          date,
          value: comparator(
            ...datasets().map(
              (dataset) => dataset[quantileValue]()?.[index].value || NaN,
            ),
          ),
        }))
  })
