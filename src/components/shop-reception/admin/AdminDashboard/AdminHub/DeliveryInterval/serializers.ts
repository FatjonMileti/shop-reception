export const toTableRowItems = (items: AdminHubDeliveryInterval[]) =>
  items.map((item: AdminHubDeliveryInterval) => ({
    depositId: item.depositId,
    receiveFromDeposit: item.receiveFromDeposit,
    depositName: item.depositName,
    depositCode: item.depositCode,
    monday: item.monday,
    tuesday: item.tuesday,
    wednesday: item.wednesday,
    thursday: item.thursday,
    friday: item.friday,
    saturday: item.saturday,
    sunday: item.sunday,
    startInterval: item.startInterval,
    endInterval: item.endInterval
  }))
