import { Button, Input } from '/src/components'

import { List } from './components/list'

interface Props {
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  candlesticksFetched: boolean
}

export const Menu = (props: Props) => {
  const [state, setState] = createStore({
    filter: '',
  })

  return (
    <>
      <div class="flex space-x-1.5 p-2">
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
      <List {...props} filter={state.filter} />
    </>
  )
}
