import { useParams } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { BasicTable } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import s from '../../../../../commonStyles.modules.scss'
import { Grid } from '@mui/material'

const Images = () => {
  const { showNotification } = useNotification()
  const { id } = useParams()

  const shopCode = new URLSearchParams(location.search).get('shopCode')

  const { data } = useQuery(
    ['truck-images', id],
    async () => {
      if (id) {
        const result = await makeCoreGetRequest(
          `/shop-reception/truck/details/${id}?tab=images&shopCode=${shopCode}`
        )
        return result
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea datelor din tabel. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div>
      <Grid container>
        {typeof data?.pictureModels !== 'undefined' &&
          data?.pictureModels.map(image => (
            <Grid item xs={4}>
              <p>{image.type}</p>
              <p>{image.locationName}</p>
              <img src={image.path} width={200} height={200} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default Images
