import { presetsGroups, scrollIntoView } from '/src/scripts'

import { Labeled } from '/src/components'

import { Preset } from '../../preset'

interface Props {
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  favorites: string[]
  favorite: (id: string) => void
  candlesticksFetched: boolean
  filter: string
}

export const List = (props: Props) => {
  const presets = presetsGroups.map((group) => group.list).flat()

  const favoriteGroup = createMemo<PresetsGroup>(() => ({
    name: 'Favorites',
    list: props.favorites.flatMap(
      (favorite) => presets.find((preset) => favorite === preset.id) || [],
    ),
  }))

  onMount(() =>
    scrollIntoView(document.getElementById(props.selectedPreset), 'center'),
  )

  return (
    <div class="flex flex-1 flex-col space-y-6 p-2 pb-4">
      <For each={[favoriteGroup(), ...presetsGroups]}>
        {({ name: group, list }) => {
          const filteredList = createMemo(() =>
            props.filter
              ? list.filter(({ title }) =>
                  (group + title)
                    .toLowerCase()
                    .includes(props.filter.toLowerCase()),
                )
              : list,
          )

          return (
            <Show when={filteredList().length}>
              <Labeled label={group}>
                <div class="flex flex-col space-y-2">
                  <For each={filteredList()}>
                    {({ id }) => (
                      <Preset
                        id={id}
                        selectedPreset={props.selectedPreset}
                        onClick={() => props.setSelectedPreset(id)}
                        favorites={props.favorites}
                        onFavorite={() => props.favorite(id)}
                      />
                    )}
                  </For>
                </div>
              </Labeled>
            </Show>
          )
        }}
      </For>
    </div>
  )
}
