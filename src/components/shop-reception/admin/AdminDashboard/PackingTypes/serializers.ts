export const toTableRowItems = (items: PackingType[]) =>
  items.map((item: PackingType) => ({
    id: item.id,
    code: item.code || '',
    externalCode: item.externalCode || '',
    name: item.name || '',
    main: item.main,
    combined: item.combined,
    missing: item.missing,
    active: item.active,
    alternativeCodes: item.alternativeCodes || '',
    returnable: item.returnable
  }))
