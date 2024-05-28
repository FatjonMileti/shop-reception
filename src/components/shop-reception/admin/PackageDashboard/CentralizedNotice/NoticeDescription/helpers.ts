export const getColumns = tableColumns =>
  tableColumns.map((column, index) => ({
    title: column,
    field: index,
    align: 'left'
  }))

const makeObjectFromArray = array => Object.assign({}, array)

const getNumberRows = (array, staticValue) =>
  makeObjectFromArray(['', '', '', staticValue, ...array, '', ''])

export const getRows = (
  noticesList,
  totalsForNoticesList,
  totalConfirmedSupportNumber,
  totalDifference
) => {
  const notices = noticesList.reduce((acc, list) => {
    const result = makeObjectFromArray(list.map(item => item ?? ''))
    acc = [...acc, result]
    return acc
  }, [])

  const totalNotices = getNumberRows(totalsForNoticesList, 'total-avize')
  const totalConfirmed = getNumberRows(totalConfirmedSupportNumber, 'RECEPTIONAT')
  const totalDif = getNumberRows(totalDifference, 'Diferente')

  return [...notices, totalNotices, totalConfirmed, totalDif]
}
