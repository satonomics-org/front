import { Button, Dialog, classPropToString } from '/src/components'

interface Props {
  id: string
  selectedSeries: string
  text: string
  leftIcon?: IconProp
  ref: (el: HTMLDivElement) => void
  onClick: () => void
  class?: ClassProp
}

export const Series = (props: Props) => {
  const color = createMemo(() =>
    props.selectedSeries === props.id ? 'primary' : undefined
  )

  return (
    <div
      id={props.id}
      ref={props.ref}
      class={classPropToString(['flex space-x-1', props.class])}
    >
      <Button
        full
        color={color()}
        leftIcon={props.leftIcon}
        onClick={props.onClick}
        class={'truncate'}
      >
        {props.text}
      </Button>
      <Dialog
        color={undefined}
        closeable
        button={{
          color: color(),
          icon: IconTablerInfoCircleFilled,
        }}
      >
        Description
      </Dialog>
    </div>
  )
}
