import { createTimer } from '@solid-primitives/timer'

import { TEN_MINUTES_IN_MS } from '/src/scripts'

export const createDarkModeTimer = () => {
  const setDarkMode = () => {
    const hours = new Date().getHours()

    hours >= 22 || hours <= 8
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }

  setDarkMode()

  createTimer(setDarkMode, TEN_MINUTES_IN_MS, setInterval)
}
