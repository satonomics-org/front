import { makeEventListener } from '@solid-primitives/event-listener'
import { leading, throttle } from '@solid-primitives/scheduled'
import { makeTimer } from '@solid-primitives/timer'
import { runWithOwner } from 'solid-js'

import { TEN_MINUTES_IN_MS, TEN_SECOND_IN_MS } from '/src/scripts'
import { createASS } from '/src/solid'

export const createResourceHTTP = <T>(
  fetch: () => Promise<T>,
  valuesOptions?: SignalOptions<T | null>,
) => {
  const values = createASS(
    null as T | null,
    valuesOptions ?? {
      equals: false,
    },
  )

  let lastSuccessfulFetch: Date | null
  let dispose: VoidFunction

  const debouncedFetch = leading(
    throttle,
    async (owner: Owner | null) => {
      if (
        !lastSuccessfulFetch ||
        new Date().valueOf() - lastSuccessfulFetch.valueOf() > TEN_MINUTES_IN_MS
      ) {
        const fetchedValues = await fetch()

        if (Array.isArray(fetchedValues)) {
          lastSuccessfulFetch = new Date()

          values.set(() => {
            console.log('values: setting...')
            return fetchedValues
          })
        }
      }

      dispose?.()
      runWithOwner(owner, async () => {
        dispose = makeTimer(() => debouncedFetch, TEN_MINUTES_IN_MS, setTimeout)
        onCleanup(dispose)
      })
    },
    TEN_SECOND_IN_MS,
  )

  const resource: ResourceHTTP<T> = {
    fetch(owner) {
      debouncedFetch(owner)
    },
    values,
  }

  return resource
}

export const createResourceWS = <T>(
  creator: (callback: (value: T) => void) => WebSocket,
) => {
  let ws: WebSocket | null = null

  const live = createASS(false)
  const latest = createASS<T | null>(null)

  let clearFocusListener: VoidFunction | undefined

  let clearOnlineListener: VoidFunction | undefined

  const resource: ResourceWS<T> = {
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
