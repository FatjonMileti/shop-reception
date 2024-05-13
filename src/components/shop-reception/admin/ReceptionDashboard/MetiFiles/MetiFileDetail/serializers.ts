export const toTableRowItems = (items: MetiFile[]) =>
  items.map((item: MetiFile) => ({
    id: item.id,
    shopCode: item.shopCode,
    shopName: item.shopName,
    depositName: item.depositName,
    depositCode: item.depositCode,
    createdBy: item.createdBy,
    fileStatus: item.fileStatus,
    ticketExternalId: item.ticketExternalId,
    receivedFilePath: item.receivedFilePath,
    sentFilePath: item.sentFilePath,
    createdDate: item.createdDate,
    sentTime: item.sentTime,
    receivedTime: item.receivedTime,
    hasError: item.hasError,
    hasDifference: item.hasDifference,
    hasMetiDifference: item.hasMetiDifference,
    hasRetry: item.hasRetry,
    hasNotIntegrated: item.hasNotIntegrated,
    numberOfSentFiles: item.numberOfSentFiles,
    numberOfReceivedFiles: item.numberOfReceivedFiles
  }))
