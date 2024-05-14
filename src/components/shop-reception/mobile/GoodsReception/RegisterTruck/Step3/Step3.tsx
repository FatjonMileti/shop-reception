import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import { useParams } from "react-router-dom";

const Step3 = () => {
  const { showNotification } = useNotification()
  let { id } = useParams();

  const { data: returnTruckModel, isLoading: isLoadingReturnTruck} = useQuery(
    'returnTruckModel',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getTruckModel/' + id, null);
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: {returnTruckModel.truckNumber}</Typography>
      <Typography variant='medium' component='p'>Destinație: {returnTruckModel.depositOrHubName}</Typography>
    </>,
    <div style={{display: 'flex'}}>
      <Input
        type='text'
        label='Scanează tip ambalaj'
        variant='standard'
        width='100%'
      />
      <IconButton>
        <ManageSearchIcon />
      </IconButton>
    </div>,
    <Divider>
      SAU
    </Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ TIP AMBALAJ'
      onClick={null}
      style={{ width: '100%' }}
    />,
    <Input
      type='text'
      label='Tip ambalaj'
      variant='standard'
      width='100%'
    />,
    <Input
      type='text'
      label='Număr ambalaje'
      variant='standard'
      width='100%'
    />,
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR'
      onClick={null}
      style={{ width: '100%' }}
    />
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default Step3
