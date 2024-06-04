export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    hubName: item.hubName ?? '',
    parentSociety: item.parentSociety ?? '',
    supportType: item.supportType ?? '',
    intactNumber: item.intactNumber ?? '',
    computedIntactNumber: item.computedIntactNumber ?? '',
    brokenNumber: item.brokenNumber ?? '',
    defectPictureId: item.defectPictureId ?? '',
    computedDifference: item.computedDifference ?? '',
    computedTotalStock: item.computedTotalStock ?? '',
    createdBy: item.createdBy ?? '',
    createdDate: item.createdDate ?? ''
  }))
