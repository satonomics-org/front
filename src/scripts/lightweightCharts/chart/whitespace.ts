import { dateToString } from '/src/scripts'

export const updateWhitespaceDataset = (
  whitespaceDataset: WhitespaceData[],
) => {
  const date = new Date(
    (whitespaceDataset.at(-1)?.time as string | undefined) || '2009-01-02',
  )

  const todayValueOf = new Date().valueOf()

  const tickDate = () => date.setUTCDate(date.getUTCDate() + 1)

  tickDate()

  while (date.valueOf() <= todayValueOf) {
    whitespaceDataset.push({ time: dateToString(date) })
    tickDate()
  }
}
