import { classPropToString } from '/src/components'
import { run } from '/src/scripts'

export interface Props extends ParentProps, BaseProps {
  label: string
  divClass?: ClassProp
  labelClass?: ClassProp
}

export const Labeled = (props: Props) => {
  const id = props.label

  return (
    <div class={classPropToString(['space-y-1', props.divClass])}>
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

          props.labelClass,

          props.class,
        ])}
      >
        {props.label}
      </label>
      <div id={id}>{props.children}</div>
    </div>
  )
}
