import { marked } from 'marked'

import { presetsGroups } from '/src/scripts'

import { Button, Dialog, classPropToString } from '/src/components'

interface Props {
  id: string
  selectedPreset: string
  leftIcon?: IconProp
  ref: (el: HTMLDivElement) => void
  onClick: () => void
  class?: ClassProp
}

export const Preset = (props: Props) => {
  const color = createMemo(() =>
    props.selectedPreset === props.id ? 'primary' : undefined
  )

  const preset = createMemo(() =>
    presetsGroups
      .map((group) => group.list)
      .flat()
      .find((preset) => preset.id === props.id)
  )

  const title = createMemo(() => preset()?.title || '')

  const description = createMemo(() =>
    marked.parse(preset()?.description || '', {
      mangle: false,
      headerIds: false,
    })
  )

  return (
    <div
      id={props.id}
      ref={props.ref}
      class={classPropToString(['flex space-x-1.5', props.class])}
    >
      <Button
        full
        color={color()}
        leftIcon={props.leftIcon}
        onClick={props.onClick}
      >
        <span class="truncate">{title()}</span>
      </Button>
      <Dialog
        color={undefined}
        closeable
        title={title()}
        button={{
          color: color(),
          icon: IconTablerInfoCircleFilled,
        }}
      >
        <div innerHTML={description()} />
      </Dialog>
    </div>
  )
}
