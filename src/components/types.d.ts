type IconProp = string | ((...args: any[]) => JSXElement) | true

type ClassProp = string | (ClassProp | string | false | undefined)[]

type StyleProp = string | CSSProperties

type BooleanPropsKeysObject<Props> = {
  [T in keyof Required<Props>]: boolean
}

type MergePropsWithHTMLProps<
  T,
  AnyHTMLAttributes extends HTMLAttributes = HTMLAttributes,
> = T & Omit<AnyHTMLAttributes, keyof T>
