import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { useNotification } from '../../../../../../hooks'
import React, { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { toPayload } from './serializers'
import { FlexCenter } from '../../../../Common/FlexCenter'

const ContinueReturnDetailFinal = () => {
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='CONTINUARE RETUR CAMION' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>,
            <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>,
            <Typography variant='medium' component='p'>Numǎr stive: 2</Typography>
          ]}
          itemsPerRow={1}
        />,
        <FlexCenter>
          <Input
            type='text'
            label='Numǎr Aviz hub'
            variant='standard'
            width='100%'
            value={formik.values.hubNumber}
            onChange={event => formik.setFieldValue('hubNumber', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.hubNumber}
            helperText={formik.errors.hubNumber as string}
          />
          <IconButton>
            <CameraIcon />
          </IconButton>
        </FlexCenter>,
        <FlexCenter>
          <Input
            type='text'
            label='Numǎr Sigiliu'
            variant='standard'
            width='100%'
            value={formik.values.sealNumber}
            onChange={event => formik.setFieldValue('sealNumber', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.sealNumber}
            helperText={formik.errors.sealNumber as string}
          />
          <IconButton>
            <CameraIcon />
          </IconButton>
        </FlexCenter>,
        <Button
          type='button'
          variant='contained'
          label='ADAUGǍ ALT SIGILIU'
          size='small'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZǍ'
          size='large'
          onClick={() => formik.submitForm()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturnDetailFinal
