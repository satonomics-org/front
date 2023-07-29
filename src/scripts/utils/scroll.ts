export const scrollIntoView = (
  element?: Element,
  behavior: ScrollBehavior = 'instant'
) =>
  element?.scrollIntoView({
    block: 'nearest',
    behavior,
  })
