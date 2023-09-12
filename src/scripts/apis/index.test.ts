import { describe, expect, test } from 'vitest'

import { backEndAPI } from '.'

describe('Backend API', () => {
  Object.entries(backEndAPI).map(([name, fetcher]) =>
    test(name, async () => expect(await fetcher()).toBeDefined()),
  )
})
