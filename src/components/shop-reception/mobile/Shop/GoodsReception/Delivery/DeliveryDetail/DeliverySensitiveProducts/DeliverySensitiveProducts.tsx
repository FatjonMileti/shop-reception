import { Grid } from '../../../../../../Common/Grid'
import { TitleHeader } from '../../../../../Common/TitleHeader'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../../../../constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SensitiveProduct } from '../../../../GoodsReception/SensitiveProduct'

const sensitiveProducts: any[] = [
  {
    id: 1,
    storeType: 'B1',
    storeCode: 'CRAIOVA (3054)',
    storeName: 'CRAIOVA (3054)',
    district: 'DEPOZIT BRAZI NON FOOD',
    family: 'PH01DEP',
    subfamily: 'DEPOZITBRA',
    UbCode: '3095940',
    productCode: '256822'
  }
]

const DeliverySensitiveProducts = () => {
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='PRODUSE SENSIBILE VALIDARE LIVRARE' />,
    <Grid
      hasPaper={true}
      spacing={1}
      items={[
        <Typography variant='medium' component='h5'>PRODUSE SENSIBILE</Typography>,
        <Typography variant='medium' component='p'>Număr înmatriculare: BL75876</Typography>,
        <Typography variant='medium' component='p'>Suporți verificați: 0 / 1</Typography>
      ]}
      itemsPerRow={1}
    />,
    ...sensitiveProducts?.map((item: any, index) => (
      <SensitiveProduct onClick={() => {
        navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM)
      }} item={item} />
    ))
  ]

  if (sensitiveProducts.length === 0) {
    items.push(
      <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>nu
        existǎ camioane de validat</Typography>
    )
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default DeliverySensitiveProducts
