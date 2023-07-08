declare module '*.svg'
declare module '*.svg?react' {
  import type { ComponentProps, FunctionComponent } from 'react'

  export const ReactComponent: FunctionComponent<
    ComponentProps<'svg'> & { title?: string }
  >
}
