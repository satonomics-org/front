import { dateToString } from '/src/scripts'

export const updateWhitespaceDataset = (
  whitespaceDataset: DatedWhitespaceData[],
) => {
  const date = new Date(
    (whitespaceDataset.at(-1)?.date as string | undefined) || '2009-01-02',
  )

  const todayValueOf = new Date().valueOf()

  const tickDate = () => date.setUTCDate(date.getUTCDate() + 1)

  tickDate()

  while (date.valueOf() <= todayValueOf) {
    const dateStr = dateToString(date)

    whitespaceDataset.push({
      date: dateStr,
      time: dateStr,
    })

    tickDate()
  }
}
