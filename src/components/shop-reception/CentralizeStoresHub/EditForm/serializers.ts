export const toPayload = (item) => ({
  id: item.id,
  store: item.store,
  deposit: item.deposit,
  hubs: item.hubs
})