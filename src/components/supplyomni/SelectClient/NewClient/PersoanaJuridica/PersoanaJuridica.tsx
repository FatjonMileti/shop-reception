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
import { CountyCityInterface, PersoanaJuridica } from '../interfaces'
import { useNavigate } from 'react-router-dom'

const PersoanaJuridica: React.FC = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const addNewClient = async (values: PersoanaJuridica) => {
    const result = await makeCorePostRequest(`/supply-omni/client`, values)
    return result
  }

  const { mutate } = useMutation(addNewClient, {
    onSuccess: (data: any) => {
      showNotification({
        message: 'Clientul a fost salvat cu success!',
        type: 'success'
      })
      navigate(`/supplyOmni/shoppingCartClientDetails/${data?.id}`)
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
    onSubmit: async (values: PersoanaJuridica) => {
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
          label="Nume"
          variant="standard"
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
          name="cif"
          label="CIF/COD"
          variant="standard"
          value={formik.values.cif}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('cif', e.target.value)}
          required
          error={!!formik.errors.cif}
          helperText={formik.errors.cif as string}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="tradeRegister"
          label="Registrul Comertului"
          variant="standard"
          value={formik.values.tradeRegister}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onUpdateValues('tradeRegister', e.target.value)
          }
          required
          error={!!formik.errors.tradeRegister}
          helperText={formik.errors.tradeRegister as string}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="bank"
          label="Banca"
          variant="standard"
          value={formik.values.bank}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('bank', e.target.value)}
          required
          error={!!formik.errors.bank}
          helperText={formik.errors.bank as string}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="bankAccount"
          label="IBAN"
          variant="standard"
          value={formik.values.bankAccount}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onUpdateValues('bankAccount', e.target.value)
          }
          required
          error={!!formik.errors.bankAccount}
          helperText={formik.errors.bankAccount as string}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          type="number"
          name="phone"
          label="Telefon"
          variant="standard"
          value={formik.values.phone}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('phone', e.target.value)}
          required
          error={!!formik.errors.phone}
          helperText={formik.errors.phone as string}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Input
          type="text"
          name="email"
          label="Email"
          variant="standard"
          value={formik.values.email}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('email', e.target.value)}
          required
          error={!!formik.errors.email}
          helperText={formik.errors.email as string}
        />
      </Grid>

      <Grid item xs={12}>
        <Input
          type="text"
          name="address"
          label="Adresa"
          variant="standard"
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
        <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
      </Grid>
    </Grid>
  )
}

export default PersoanaJuridica
