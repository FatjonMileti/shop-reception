import { useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { columns } from './helpers'
import { useNotification } from 'hooks'
import { Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Table } from 'components/core-ui/Table'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { toTableGETUrl } from 'components/core-ui/Table/serializers'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation } from 'react-query'

interface StoreIntervalModalProps {
  isOpen: boolean
  closeModal: Function
  item: any
}

const AdminStoreForm: React.FC<StoreIntervalModalProps> = props => {
  const { isOpen, closeModal, item } = props
  const { showNotification } = useNotification()
  const [tableItems, setTableItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState([])
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: `/shop-reception/shops/delivery-interval/${item.id}`,
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      setInitialValues(response)
      setTableItems(toTableRowItems(response))
      setIsLoading(false)
    } catch (error) {
      console.log('debug err', error)
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const addStoreInterval = async values => {
    await makeCorePostRequest(`/shop-reception/shops/delivery-interval/${item.id}`, values)
  }

  const { isLoading: isMutationLoading, mutate } = useMutation(addStoreInterval, {
    onSuccess: () => {
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Shop interval updated successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to add shop interval, ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      mutate(values)
      setShouldRefreshData(true)
    }
  })

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={'Intervale orare magazin'}
      modalWidth="80%"
    >
      <Grid container spacing={2}>
        <Table
          hideCheckbox
          columns={columns(formik, setTableItems)}
          items={tableItems}
          fetchData={fetchData}
          disableSorting
          disablePagination
          isLoading={isLoading}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
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

export default AdminStoreForm
