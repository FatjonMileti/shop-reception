export const getModalWidth = formItemsPerRow => {
  switch (formItemsPerRow) {
    case 1:
      return '30%'
    case 2:
      return '50%'
    default:
      return '30%'
  }
}

export const getGridSize = formItemsPerRow => 12 / formItemsPerRow
