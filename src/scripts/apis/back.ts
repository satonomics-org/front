import { createBaseAPI } from '/src/scripts'

const api = createBaseAPI({
  baseUrl:
    location.protocol === 'https:'
      ? 'https://satonomics.shuttleapp.rs'
      : 'http://localhost:8000',
})

const convertRecordToLineData = (record: Record<string, number>) =>
  Object.entries(record).map(
    ([time, value]): SingleValueData => ({
      time,
      value: value ?? NaN,
    }),
  )

const fetchSimpleDataset = async (path: string) =>
  convertRecordToLineData((await api.fetchJSON(path)) as Record<string, number>)

const fetchGroupedDatasets = async (path: string) =>
  (
    (await api.fetchJSON(path)) as {
      name: string
      dataset: Record<string, number>
    }[]
  ).map(
    ({ name, dataset }): GroupedSingleValues => ({
      name,
      dataset: convertRecordToLineData(dataset),
    }),
  )

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
  fetchTransactedVolume: () => fetchSimpleDataset(`/transacted-volume`),
  fetchSTHRealizedPrice: () => fetchSimpleDataset(`/sth-realized-price`),
  fetchLTHRealizedPrice: () => fetchSimpleDataset(`/lth-realized-price`),
  fetch1MRealizedPrice: () => fetchSimpleDataset(`/1m-realized-price`),
  fetch3MRealizedPrice: () => fetchSimpleDataset(`/3m-realized-price`),
  fetch6MRealizedPrice: () => fetchSimpleDataset(`/6m-realized-price`),
  fetch1YRealizedPrice: () => fetchSimpleDataset(`/1y-realized-price`),
  fetch2YRealizedPrice: () => fetchSimpleDataset(`/2y-realized-price`),
  fetchNetRealizedProfitAndLoss: () => fetchSimpleDataset(`/net-realized-pnl`),
  fetchSOPR: () => fetchSimpleDataset(`/sopr`),
  fetchPlanktonRealizedPrice: () =>
    fetchSimpleDataset(`/plankton-realized-price`),
  fetchShrimpsRealizedPrice: () =>
    fetchSimpleDataset(`/shrimps-realized-price`),
  fetchCrabsRealizedPrice: () => fetchSimpleDataset(`/crabs-realized-price`),
  fetchFishRealizedPrice: () => fetchSimpleDataset(`/fish-realized-price`),
  fetchSharksRealizedPrice: () => fetchSimpleDataset(`/sharks-realized-price`),
  fetchWhalesRealizedPrice: () => fetchSimpleDataset(`/whales-realized-price`),
  fetchHumpbacksRealizedPrice: () =>
    fetchSimpleDataset(`/humpbacks-realized-price`),
  fetchPlanktonBalances: () => fetchSimpleDataset(`/plankton-balances`),
  fetchShrimpsBalances: () => fetchSimpleDataset(`/shrimps-balances`),
  fetchCrabsBalances: () => fetchSimpleDataset(`/crabs-balances`),
  fetchFishBalances: () => fetchSimpleDataset(`/fish-balances`),
  fetchSharksBalances: () => fetchSimpleDataset(`/sharks-balances`),
  fetchWhalesBalances: () => fetchSimpleDataset(`/whales-balances`),
  fetchHumpbacksBalances: () => fetchSimpleDataset(`/humpbacks-balances`),
  fetchPlanktonDistribution: () => fetchSimpleDataset(`/plankton-distribution`),
  fetchShrimpsDistribution: () => fetchSimpleDataset(`/shrimps-distribution`),
  fetchCrabsDistribution: () => fetchSimpleDataset(`/crabs-distribution`),
  fetchFishDistribution: () => fetchSimpleDataset(`/fish-distribution`),
  fetchSharksDistribution: () => fetchSimpleDataset(`/sharks-distribution`),
  fetchWhalesDistribution: () => fetchSimpleDataset(`/whales-distribution`),
  fetchHumpbacksDistribution: () =>
    fetchSimpleDataset(`/humpbacks-distribution`),
  fetchTerminalPrice: () => fetchSimpleDataset(`/terminal-price`),
  fetchRealizedPrice: () => fetchSimpleDataset(`/realized-price`),
  fetchBalancedPrice: () => fetchSimpleDataset(`/balanced-price`),
  fetchCointimePrice: () => fetchSimpleDataset(`/cointime-price`),
  fetchTrueMeanPrice: () => fetchSimpleDataset(`/true-mean-price`),
  fetchVaultedPrice: () => fetchSimpleDataset(`/vaulted-price`),
  fetchCVDD: () => fetchSimpleDataset(`/cvdd`),
  fetchFundingRates: () => fetchSimpleDataset(`/funding-rates`),
  fetchVDDMultiple: () => fetchSimpleDataset(`/vdd-multiple`),
  fetchMinersRevenue: () => fetchSimpleDataset(`/miners-revenue`),
  fetchSupplyInProfit: () => fetchSimpleDataset(`/supply-in-profit`),
  fetchSupplyInLoss: () => fetchSimpleDataset(`/supply-in-loss`),
  fetchLTHSupply: () => fetchSimpleDataset(`/lth-supply`),
  fetchSTHSupply: () => fetchSimpleDataset(`/sth-supply`),
  fetchLTHInProfit: () => fetchSimpleDataset(`/lth-in-profit`),
  fetchSTHInProfit: () => fetchSimpleDataset(`/sth-in-profit`),
  fetchLTHInLoss: () => fetchSimpleDataset(`/lth-in-loss`),
  fetchSTHInLoss: () => fetchSimpleDataset(`/sth-in-loss`),
  fetchHashrate: () => fetchSimpleDataset(`/hashrate`),
  fetchStablecoinsMarketCaps: () =>
    fetchGroupedDatasets(`/stablecoins-marketcaps`),
}
