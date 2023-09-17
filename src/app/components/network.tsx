import { classPropToString } from '/src/components'

interface Props {
  live: boolean
  fetching: boolean
}

export const Network = (props: Props) => {
  return (
    <span class="absolute bottom-0 right-0 mb-1.5 mr-2.5 flex items-center space-x-1">
      <span
        class={classPropToString([
          props.fetching
            ? 'text-yellow-500'
            : props.live
            ? 'text-green-500'
            : 'text-red-500/50',
          'text-xs font-bold uppercase ',
        ])}
      >
        Live
      </span>
      <span class="relative flex h-3 w-3">
        <Show
          when={props.fetching}
          fallback={
            <>
              <Show when={props.live}>
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              </Show>
              <span
                class={classPropToString([
                  props.live ? 'bg-green-500' : 'bg-red-500/50',
                  'relative inline-flex h-3 w-3 rounded-full ',
                ])}
              ></span>
            </>
          }
        >
          <svg
            class="animate-spin text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-50"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </Show>
      </span>
    </span>
  )
}
