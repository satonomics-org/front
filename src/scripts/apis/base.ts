export const createBaseAPI = (parameters: {
  baseUrl: string
  rate?: {
    max: number
    timeout: number
  }
}) => {
  return {
    baseUrl: parameters.baseUrl,
    async fetch(path: string, init?: RequestInit) {
      const url = `${parameters.baseUrl}${path}`

      console.log(`fetch: ${url}`)

      return fetch(url, init)
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
