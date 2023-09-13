import { makeEventListener } from '@solid-primitives/event-listener'
import { makeTimer } from '@solid-primitives/timer'
import { runWithOwner } from 'solid-js'

import { createASS } from '/src/solid'

import { TEN_MINUTES_IN_MS } from '../utils'

export const createResourceHTTP = <Value>(
  fetch: () => Promise<Value[]>,
  valuesOptions?: SignalOptions<Value[] | null>,
) => {
  const values = createASS(
    null as Value[] | null,
    valuesOptions ?? {
      equals: false,
    },
  )

  let lastSuccessfulFetch: Date | null

  const resource: ResourceHTTP<Value> = {
    async fetch(owner) {
      if (
        !lastSuccessfulFetch ||
        new Date().valueOf() - lastSuccessfulFetch.valueOf() > TEN_MINUTES_IN_MS
      ) {
        const fetchedValues = await fetch()

        if (Array.isArray(fetchedValues)) {
          lastSuccessfulFetch = new Date()

          values.set(fetchedValues)
        }
      }

      runWithOwner(owner, () => {
        const dispose = makeTimer(
          () => {
            resource.fetch(owner)
          },
          TEN_MINUTES_IN_MS,
          setTimeout,
        )

        onCleanup(dispose)
      })
    },
    values,
  }

  return resource
}

export const createResourceWS = <Value>(
  creator: (callback: (value: Value) => void) => WebSocket,
) => {
  let ws: WebSocket | null = null

  const live = createASS(false)
  const latest = createASS<Value | null>(null)

  let clearFocusListener: (() => void) | undefined

  let clearOnlineListener: (() => void) | undefined

  const resource: ResourceWS<Value> = {
    live,
    latest,
    open() {
      ws = creator((value) => latest.set(() => value))

      ws.addEventListener('open', () => {
        console.log('ws: open')
        live.set(true)
      })

      ws.addEventListener('close', () => {
        console.log('ws: close')
        live.set(false)
      })

      const reinitWebSocket = () => {
        if (!ws || ws.readyState === ws.CLOSED) {
          console.log('ws: reinit')
          resource.open()
        }
      }

      clearFocusListener = makeEventListener(window, 'focus', reinitWebSocket)

      clearOnlineListener = makeEventListener(window, 'online', reinitWebSocket)
    },
    close() {
      ws?.close()
      clearFocusListener = clearFocusListener?.() || undefined
      clearOnlineListener = clearOnlineListener?.() || undefined
      live.set(false)
      ws = null
    },
  }

  onCleanup(resource.close)

  return resource
}
