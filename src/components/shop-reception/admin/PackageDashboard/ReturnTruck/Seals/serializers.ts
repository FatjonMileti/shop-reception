import { formatUIDateTime } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    sealCode: item.sealCode ?? '',
    source: item.source ?? '',
    destination: item.destination ?? '',
    sourceOperator: item.sourceOperator ?? '',
    created: item.created ? formatUIDateTime(item.created) : '',
    destinationOperator: item.destinationOperator ?? '',
    conform: item.conform === true ? 'Da' : item.conform === false ? 'Nu' : '',
    verificationDate: item.verificationDate ? formatUIDateTime(item.verificationDate) : ''
  }))
