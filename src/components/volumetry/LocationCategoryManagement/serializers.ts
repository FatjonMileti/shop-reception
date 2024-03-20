import { formatUIDateTime } from "utils/helpers";

export const toTableLocations = locationCategories =>
  locationCategories.map(category => ({
    id: category.id,
    category: category.category ?? '',
    description: category.description ?? '',
    locationType: category.locationType ?? '',
    createdAt: category.createdAt ? formatUIDateTime(category.createdAt) : '',
    createdBy: category.createdBy ?? '',
    lastModifiedAt: category.lastModifiedAt ? formatUIDateTime(category.lastModifiedAt) : '',
    lastModifiedBy: category.lastModifiedBy ?? ''
  }))
