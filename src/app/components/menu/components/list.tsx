import { seriesGroups } from '/src/scripts'

import { Labeled } from '/src/components'

import { Series } from '../../series'

interface Props {
  selectedSeries: string
  setSelectedSeries: (id: string) => void
  candlesticks: CandlesticksProp
  filter: string
}

export const List = (props: Props) => {
  return (
    <div class="flex flex-1 flex-col space-y-6 p-2 pb-4">
      <For each={seriesGroups}>
        {({ name, list }) => (
          <Labeled label={name}>
            <div class="flex flex-col space-y-2">
              <For each={list}>
                {({ id, text }) => {
                  let ref: HTMLElement | undefined

                  createEffect(
                    on(
                      () => !!props.candlesticks.last,
                      (fetched) => {
                        if (fetched && props.selectedSeries === id) {
                          ref?.scrollIntoView({
                            block: 'nearest',
                            behavior: 'instant',
                          })
                        }
                      }
                    )
                  )

                  return (
                    <Show
                      when={
                        props.filter
                          ? (name + text)
                              .toLowerCase()
                              .includes(props.filter.toLowerCase())
                          : true
                      }
                    >
                      <Series
                        id={id}
                        selectedSeries={props.selectedSeries}
                        ref={(_ref) => (ref = _ref)}
                        onClick={() => props.setSelectedSeries(id)}
                        text={text}
                      />
                    </Show>
                  )
                }}
              </For>
            </div>
          </Labeled>
        )}
      </For>
    </div>
  )
}
