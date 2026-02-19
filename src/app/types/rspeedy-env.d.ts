/// <reference types="@lynx-js/rspeedy/client" />

declare module 'csstype' {
  interface Properties {
    [key: `--${string}`]: string | number | undefined
  }
}

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.module.scss' {
  const classes: Record<string, string>
  export = classes
}
