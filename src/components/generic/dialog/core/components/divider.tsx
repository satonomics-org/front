import { classPropToString } from '/src/components'

interface Props extends BaseProps {}

export const DialogDivider = (props: Props) => {
  return (
    <Show when={props.color !== 'transparent'}>
      <hr
        class={classPropToString([
          'flex-none border-t border-white  dark:border-opacity-80',

          props.class,
        ])}
      />
    </Show>
  )
}
