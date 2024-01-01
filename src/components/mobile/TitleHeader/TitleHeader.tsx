import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import useRoles from '../useRoles'
import { getTitle } from '../GoodsReception/helpers'

const TitleHeader = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  return (
    <>
      <Typography component='h3' variant='regular' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Carrefour
        Operațional
      </Typography>
      <Typography component='h2' variant='medium' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
        {getTitle({ isShopUser, isHubUser, isWareHouseUser })}
      </Typography>
    </>
  )
}

export default TitleHeader