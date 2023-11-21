export const createDynamicColumns = (initialColumns, data) => {
  if (!data?.length) {
    return initialColumns
  }

  const staticColumns = initialColumns.filter(col => !col.isGroup)
  const groupCols = initialColumns.filter(col => col.isGroup)
  const groupIndex = initialColumns.findIndex(col => col.isGroup)

  if (!groupCols.length) {
    return staticColumns
  }

  const populated = data.find(item => item.list.length)

  if (!populated) {
    return initialColumns
  }

  const newColumns = populated.list?.flatMap((interval, index) =>
    groupCols.map(col => {
      const additionalName = groupCols?.length === 1 ? '' : col.title

      return (
        {
          ...col,
          start: interval.start.slice(0, -3),
          end: interval.end.slice(0, -3),
          title: `${interval.start.slice(0, -3)} - ${interval.end.slice(0, -3)} ${additionalName}`,
          field: `list.${interval.name}.${col.field}`,
          disableSorting: true
        } || []
      )
    })
  )

  const orderdCols = newColumns.sort((col1, col2) =>
    col1.start.localeCompare(col2.start, undefined, { numeric: true })
  )

  let dynamicCols = staticColumns
  dynamicCols.splice(groupIndex, 0, ...orderdCols)

  return dynamicCols
}
