import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useParams } from 'react-router-dom'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'

const PackagingDisputesTimerDetail = () => {
  const { id } = useParams()
  return (
    <Grid
      hasPaper={true}
      items={[
        <TitleHeader title={`Editează timer FIRST_TYPE (${id})`} />,
        <>
          <Typography variant='mono'>
            Tip timer
          </Typography>
          <Typography variant='light'>
            A doua notificare
            Descrirere timer the second final notification in which the store is notified that the litigation task
            in the system has been automatically closed and that it will be charged the difference.
          </Typography>
        </>,
        <Input
          type='number'
          onChange={event => null}
          label='Valoare timer'
          variant='outlined'
          style={{ width: '100%' }}
          value='2'
        />,
        <Button variant='contained' label='Salvează' onClick={null} />
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingDisputesTimerDetail