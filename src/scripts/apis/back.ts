import { sleep } from '/src/scripts'

export const DEFAULT_NUMBER_OF_TRIES = 12
export const CHANGE_URL_AT_TRY = DEFAULT_NUMBER_OF_TRIES / 2

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

export async function backEndFetch(
  url: string,
  init: RequestInit | undefined = undefined,
  tries = DEFAULT_NUMBER_OF_TRIES,
): Promise<Response> {
  import.meta.env.MODE !== 'test' && console.log(`fetch: ${url}`)

  if (!tries) {
    throw new Error('Fetch failed')
  }

  try {
    const result = await fetch(url, init)

    if (result.ok) {
      return result
    }
  } catch {}

  await sleep(5000)

  return backEndFetch(url, init, tries - 1)
}
