import { createLazyMemo } from '@solid-primitives/memo'

import { USABLE_CANDLESTICKS_START_DATE } from '/src/scripts'

export const addRatios = (
  dataset: Dataset,
  closes: Accessor<SingleValueData[]>,
): Dataset & RatiosAddOn => {
  const firstIndexWithData = createLazyMemo(
    () =>
      closes().findIndex(
        (close) => close.time === dataset.values()?.at(0)?.time,
      ) || 0,
  )

  const firstUsableCloseIndex = createLazyMemo(
    () =>
      closes().findIndex(
        (close) => close.time === USABLE_CANDLESTICKS_START_DATE,
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
  dataset: SingleValueData[],
  closes: SingleValueData[],
  offset: number,
) =>
  closes.map(({ time, value: close }, index) => {
    const data = dataset[index + offset]

    if (time !== data.time)
      throw Error(`Unsynced data (${time} vs ${data.time})`)

    return {
      time: data.time,
      value: close / data.value,
    }
  })
