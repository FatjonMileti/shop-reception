import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import useRoles from '../useRoles'
import { getTitle } from '../GoodsReception/helpers'
import React from 'react'

interface TitleHeaderProps {
  title: string
}

const TitleHeader: React.FC<TitleHeaderProps> = (props: TitleHeaderProps) => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  return (
    <>
      <Typography component='h3' variant='regular' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Carrefour
        Operațional
      </Typography>
      <Typography component='h2' variant='medium' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
        {getTitle({ isShopUser, isHubUser, isWareHouseUser })}
      </Typography>
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        {props.title}
      </Typography>
    </>
  )
}

export default TitleHeader