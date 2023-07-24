import { createBaseAPI } from '/src/scripts'

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

const fetchSimpleData = async (path: string, signal: AbortSignal) =>
  convertRecordToLineData(
    (await api.fetchJSON(path, {
      signal,
      headers: {
        // 'Cache-Control': 'public, max-age=600',
      },
    })) as Record<string, number>
  )

export const selfAPI = {
  fetchTransactedVolume: (signal: AbortSignal) =>
    fetchSimpleData(`/transacted-volume`, signal),
  fetchSTHRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/sth-realized-price`, signal),
  fetchLTHRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/lth-realized-price`, signal),
  fetch2YRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/2y-realized-price`, signal),
  fetchNetRealizedProfitAndLoss: (signal: AbortSignal) =>
    fetchSimpleData(`/net-realized-pnl`, signal),
  fetchSOPR: (signal: AbortSignal) => fetchSimpleData(`/sopr`, signal),
  fetchSharksRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/sharks-realized-price`, signal),
  fetchWhalesRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/whales-realized-price`, signal),
  fetchHumpbacksRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/humpbacks-realized-price`, signal),

  fetchTerminalPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/terminal-price`, signal),
  fetchRealizedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/realized-price`, signal),
  fetchBalancedPrice: (signal: AbortSignal) =>
    fetchSimpleData(`/balanced-price`, signal),
  fetchCVDD: (signal: AbortSignal) => fetchSimpleData(`/cvdd`, signal),
  fetchFundingRates: (signal: AbortSignal) =>
    fetchSimpleData(`/funding-rates`, signal),
  fetchVDDMultiple: (signal: AbortSignal) =>
    fetchSimpleData(`/vdd-multiple`, signal),
}
