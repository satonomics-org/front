import { Meta, Title } from '@solidjs/meta'

import packageJSONRaw from '/src/../package.json?raw'
import { Chart, classPropToString, DialogCore, Labeled } from '/src/components'
import { env } from '/src/env'
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
import { createASS } from '/src/solid'

import { Header, Menu, Network, Preset, Update } from './components'
import { createDarkModeTimer } from './scripts'

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

  const datasets = createDatasets(resources.http)

  createDarkModeTimer()

  let scrollablePresets: HTMLDivElement | undefined
  let openDialog: DialogOpenFunction | undefined
  let closeDialog: DialogCloseFunction | undefined

  createEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, state.selectedPreset())

    urlParams.set(LOCAL_STORAGE_KEY, state.selectedPreset())

    window.history.replaceState(null, '', urlParams.toString())
  })

  createEffect(() => updateLastCandlestick(resources.ws.latestCandle.latest()))

  createEffect(() => {
    const latestClose = resources.ws.latestCandle.latest()?.close

    latestClose && console.log('close:', latestClose)
  })

  createEffect(() => {
    const candlesticks = datasets.candlesticks.values() || []

    if (candlesticks.length) {
      renderChart({
        datasets,
        id: state.selectedPreset(),
        latestCandle: resources.ws.latestCandle.latest,
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

  const fetching = createMemo(() =>
    Object.values(resources)
      .filter((resource) => 'loading' in resource)
      .some((resource: ResourceHTTP) => resource.loading()),
  )

  const favorite = (id: string) => {
    state.favorites.set((favorites) => {
      favorites.includes(id)
        ? favorites.splice(favorites.indexOf(id), 1)
        : favorites.push(id)

      return favorites
    })

    localStorage.setItem('favorites', JSON.stringify(state.favorites()))
  }

  return (
    <>
      <Title>
        {run(() => {
          const last = resources.ws.latestCandle.latest()
          return `${
            last ? `${priceToUSLocale(last.close, false)} | ` : ''
          }Satonomics`
        })}
      </Title>
      <Meta name="description" content={packageJSON.description} />

      <Update resources={resources} />

      <div
        class={classPropToString([
          '!h-[100dvh] h-screen overflow-hidden  border border-white  dark:border-opacity-80 dark:text-white/80 md:mr-[1px]',
          env.standalone && 'rounded-b-[3.25rem] md:rounded-none',
        ])}
      >
        <div class="flex h-full w-full flex-col dark:text-opacity-80 md:flex-row">
          <div class="hidden flex-none flex-col border-r border-white dark:border-opacity-80 md:flex md:w-80 lg:w-96">
            <Header />
            <hr />
            <Menu
              selectedPreset={state.selectedPreset()}
              setSelectedPreset={(id: string) => state.selectedPreset.set(id)}
              favorite={favorite}
              favorites={state.favorites()}
            />
          </div>

          <div class="md:hidden">
            <Header />
            <hr />
          </div>
          <div class="relative h-full w-full flex-1 overflow-x-hidden">
            <Chart
              class={[
                resources.http.candlesticks.values()?.length &&
                resources.ws.latestCandle.latest()
                  ? 'opacity-100'
                  : 'opacity-0',
              ]}
            />
            <Network
              live={resources.ws.latestCandle.live()}
              fetching={fetching()}
            />
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
                        let ref = createASS(
                          undefined as HTMLElement | undefined,
                        )

                        // if (state.selectedPreset() === id) {
                        //   scrollIntoView(ref())
                        // }

                        return (
                          <Preset
                            id={id}
                            selectedPreset={state.selectedPreset()}
                            ref={ref.set}
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
              title="Presets"
              onOpenCreated={(_openDialog) => (openDialog = _openDialog)}
              onCloseCreated={(_closeDialog) => (closeDialog = _closeDialog)}
              closeable
              padding={false}
              full
            >
              <Menu
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
