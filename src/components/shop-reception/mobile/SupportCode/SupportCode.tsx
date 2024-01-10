import { Grid, Container, Paper, Box } from '@mui/material'
import { Button, Checkbox, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../Common.modules.scss'
import { useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'

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

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='Cod Suport' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={toggleIsSearching}
              >
                <ManageSearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>SAU</Divider>
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='SCANEAZǍ SUPORT'
                  onClick={() => formik.handleSubmit()}
                />
              </Box>
            </Grid>
            {isSearching && <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='medium' component='p'>Numǎr suport: 46565454516</Typography>
                </Grid>
                <Grid item xs={12}>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='CONFORMITATE SUPORT'
                      onClick={toggleShowConfirmation}
                    />
                  </Grid>
                </Grid>
                {showConfirmation && <Grid item xs={12}>
                  <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                    <Grid container spacing={2}>
                      {options.map(option => <Grid item xs={12}>
                          <Checkbox
                            checked={false}
                            onChange={event => formik.setFieldValue(option.field, (event.target as HTMLInputElement).value)}
                            label={option.label}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>}
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='ALTE AMBALAJE'
                      onClick={null}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='CONFIRM TIP SUPORT'
                      onClick={toggleIsFinalizing}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: 56</Typography>
                <Typography variant='medium' component='p'>Numǎr suporți scanați: 0</Typography>
              </Paper>
            </Grid>
            {isFinalizing && <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='FINALIZEAZĂ'
                  size='large'
                  onClick={() => formik.handleSubmit()}
                />
              </Box>
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SupportCode
