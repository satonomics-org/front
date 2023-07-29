import { Button, Input } from '/src/components'

import { List } from './components/list'

import { Footer } from '../footer'
import { Header } from '../header'

interface Props {
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  candlesticks: CandlesticksProp
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
      <div class="flex flex-1 flex-col overflow-y-auto">
        <List {...props} filter={state.filter} />
        <hr />
        <Footer />
      </div>
    </>
  )
}
