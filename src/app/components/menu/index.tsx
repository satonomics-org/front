import { Footer, List } from './components'

import { Button, Input } from '/src/components'

interface Props {
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  favorites: string[]
  favorite: (id: string) => void
  candlesticksFetched: boolean
}

export const Menu = (props: Props) => {
  const [state, setState] = createStore({
    filter: '',
  })

  return (
    <>
      <div class="flex space-x-1 p-2">
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
      <div class="overflow-y-auto">
        <List {...props} filter={state.filter} />
        <hr />
        <Footer />
      </div>
    </>
  )
}
