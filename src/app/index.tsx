import { Meta, Title } from '@solidjs/meta'

import {
  cleanChart,
  krakenAPI,
  presetsGroups,
  priceToUSLocale,
  run,
  scrollIntoView,
  selectPreset,
  updatePriceLine,
} from '/src/scripts'

import { createDarkModeTimer, createDatasetsResources } from './scripts'

import { Chart, DialogCore, Labeled, classPropToString } from '/src/components'

import { Header } from './components/header'
import { Live } from './components/live'
import { Menu } from './components/menu'
import { Preset } from './components/preset'

import { env } from '../env'
import packageJSONRaw from '/src/../package.json?raw'

const packageJSON = JSON.parse(packageJSONRaw)

const LOCAL_STORAGE_KEY = 'preset'

export const App = () => {
  const [state, setState] = createStore({
    resetChart: null as ChartResetter,
    candlesticks: {
      list: [],
      last: null,
    } as CandlesticksProp,
    indicators: {},
    selectedPreset: localStorage.getItem(LOCAL_STORAGE_KEY) || 'minimal',
    live: false,
    datasets: createDatasetsResources(),
  })

  createDarkModeTimer()

  let cleanWebSocket: (() => void) | undefined
  let scrollablePresets: HTMLDivElement | undefined
  let openDialog: DialogOpenFunction | undefined
  let closeDialog: DialogCloseFunction | undefined

  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, state.selectedPreset)
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
      ws = krakenAPI.createLiveCandleWebsocket((candle) => {
        console.log(`new: ${candle.close}`)

        if (!state.candlesticks.last) return

        setState('candlesticks', 'last', { ...candle })

        if (candlesticks.at(-1)?.time !== candle.time) {
          setState('candlesticks', 'list', (l) => [...l, candle])
        }
      })

      ws.addEventListener('open', () => {
        console.log('ws: open')
        setState('live', true)
      })
      ws.addEventListener('close', () => {
        console.log('ws: close')
        setState('live', false)
      })
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

  createEffect(() => {
    const {
      resetChart,
      selectedPreset,
      datasets,
      candlesticks: { last },
    } = state

    if (last) {
      untrack(() => {
        selectPreset(state.candlesticks, resetChart, selectedPreset, datasets)
      })
    }
  })

  onCleanup(() => {
    cleanChart()
    cleanWebSocket?.()
  })

  createEffect(() =>
    setGroupName(
      presetsGroups.find((group) =>
        group.list.map((series) => series.id).includes(state.selectedPreset)
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
          // state.dark && 'dark',
          '!h-[100dvh] h-screen overflow-hidden  border border-white  dark:border-opacity-80 dark:text-white/80 md:mr-[1px]',
          env.standalone && 'rounded-b-[3.25rem] md:rounded-none',
        ])}
      >
        <div class="flex h-full w-full flex-col dark:text-opacity-80 md:flex-row">
          <div class="hidden flex-none flex-col border-r border-white dark:border-opacity-80 md:flex md:w-64 lg:w-80">
            <Header />
            <hr />
            <Menu
              selectedPreset={state.selectedPreset}
              setSelectedPreset={(id: string) => setState('selectedPreset', id)}
              candlesticks={state.candlesticks}
            />
          </div>

          <div class="md:hidden">
            <Header />
            <hr />
          </div>
          <div class="relative h-full w-full flex-1 overflow-x-hidden">
            <Chart
              onResetChartCreated={(resetChart) => setState({ resetChart })}
              class={[state.candlesticks.last ? 'opacity-100' : 'opacity-0']}
            />
            <Live live={state.live} />
          </div>
          <div class="md:hidden">
            <hr />
            <Labeled label={groupName()} class="inline-block pl-14 pt-3">
              <div
                ref={scrollablePresets}
                class={classPropToString([
                  'flex snap-x snap-mandatory space-x-4 overflow-x-auto px-12',
                  env.standalone ? 'pb-8' : 'pb-4',
                ])}
                onScroll={(event) => {
                  Array.from(event.target.children).find((div) => {
                    const observer = new IntersectionObserver(
                      (entries) => {
                        if (entries[0].isIntersecting) {
                          setState('selectedPreset', div.id)
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
                <For each={presetsGroups}>
                  {({ list }) => (
                    <For each={list}>
                      {({ id }) => {
                        let ref: HTMLElement | undefined

                        createEffect(
                          on(
                            () => !!state.candlesticks.last,
                            (fetched) => {
                              if (fetched && state.selectedPreset === id) {
                                scrollIntoView(ref)
                              }
                            }
                          )
                        )

                        return (
                          <Preset
                            id={id}
                            selectedPreset={state.selectedPreset}
                            leftIcon={IconTablerList}
                            ref={(_ref) => (ref = _ref)}
                            onClick={() => openDialog?.(true)}
                            class="w-full flex-shrink-0 snap-center"
                          />
                        )
                      }}
                    </For>
                  )}
                </For>
              </div>
            </Labeled>
            <DialogCore
              title="Select Preset"
              onOpenCreated={(_openDialog) => (openDialog = _openDialog)}
              onCloseCreated={(_closeDialog) => (closeDialog = _closeDialog)}
              closeable
              padding={false}
              full
            >
              <Menu
                candlesticks={state.candlesticks}
                selectedPreset={state.selectedPreset}
                setSelectedPreset={(id) => {
                  setState('selectedPreset', id)

                  closeDialog?.()

                  scrollIntoView(
                    Array.from(scrollablePresets?.children || []).find(
                      (element) => element.id === id
                    )
                  )
                }}
              />
            </DialogCore>
          </div>
        </div>
      </div>
    </>
  )
}
