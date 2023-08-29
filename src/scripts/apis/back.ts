import { createBaseAPI } from '/src/scripts'

const api = createBaseAPI({
  baseUrl:
    location.protocol === 'https:'
      ? 'https://sholong.shuttleapp.rs'
      : 'http://localhost:8000',
})

const convertRecordToLineData = (record: Record<string, number>) =>
  Object.entries(record).map(
    ([time, value]): SingleValueData => ({
      time,
      value: value ?? NaN,
    }),
  )

const fetchSimpleData = async (path: string) =>
  convertRecordToLineData((await api.fetchJSON(path)) as Record<string, number>)

export const backEndAPI = {
  async fetchCandlesticks() {
    const cachedCandlesticks = await import(
      '/src/assets/data/btcusd.json'
    ).then((i) => i.default as CandlestickDataWithVolume[])

    const since =
      new Date(cachedCandlesticks.at(-1)?.time || 0).valueOf() / 1000

    const candlesticks = Array.from(cachedCandlesticks)

    candlesticks.push(
      ...((await api.fetchJSON(
        `/candlesticks?since=${since}`,
      )) as CandlestickDataWithVolume[]),
    )

    return candlesticks
  },
  fetchTransactedVolume: () => fetchSimpleData(`/transacted-volume`),
  fetchSTHRealizedPrice: () => fetchSimpleData(`/sth-realized-price`),
  fetchLTHRealizedPrice: () => fetchSimpleData(`/lth-realized-price`),
  fetch1MRealizedPrice: () => fetchSimpleData(`/1m-realized-price`),
  fetch3MRealizedPrice: () => fetchSimpleData(`/3m-realized-price`),
  fetch6MRealizedPrice: () => fetchSimpleData(`/6m-realized-price`),
  fetch1YRealizedPrice: () => fetchSimpleData(`/1y-realized-price`),
  fetch2YRealizedPrice: () => fetchSimpleData(`/2y-realized-price`),
  fetchNetRealizedProfitAndLoss: () => fetchSimpleData(`/net-realized-pnl`),
  fetchSOPR: () => fetchSimpleData(`/sopr`),
  fetchPlanktonRealizedPrice: () => fetchSimpleData(`/plankton-realized-price`),
  fetchShrimpsRealizedPrice: () => fetchSimpleData(`/shrimps-realized-price`),
  fetchCrabsRealizedPrice: () => fetchSimpleData(`/crabs-realized-price`),
  fetchFishRealizedPrice: () => fetchSimpleData(`/fish-realized-price`),
  fetchSharksRealizedPrice: () => fetchSimpleData(`/sharks-realized-price`),
  fetchWhalesRealizedPrice: () => fetchSimpleData(`/whales-realized-price`),
  fetchHumpbacksRealizedPrice: () =>
    fetchSimpleData(`/humpbacks-realized-price`),
  fetchPlanktonBalances: () => fetchSimpleData(`/plankton-balances`),
  fetchShrimpsBalances: () => fetchSimpleData(`/shrimps-balances`),
  fetchCrabsBalances: () => fetchSimpleData(`/crabs-balances`),
  fetchFishBalances: () => fetchSimpleData(`/fish-balances`),
  fetchSharksBalances: () => fetchSimpleData(`/sharks-balances`),
  fetchWhalesBalances: () => fetchSimpleData(`/whales-balances`),
  fetchHumpbacksBalances: () => fetchSimpleData(`/humpbacks-balances`),
  fetchPlanktonDistribution: () => fetchSimpleData(`/plankton-distribution`),
  fetchShrimpsDistribution: () => fetchSimpleData(`/shrimps-distribution`),
  fetchCrabsDistribution: () => fetchSimpleData(`/crabs-distribution`),
  fetchFishDistribution: () => fetchSimpleData(`/fish-distribution`),
  fetchSharksDistribution: () => fetchSimpleData(`/sharks-distribution`),
  fetchWhalesDistribution: () => fetchSimpleData(`/whales-distribution`),
  fetchHumpbacksDistribution: () => fetchSimpleData(`/humpbacks-distribution`),
  fetchTerminalPrice: () => fetchSimpleData(`/terminal-price`),
  fetchRealizedPrice: () => fetchSimpleData(`/realized-price`),
  fetchBalancedPrice: () => fetchSimpleData(`/balanced-price`),
  fetchCVDD: () => fetchSimpleData(`/cvdd`),
  fetchFundingRates: () => fetchSimpleData(`/funding-rates`),
  fetchVDDMultiple: () => fetchSimpleData(`/vdd-multiple`),
  fetchMinersRevenue: () => fetchSimpleData(`/miners-revenue`),
  fetchSupplyInProfit: () => fetchSimpleData(`/supply-in-profit`),
  fetchSupplyInLoss: () => fetchSimpleData(`/supply-in-loss`),
  fetchLTHSupply: () => fetchSimpleData(`/lth-supply`),
  fetchSTHSupply: () => fetchSimpleData(`/sth-supply`),
  fetchLTHInProfit: () => fetchSimpleData(`/lth-in-profit`),
  fetchSTHInProfit: () => fetchSimpleData(`/sth-in-profit`),
  fetchLTHInLoss: () => fetchSimpleData(`/lth-in-loss`),
  fetchSTHInLoss: () => fetchSimpleData(`/sth-in-loss`),
  fetchHashrate: () => fetchSimpleData(`/hashrate`),
}
