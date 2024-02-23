export const toTableRowItems = (items: CentralizeStoresHub[]) => items.map((item: CentralizeStoresHub) => ({
  id: item.id,
  store: item.store,
  deposit: item.deposit,
  hubs: item.hubs
}))