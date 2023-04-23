declare module '*.svg' {
  import type { ComponentProps, FunctionComponent } from 'react'

  export const ReactComponent: FunctionComponent<
    ComponentProps<'svg'> & { title?: string }
  >
}
