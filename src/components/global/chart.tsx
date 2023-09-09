import { createResizeObserver } from '@solid-primitives/resize-observer'

import { chartState, cleanChart, createChart } from '/src/scripts'

import { classPropToString } from '/src/components'

interface Props {
  class?: ClassProp
}

export const Chart = (props: Props) => {
  const [div, setDiv] = createSignal(undefined as HTMLDivElement | undefined)

  onMount(createChart)

  createResizeObserver(
    div,
    (div) => chartState.chart?.resize(div.width, div.height),
  )

  onCleanup(cleanChart)

  return (
    <div
      id="chart"
      ref={setDiv}
      class={classPropToString([
        'h-full w-full cursor-crosshair transition-opacity duration-300 ease-out',
        props.class,
      ])}
    />
  )
}
