import { marked } from 'marked'

import { presetsGroups, scrollIntoView } from '/src/scripts'

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
  let ref: HTMLDivElement | undefined

  const color = createMemo(() =>
    props.selectedPreset === props.id ? 'primary' : undefined,
  )

  const preset = createMemo(() =>
    presetsGroups
      .map((group) => group.list)
      .flat()
      .find((preset) => preset.id === props.id),
  )

  const title = createMemo(() => preset()?.title || '')

  const description = createMemo(() =>
    marked.parse(preset()?.description || '', {
      mangle: false,
      headerIds: false,
    }),
  )

  const _scrollIntoView = () => scrollIntoView(ref, 'smooth')

  return (
    <div
      id={props.id}
      ref={(_ref) => {
        ref = _ref
        props.ref(_ref)
      }}
      class={classPropToString(['flex space-x-1.5', props.class])}
    >
      <Button
        full
        color={color()}
        leftIcon={props.leftIcon}
        onClick={() => {
          props.onClick()
          _scrollIntoView()
        }}
      >
        <span class="truncate">{title()}</span>
      </Button>
      {/* <Dialog
        color={undefined}
        closeable
        title={title()}
        button={{
          color: color(),
          icon: IconTablerInfoCircleFilled,
          onClick: () => _scrollIntoView(),
        }}
      >
        <div innerHTML={description()} />
      </Dialog> */}
    </div>
  )
}
