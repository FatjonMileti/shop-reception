export const toTableRowItems = (items: PackagingInventoryHistory[]) => items.map((item: PackagingInventoryHistory) => ({
  id: item.id,
  store: item.store,
  supportType: item.supportType,
  qualitative: item.qualitative,
  defective: item.defective,
  inventoryManager: item.inventoryManager,
  inventoryDate: item.inventoryDate
}))