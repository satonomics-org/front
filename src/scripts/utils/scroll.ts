export const scrollIntoView = (element?: Element) =>
  element?.scrollIntoView({
    block: 'nearest',
    behavior: 'instant',
  })
