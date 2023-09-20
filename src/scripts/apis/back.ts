import { CHANGE_URL_AT_TRY, DEFAULT_NUMBER_OF_TRIES } from './base'

const useProdURL =
  import.meta.env.VITE_TEST_PROD || location.protocol === 'https:'

export function computeBackEndURL(
  path: string,
  tries = DEFAULT_NUMBER_OF_TRIES,
) {
  return `${
    useProdURL
      ? tries > CHANGE_URL_AT_TRY
        ? 'https://edge.satonomics.xyz'
        : 'https://satonomics.shuttleapp.rs'
      : 'http://localhost:8000'
  }${path}`
}
