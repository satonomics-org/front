import { createBaseAPI } from '/src/scripts'

const api = createBaseAPI({
  baseUrl: 'https://data.nasdaq.com/api/v3/datasets',
})

export const nasdaqAPI = {
  async fetchGoldPrices() {
    return (
      (await api.fetchJSON(`/11304240/data`)).dataset_data.data as [
        date: string,
        price: number,
      ][]
    ).map(
      ([date, price]): SingleValueData => ({
        time: date,
        value: price,
      }),
    )
  },
}
