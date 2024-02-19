import { LocationManagementTableItem } from '../interfaces'

export const toTableLocations = (locations: LocationManagementTableItem[]) =>
  locations.map(location => ({
    id: location.id,
    name: location.name ?? '',
    region: location.region ?? '',
    category: location.category ?? '',
    locationType: location.locationType ?? ''
  }))
