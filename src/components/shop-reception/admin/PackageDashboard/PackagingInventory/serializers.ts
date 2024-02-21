export const toTableRowItems = (items: PackagingInventory[]) => items.map((item: PackagingInventory) => ({
  id: item.id,
  store: item.store,
  hub: item.hub,
  society: item.society,
  supportType: item.supportType,
  inventoryQualitative: item.inventoryQualitative,
  theoreticalBalanceQualitative: item.theoreticalBalanceQualitative,
  defectiveInventory: item.defectiveInventory,
  difference: item.difference,
  finalStockAfterInventory: item.finalStockAfterInventory,
  inventoryManager: item.inventoryManager,
  inventoryDate: item.inventoryDate
}))