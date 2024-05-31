import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Capsule } from 'components/core-ui/Capsule'
import { useNavigate } from 'react-router-dom'

interface AlertDetailsProps {
  item: any
}

const AlertDetails: React.FC<AlertDetailsProps> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <>
      <Grid container>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cod" value={item.articleId} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Cantitate LSO" value={item.lsoQuantity} />
        </Grid>
        <Grid item mt={1} mr={1}>
          <Capsule label="Stoc" value={item.realTimeStock} />
        </Grid>
      </Grid>

      {/* <Grid item mt={1} mr={1} alignSelf={'right'}>
        <Button
          variant="outlined"
          label="Vezi detalii"
          onClick={() => navigate(`/lostSalesOpportunities/tasks/${item.id}`)}
        />
      </Grid> */}
    </>
  )
}

export default AlertDetails
