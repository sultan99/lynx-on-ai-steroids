/// <reference types="@lynx-js/rspeedy/client" />

declare module 'csstype' {
  interface Properties {
    [key: `--${string}`]: string | number | undefined
  }
}

declare module '*.module.css' {
  const classes: Record<string, string>
  export = classes
}
