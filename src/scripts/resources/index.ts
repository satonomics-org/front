import { createEventListener } from '@solid-primitives/event-listener'

import { backEndAPI, krakenAPI } from '/src/scripts'

const TEN_MINUTES_IN_MS = 600_000

const createResource = <Value extends LightweightCharts.WhitespaceData>(
  fetch: () => Promise<Value[]>,
  valuesOptions?: Solid.SignalOptions<Value[] | null>,
): Resource<Value> => {
  const [values, setValues] = createSignal(
    null as Value[] | null,
    valuesOptions,
  )
  const [live, setLive] = createSignal(false)

  let lastSuccessfulFetch: Date | null

  return {
    async fetch() {
      if (
        !lastSuccessfulFetch ||
        new Date().valueOf() - lastSuccessfulFetch.valueOf() > TEN_MINUTES_IN_MS
      ) {
        const values = await fetch()

        if (Array.isArray(values)) {
          lastSuccessfulFetch = new Date()

          // const previousValues = this.values()

          // TODO: If values findFirst with first date and last with last date and splice
          // Useful for candlesticks

          // if (!previousValues) {
          setValues(values)
          // } else {
          //   previousValues.indexOf((data) => (data as LightweightCharts.WhitespaceData).time === )
          // }
        }
      }
    },
    values,
    setValues,
    live,
    setLive,
  }
}

export const createResources = () => {
  const resources: Resources = {
    candlesticks: createResource(backEndAPI.fetchCandlesticks, {
      equals: false,
    }),
    transactedVolume: createResource(backEndAPI.fetchTransactedVolume),
    sthRealizedPrice: createResource(backEndAPI.fetchSTHRealizedPrice),
    lthRealizedPrice: createResource(backEndAPI.fetchLTHRealizedPrice),
    oneMonthRealizedPrice: createResource(backEndAPI.fetch1MRealizedPrice),
    threeMonthsRealizedPrice: createResource(backEndAPI.fetch3MRealizedPrice),
    sixMonthsRealizedPrice: createResource(backEndAPI.fetch6MRealizedPrice),
    oneYearRealizedPrice: createResource(backEndAPI.fetch1YRealizedPrice),
    twoYearsRealizedPrice: createResource(backEndAPI.fetch2YRealizedPrice),
    netRealizedProfitAndLoss: createResource(
      backEndAPI.fetchNetRealizedProfitAndLoss,
    ),
    sopr: createResource(backEndAPI.fetchSOPR),
    planktonRealizedPrice: createResource(
      backEndAPI.fetchPlanktonRealizedPrice,
    ),
    shrimpsRealizedPrice: createResource(backEndAPI.fetchShrimpsRealizedPrice),
    crabsRealizedPrice: createResource(backEndAPI.fetchCrabsRealizedPrice),
    fishRealizedPrice: createResource(backEndAPI.fetchFishRealizedPrice),
    sharksRealizedPrice: createResource(backEndAPI.fetchSharksRealizedPrice),
    whalesRealizedPrice: createResource(backEndAPI.fetchWhalesRealizedPrice),
    humpbacksRealizedPrice: createResource(
      backEndAPI.fetchHumpbacksRealizedPrice,
    ),
    planktonBalances: createResource(backEndAPI.fetchPlanktonBalances),
    shrimpsBalances: createResource(backEndAPI.fetchShrimpsBalances),
    crabsBalances: createResource(backEndAPI.fetchCrabsBalances),
    fishBalances: createResource(backEndAPI.fetchFishBalances),
    sharksBalances: createResource(backEndAPI.fetchSharksBalances),
    whalesBalances: createResource(backEndAPI.fetchWhalesBalances),
    humpbacksBalances: createResource(backEndAPI.fetchHumpbacksBalances),
    planktonDistribution: createResource(backEndAPI.fetchPlanktonDistribution),
    shrimpsDistribution: createResource(backEndAPI.fetchShrimpsDistribution),
    crabsDistribution: createResource(backEndAPI.fetchCrabsDistribution),
    fishDistribution: createResource(backEndAPI.fetchFishDistribution),
    sharksDistribution: createResource(backEndAPI.fetchSharksDistribution),
    whalesDistribution: createResource(backEndAPI.fetchWhalesDistribution),
    humpbacksDistribution: createResource(
      backEndAPI.fetchHumpbacksDistribution,
    ),
    terminalPrice: createResource(backEndAPI.fetchTerminalPrice),
    realizedPrice: createResource(backEndAPI.fetchRealizedPrice),
    balancedPrice: createResource(backEndAPI.fetchBalancedPrice),
    cvdd: createResource(backEndAPI.fetchCVDD),
    fundingRates: createResource(backEndAPI.fetchFundingRates),
    vddMultiple: createResource(backEndAPI.fetchVDDMultiple),
    minersRevenue: createResource(backEndAPI.fetchMinersRevenue),
    supplyInProfit: createResource(backEndAPI.fetchSupplyInProfit),
    supplyInLoss: createResource(backEndAPI.fetchSupplyInLoss),
    lthSupply: createResource(backEndAPI.fetchLTHSupply),
    sthSupply: createResource(backEndAPI.fetchSTHSupply),
    lthInProfit: createResource(backEndAPI.fetchLTHInProfit),
    sthInProfit: createResource(backEndAPI.fetchSTHInProfit),
    lthInLoss: createResource(backEndAPI.fetchLTHInLoss),
    sthInLoss: createResource(backEndAPI.fetchSTHInLoss),
    hashrate: createResource(backEndAPI.fetchHashrate),
  }

  onMount(() => {
    console.log('fetch')

    resources.candlesticks.fetch()

    initCandlesticksWebsocket(resources)
  })

  return resources
}

const initCandlesticksWebsocket = (resources: Resources) => {
  let ws: WebSocket | null = null

  const initWebSocket = () => {
    const candlesticksResource = resources.candlesticks

    ws = krakenAPI.createLiveCandleWebsocket((newCandle) => {
      const candlesticks = candlesticksResource.values()

      if (!candlesticks) return

      const lastCandle = candlesticks.at(-1)

      if (!lastCandle) return

      console.log('ws:', newCandle.close)

      candlesticksResource.setValues((candlesticks) => {
        if (lastCandle.time === newCandle.time) {
          candlesticks?.splice(-1, 1, newCandle)
        } else {
          candlesticks?.push(newCandle)
        }

        return candlesticks
      })
    })

    ws.addEventListener('open', () => {
      console.log('ws: open')
      candlesticksResource.setLive(true)
    })

    ws.addEventListener('close', () => {
      console.log('ws: close')
      candlesticksResource.setLive(false)
    })
  }

  initWebSocket()

  const reinitWebSocket = () => {
    if (!ws || ws.readyState === ws.CLOSED) {
      console.log('ws: reinit')
      initWebSocket()
    }
  }

  createEventListener(window, 'focus', reinitWebSocket)
  createEventListener(window, 'online', reinitWebSocket)

  onCleanup(() => ws?.close())
}
