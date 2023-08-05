import { colors } from './colors'

export const getCurrentWhiteColor = () =>
  document.body.classList.contains('dark') ? `${colors.white}cd` : colors.white
