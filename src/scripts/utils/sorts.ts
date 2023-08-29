export const sortWhitespaceDataArray = <T extends WhitespaceData>(array: T[]) =>
  array.sort(
    (a, b) =>
      new Date(String(a.time)).getTime() - new Date(String(b.time)).getTime(),
  )
