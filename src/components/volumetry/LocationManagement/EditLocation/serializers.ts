import { LocationItemForm } from 'components/volumetry/interfaces'

export const toLocationPayload = (location: LocationItemForm) => ({
  categoryId: location.category.value,
  regionId: location.region.value
})
