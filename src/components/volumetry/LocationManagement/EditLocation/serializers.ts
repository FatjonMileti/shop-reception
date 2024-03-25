import { LocationItemForm } from 'components/volumetry/interfaces'

export const toLocationPayload = (location: LocationItemForm) => ({
  volumetryLocationCategoryId: location.category.value,
  regionId: location.region.value
})
