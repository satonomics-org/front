import { krakenAPI } from '/src/scripts'

import { createResourceWS } from './base'

export const createResourcesWS = () => {
  const resources: ResourcesWS = {
    latestCandle: createResourceWS(krakenAPI.createLiveCandleWebsocket),
  }

  resources.latestCandle.open()

  return resources
}
