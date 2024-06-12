export const toTableRowItems = (items: ParentSociety[]) =>
  items.map((item: ParentSociety) => ({
    id: item.id,
    bankAccount: item.bankAccount || '',
    bankName: item.bankName || '',
    businessName: item.businessName || '',
    created: item.created || '',
    createdBy: item.createdBy || '',
    fiscalAddress: item.fiscalAddress || '',
    lastUpdate: item.lastUpdate || '',
    lastUpdateBy: item.lastUpdateBy || '',
    parentSocietyName: item.parentSocietyName || '',
    regNumber: item.regNumber || '',
    socialCap: item.socialCap || '',
    vatId: item.vatId || ''
  }))
