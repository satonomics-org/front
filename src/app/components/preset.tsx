import { marked } from 'marked'

import { presetsGroups, scrollIntoView } from '/src/scripts'

import { Button, Dialog, classPropToString } from '/src/components'

import { createASS } from '/src/solid'

interface Props {
  id: string
  selectedPreset: string
  leftIcon?: IconProp
  ref?: (el: HTMLDivElement) => void
  onClick: () => void
  favorites: string[]
  onFavorite: () => void
  class?: ClassProp
}

export const Preset = (props: Props) => {
  const ref = createASS(undefined as HTMLDivElement | undefined)

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
    marked.parse(preset()?.description || ''),
  )

  const _scrollIntoView = () => scrollIntoView(ref(), undefined, 'smooth')

  return (
    <div
      id={props.id}
      ref={(_ref) => {
        ref.set(_ref)
        props.ref?.(_ref)
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
      <Dialog
        color={undefined}
        closeable
        title={title()}
        button={{
          color: color(),
          icon: IconTablerInfoCircle,
        }}
      >
        <div innerHTML={description()} />
      </Dialog>
      <Button
        icon={
          props.favorites.includes(props.id)
            ? IconTablerStarFilled
            : IconTablerStar
        }
        color={color()}
        iconClass={
          props.favorites.includes(props.id)
            ? color()
              ? '!text-yellow-700'
              : '!text-yellow-500'
            : undefined
        }
        onClick={props.onFavorite}
      />
    </div>
  )
}
