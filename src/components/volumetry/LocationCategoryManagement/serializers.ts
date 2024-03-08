export const toTableLocations = locationCategories =>
  locationCategories.map(category => ({
    id: category.id,
    name: category.name ?? '',
    description: category.description ?? ''
  }))
