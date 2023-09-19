import { describe, expect, test } from 'vitest'

import {
  backEndFetch,
  CHANGE_URL_AT_TRY,
  computeBackEndURL,
  createResourcesHTTP,
  DEFAULT_NUMBER_OF_TRIES,
} from '/src/scripts'

import { convertJSONToValues } from '../resources/creators'

const testBackEndAPI = (tries: number) => () => {
  const resources = createResourcesHTTP()

  ;(Object.entries(resources) as Entries<ResourcesHTTP>).map(
    ([name, { url }]) => {
      const href = computeBackEndURL(url.pathname, tries)

      return test(href, async () => {
        const result = await backEndFetch(href, undefined, tries)

        const json = await result.json()

        expect(
          (name === 'candlesticks' ? json : convertJSONToValues(json)).pop(),
        ).toBeDefined()
      })
    },
  )
}

describe('Backend API through Edge', testBackEndAPI(DEFAULT_NUMBER_OF_TRIES))
describe('Backend API through Shuttle', testBackEndAPI(CHANGE_URL_AT_TRY))
