import { Grid } from '../../Common/Grid'
import { Button, Checkbox, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { FlexCenter } from '../../Common/FlexCenter'

const options = [
  {
    field: 'confirm',
    label: 'Conform'
  },
  {
    field: 'confirm',
    label: 'Infoliere neconforma'
  },
  {
    field: 'confirm',
    label: 'Lipsa banda sigilare'
  },
  {
    field: 'confirm',
    label: 'Lipsa banda promo'
  },
  {
    field: 'confirm',
    label: 'Palet suprainaltat'
  },
  {
    field: 'confirm',
    label: 'Constructie defectuoasa'
  },
  {
    field: 'confirm',
    label: 'Palet rasturnat asigurat'
  },
  {
    field: 'confirm',
    label: 'Palet rasturnat ne-asigurat in camion'
  },
  {
    field: 'confirm',
    label: 'Palet lovit'
  }
]

const SupportCode = () => {
  const { showNotification } = useNotification()
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false)

  const toggleShowConfirmation = (): void => {
    setShowConfirmation(!showConfirmation)
  }

  const toggleIsSearching = (): void => {
    setIsSearching(!isSearching)
  }

  const toggleIsFinalizing = (): void => {
    toggleIsSearching()
    setIsFinalizing(!isFinalizing)
  }

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = formik.values

        showNotification({
          message: 'codul de suport nu a fost găsit',
          type: 'warning'
        })

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  let items = [
    <TitleHeader title='Cod Suport' />,
    <FlexCenter>
      <Input
        type='text'
        label='Cod Suport'
        variant='standard'
        width='100%'
        value={formik.values.supportCode}
        onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
        error={!!formik.errors.supportCode}
        helperText={formik.errors.supportCode as string}
      />
      <IconButton
        onClick={toggleIsSearching}
      >
        <ManageSearchIcon />
      </IconButton>
    </FlexCenter>,
    <Divider>SAU</Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ SUPORT'
      onClick={() => formik.handleSubmit()}
    />
  ]

  if (isSearching) {
    items = [
      ...items,
      <Typography variant='medium' component='p'>Numǎr suport: 46565454516</Typography>,
      <Input
        type='select'
        label='Tip Ambalaj'
        variant='standard'
        width='100%'
        value={formik.values.registrationNumber}
        values={[
          {
            value: 'none',
            label: 'Palate'
          }
        ]}
        onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
        error={!!formik.errors.registrationNumber}
        helperText={formik.errors.registrationNumber as string}
      />,
      <Button
        type='button'
        variant='contained'
        label='CONFORMITATE SUPORT'
        onClick={toggleShowConfirmation}
      />
    ]
  }

  if (showConfirmation) {
    items.push(
      <Grid
        hasPaper={true}
        items={options.map(option =>
          <Checkbox
            checked={false}
            onChange={event => formik.setFieldValue(option.field, (event.target as HTMLInputElement).value)}
            label={option.label}
          />
        )}
        itemsPerRow={1}
      />
    )
  }

  items = [
    ...items,
    <Button
      type='button'
      variant='contained'
      label='ALTE AMBALAJE'
      onClick={null}
    />,
    <Button
      type='button'
      variant='contained'
      label='CONFIRM TIP SUPORT'
      onClick={toggleIsFinalizing}
    />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: 56</Typography>
      <Typography variant='medium' component='p'>Numǎr suporți scanați: 0</Typography>
    </>
  ]

  if(isFinalizing){
    items.push(
      <Button
        type='button'
        variant='contained'
        label='FINALIZEAZĂ'
        size='large'
        onClick={() => formik.handleSubmit()}
      />
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

export default SupportCode
