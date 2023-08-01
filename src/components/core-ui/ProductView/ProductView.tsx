import s from './ProductView.modules.scss'
import { useParams } from 'react-router-dom'
import { Paper } from '@mui/material'

function ProductView() {
  const { id } = useParams()
  console.log(id)

  return (
    <Paper className={s.productTab}>
      <div className={s.content}>
        <div className={s.text}>
          <div className={s.title}>Ingrediente</div>
          <div className={s.body}>
            200 g faina neagra 650 g faina alba 650 400 ml apa 125 g amestec seminte 2 lingurite de
            sare faina pentru dat forma
          </div>
        </div>
        <img width={250} height={250} src="images/default-product-image.svg" />
      </div>
    </Paper>
  )
}

export default ProductView
