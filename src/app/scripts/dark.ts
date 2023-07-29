import { createTimer } from '@solid-primitives/timer'

export const createDarkModeTimer = () => {
  const setDarkMode = () => {
    const hours = new Date().getHours()

    hours >= 22 || hours <= 8
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }

  setDarkMode()

  createTimer(setDarkMode, 600_000, setInterval)
}
