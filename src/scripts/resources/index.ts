import { createResourcesHTTP } from './http'
import { createResourcesWS } from './ws'

export const createResources = () => {
  const resources: Resources = {
    http: createResourcesHTTP(),
    ws: createResourcesWS(),
  }

  return resources
}
