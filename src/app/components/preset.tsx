import { marked } from 'marked'

import { Button, classPropToString, Dialog } from '/src/components'
import { presetsGroups, scrollIntoView } from '/src/scripts'
import { createASS } from '/src/solid'

interface Props {
  id: string
  selectedPreset: string
  ref?: (el: HTMLDivElement) => void
  onClick: () => void
  favorites: string[]
  onFavorite: () => void
  class?: ClassProp
}

export const Preset = (props: Props) => {
  const ref = createASS(undefined as HTMLDivElement | undefined)

  const selected = createMemo(() => props.selectedPreset === props.id)

  const color = createMemo(() => (selected() ? 'primary' : undefined))

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
      class={classPropToString(['flex space-x-1', props.class])}
    >
      <Button
        full
        color={color()}
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
          icon: IconTablerInfoCircleFilled,
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
