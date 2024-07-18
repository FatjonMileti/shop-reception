import { TitleHeader } from '../../../../../../Common/TitleHeader'
import {
  Button,
  DatePicker,
  Divider,
  IconButton,
  Input,
  Table,
  Typography
} from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../../Common/Grid'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import React, { useEffect, useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from '../../../../../../../../../hooks'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../../../utils/api'
import { DefectReason, Mark, ScanStatus } from '../../../../../../../enums'
import { formatErrorMessage } from '../../../../../../../../../utils/formatting'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import { TextField } from '@mui/material'
import AlertModal from '../../../../../../Common/AlertModal/AlertModal'
import ImageUpload from '../../../../../../Common/ImageUpload/ImageUpload'
import { URLS } from '../../../../../../constants'
import dayjs from 'dayjs'

const DeliveryRandomSupportFinal = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const location = useLocation()
  const support = location.state
  const markOptions = Object.keys(Mark).map(key => ({ value: key, label: Mark[key] }));
  const defectReasonOptions = Object.keys(DefectReason).map(key => ({ value: key, label: DefectReason[key] }));

  const [isSgrProductsModalOpen, setIsSgrProductsModalOpen] = useState(false)
  const [sgrProductsModalContent, setSgrProductsModalContent] = useState({
    title: '',
    listItems: [],
    buttons: []
  })
  const [isProductScanModalOpen, setIsProductScanModalOpen] = useState(false)
  const [productScanModalContent, setProductScanModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })
  const [isEanNotPresentModalOpen, setIsEanNotPresentModalOpen] = useState(false)
  const [eanNotPresentModalContent, setEanNotPresentModalContent] = useState({
    title: '',
    buttons: []
  })
  const [isCodeAndEanNotPresentModalOpen, setIsCodeAndEanNotPresentModalOpen] = useState(false)
  const [codeAndEanNotPresentModalContent, setCodeAndEanNotPresentModalContent] = useState({
    title: '',
    buttons: []
  })
  const [isSgrMessageModalOpen, setIsSgrMessageModalOpen] = useState(false)
  const [sgrMessageModalContent, setSgrMessageModalContent] = useState({ title: '', buttons: [] })
  const [isMissingProductsConfirmModalOpen, setIsMissingProductsConfirmModalOpen] = useState(false)
  const [MissingProductsConfirmModalContent, setMissingProductsConfirmModalContent] = useState({
    title: '',
    listItems: [],
    buttons: []
  })
  const [marks, setMarks] = useState<string[]>([])
  const [defectReasons, setDefectReasons] = useState([])
  const [litigation, setLitigation] = useState(0)
  const [showModificaButton, setShowModificaButton] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [confirmResponse, setConfirmResponse] = useState({ counter: 0, total: 0 })
  const [productScanResp, setProductScanResp] = useState<any>()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      let submitDlc = values?.dlc

      if (submitDlc && Array.isArray(submitDlc)) {
        let dateObject = new Date(submitDlc[0], submitDlc[1] - 1, submitDlc[2]);
        submitDlc = dateObject.toISOString().split('T')[0];
      } else if (submitDlc instanceof Date) {
        submitDlc = submitDlc.toISOString().split('T')[0];
      } else {
        let dateObject = new Date(submitDlc);
        submitDlc = dateObject.toISOString().split('T')[0];
      }

      const mark = markOptions.find(option => option.label === values.mark)
      const defectReason = defectReasonOptions.find(option => option.label === values.defectReason)

      try {
        const product = {
          id: values.productId,
          name: values.productName,
          code: values.productCode,
          ean: values.productEans,
          eanReceived: values.eanReceived,
          unit: null,
          integral: parseFloat(values.currentConformQuantity) || 0,
          broken: parseFloat(values.currentDefectQuantity) || 0,
          quantity: values.quantity,
          shortDlc: values.shortDlc,
          dlc: submitDlc,
          defectReason: defectReason.value,
          mark: mark.value,
          shopReceptionDeviation: values.shopReceptionDeviation,
          supportId: support.supportId
        }
        const resp = await makeCorePostRequest(`/shop-reception-mobile/aleatory/product/save`, product)

        setConfirmResponse({ counter: resp.counter, total: resp.total })
        setLitigation(null)
        setImageUploaded(false)
        formik.resetForm()
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const onFinalize = () => {
    if (confirmResponse.counter !== confirmResponse.total) {
      makeCoreGetRequest('/shop-reception-mobile/aleatory/missing/' + support.supportId, null).then(
        resp => {
          const products = resp
          if (products.length > 0) {
            showMissingProductsConfirm(products.map(prod => prod))
          } else {
            doFinalise()
          }
        }
      )
    } else {
      doFinalise()
    }
  }

  const doFinalise = () => {
    try {
      makeCorePostRequest(`/shop-reception-mobile/aleatory/support/close/${support.truckId}`, { supportId: support.supportId }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => navigate(URLS.AUTH_DELIVERY_DETAIL, {state: support.truckId}))
    } catch (error) {
      showNotification({
        message: `Error while submitting. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const modifyQuantities = () => {
    navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT_CONFIRM, {
      state: {
        productId: formik.values.productId,
        supportId: support.supportId,
        truckId: support.truckId,
        flow: 'aleatory_support',
        quantity: formik.values.quantity
      }
    })
  }

  const showMissingProductsConfirm = listItems => {
    setMissingProductsConfirmModalContent({
      title: '',
      listItems: listItems,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsMissingProductsConfirmModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsMissingProductsConfirmModalOpen(true)
  }

  const closeMissingProductsConfirm = () => {
    setIsMissingProductsConfirmModalOpen(false)
  }

  useEffect(() => {
    if (support?.sgrProductsList?.length !== 0) {
      let sgrProducts: string[] = []

      support?.sgrProductsList?.forEach(product => {
        sgrProducts?.push(product.name)
      })

      showSgrProductsList(sgrProducts)
    }
  }, [support])

  useEffect(() => {
    if (support?.support?.productCode) {
      formik.setFieldValue('productCode', support.support?.productCode)
      productScan(support.support?.supportId, support.support?.productCode)
    }
  }, [support])

  const productScan = (supportId, productCode) => {
    try {
      makeCoreGetRequest('/shop-reception-mobile/aleatory/product/scan-by-code/' + supportId + '/' + productCode, null).then(resp => {
        const scanOk = resp.scanSuccess
        const mess = resp.errorMessage
        const scanStatus = resp.scanStatus
        setShowModificaButton(resp.alreadyScanned)

        if (scanOk !== true) {
          formik.setValues({
            productName: '',
            productEans: '',
            productId: null,
            productDlc: null
          })
          showProductScanMessage(mess)
        } else if (ScanStatus.CODE_AND_EAN_NOT_PRESENT === scanStatus) {
          showCodeAndEanNotPresentConfirmation(resp)
        } else if (ScanStatus.EAN_NOT_PRESENT === scanStatus) {
          showEanNotPresentConfirmation(resp)
        } else {
          if (resp.sgr) {
            showSgrMessage()
          }
          populateScanInfo(resp)
          formik.setFieldValue('bulkProductCode', '')
        }
        setProductScanResp(resp)
      })
    } catch (error) {
      showNotification({
        message: `Error while scanning product. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const productScanById = id => {
    try {
      makeCoreGetRequest('/shop-reception-mobile/aleatory/product/scan-by-id/' + support.supportId + '/' + id, null).then(resp => {
        const scanOk = resp.scanSuccess
        const mess = resp.errorMessage
        const scanStatus = resp.scanStatus
        setShowModificaButton(resp.alreadyScanned)

        if (scanOk !== true) {
          formik.setValues({
            productName: '',
            productEans: '',
            productId: null,
            productDlc: null
          })
          showProductScanMessage(mess)
        } else if (ScanStatus.CODE_AND_EAN_NOT_PRESENT === scanStatus) {
          showCodeAndEanNotPresentConfirmation(resp)
        } else if (ScanStatus.EAN_NOT_PRESENT === scanStatus) {
          showEanNotPresentConfirmation(resp)
        } else {
          if (resp.sgr) {
            showSgrMessage()
          }
          populateScanInfo(resp)
        }
      })
    } catch (error) {
      showNotification({
        message: `Error while scanning product. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  useEffect(() => {
    calculateLitigationType()

    // if (productScanResp) {
    //   formik.setFieldValue('mark', productScanResp?.mark)
    //   setDefectReasons([productScanResp?.defectReason])
    //   formik.setFieldValue('defectReason', productScanResp?.defectReason)
    // }
  }, [formik.values.currentConformQuantity, formik.values.currentDefectQuantity, productScanResp])

  const calculateLitigationType = () => {
    const currentConformValue = parseFloat(formik.values.currentConformQuantity) || 0
    const currentDefectValue = parseFloat(formik.values.currentDefectQuantity) || 0
    const oldConformValue = parseFloat(formik.values.conform)
    const oldDefectValue = parseFloat(formik.values.defect)
    const totalConform = oldConformValue + currentConformValue
    const totalValue = oldConformValue + oldDefectValue + currentConformValue + currentDefectValue
    const deviation = !formik.values.shopReceptionDeviation ? 0 : formik.values.shopReceptionDeviation / 1000

    if (
      formik.values.quantity > totalConform + deviation &&
      formik.values.quantity === totalValue
    ) {
      setMarks([
        Mark.VEGETABLE_FRUIT_QUALITY,
        Mark.EXPIRED,
        Mark.SHORT_TERM,
        Mark.DAMAGED,
        Mark.VEGETABLES_FRUITS,
        Mark.DETERIORATION_A
      ])

      setLitigation(2)
    } else if (
      formik.values.quantity > totalConform + deviation &&
      formik.values.quantity !== totalValue
    ) {
      setMarks([
        Mark.PALLETS_MERCHANDISE_MISSING,
        Mark.MISSING_CARRIER,
        Mark.QUANTITATIVE_DIFFERENCE
      ])

      setLitigation(1)
    } else if (formik.values.quantity < totalConform - deviation) {
      setMarks([Mark.PALLETS_MERCHANDISE_MISSING, Mark.QUANTITATIVE_DIFFERENCE])

      setLitigation(1)
    } else if (
      formik.values.quantity - deviation <= totalConform &&
      totalConform <= formik.values.quantity + deviation
    ) {
      setLitigation(0)
      setMarks([])
    }

    formik.setFieldValue('mark', '')
    formik.setFieldValue('defectReason', '')
  }

  const populateDefectReasons = selectedMark => {
    if (formik.values.mark) {
      formik.setFieldValue('defectReason', '')

      switch (litigation) {
        case 1:
          setDefectReasons([DefectReason.PROVIDER])
          formik.setFieldValue('defectReason', DefectReason.PROVIDER)
          break
        case 2:
          if (selectedMark === Mark.EXPIRED || selectedMark === Mark.SHORT_TERM) {
            setDefectReasons([DefectReason.PROVIDER])
            formik.setFieldValue('defectReason', DefectReason.PROVIDER)
          } else if (selectedMark === Mark.VEGETABLE_FRUIT_QUALITY) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.SHOP])
          } else if (selectedMark === Mark.DAMAGED) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.TRANSPORTER, DefectReason.SHOP])
          } else if (
            selectedMark === Mark.VEGETABLES_FRUITS ||
            selectedMark === Mark.DETERIORATION_A
          ) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.TRANSPORTER])
          }
          break
        default:
          setDefectReasons([])
      }
    }
  }

  useEffect(() => {
    populateDefectReasons(formik.values.mark)
  }, [formik.values.mark])

  const populateScanInfo = resp => {
    const dlc = resp.shortDlc ? null : resp.dlc
    const conform = resp.validated === null ? 0 : resp.validated
    const defect = resp.broken === null ? 0 : resp.broken
    const deviation = resp.shopReceptionDeviation ? resp.shopReceptionDeviation : 0

    formik.setValues({
      productCode: '',
      productName: resp.productName,
      productEans: resp.productEans,
      productDlc: resp.dlc,
      productId: resp.productId,
      quantity: resp.quantity,
      eanReceived: resp.eanReceived,
      shopReceptionDeviation: deviation,
      alreadyScanned: resp.alreadyScanned,
      conform: conform,
      defect: defect,
      dlc: dlc,
      shortDlc: resp.shortDlc,
      defectReason: resp.defectReason,
      mark: resp.mark,
      currentConformQuantity: support?.support?.currentConformQuantity || 0,
      currentDefectQuantity: support?.support?.currentDefectQuantity || 0,
      showDlc: resp.dlc !== null || resp.shortDlc === true
    })
  }

  const handleSuccess = () => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    })

    setImageUploaded(true);
  }

  const handleError = error => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    })
  }

  const columns: Array<TableHeaderType> = [
    {
      title: 'Produs',
      field: 'product',
      align: 'left'
    },
    {
      title: 'Calitativ',
      field: 'qualitative',
      align: 'left',
      render: (rowData: any) => (
        <Input
          type="number"
          value={rowData.qualitative}
          onChange={e => {
            formik.setFieldValue('currentConformQuantity', (e.target as HTMLInputElement).value)
          }}
          variant="standard"
        />
      )
    },
    {
      title: 'Defect',
      field: 'defective',
      align: 'left',
      render: (rowData: any) => (
        <div style={{ display: 'flex' }}>
          <Input
            type="number"
            value={rowData.defective}
            onChange={e => {
              formik.setFieldValue('currentDefectQuantity', (e.target as HTMLInputElement).value)
            }}
            variant="standard"
          />
          {litigation === 2 && (
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/integral/upload/${support.supportId}/${formik.values.productId}`}
              onSuccess={() => handleSuccess()}
              onError={handleError}
            />
          )}
        </div>
      )
    }
  ]

  const rows = [
    {
      product: formik.values.productName,
      qualitative: formik.values.currentConformQuantity,
      defective: formik.values.currentDefectQuantity
    }
  ]

  const showProductScanMessage = msg => {
    setProductScanModalContent({
      title: 'Atenție!',
      description: msg,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsProductScanModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsProductScanModalOpen(true)
  }

  const closeProductScanMessage = () => {
    setIsProductScanModalOpen(false)
  }

  const showSgrProductsList = sgrProducts => {
    setSgrProductsModalContent({
      title: 'Pe acest suport există produse SGR!',
      listItems: sgrProducts,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsSgrProductsModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsSgrProductsModalOpen(true)
  }

  const closeSgrProductsModal = () => {
    setIsSgrProductsModalOpen(false)
  }

  const showSgrMessage = () => {
    setSgrMessageModalContent({
      title:
        'Acesta este un produs cu ambalaj returnabil - SGR! Va rugam sa gestionati aceste produs separat in vederea expunerii la raft.',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsSgrMessageModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsSgrMessageModalOpen(true)
  }

  const closeSgrMessage = () => {
    setIsSgrMessageModalOpen(false)
  }

  const showCodeAndEanNotPresentConfirmation = resp => {
    setCodeAndEanNotPresentModalContent({
      title: 'Produsul nu a fost comandat. Continuaţi recepţia acestuia?',
      buttons: [
        {
          label: 'Da',
          onClick: () => {
            formik.setValues({
              productName: resp.productName,
              productEans: resp.productEans,
              productDlc: null,
              eanReceived: resp.eanReceived,
              conform: 0,
              defect: 0,
              dlc: null,
              shortDlc: resp.shortDlc,
              defectReason: resp.defectReason,
              mark: resp.mark,
              currentConformQuantity: 0,
              currentDefectQuantity: 0,
              showDlc: resp.shortDlc
            })
            setIsCodeAndEanNotPresentModalOpen(false)
          },
          color: 'primary'
        },
        {
          label: 'Nu',
          onClick: () => {
            //TODO clear product info
            setIsCodeAndEanNotPresentModalOpen(false)
          },
          color: 'secondary'
        }
      ]
    })
    setIsCodeAndEanNotPresentModalOpen(true)
  }

  const closeCodeAndEanNotPresentConfirmation = () => {
    setIsCodeAndEanNotPresentModalOpen(false)
  }

  const showEanNotPresentConfirmation = resp => {
    setEanNotPresentModalContent({
      title: 'EAN-ul nu există în fişierul de la depozit. Continuaţi recepţia acestuia?',
      buttons: [
        {
          label: 'Da',
          onClick: () => {
            populateScanInfo(resp)
            setIsEanNotPresentModalOpen(false)
          },
          color: 'primary'
        },
        {
          label: 'Nu',
          onClick: () => {
            //TODO clear product info
            setIsEanNotPresentModalOpen(false)
          },
          color: 'secondary'
        }
      ]
    })
    setIsEanNotPresentModalOpen(true)
  }

  const closeEanNotPresentConfirmation = () => {
    setIsEanNotPresentModalOpen(false)
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="SUPORT ALEATOR VALIDARE LIVRARE" />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant="medium" component="p">
              SUPORT ALEATOR
            </Typography>,
            <Typography variant="medium" component="p">
              Număr înmatriculare: {support?.truckNumber}
            </Typography>,
            <Typography variant="medium" component="p">
              Suporți verificați: {support?.supportCounter} / {support?.totalSupportNumber}
            </Typography>
          ]}
          itemsPerRow={1}
        />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant="medium" component="p">
              Etichetă suport: {support?.supportCode}
            </Typography>,
            <Typography variant="medium" component="p">
              Număr suport: {support?.supportNumber}
            </Typography>,
            <Typography variant="medium" component="p">
              Produse verificate: {support?.productCounter}
            </Typography>
          ]}
          itemsPerRow={1}
        />,
        support.productList.length > 0 &&
        <Input
          type="select"
          label="Selectează produs vrac"
          variant="outlined"
          width="100%"
          value={formik.values.bulkProductCode}
          values={support?.productList?.map(bulkProduct => ({
            value: bulkProduct.code,
            label: bulkProduct.name
          }))}
          onChange={event => {
            formik.setFieldValue('bulkProductCode', (event.target as HTMLInputElement).value)
            productScanById((event.target as HTMLInputElement).value)
          }}
          error={!!formik.errors.bulkProductCode}
          helperText={formik.errors.bulkProductCode as string}
        />,
        <div style={{ display: 'flex' }}>
          <TextField
            label="Cod Produse"
            variant="standard"
            fullWidth
            value={formik.values.productCode}
            onChange={event => formik.setFieldValue('productCode', event.target.value)}
            autoFocus
            id="scan-input"
            error={!!formik.errors.productCode}
            helperText={formik.errors.productCode ? String(formik.errors.productCode) : ''}
          />
          <IconButton onClick={() => productScan(support.supportId, formik.values.productCode)}>
            <ManageSearchIcon />
          </IconButton>
        </div>,
        <Divider>SAU</Divider>,
        <Button
          style={{ width: '100%' }}
          type="button"
          variant="contained"
          label="SCANEAZǍ PRODUSE"
          onClick={() => document.getElementById('scan-input').focus()}
        />,
        formik.values.productEans && (
          <Table
            columns={columns}
            isLoading={false}
            rows={rows}
            disablePagination={true}
            hideCheckbox={true}
          />
        ),
        !!litigation && (
          <>
            <Input
              type="select"
              label="Marca"
              variant="outlined"
              width="100%"
              value={formik.values.mark}
              values={marks?.map(mark => ({ value: mark, label: mark }))}
              onChange={event => {
                formik.setFieldValue('mark', (event.target as HTMLInputElement).value)
              }}
              error={!!formik.errors.mark}
              helperText={formik.errors.mark as string}
            />
            <Input
              type="select"
              label="Motiv"
              variant="outlined"
              width="100%"
              value={formik.values.defectReason}
              defaultValue={productScanResp?.defectReason}
              values={defectReasons?.map(defect => ({ value: defect, label: defect }))}
              onChange={event => {
                formik.setFieldValue('defectReason', (event.target as HTMLInputElement).value)
              }}
              disabled={formik.values.mark === ''}
              error={!!formik.errors.defectReason}
              helperText={formik.errors.defectReason as string}
            />
            <DatePicker
              style={{ width: '100%' }}
              value={dayjs(formik.values.dlc)}
              onChange={value => formik.setFieldValue('dlc', value as Date | string)}
              hidden={!formik.values.showDlc}
              adapterLocale="ro"
              modalLabel="Selecteaza data"
              closeButtonLabel="Anuleaza"
              confirmButtonLabel="Confirma"
            />
          </>
        ),
        formik.values.productEans && (
          <Button
            type="button"
            variant="contained"
            label="CONFIRMĂ CANTITĂȚI"
            onClick={() => formik.handleSubmit()}
            style={{ width: '100%' }}
            disabled={(litigation === 2 && !imageUploaded) || (litigation === 1 && formik.values.mark === '' && formik.values.defectReason === '')}
          />
        ),
        showModificaButton && (
          <Button
            type="button"
            variant="contained"
            label="Modifică cantităţi"
            onClick={modifyQuantities}
            style={{ width: '100%' }}
          />
        ),
        !formik.values.productEans && (
          <Button
            type="button"
            variant="contained"
            label="FINALIZEAZĂ SUPORT"
            onClick={() => onFinalize()}
            style={{ width: '100%' }}
          />
        ),
        <>
          <AlertModal
            open={isSgrProductsModalOpen}
            handleClose={closeSgrProductsModal}
            title={sgrProductsModalContent.title}
            listItems={sgrProductsModalContent.listItems}
            buttons={sgrProductsModalContent.buttons}
          />,
          <AlertModal
            open={isProductScanModalOpen}
            handleClose={closeProductScanMessage}
            title={productScanModalContent.title}
            description={productScanModalContent.description}
            buttons={productScanModalContent.buttons}
          />,
          <AlertModal
            open={isCodeAndEanNotPresentModalOpen}
            handleClose={closeCodeAndEanNotPresentConfirmation}
            title={codeAndEanNotPresentModalContent.title}
            buttons={codeAndEanNotPresentModalContent.buttons}
          />,
          <AlertModal
            open={isEanNotPresentModalOpen}
            handleClose={closeEanNotPresentConfirmation}
            title={eanNotPresentModalContent.title}
            buttons={eanNotPresentModalContent.buttons}
          />,
          <AlertModal
            open={isSgrMessageModalOpen}
            handleClose={closeSgrMessage}
            title={sgrMessageModalContent.title}
            buttons={sgrMessageModalContent.buttons}
          />,
          <AlertModal
            open={isMissingProductsConfirmModalOpen}
            handleClose={closeMissingProductsConfirm}
            title={MissingProductsConfirmModalContent.title}
            listItems={MissingProductsConfirmModalContent.listItems}
            buttons={MissingProductsConfirmModalContent.buttons}
          />
        </>
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryRandomSupportFinal
