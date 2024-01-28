import { Grid } from '../Grid'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import React from 'react'

interface ModalFormActionButtonsProps{
  onCancel: () => void
  onSubmit: () => void
}

const ModalFormActionButtons: React.FC<ModalFormActionButtonsProps> = (props) => {
  const {
    onCancel,
    onSubmit,
  } = props

  return <Grid
    gridContainerStyle={{ margin: 0, marginTop: '20px' }}
    items={[
      <Button
        variant='outlined'
        label='Cancel'
        onClick={onCancel}
        size='large'
        style={{ width: '100%' }}
      />,
      <Button
        variant='contained'
        type='submit'
        label='Submit'
        onClick={onSubmit}
        size='large'
        style={{ width: '100%' }}
      />
    ]}
    itemsPerRow={2}
  />
}

export default ModalFormActionButtons