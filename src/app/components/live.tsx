import { classPropToString } from '/src/components'

interface Props {
  live: boolean
}

export const Live = (props: Props) => {
  return (
    <span class="absolute bottom-0 right-0 mb-1.5 mr-4 flex items-center space-x-1.5">
      <span
        class={classPropToString([
          props.live ? 'text-green-500' : 'text-red-500/50',
          'text-xs font-bold uppercase ',
        ])}
      >
        Live
      </span>
      <span class="relative flex h-3 w-3">
        <Show when={props.live}>
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        </Show>
        <span
          class={classPropToString([
            props.live ? 'bg-green-500' : 'bg-red-500/50',
            'relative inline-flex h-3 w-3 rounded-full ',
          ])}
        ></span>
      </span>
    </span>
  )
}
