const selectNone = 'select-none'

export const activateSelectNone = () => document.body.classList.add(selectNone)

export const deactivateSelectNone = () =>
  document.body.classList.remove(selectNone)

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
