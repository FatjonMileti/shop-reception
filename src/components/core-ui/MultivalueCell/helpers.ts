export const getShortDisplayText = (titles: string[], size: number): [string, number] => {
  const length = titles.length
  const textSize = size || 2

  if (length <= textSize) {
    return [titles.join(', '), 0]
  } else {
    const remainingCount = length - textSize
    return [titles.slice(0, textSize).join(', '), remainingCount]
  }
}

export const getOriginalDisplayText = (titles: string[]) => titles.join(', ')
