import { Meta, Title } from '@solidjs/meta'

import {
  cleanChart,
  createDatasets,
  createResources,
  presetsGroups,
  priceToUSLocale,
  renderChart,
  run,
  scrollIntoView,
  updateLastCandlestick,
} from '/src/scripts'

import { createDarkModeTimer } from './scripts'

import { Header, Live, Menu, Preset } from './components'

import { Chart, DialogCore, Labeled, classPropToString } from '/src/components'

import { env } from '../env'
import packageJSONRaw from '/src/../package.json?raw'
import { createASS } from '/src/solid'

const packageJSON = JSON.parse(packageJSONRaw)

const LOCAL_STORAGE_KEY = 'preset'

export const App = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const state = {
    selectedPreset: createASS(
      urlParams.get(LOCAL_STORAGE_KEY) ||
        localStorage.getItem(LOCAL_STORAGE_KEY) ||
        'minimal',
    ),
    favorites: createASS(
      JSON.parse(localStorage.getItem('favorites') || '[]') as string[],
      {
        equals: false,
      },
    ),
  }

  const resources = createResources()

  const datasets = createDatasets(resources)

  createDarkModeTimer()

  let scrollablePresets: HTMLDivElement | undefined
  let openDialog: DialogOpenFunction | undefined
  let closeDialog: DialogCloseFunction | undefined

  createEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, state.selectedPreset())

    urlParams.set(LOCAL_STORAGE_KEY, state.selectedPreset())
    window.history.pushState(null, '', urlParams.toString())
  })

  const lastCandle = createMemo(() => datasets.candlesticks.values()?.at(-1))

  const candlesticksFetched = createMemo(() => !!lastCandle())

  createEffect(() => updateLastCandlestick(lastCandle()))

  createEffect(() => {
    const id = state.selectedPreset()

    if (candlesticksFetched()) {
      untrack(() => {
        renderChart({
          candlesticks: datasets.candlesticks.values() || [],
          id,
          datasets,
        })
      })
    }
  })

  onCleanup(cleanChart)

  const groupName = createMemo(
    () =>
      presetsGroups.find((group) =>
        group.list.map((series) => series.id).includes(state.selectedPreset()),
      )?.name || '',
  )

  const favorite = (id: string) => {
    state.favorites().includes(id)
      ? state.favorites().splice(state.favorites().indexOf(id), 1)
      : state.favorites().push(id)

    state.favorites.set((l) => l)

    localStorage.setItem('favorites', JSON.stringify(state.favorites()))
  }

  return (
    <>
      <Title>
        {run(() => {
          const last = lastCandle()
          return `${
            last ? `${priceToUSLocale(last.close, false)} | ` : ''
          }Satonomics`
        })}
      </Title>
      <Meta name="description" content={packageJSON.description} />

      <div
        class={classPropToString([
          '!h-[100dvh] h-screen overflow-hidden  border border-white  dark:border-opacity-80 dark:text-white/80 md:mr-[1px]',
          env.standalone && 'rounded-b-[3.25rem] md:rounded-none',
        ])}
      >
        <div class="flex h-full w-full flex-col dark:text-opacity-80 md:flex-row">
          <div class="hidden flex-none flex-col border-r border-white dark:border-opacity-80 md:flex md:w-64 lg:w-96">
            <Header />
            <hr />
            <Menu
              selectedPreset={state.selectedPreset()}
              setSelectedPreset={(id: string) => state.selectedPreset.set(id)}
              candlesticksFetched={candlesticksFetched()}
              favorite={favorite}
              favorites={state.favorites()}
            />
          </div>

          <div class="md:hidden">
            <Header />
            <hr />
          </div>
          <div class="relative h-full w-full flex-1 overflow-x-hidden">
            <Chart class={[lastCandle() ? 'opacity-100' : 'opacity-0']} />
            <Live live={resources.candlesticks.live()} />
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
                          state.selectedPreset.set(div.id)
                        }
                        observer.disconnect()
                      },
                      {
                        threshold: 1,
                      },
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
                            () => candlesticksFetched(),
                            (fetched) => {
                              if (fetched && state.selectedPreset() === id) {
                                scrollIntoView(ref)
                              }
                            },
                          ),
                        )

                        return (
                          <Preset
                            id={id}
                            selectedPreset={state.selectedPreset()}
                            leftIcon={IconTablerList}
                            ref={(_ref) => (ref = _ref)}
                            onClick={() => openDialog?.(true)}
                            class="w-full flex-shrink-0 snap-center"
                            onFavorite={() => favorite(id)}
                            favorites={state.favorites()}
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
                candlesticksFetched={candlesticksFetched()}
                selectedPreset={state.selectedPreset()}
                setSelectedPreset={(id) => {
                  state.selectedPreset.set(id)

                  closeDialog?.()

                  scrollIntoView(
                    Array.from(scrollablePresets?.children || []).find(
                      (element) => element.id === id,
                    ),
                  )
                }}
                favorite={favorite}
                favorites={state.favorites()}
              />
            </DialogCore>
          </div>
        </div>
      </div>
    </>
  )
}
