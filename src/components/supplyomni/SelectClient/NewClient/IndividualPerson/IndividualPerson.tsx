import { Grid } from '@mui/material'
import { useNotification } from 'hooks'
import { useMutation } from 'react-query'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { formatErrorMessage } from 'utils/formatting'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { ChangeEvent } from 'react'
import { initialValues, validationSchema } from './helpers'
import { CountyCityInterface, IndividualPerson } from '../interfaces'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface IndividualPersonProps {
  selectNewClient: boolean
}

const IndividualPerson: React.FC<IndividualPersonProps> = ({ selectNewClient }) => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const addNewClient = async (values: any) => {
    const result = await makeCorePostRequest(`/supply-omni/client`, values)
    return result
  }

  const { mutate } = useMutation(addNewClient, {
    onSuccess: (data: any) => {
      showNotification({
        message: 'Clientul a fost salvat cu success!',
        type: 'success'
      })
      selectNewClient
        ? navigate(
            `/supplyOmni/receiptClientDetails/${data?.id}?orderId=${searchParams.get('orderId')}`
          )
        : navigate(`/supplyOmni/shoppingCartClientDetails/${data?.id}`)
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la salvarea clientului. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: IndividualPerson) => {
      mutate(values)
    }
  })

  const onUpdateValues = (field: string, value: any) => {
    formik.setFieldValue(field, value)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Input
          type="text"
          name="name"
          label="Nume Prenume"
          variant="outlined"
          value={formik.values.name}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('name', e.target.value)}
          required
          error={!!formik.errors.name}
          helperText={formik.errors.name as string}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="phone"
          label="Telefon"
          variant="outlined"
          value={formik.values.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('phone', e.target.value)}
          required
          error={!!formik.errors.phone}
          helperText={formik.errors.phone as string}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('email', e.target.value)}
          error={!!formik.errors.email}
          helperText={formik.errors.email as string}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Input
          type="text"
          name="address"
          label="Adresa"
          variant="outlined"
          value={formik.values.address}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('address', e.target.value)}
          required
          error={!!formik.errors.address}
          helperText={formik.errors.address as string}
        />
      </Grid>

      <Grid item xs={12}>
        <CountyCitySelect
          required
          variant="outlined"
          county={{
            action: {
              url: '/supply-omni/address/counties',
              type: 'GET',
              valueKey: 'id',
              labelKey: 'name'
            },
            width: 100,
            label: 'Judet',
            variant: 'standard'
          }}
          city={{
            action: {
              url: '/supply-omni/address/cities',
              type: 'GET',
              valueKey: 'id',
              labelKey: 'name'
            },
            width: 100,
            label: 'Oras',
            variant: 'standard'
          }}
          value={{
            county: { value: formik.values.county.id, label: formik.values.county.name },
            city: { value: formik.values.city.id, label: formik.values.city.name }
          }}
          onChange={(newValue: CountyCityInterface, fieldToUpdate: string) =>
            onUpdateValues(fieldToUpdate, { id: newValue?.value, name: newValue?.label })
          }
          error={!!formik.errors.county || !!formik.errors.city}
          helperText="required"
        />
      </Grid>

      <Grid item xs={12} textAlign={'right'}>
        <Button variant="contained" label="Salvare" onClick={() => formik.handleSubmit()} />
      </Grid>
    </Grid>
  )
}

export default IndividualPerson
