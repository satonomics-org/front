import { Meta, Title } from '@solidjs/meta'

import { krakenAPI, priceToUSLocale, run, seriesGroups } from '/src/scripts'

import { cleanChart, selectSeries, updatePriceLine } from './scripts'

import { Chart, Labeled, classPropToString } from '/src/components'

import { Header } from './components/header'
import { Menu } from './components/menu'
import { Series } from './components/series'

import { env } from '../env'
import packageJSONRaw from '/src/../package.json?raw'

const packageJSON = JSON.parse(packageJSONRaw)

const LOCAL_STORAGE_KEY = 'series'

export const App = () => {
  const [state, setState] = createStore({
    resetChart: null as ChartResetter,
    candlesticks: {
      list: [],
      last: null,
    } as CandlesticksProp,
    indicators: {},
    selectedSeries: localStorage.getItem(LOCAL_STORAGE_KEY) || 'minimal',
  })

  let cleanWebSocket: (() => void) | undefined

  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, state.selectedSeries)
  )

  createEffect(
    on(
      () => ({ ...state.candlesticks.last }),
      () => updatePriceLine(state.candlesticks.last)
    )
  )

  createEffect(async () => {
    const candlesticks = await krakenAPI.fetchCandlesticks()

    setState('candlesticks', {
      list: candlesticks,
      last: candlesticks.at(-1),
    })

    let ws: WebSocket | null = null

    const initWebSocket = () => {
      const ws = krakenAPI.createLiveCandleWebsocket((candle) => {
        console.log(`new: ${candle.close}`)

        if (!state.candlesticks.last) return

        setState('candlesticks', 'last', { ...candle })

        if (candlesticks.at(-1)?.time !== candle.time) {
          setState('candlesticks', 'list', (l) => [...l, candle])
        }
      })

      ws.addEventListener('open', () => console.log('ws: open'))
      ws.addEventListener('close', () => console.log('ws: close'))
    }

    initWebSocket()

    const reinitWebSocket = () => {
      if (!ws || ws.readyState === ws.CLOSED) {
        console.log('ws: focus reopen')
        initWebSocket()
      }
    }

    document.addEventListener('focus', reinitWebSocket)

    cleanWebSocket = () => {
      document.removeEventListener('focus', reinitWebSocket)
      ws?.close()
    }
  })

  createEffect(() =>
    selectSeries(state.candlesticks, state.resetChart, state.selectedSeries)
  )

  onCleanup(() => {
    cleanChart()
    cleanWebSocket?.()
  })

  createEffect(() =>
    setGroupName(
      seriesGroups.find((group) =>
        group.list.map((series) => series.id).includes(state.selectedSeries)
      )?.name || ''
    )
  )

  const [groupName, setGroupName] = createSignal('')

  return (
    <>
      <Title>
        {run(() => {
          const { last } = state.candlesticks
          return `${last ? `${priceToUSLocale(last.close)} | ` : ''}sholong`
        })}
      </Title>
      <Meta name="description" content={packageJSON.description} />

      <div
        class={classPropToString([
          '!h-[100dvh] h-screen overflow-hidden  border border-white md:mr-[1px]',
          env.standalone && 'rounded-b-[3.25rem] md:rounded-none',
        ])}
      >
        <div class="flex h-full w-full flex-col md:flex-row">
          <Menu
            selectedSeries={state.selectedSeries}
            setSelectedSeries={(id: string) => setState('selectedSeries', id)}
            candlesticks={state.candlesticks}
          />

          <div class="md:hidden">
            <Header />
            <hr />
          </div>
          <div class="h-full w-full flex-1 overflow-x-hidden">
            <Chart
              onResetChartCreated={(reset) => setState({ resetChart: reset })}
              class={[state.candlesticks.last ? 'opacity-100' : 'opacity-0']}
            />
          </div>
          <div class="md:hidden">
            <hr />
            <Labeled label={groupName()} class="inline-block pl-14 pt-3">
              <div
                class={classPropToString([
                  'flex snap-x snap-mandatory space-x-6 overflow-x-auto px-12',
                  env.standalone ? 'pb-8' : 'pb-4',
                ])}
                onScroll={(event) => {
                  console.log('event', event)

                  Array.from(event.target.children).find((div) => {
                    const observer = new IntersectionObserver(
                      (entries) => {
                        if (entries[0].isIntersecting) {
                          setState('selectedSeries', div.id)
                        }

                        observer.disconnect()
                      },
                      {
                        threshold: 1,
                      }
                    )

                    observer.observe(div)
                  })
                }}
              >
                <For each={seriesGroups}>
                  {({ name, list }) => (
                    <For each={list}>
                      {({ id, text }) => {
                        let ref: HTMLElement | undefined

                        createEffect(
                          on(
                            () => !!state.candlesticks.last,
                            (fetched) => {
                              if (fetched && state.selectedSeries === id) {
                                ref?.scrollIntoView({
                                  block: 'nearest',
                                  behavior: 'instant',
                                })
                              }
                            }
                          )
                        )

                        return (
                          <Series
                            id={id}
                            selectedSeries={state.selectedSeries}
                            leftIcon={IconTablerList}
                            ref={(_ref) => (ref = _ref)}
                            onClick={() => {}}
                            text={text}
                            class="w-full flex-shrink-0 snap-center"
                          />
                        )
                      }}
                    </For>
                  )}
                </For>
              </div>
            </Labeled>
          </div>
        </div>
      </div>
    </>
  )
}
