import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'
import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { useWindowSize } from '@solid-primitives/resize-observer'

export const createRelativePositionEffect = (
  dialog: HTMLDialogElement | undefined,
  element: HTMLElement,
) => {
  if (!dialog) {
    return
  }

  const windowSize = useWindowSize()

  let cleanup: VoidFunction | undefined

  const [isIntersecting, setIsIntersecting] = createSignal(false)

  createEffect(
    on(
      [isIntersecting, () => [windowSize.height, windowSize.width]],
      ([isIntersecting]) => {
        cleanup?.()

        if (
          // TODO: Wait for a fix or fix it somehow
          // Portal breaks first intersection observer in Chrome
          // isIntersecting &&
          window.getComputedStyle(dialog).position === 'absolute' // Checking again for mobile iirc ?
        ) {
          cleanup = autoUpdate(element, dialog, async () => {
            const { x, y } = await computePosition(element, dialog, {
              middleware: [
                offset(4),
                flip(),
                shift({
                  padding: 5,
                }),
              ],
            })

            Object.assign(dialog.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${element?.clientWidth}px`,
            })
          })
        }
      },
    ),
  )

  createIntersectionObserver(
    () => [element],
    ([entry]) => setIsIntersecting(entry?.isIntersecting ?? false),
  )

  onCleanup(() => {
    cleanup?.()
  })
}
