import {
  baseBooleanPropsKeysObject,
  classPropToString,
  containerBooleanPropsKeysObject,
  removeProps,
  stylePropToCSSProperties,
} from '/src/components'
import { run } from '/src/scripts'

interface Props extends ContainerPropsWithHTMLAttributes {
  ref?: (ref: HTMLElement) => void
}

export const Container = (props: Props) => {
  const dynamicProps = removeProps(props, [
    baseBooleanPropsKeysObject,
    containerBooleanPropsKeysObject,
  ])

  return (
    <Dynamic
      {...mergeProps({ component: 'div' }, dynamicProps)}
      {...(props.style ? { style: stylePropToCSSProperties(props.style) } : {})}
      class={classPropToString([
        // Text color
        run(() => {
          switch (props.color) {
            case 'primary':
              return 'text-black'
            case 'yellow':
              return 'text-yellow-950 selection:bg-yellow-800'
            case 'orange':
              return 'text-orange-100 selection:bg-orange-800'
            case 'violet':
              return 'text-violet-100 selection:bg-violet-800'
          }
        }),

        // Background color
        run(() => {
          switch (props.color) {
            case 'red':
              return 'bg-red-950'
            case 'yellow':
              return 'bg-yellow-500'
            case 'primary':
              return 'bg-white dark:bg-opacity-80'
          }
        }),

        // Border width
        run(() => {
          if (props.border !== false) {
            switch (props.size) {
              default:
                return 'border'
            }
          }
        }),

        // Border color
        run(() => {
          switch (props.color) {
            case 'primary':
              return 'border-transparent'
            case 'yellow':
              return 'border-yellow-500/40'
            case 'orange':
              return 'border-orange-500/40'
            case 'violet':
              return 'border-violet-500/40'
            default:
              return 'border-white/20'
          }
        }),

        // Padding
        run(() => {
          switch (props.padding ?? props.size) {
            case 'xs':
              switch (props.orientation) {
                case 'horizontal':
                  return 'px-2 py-1'
                case 'vertical':
                  return 'px-1 py-2'
                default:
                  return 'p-1'
              }
            case 'sm':
              switch (props.orientation) {
                case 'horizontal':
                  return 'px-3 py-1.5'
                case 'vertical':
                  return 'px-1.5 py-3'
                default:
                  return 'p-1.5'
              }
            default:
              switch (props.orientation) {
                case 'horizontal':
                  return 'px-4 py-2'
                case 'vertical':
                  return 'px-2 py-4'
                default:
                  return 'p-2'
              }
          }
        }),

        // Roundness
        run(() => {
          switch (props.rounded) {
            case 'full':
              return 'rounded-full'
            case 'none':
              return
            default:
              return props.size === 'xs' || props.size === 'sm'
                ? 'rounded-md'
                : 'rounded-lg'
          }
        }),

        // Text size
        run(() => {
          switch (props.size) {
            case 'sm':
              return 'text-sm'
            case 'xs':
              return 'text-xs'
            default:
              return 'text-base'
          }
        }),

        'break-words',

        props.class,
      ])}
    >
      {props.children}
    </Dynamic>
  )
}
