export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    code: item.code || '',
    name: item.name || '',
    type: item.type?.value || '',
    validityPercentage: item.validityPercentage || '',
    active: item.active || false,
    acceptReturn: item.acceptReturn || false,
    cif: item.cif || '',
    office: item.office || '',
    bankName: item.bankName || '',
    bankAccount: item.bankAccount || '',
    capital: item.capital || '',
    workingPoint: item.workingPoint || '',
    address: item.address || '',
    emails: item.emails || [],
    packagingResponsibleEmail: item.packagingResponsibleEmail || ''
  }))
