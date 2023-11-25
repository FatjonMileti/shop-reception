export const getTitle = ({ isShopUser, isHubUser, isWareHouseUser }) => {
  if (isShopUser) {
    return 'Hyper Oradea'
  } else if (isHubUser) {
    return 'HUB CLUJ'
  } else if (isWareHouseUser) {
    return 'DEPOZIT CEFIN AMBIENT'
  }
  return 'Nu'
}