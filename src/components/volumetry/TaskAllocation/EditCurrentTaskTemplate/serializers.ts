export const toCurrentTaskPayload = item => ({
  id: item.id,
  volume: { total: item.totalVolume }
})
