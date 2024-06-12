export const toTableRowItems = (items: MetiFile[]) =>
  items.map((item: MetiFile) => ({
    id: item.id,
    shopCode: item.shopCode || '',
    shopName: item.shopName || '',
    depositName: item.depositName || '',
    depositCode: item.depositCode || '',
    createdBy: item.createdBy || '',
    fileStatus: item.fileStatus || '',
    fileStatusValue: item.fileStatusValue,
    ticketExternalId: item.ticketExternalId || '',
    receivedFilePath: item.receivedFilePath || '',
    sentFilePath: item.sentFilePath || '',
    createdDate: item.createdDate || '',
    sentTime: item.sentTime || '',
    receivedTime: item.receivedTime || '',
    hasError: item.hasError || false,
    hasDifference: item.hasDifference || false,
    hasMetiDifference: item.hasMetiDifference || false,
    hasRetry: item.hasRetry || false,
    hasNotIntegrated: item.hasNotIntegrated || false,
    numberOfSentFiles: item.numberOfSentFiles || 0,
    numberOfReceivedFiles: item.numberOfReceivedFiles || 0
  }))
