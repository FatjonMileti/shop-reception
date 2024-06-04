export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    sealCode: item.sealCode || '',
    destination: item.destination || '',
    sourceOperator: item.sourceOperator || '',
    created: item.created || '',
    destinationOperator: item.destinationOperator || '',
    conform: item.conform || '',
    verificationDate: item.verificationDate || ''
  }))
