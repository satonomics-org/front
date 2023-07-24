import { run } from '/src/scripts'

import { classPropToString } from '/src/components'

export interface Props extends Solid.ParentProps, BaseProps {
  label: string
}

export const Labeled = (props: Props) => {
  const id = props.label

  return (
    <div class="space-y-1">
      <label
        for={id}
        class={classPropToString([
          run(() => {
            switch (props.size) {
              case 'lg':
                return 'text-lg'
              default:
                return 'text-sm'
            }
          }),

          run(() => {
            switch (props.color) {
              case 'yellow':
                return 'text-yellow-400/60'
              case 'orange':
                return 'text-orange-400/60'
              case 'violet':
                return 'text-violet-400/60'
              default:
                return 'text-white/50'
            }
          }),

          'ml-2 break-words font-medium uppercase',

          props.class,
        ])}
      >
        {props.label}
      </label>
      <div id={id}>{props.children}</div>
    </div>
  )
}
