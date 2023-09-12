import { createEventListener } from '@solid-primitives/event-listener'
import { makeTimer } from '@solid-primitives/timer'
import { getOwner, runWithOwner } from 'solid-js'

import { backEndAPI, krakenAPI } from '/src/scripts'
import { createASS } from '/src/solid'

const TEN_MINUTES_IN_MS = 600_000

const createResource = <Value>(
  fetch: () => Promise<Value[]>,
  valuesOptions?: SignalOptions<Value[] | null>,
) => {
  const values = createASS(null as Value[] | null, valuesOptions)
  const live = createASS(false)

  let lastSuccessfulFetch: Date | null

  const resource: Resource<Value> = {
    async fetch(owner) {
      if (
        !lastSuccessfulFetch ||
        new Date().valueOf() - lastSuccessfulFetch.valueOf() > TEN_MINUTES_IN_MS
      ) {
        const fetchedValues = await fetch()

        if (Array.isArray(fetchedValues)) {
          lastSuccessfulFetch = new Date()

          values.set(fetchedValues)
        }
      }

      runWithOwner(owner, () => {
        const dispose = makeTimer(
          () => {
            resource.fetch(owner)
          },
          TEN_MINUTES_IN_MS,
          setTimeout,
        )

        onCleanup(dispose)
      })
    },
    values,
    live,
  }

  return resource
}

export const createResources = () => {
  const resources: Resources = {
    candlesticks: createResource(backEndAPI.fetchCandlesticks, {
      equals: false,
    }),
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
    cointimePrice: createResource(backEndAPI.fetchCointimePrice),
    trueMeanPrice: createResource(backEndAPI.fetchTrueMeanPrice),
    vaultedPrice: createResource(backEndAPI.fetchVaultedPrice),
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
    stablecoinsMarketCaps: createResource(
      backEndAPI.fetchStablecoinsMarketCaps,
    ),
  }

  onMount(() => {
    resources.candlesticks.fetch(getOwner())

    createLiveCandleWebsocket(resources)
  })

  return resources
}

const createLiveCandleWebsocket = (resources: Resources) => {
  let ws: WebSocket | null = null

  const initWebSocket = () => {
    const candlesticksResource = resources.candlesticks

    ws = krakenAPI.createLiveCandleWebsocket((newCandle) => {
      const candlesticks = candlesticksResource.values()

      if (!candlesticks) return

      const lastCandle = candlesticks.at(-1)

      if (!lastCandle) return

      console.log('ws:', newCandle.close)

      candlesticksResource.values.set((candlesticks) => {
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
      candlesticksResource.live.set(true)
    })

    ws.addEventListener('close', () => {
      console.log('ws: close')
      candlesticksResource.live.set(false)
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
