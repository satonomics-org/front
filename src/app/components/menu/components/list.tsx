import { presetsGroups, scrollIntoView } from '/src/scripts'

import { Labeled } from '/src/components'

import { Preset } from '../../preset'

interface Props {
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  candlesticksFetched: boolean
  filter: string
}

export const List = (props: Props) => {
  return (
    <div class="flex flex-1 flex-col space-y-6 overflow-y-auto p-2 pb-4">
      <For each={presetsGroups}>
        {({ name: group, list }) => (
          <Labeled label={group}>
            <div class="flex flex-col space-y-2">
              <For each={list}>
                {({ id, title }) => {
                  let ref: HTMLElement | undefined

                  createEffect(
                    on(
                      () => props.candlesticksFetched,
                      (fetched) => {
                        if (fetched && props.selectedPreset === id) {
                          scrollIntoView(ref)
                        }
                      },
                    ),
                  )

                  return (
                    <Show
                      when={
                        props.filter
                          ? (group + title)
                              .toLowerCase()
                              .includes(props.filter.toLowerCase())
                          : true
                      }
                    >
                      <Preset
                        id={id}
                        selectedPreset={props.selectedPreset}
                        ref={(_ref) => (ref = _ref)}
                        onClick={() => props.setSelectedPreset(id)}
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
