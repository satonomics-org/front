import { createLazyMemo } from '@solid-primitives/memo'

import { USABLE_CANDLESTICKS_START_DATE } from '/src/scripts'

export const addRatios = (
  dataset: Dataset,
  closes: Accessor<DatedSingleValueData[] | null>,
): Dataset & RatiosAddOn => {
  const firstIndexWithData = createLazyMemo(
    () =>
      closes()?.findIndex(
        (close) => close.date === dataset.values()?.at(0)?.date,
      ) || 0,
  )

  const firstUsableCloseIndex = createLazyMemo(
    () =>
      closes()?.findIndex(
        (close) => close.date === USABLE_CANDLESTICKS_START_DATE,
      ) || 0,
  )

  const firstCloseIndex = createLazyMemo(() =>
    Math.max(firstIndexWithData(), firstUsableCloseIndex()),
  )

  const usableCandlesticks = createLazyMemo(() =>
    (closes() || []).slice(
      firstCloseIndex(),
      (dataset.values()?.length ?? 0) + firstIndexWithData(),
    ),
  )

  const offset = createLazyMemo(() => firstCloseIndex() - firstIndexWithData())

  return {
    ...dataset,
    ratios: {
      offset,
      values: createLazyMemo(() =>
        computeRatios(dataset.values() || [], usableCandlesticks(), offset()),
      ),
    },
  }
}

const computeRatios = (
  dataset: DatedSingleValueData[],
  closes: DatedSingleValueData[],
  offset: number,
) => {
  if (!dataset.length || !closes.length) return []

  return closes.map(({ time, date, value: close }, index) => {
    const data = dataset[index + offset]

    if (date !== data.date)
      throw Error(`Unsynced data (${date} vs ${data.date})`)

    return {
      time,
      date,
      value: close / data.value,
    }
  })
}
