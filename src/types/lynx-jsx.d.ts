declare namespace JSX {
  interface IntrinsicElements {
    view: {
      className?: string
      bindtap?: (event: any) => void
      children?: any
    }

    image: {
      className?: string
      src?: string
    }
  }
}
