import { createLazyDatasets } from './lazy'
import { createResourceDatasets } from './resource'

export {
  convertNormalCandleToGoldPerBitcoinCandle,
  convertNormalCandleToSatCandle,
} from './lazy'

export const USABLE_CANDLESTICKS_START_DATE = '2012-01-01'

export const createDatasets = (resources: ResourcesHTTP) => {
  const resourceDatasets = createResourceDatasets(resources)

  const lazyDatasets = createLazyDatasets(resourceDatasets)

  return {
    ...resourceDatasets,
    ...lazyDatasets,
  }
}
