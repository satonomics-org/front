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

          'ml-2 break-words font-medium uppercase text-white/50',

          props.class,
        ])}
      >
        {props.label}
      </label>
      <div id={id}>{props.children}</div>
    </div>
  )
}
