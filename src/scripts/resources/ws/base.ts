import { makeEventListener } from '@solid-primitives/event-listener'

import { createASS } from '/src/solid'

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

      clearFocusListener = makeEventListener(
        document,
        'visibilitychange',
        () => !document.hidden && reinitWebSocket(),
      )

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
