import { Grid } from '../../../../Common/Grid'
import { Button, Input, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import React, { useMemo, useState } from 'react'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../utils/api'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import ImageUpload from '../../../Common/ImageUpload/ImageUpload'
import AlertModal from '../../../Common/AlertModal/AlertModal'
import { URLS } from '../../../constants'
import { CircularProgress } from '@mui/material'

const SupportScanStep3 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const { supportId, truckId } = location.state || ''

  const [isMissingValuesModalOpen, setIsMissingValuesModalOpen] = useState(false)
  const [MissingValuesModalContent, setMissingValuesModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })
  const [isDifferentNumberModalOpen, setIsDifferentNumberModalOpen] = useState(false)
  const [DifferentNumberModalContent, setDifferentNumberModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      let missingValue = false
      const message = 'Există diferențe între cantitatea aşteptată şi cea descărcată pentru '
      let supportsNotOk = ''
      let uploaded: boolean[] = []

      values.supportType.forEach(support => {
        if (support.received === null) missingValue = true

        const total = Number(support.received)
        supportTypeList.forEach(st => {
          if (st.id === support.id && st.received !== total) {
            supportsNotOk = supportsNotOk + st.name + ', '
            if (support.imageUploaded === false) uploaded.push(false)
          }
        })
      })

      if (missingValue) {
        openMissingValuesModal()
      } else if (supportsNotOk.length > 0) {
        showDifferentNumberConfirmation(values.supportType, message + supportsNotOk, uploaded)
      } else {
        await doSaveSupportTypes(values.supportType)
      }
    }
  })

  const handleError = error => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    })
  }

  const { data: supportTypeList, isLoading } = useQuery(
    'SupportPrincipalTypeId',
    async () => {
      const support = await makeCoreGetRequest(
        `/shop-reception-mobile/support/shop/secondary/type?supportId=${supportId}`,
        null
      )
      await formik.setFieldValue(
        'supportType',
        support.map(support => ({
          ...support,
          imageUploaded: false
        }))
      )
      return support
    },
    {
      initialData: [],
      onError: handleError
    }
  )

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  const handleSuccess = id => {
    formik.setFieldValue(`supportType[${id}].imageUploaded`, true)

    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    })
  }

  const columns: Array<TableHeaderType> = [
    {
      title: 'TIP AMBALAJ',
      field: 'name',
      align: 'left'
    },
    {
      title: 'CANTITATE',
      field: 'received',
      align: 'center',
      render: (rowData: any) => (
        <div style={{ display: 'flex' }}>
          <Input
            type="number"
            value={rowData.received}
            onChange={e => {
              Number((e.target as HTMLInputElement).value) >= 0 &&
                formik.values.supportType.map((support, idx) => {
                  if (rowData.id === idx) {
                    formik.setFieldValue(
                      `supportType[${idx}].received`,
                      Number((e.target as HTMLInputElement).value)
                    )
                  }
                })
            }}
            variant="standard"
          />
          {supportTypeList[rowData.id].received !=
            formik.values.supportType[rowData.id].received && (
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/support/shop/upload/` + rowData.id}
              onSuccess={() => handleSuccess(rowData.id)}
              onError={handleError}
            />
          )}
        </div>
      )
    }
  ]

  const rows = formik.values.supportType.map((support, index) => ({
    id: index,
    name: support.name,
    received: support.received
  }))

  const openMissingValuesModal = () => {
    setMissingValuesModalContent({
      title: 'Atenție!',
      description: 'Vă rugăm să completaţi toate valorile din ecran!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => setIsMissingValuesModalOpen(false),
          color: 'primary'
        }
      ]
    })
    setIsMissingValuesModalOpen(true)
  }

  const closeMissingValuesModal = () => {
    setIsMissingValuesModalOpen(false)
  }

  const showDifferentNumberConfirmation = (values, message, imageUploaded) => {
    const buttons = [
      {
        label: 'Mai verific',
        onClick: () => setIsDifferentNumberModalOpen(false),
        color: 'primary'
      }
    ]

    if (!imageUploaded || imageUploaded.length === 0) {
      buttons.push({
        label: 'Am terminat',
        onClick: () => {
          setIsDifferentNumberModalOpen(false)
          doSaveSupportTypes(values)
        },
        color: 'primary'
      })
    }

    setDifferentNumberModalContent({
      title: message,
      description: '',
      buttons: buttons
    })
    setIsDifferentNumberModalOpen(true)
  }

  const closeDifferentNumberConfirmation = () => {
    setIsDifferentNumberModalOpen(false)
  }

  const doSaveSupportTypes = async values => {
    try {
      await makeCorePostRequest(
        `/shop-reception-mobile/support/shop/save/${false}/${truckId}/${supportId}`,
        values
      ).then(() => navigate(URLS.AUTH_SUPPORT_SCAN_STEP_1, { state: truckId }))
    } catch (error) {
      showNotification({
        message: `Error while submitting. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="Cod Suport" />,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          style={{ width: '100%' }}
          type="button"
          variant="contained"
          label="CONFIRMĂ AMBALAJE"
          onClick={() => formik.handleSubmit()}
        />,
        <AlertModal
          open={isMissingValuesModalOpen}
          handleClose={closeMissingValuesModal}
          title={MissingValuesModalContent.title}
          description={MissingValuesModalContent.description}
          buttons={MissingValuesModalContent.buttons}
        />,
        <AlertModal
          open={isDifferentNumberModalOpen}
          handleClose={closeDifferentNumberConfirmation}
          title={DifferentNumberModalContent.title}
          description={DifferentNumberModalContent.description}
          buttons={DifferentNumberModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default SupportScanStep3
