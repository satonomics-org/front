type ContainerPropsWithHTMLAttributes = MergePropsWithHTMLProps<ContainerProps>

type ContainerProps = ContainerPropsOnly & BaseProps

interface ContainerPropsOnly extends ParentProps {
  component?: string | Component

  rounded?: 'full' | 'none'

  orientation?: 'horizontal' | 'vertical' | 'none'

  border?: boolean
}
