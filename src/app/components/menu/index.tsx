import { Button, Input } from '/src/components'

import { List } from './components/list'

import { Footer } from '../footer'
import { Header } from '../header'

interface Props {
  selectedSeries: string
  setSelectedSeries: (id: string) => void
  candlesticks: CandlesticksProp
}

export const Menu = (props: Props) => {
  const [state, setState] = createStore({
    filter: '',
  })

  return (
    <div class="hidden flex-none flex-col border-r border-white md:flex md:w-64 lg:w-80">
      <div class="hidden md:block">
        <Header />
        <hr />
      </div>
      <div class="flex space-x-2 p-2">
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
    </div>
  )
}
