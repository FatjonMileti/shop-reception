export const getImageTitle = image => {
  switch (image.type) {
    case 'RETURN_TRUCK_NOTICE':
      return `Incarcare retur in magazin ${image.locationName} - Aviz`
    case 'RETURN_TRUCK_SEAL':
      return `Incarcare retur in magazin ${image.locationName} - Sigiliu`
    case 'RETURN_TRUCK_HUB_RECEPTION_SEAL':
      return `Receptie retur in ${image.locationName} - Sigiliu`
    case 'RETURN_TRUCK_HUB_RECEPTION_NOTICE':
      return `Receptie retur in ${image.locationName} - Aviz`
    case 'RETURN_TRUCK_DEPOSIT_SEAL':
      return `Receptie retur in depozit ${image.locationName} - Sigiliu`
    case 'RETURN_TRUCK_DEPOSIT_NOTICE':
      return `Receptie retur in depozit ${image.locationName} - Aviz`
    case 'RETURN_TRUCK_HUB_REGISTER_SEAL':
      return `Incarcare retur in ${image.locationName} - Sigiliu`
    case 'RETURN_TRUCK_HUB_REGISTER_NOTICE':
      return `Incarcare retur in ${image.locationName} - Aviz`
    default:
      return ''
  }
}
