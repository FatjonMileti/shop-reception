export const toImagesData = data =>
  data.litigationImageList.map(item => ({
    ...item,
    title: `Dovada atasata in ${item.locationName}`
  }))
