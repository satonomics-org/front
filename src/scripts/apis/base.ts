export const createBaseAPI = (parameters: {
  baseUrl: string
  rate?: {
    max: number
    timeout: number
  }
}) => {
  return {
    baseUrl: parameters.baseUrl,
    fetch: async function (path: string, init?: RequestInit) {
      const url = `${parameters.baseUrl}${path}`

      console.log(`fetch: ${url}`)

      return fetch(url, init)
    },
    fetchText: async function (path: string, init?: RequestInit) {
      return (await this.fetch(path, init)).text()
    },
    fetchJSON: async function <T = any>(path: string, init?: RequestInit) {
      const response = await this.fetch(path, init)

      return response.json() as Promise<T>
    },
  }
}
