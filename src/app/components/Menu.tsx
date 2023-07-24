import { Button, Input, Interactive, Labeled } from '/src/components'

import Logo from '/src/assets/svgs/satoshi 2.svg'

import {
  create2YRealizedPriceSeries,
  createAgedRealizedPricesSeries,
  createBalancedPriceSeries,
  createCVDDSeries,
  createEntitiesRealizedPricesSeries,
  createFundingRatesSeries,
  createHumpbacksRealizedPriceSeries,
  createLTHRealizedPriceSeries,
  createMarketVolumeSeries,
  createMidPointPriceSeries,
  createNetRealizedProfitAndLossSeries,
  createRealizedPriceSeries,
  createSOPRSeries,
  createSTHRealizedPriceSeries,
  createSharksRealizedPriceSeries,
  createTerminalPriceSeries,
  createVDDMultipleSeries,
  createWhalesRealizedPriceSeries,
  resetLeftPriceScale,
} from '../scripts'

interface Props {
  chart: LightweightCharts.IChartApi | null
  candlesticks: CandlesticksProp
}

const LOCAL_STORAGE_KEY = 'selected'

export const Menu = (props: Props) => {
  const [state, setState] = createStore({
    filter: '',
    selected: localStorage.getItem(LOCAL_STORAGE_KEY) || 'minimal',
  })

  const currentSeriesList: LightweightCharts.ISeriesApi<any>[] = []

  createEffect(() => {
    if (state.selected) {
      localStorage.setItem(LOCAL_STORAGE_KEY, state.selected)
    }
  })

  let abortController: AbortController | undefined

  const cleanSeries = () => {
    abortController?.abort()

    currentSeriesList.splice(0, currentSeriesList.length).map((series) => {
      props.chart?.removeSeries(series)
    })
  }

  const selectSeries = async (createSeries: CreateSeries) => {
    const { chart } = props

    if (!chart) return

    cleanSeries()

    abortController = new AbortController()

    try {
      const seriesList = await createSeries(
        chart,
        abortController.signal,
        props.candlesticks.list
      )

      if (!abortController.signal.aborted) {
        currentSeriesList.push(...seriesList)
      }
    } catch {}
  }

  onCleanup(cleanSeries)

  return (
    <div class="flex w-80 flex-none flex-col border-r border-white">
      <a class="flex items-center justify-center p-4" href="/">
        <span class="-ml-4 inline-block h-16 w-16">
          <Logo />
        </span>
        <span class="font-druk text-7xl">SHOLONG</span>
      </a>
      <hr />
      <div class="flex space-x-2 p-2">
        <Input
          onInput={(value) => setState('filter', value || '')}
          full
          value={state.filter}
          bind
          label="Filter"
        />
        <Button
          icon={IconTablerArrowBackUp}
          onClick={() => setState('filter', '')}
        />
      </div>
      <hr />
      <div class="flex flex-1 flex-col overflow-y-auto">
        <div class="flex flex-1 flex-col space-y-6 p-2 pb-4">
          <For
            each={[
              {
                name: 'Base',
                list: [
                  {
                    id: 'minimal',
                    text: 'Minimal',
                    onClick: () => {
                      props.chart && resetLeftPriceScale(props.chart)
                      cleanSeries()
                    },
                  },
                ],
              },
              {
                name: 'Market',
                list: [
                  {
                    id: 'marketVolume',
                    text: 'Market Volume',
                    onClick: () => selectSeries(createMarketVolumeSeries),
                  },
                ],
              },
              {
                name: 'Hodlers',
                list: [
                  {
                    id: 'sth',
                    text: 'Short Term Holders',
                    onClick: () => selectSeries(createSTHRealizedPriceSeries),
                  },
                  {
                    id: '<2y',
                    text: '<2Y Holders',
                    onClick: () => selectSeries(create2YRealizedPriceSeries),
                  },
                  {
                    id: 'lth',
                    text: 'Long Term holders',
                    onClick: () => selectSeries(createLTHRealizedPriceSeries),
                  },
                  {
                    id: 'allHolders',
                    text: 'All Holders',
                    onClick: () => selectSeries(createAgedRealizedPricesSeries),
                  },
                ],
              },
              {
                name: 'Indicators',
                list: [
                  {
                    id: 'terminal',
                    text: 'Terminal Price',
                    onClick: () => selectSeries(createTerminalPriceSeries),
                  },
                  {
                    id: 'mid',
                    text: 'Mid Point Price',
                    onClick: () => selectSeries(createMidPointPriceSeries),
                  },
                  {
                    id: 'realized',
                    text: 'Realized Price',
                    onClick: () => selectSeries(createRealizedPriceSeries),
                  },
                  {
                    id: 'balanced',
                    text: 'Balanced Price',
                    onClick: () => selectSeries(createBalancedPriceSeries),
                  },
                  {
                    id: 'cvdd',
                    text: 'CVDD Price',
                    onClick: () => selectSeries(createCVDDSeries),
                  },
                  {
                    id: 'netP&L',
                    text: 'Net Realized Profit & Loss',
                    onClick: () =>
                      selectSeries(createNetRealizedProfitAndLossSeries),
                  },
                  {
                    id: 'sopr',
                    text: 'SOPR',
                    onClick: () => selectSeries(createSOPRSeries),
                  },
                  {
                    id: 'vdd',
                    text: 'VDD Multiple',
                    onClick: () => selectSeries(createVDDMultipleSeries),
                  },
                ],
              },
              {
                name: 'Entities',
                list: [
                  {
                    id: 'sharks',
                    text: 'Sharks Realized Price',
                    onClick: () =>
                      selectSeries(createSharksRealizedPriceSeries),
                  },
                  {
                    id: 'whales',
                    text: 'Whales Realized Price',
                    onClick: () =>
                      selectSeries(createWhalesRealizedPriceSeries),
                  },
                  {
                    id: 'humpbacks',
                    text: 'Humpbacks Realized Price',
                    onClick: () =>
                      selectSeries(createHumpbacksRealizedPriceSeries),
                  },
                  {
                    id: 'entities',
                    text: 'All Entities',
                    onClick: () =>
                      selectSeries(createEntitiesRealizedPricesSeries),
                  },
                ],
              },
              {
                name: 'Derivatives',
                list: [
                  {
                    id: 'fundRates',
                    text: 'Funding rates',
                    onClick: () => selectSeries(createFundingRatesSeries),
                  },
                ],
              },

              // {
              //   id: 'onChainVolume',
              //   text: 'On Chain Volume',
              //   onClick: () => selectSeries(createOnChainVolumeSeries),
              // },
              //
              // SUPPLY IN PROFIT
              //
              // SUPPLY IN LOSS
              //
            ]}
          >
            {({ name, list }) => (
              <Labeled label={name}>
                <div class="flex flex-col space-y-2">
                  <For each={list}>
                    {({ id, text, onClick }) => {
                      const updateSelected = () => {
                        setState('selected', id)
                        onClick()
                      }

                      let button: HTMLButtonElement | undefined

                      createEffect(
                        on(
                          () => !!props.chart && !!props.candlesticks.last,
                          (launch) => {
                            if (launch && state.selected === id) {
                              console.log('init: select series')
                              updateSelected()
                              button?.scrollIntoView({ block: 'center' })
                            }
                          }
                        )
                      )

                      return (
                        <Show
                          when={
                            state.filter
                              ? text
                                  .toLowerCase()
                                  .includes(state.filter.toLowerCase())
                              : true
                          }
                        >
                          <Button
                            color={
                              state.selected === id ? 'primary' : undefined
                            }
                            ref={button}
                            onClick={updateSelected}
                          >
                            {text}
                          </Button>
                        </Show>
                      )
                    }}
                  </For>
                </div>
              </Labeled>
            )}
          </For>
        </div>
        <hr />
        <div class="space-y-6 p-2 pb-4">
          <Labeled label="Github">
            <Interactive
              component={'a'}
              href="https://github.com/sholong-org"
              full
            >
              <span class="w-full text-left">Source Code</span>
            </Interactive>
          </Labeled>
          <Labeled label="NOSTR" color="violet">
            <Button color="violet" full>
              <span class="w-full select-all text-left">
                pqopkdqwpdokqwdpokqwdpok
              </span>
            </Button>
          </Labeled>
          <Labeled label="Bitcoin" color="orange">
            <Button
              color="orange"
              class="leading-tighter select-all break-all text-left text-sm"
            >
              bc1qelhk22gh3hrycyqvager5803ce2z49mh4k2zja
            </Button>
          </Labeled>
          <Labeled label="Lightning" color="yellow">
            <Button
              color="yellow"
              class="select-all break-all text-left text-sm"
            >
              lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkcmmrv9k8x6rpd4jnzvcv2kqc0
            </Button>
          </Labeled>
        </div>
      </div>
    </div>
  )
}
