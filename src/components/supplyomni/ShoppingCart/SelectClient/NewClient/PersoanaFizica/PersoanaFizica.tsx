import { Box } from '@mui/material'
import { useNotification } from 'hooks'
import s from '../NewClient.modules.scss'
import { useMutation } from 'react-query'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { formatErrorMessage } from 'utils/formatting'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { ChangeEvent } from 'react'
import { initialValues, validationSchema } from './helpers'
import { CountyCityInterface, PersoanaFizica } from '../interfaces'
import { useNavigate } from 'react-router-dom'

const PersoanaFizica: React.FC = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

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
      navigate(`/shoppingCartClientDetails/${data?.id}`)
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
    onSubmit: async (values: PersoanaFizica) => {
      try {
        mutate(values)
      } catch (error) {
        showNotification({
          message: `Error while saving time off data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const onUpdateValues = (field: string, value: any) => {
    formik.setFieldValue(field, value)
  }

  return (
    <Box>
      <Box className={s.row}>
        <Input
          type="text"
          name="name"
          label="Nume Prenume"
          variant="standard"
          value={formik.values.name}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('name', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          type="text"
          name="phone"
          label="Telefon"
          variant="standard"
          value={formik.values.phone}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('phone', e.target.value)}
          required
        />
        <Input
          type="text"
          name="email"
          label="Email"
          variant="standard"
          value={formik.values.email}
          width="280px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('email', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row}>
        <Input
          type="text"
          name="fullAddress"
          label="Adresa"
          variant="standard"
          value={formik.values.address}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpdateValues('address', e.target.value)}
          required
        />
      </Box>

      <Box className={s.row}>
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
            onUpdateValues(fieldToUpdate, { id: newValue.value, name: newValue.label })
          }
        />
      </Box>

      <Box className={s.row} sx={{ textAlign: 'right' }}>
        <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
      </Box>
    </Box>
  )
}

export default PersoanaFizica
