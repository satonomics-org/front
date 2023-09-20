import { leading, throttle } from '@solid-primitives/scheduled'

import {
  backEndFetch,
  computeBackEndURL,
  ONE_SECOND_IN_MS,
  TEN_SECOND_IN_MS,
} from '/src/scripts'
import { createASS } from '/src/solid'

export const convertJSONToValues = (json: any) =>
  json && typeof json === 'object'
    ? Object.entries(json as Record<string, number>).map(
        ([date, value]: [string, number]): DatedSingleValueData => ({
          date,
          time: date,
          value: value ?? NaN,
        }),
      )
    : undefined

export const createBackEndResource = (path: string) =>
  createResourceHTTP<DatedSingleValueData[]>({
    url: computeBackEndURL(path),
    customFetch: backEndFetch,
    transform: convertJSONToValues,
  })

export const createResourceHTTP = <
  T extends Array<any>,
  F extends Array<any> = T,
>({
  url,
  customFetch,
  transform,
  cached,
  map,
}: {
  url: string
  customFetch: (path: string, init?: RequestInit) => Promise<Response>
  transform?: (json: any) => T | undefined
  map?: (current: T[number], index: number, arr: T[number][]) => F[number]
  cached?: T
}) => {
  const values = createASS(null as F | null)

  const loading = createASS(false)

  let lastSuccessfulFetch: Date | null

  const reponseToValues = async (reponse: Response) => {
    const json = await reponse.json()
    return transform ? transform(json) : (json as T)
  }

  const setValues = (_values: T) =>
    values.set(() => {
      const final = [...(cached || ([] as unknown as T)), ..._values]

      if (map) {
        const modifiedFinal = final.map(map)
        return modifiedFinal as F
      } else {
        return final as F
      }
    })

  const throttledFetch = leading(
    throttle,
    async () => {
      if (
        lastSuccessfulFetch &&
        new Date().valueOf() - lastSuccessfulFetch.valueOf() < TEN_SECOND_IN_MS
      )
        return

      loading.set(true)

      let cache: Cache | undefined

      try {
        cache = await caches.open('resources-cache')

        const cachedResult = await cache.match(url)

        if (cachedResult) {
          const _values = await reponseToValues(cachedResult)

          if (_values) {
            console.log('values: setting cached...')
            setValues(_values)
          }
        }
      } catch {}

      const fetchedResult = await customFetch(url)

      const clonedFetchedResult = fetchedResult.clone()

      const _values = await reponseToValues(fetchedResult)

      console.log(_values)

      if (_values) {
        lastSuccessfulFetch = new Date()

        if (cache) {
          await cache.put(url, clonedFetchedResult)
        }

        console.log('values: setting fetched...')
        setValues(_values)
      }

      loading.set(false)
    },
    ONE_SECOND_IN_MS,
  )

  const resource: ResourceHTTP<T, F> = {
    fetch: throttledFetch,
    values,
    loading,
    url: new URL(url),
  }

  return resource
}
