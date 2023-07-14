export const getStylePosition = (position: string) => {
  switch (position) {
    case 'top-left':
      return { top: 0, left: 0 }
    case 'top-right':
      return { top: 0, right: 0 }
    case 'bottom-left':
      return { bottom: 0, left: 0 }
    case 'bottom-right':
      return { bottom: 0, right: 0 }
    default:
      return { bottom: '4%', right: '2.5%' }
  }
}
