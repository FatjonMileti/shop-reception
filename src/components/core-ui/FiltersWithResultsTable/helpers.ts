export const hasNullFilters = (filters, filterValues) =>
  filters
    .filter(f => !f.isOptional)
    .map(f => f.name)
    .some(f => filterValues[f] === null)
