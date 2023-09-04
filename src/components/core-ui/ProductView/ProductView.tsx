import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { makeCoreGetRequest } from 'utils/api'

import CircularProgress from '@mui/material/CircularProgress'

import s from './ProductView.modules.scss'

function ProductView(props) {
  const { action } = props
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const id = searchParams.get('id')

  const handleData = async id => {
    setLoading(true)

    const response = await makeCoreGetRequest(`${action.url}/${id}`)
    setProduct(response)

    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      handleData(id)
    }
  }, [id])

  return (
    <Paper className={s.productTab}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={s.content}>
          <div className={s.text}>
            <div className={s.title}>Ingrediente</div>
            <div className={s.body}>
              {product.fabricationMethod}
            </div>
          </div>
          <div>
            <img width={250} height={250} src={product.imageUrl}/>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default ProductView
