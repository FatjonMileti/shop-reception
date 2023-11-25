import { useMemo } from 'react'

export const getTitle = ({ isShopUser, isHubUser, isWareHouseUser }) => {
  return useMemo(() => {
    if (isShopUser) {
      return 'Hyper Oradea'
    } else if (isHubUser) {
      return 'HUB CLUJ'
    } else if (isWareHouseUser) {
      return 'DEPOZIT CEFIN AMBIENT'
    }
    return 'Nu'
  }, [isShopUser, isHubUser, isWareHouseUser])
}