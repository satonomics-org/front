import { createBaseAPI, dateToString } from '/src/scripts'

const api = createBaseAPI({
  baseUrl:
    location.protocol === 'https:'
      ? 'https://sholong.shuttleapp.rs'
      : 'http://localhost:8000',
})

const convertRecordToLineData = (record: Record<string, number>) =>
  Object.entries(record).map(
    ([time, value]): LightweightCharts.SingleValueData => ({
      time,
      value: value ?? NaN,
    })
  )

const fetchSimpleData = async (path: string, signal?: AbortSignal) =>
  convertRecordToLineData(
    (await api.fetchJSON(path, {
      signal,
    })) as Record<string, number>
  )

export const backEndAPI = {
  async fetchCandlesticks(signal?: AbortSignal) {
    const candlesticks = await import('/src/assets/data/btcusd.json').then(
      (i) => i.default as CandlestickDataWithVolume[]
    )

    const since = new Date(candlesticks.at(-1)?.time || 0).valueOf() / 1000

    candlesticks.push(
      ...((await api.fetchJSON(`/candlesticks?since=${since}`, {
        signal,
      })) as CandlestickDataWithVolume[])
    )

    return candlesticks
  },
  fetchTransactedVolume: (signal?: AbortSignal) =>
    fetchSimpleData(`/transacted-volume`, signal),
  fetchSTHRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/sth-realized-price`, signal),
  fetchLTHRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/lth-realized-price`, signal),
  fetch1MRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/1m-realized-price`, signal),
  fetch3MRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/3m-realized-price`, signal),
  fetch1YRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/1y-realized-price`, signal),
  fetch2YRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/2y-realized-price`, signal),
  fetchNetRealizedProfitAndLoss: (signal?: AbortSignal) =>
    fetchSimpleData(`/net-realized-pnl`, signal),
  fetchSOPR: (signal?: AbortSignal) => fetchSimpleData(`/sopr`, signal),
  fetchPlanktonRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/plankton-realized-price`, signal),
  fetchShrimpsRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/shrimps-realized-price`, signal),
  fetchCrabsRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/crabs-realized-price`, signal),
  fetchFishRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/fish-realized-price`, signal),
  fetchSharksRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/sharks-realized-price`, signal),
  fetchWhalesRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/whales-realized-price`, signal),
  fetchHumpbacksRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/humpbacks-realized-price`, signal),
  fetchPlanktonBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/plankton-balances`, signal),
  fetchShrimpsBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/shrimps-balances`, signal),
  fetchCrabsBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/crabs-balances`, signal),
  fetchFishBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/fish-balances`, signal),
  fetchSharksBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/sharks-balances`, signal),
  fetchWhalesBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/whales-balances`, signal),
  fetchHumpbacksBalances: (signal?: AbortSignal) =>
    fetchSimpleData(`/humpbacks-balances`, signal),
  fetchPlanktonDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/plankton-distribution`, signal),
  fetchShrimpsDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/shrimps-distribution`, signal),
  fetchCrabsDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/crabs-distribution`, signal),
  fetchFishDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/fish-distribution`, signal),
  fetchSharksDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/sharks-distribution`, signal),
  fetchWhalesDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/whales-distribution`, signal),
  fetchHumpbacksDistribution: (signal?: AbortSignal) =>
    fetchSimpleData(`/humpbacks-distribution`, signal),

  fetchTerminalPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/terminal-price`, signal),
  fetchRealizedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/realized-price`, signal),
  fetchBalancedPrice: (signal?: AbortSignal) =>
    fetchSimpleData(`/balanced-price`, signal),
  fetchCVDD: (signal?: AbortSignal) => fetchSimpleData(`/cvdd`, signal),
  fetchFundingRates: (signal?: AbortSignal) =>
    fetchSimpleData(`/funding-rates`, signal),
  fetchVDDMultiple: (signal?: AbortSignal) =>
    fetchSimpleData(`/vdd-multiple`, signal),
  fetchMinersRevenue: (signal?: AbortSignal) =>
    fetchSimpleData(`/miners-revenue`, signal),
  fetchSupplyInProfit: (signal?: AbortSignal) =>
    fetchSimpleData(`/supply-in-profit`, signal),
  fetchSupplyInLoss: (signal?: AbortSignal) =>
    fetchSimpleData(`/supply-in-loss`, signal),
}
