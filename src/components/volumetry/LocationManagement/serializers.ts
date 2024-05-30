import { LocationManagementTableItem } from '../interfaces'

export const toTableLocations = (locations: LocationManagementTableItem[]) =>
  locations.map(location => ({
    id: location.id,
    locationName: location.locationName ?? '',
    locationCategory: location.locationCategory ?? '',
    locationType: location.locationType ?? ''
  }))
