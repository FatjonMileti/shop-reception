import { useMemo, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getColumns } from './helpers'
import { useNotification } from 'hooks'
import { Box, Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Button, FormTable } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation, useQuery } from 'react-query'
import { formatTime } from 'utils/helpers'
import { FormTableColoumnInterface } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/FormTable/FormTable'
import hs from './HubsIntervalModal.modules.scss'

interface HubsIntervalModalProps {
  isOpen: boolean
  closeModal: Function
  item: any
}

const HubsIntervalModal: React.FC<HubsIntervalModalProps> = props => {
  const { isOpen, closeModal, item } = props
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [initialValues, setInitialValues] = useState([])

  useQuery(
    ['hubs-delivery-interval'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception/hubs/delivery-interval/${item.id}`)
      const values = toTableRowItems(response)
      setInitialValues(values)
      setTableItems(values)
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea intervalelor de livrare. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const addHubInterval = async values => {
    const data = values.filter(value => value.receiveFromDeposit)
    if (data) {
      await makeCorePostRequest(`/shop-reception/hubs/delivery-interval/${item.id}`, data)
    }
  }

  const { isLoading: isMutationLoading, mutate } = useMutation(addHubInterval, {
    onSuccess: () => {
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Hub-ul a fost modificat succes.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la modificarea datelor. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      const payload = values.map(value => ({
        ...value,
        startInterval: formatTime(value.startInterval),
        endInterval: formatTime(value.endInterval)
      }))
      mutate(payload)
    }
  })

  const columns: FormTableColoumnInterface[] = useMemo(
    () => getColumns(formik, setTableItems),
    [formik, setTableItems]
  )

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle="Intervale orare hub"
      modalWidth="95%"
    >
      <Grid container spacing={2} className={hs.tableGrid}>
        <Box className={hs.formTableContainer}>
          <FormTable columns={columns} rows={tableItems} />
        </Box>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={'Salveaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isMutationLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default HubsIntervalModal
