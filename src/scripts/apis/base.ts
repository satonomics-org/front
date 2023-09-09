export const createBaseAPI = (parameters: {
  baseUrl: string
  rate?: {
    max: number
    timeout: number
  }
}) => {
  return {
    baseUrl: parameters.baseUrl,
    async fetch(
      path: string,
      init?: RequestInit,
      tries = 3,
    ): Promise<Response> {
      const url = `${parameters.baseUrl}${path}`

      console.log(`fetch: ${url}`)

      if (!tries) {
        throw new Error('Fetch failed')
      }

      try {
        const result = await fetch(url, init)

        if (result.ok) {
          return result
        } else {
          return this.fetch(path, init, tries - 1)
        }
      } catch {
        return this.fetch(path, init, tries - 1)
      }
    },
    async fetchText(path: string, init?: RequestInit) {
      return (await this.fetch(path, init)).text()
    },
    async fetchJSON<T = any>(path: string, init?: RequestInit) {
      const response = await this.fetch(path, init)

      return response.json() as Promise<T>
    },
  }
}
