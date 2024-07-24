import {
  Button,
  Divider,
  Input,
  Typography
} from '@fullscreendigital/carrefour-dex-fe'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from 'hooks'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress, Grid, Paper } from "@mui/material";
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { DefectReason, Mark, ScanStatus } from "../../../../../../../enums";
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const DeliveryCompleteScanStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  const markOptions = Object.keys(Mark).map(key => ({ value: key, label: Mark[key] }));
  const defectReasonOptions = Object.keys(DefectReason).map(key => ({ value: key, label: DefectReason[key] }));

  const [isSgrProductsModalOpen, setIsSgrProductsModalOpen] = useState(false)
  const [sgrProductsModalContent, setSgrProductsModalContent] = useState({ title: '', listItems: [], buttons: [] })
  const [isProductScanModalOpen, setIsProductScanModalOpen] = useState(false)
  const [productScanModalContent, setProductScanModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isEanNotPresentModalOpen, setIsEanNotPresentModalOpen] = useState(false)
  const [eanNotPresentModalContent, setEanNotPresentModalContent] = useState({ title: '', buttons: [] })
  const [isCodeAndEanNotPresentModalOpen, setIsCodeAndEanNotPresentModalOpen] = useState(false)
  const [codeAndEanNotPresentModalContent, setCodeAndEanNotPresentModalContent] = useState({ title: '', buttons: [] })
  const [isSgrMessageModalOpen, setIsSgrMessageModalOpen] = useState(false)
  const [sgrMessageModalContent, setSgrMessageModalContent] = useState({ title: '', buttons: [] })
  const [isMissingProductsConfirmModalOpen, setIsMissingProductsConfirmModalOpen] = useState(false)
  const [MissingProductsConfirmModalContent, setMissingProductsConfirmModalContent] = useState({ title: '', listItems: [], buttons: [] })

  const [marks, setMarks] = useState<string[]>([])
  const [defectReasons, setDefectReasons] = useState([])
  const [litigation, setLitigation] = useState(null)
  const [showModificaButton, setShowModificaButton] = useState(false)
  const [productCode, setProductCode] = useState('')
  const [imageUploaded, setImageUploaded] = useState(false)
  const [confirmResponse, setConfirmResponse] = useState({ counter: 0, total: 0 })
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const { truckId, ticketId, data } = location.state

  const {
    data: scanProduct,
    isLoading: isLoadingScanProduct,
    refetch: refetchProduct
  } = useQuery(
    ['product-scan'],
    async () => {
      const resp = await makeCoreGetRequest(`/shop-reception-mobile/aleatory/product/scan-by-code/${data.supportCode}/${productCode}`, null)

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
        await formik.setFieldValue('bulkProductCode', '')
      }

      return resp || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const productScanById = async (id) => {
    try {
      const resp = await makeCoreGetRequest('/shop-reception-mobile/aleatory/product/scan-by-id/' + data.supportId + '/' + id, null)

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
    } catch (error) {
      showNotification({
        message: `Error while scanning product. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      ...scanProduct,
      currentConformValue: scanProduct?.validated,
      currentDefectValue: scanProduct?.broken
    },
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
          defectReason: defectReason?.value || null,
          mark: mark?.value || null,
          shopReceptionDeviation: values.shopReceptionDeviation,
          supportId: data.supportId
        }
        const resp = await makeCorePostRequest(`/shop-reception-mobile/aleatory/product/save`, product)

        setConfirmResponse({ counter: resp.counter, total: resp.total })
        setLitigation(null)
        setImageUploaded(false)
        setIsAlertOpen(false)
        formik.resetForm()
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  useEffect(() => {
    if (data?.sgrProductsList?.length !== 0) {
      let sgrProducts: string[] = []

      data?.sgrProductsList?.forEach(product => {
        sgrProducts?.push(product.name)
      })

      showSgrProductsList(sgrProducts)
    }
  }, [data])

  useEffect(() => {
    calculateLitigationType()
  }, [formik.values.currentConformValue, formik.values.currentDefectValue])

  useEffect(() => {
    populateDefectReasons(formik.values.mark)
  }, [formik.values.mark])

  const calculateLitigationType = () => {
    const currentConformValue = parseFloat(formik.values.currentConformValue) || 0
    const currentDefectValue = parseFloat(formik.values.currentDefectValue) || 0
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
      setLitigation(null)
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
      currentConformQuantity: data?.support?.currentConformQuantity || 0,
      currentDefectQuantity: data?.support?.currentDefectQuantity || 0,
      showDlc: resp.dlc !== null || resp.shortDlc === true
    })
  }

  const onFinalize = () => {
    if (confirmResponse.counter !== confirmResponse.total) {
      makeCoreGetRequest('/shop-reception-mobile/aleatory/missing/' + data.supportId, null).then(
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
      makeCorePostRequest(`/shop-reception-mobile/aleatory/support/close/${truckId}`, { supportId: data.supportId }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1, { state: { truckId, ticketId, supportFinalised: true } }))
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
        supportId: data.supportId,
        truckId: truckId,
        flow: 'aleatory_support',
        quantity: formik.values.quantity
      }
    })
  }

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

  if (isLoadingScanProduct) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink/>;
  }

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid item xs={10}>
        <TitleHeader title="VALIDARE LIVRARE SCANARE INTEGRALǍ" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            SCANARE INTEGRALA
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {data?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            BL: {data?.ticketNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {data?.supportCounter}/{data?.totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            Eticheta suport:
          </Typography>
          <Typography variant="medium" component="p">
            {data?.supportCode}
          </Typography>
          <Typography variant="medium" component="p">
            Numar suport: {data?.supportNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Produse verificate: {data?.productCounter}
          </Typography>
        </Paper>
      </Grid>

      {(data?.productList && data?.productList?.length > 0) && (
        <Grid item xs={10} mb={2}>
          <Input
            type="select"
            label="Selectează produs vrac"
            variant="outlined"
            width="100%"
            value={formik.values.bulkProductCode}
            values={data?.productList?.map(bulkProduct => ({
              value: bulkProduct.code,
              label: bulkProduct.name
            }))}
            onChange={event => {
              formik.setFieldValue('bulkProductCode', (event.target as HTMLInputElement).value)
              productScanById((event.target as HTMLInputElement).value)
            }}
            error={!!formik.errors.bulkProductCode}
            helperText={formik.errors.bulkProductCode as string}
          />
        </Grid>
      )}

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod produs"
          autoFocus
          id="scan-input"
          value={productCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setProductCode(target.value)
          }}
          onSearchIconClick={() => {refetchProduct()}}
          onSearchCloseClick={() => setProductCode('')}
          width="100%"
        />
      </Grid>

      <Grid item xs={10}>
        <Divider>SAU</Divider>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Scaneaza suport"
          onClick={() => document.getElementById('scan-input').focus()}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={10} my={2}>
        {!scanProduct?.errorMessage && typeof scanProduct?.errorMessage !== 'undefined' && (
          <>
            <Table>
              <TableHead style={{ backgroundColor: '#0970E6' }}>
                <TableRow>
                  <TableCell>Produs</TableCell>
                  <TableCell>Calitativ</TableCell>
                  <TableCell>Defect</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {scanProduct?.productName} {scanProduct?.productEans}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      autoFocus
                      value={formik.values.currentConformValue || 0}
                      onChange={e => {
                        const target = e.target as HTMLInputElement
                        formik.setFieldValue('currentConformValue', target.value)
                      }}
                      width="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      autoFocus
                      value={formik.values.currentDefectValue || 0}
                      onChange={e => {
                        const target = e.target as HTMLInputElement
                        formik.setFieldValue('currentDefectValue', target.value)
                      }}
                      width="100%"
                    />
                  </TableCell>
                  <TableCell>
                    {litigation === 2 && (
                      <Grid xs={10} item>
                        <ImageUpload
                          uploadUrl={`/shop-reception-mobile/integral/upload/${data.supportId}/${scanProduct.productId}`}
                          onSuccess={() => {
                            showNotification({
                              message: `Imaginea a fost incarcata cu succes.`,
                              type: 'success'
                            })
                            setImageUploaded(true);
                          }}
                          onError={() =>
                            showNotification({
                              message: `A aparut o eroare la incarcarea imaginii.`,
                              type: 'error'
                            })
                          }
                        />
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {!!litigation && (
              <Grid container>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Input
                    type="select"
                    label="Motiv"
                    variant="outlined"
                    width="100%"
                    value={formik.values.defectReason}
                    values={defectReasons?.map(defect => ({ value: defect, label: defect }))}
                    onChange={event => {
                      formik.setFieldValue('defectReason', (event.target as HTMLInputElement).value)
                    }}
                    disabled={formik.values.mark === ''}
                    error={!!formik.errors.defectReason}
                    helperText={formik.errors.defectReason as string}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>

      <Grid xs={10} mt={2} item>
        {formik.values.productEans && (
          <Button
            type="button"
            variant="contained"
            label="CONFIRMĂ CANTITĂȚI"
            onClick={() => formik.handleSubmit()}
            style={{ width: "100%" }}
            disabled={(litigation === 2 && !imageUploaded) || (litigation === 1 && formik.values.mark === "" && formik.values.defectReason === "")}
          />
        )}
        {showModificaButton && (
          <Button
            type="button"
            variant="contained"
            label="Modifică cantităţi"
            onClick={modifyQuantities}
            style={{ width: '100%' }}
          />
        )}
        {!formik.values.productEans && (
          <Button
            type="button"
            variant="contained"
            label="FINALIZEAZĂ SUPORT"
            onClick={() => onFinalize()}
            style={{ width: '100%' }}
          />
        )}
      </Grid>

      <>
        <AlertModal
          open={isAlertOpen}
          handleClose={() => setIsAlertOpen(false)}
          title={'Atentie'}
          description={`Exista diferente intre cantitatea asteptata si cea introdusa.`}
          buttons={[
            { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
            { label: 'Am terminat', onClick: () => formik.handleSubmit(), color: 'primary' }
          ]}
        />
        <AlertModal
          open={isSgrProductsModalOpen}
          handleClose={closeSgrProductsModal}
          title={sgrProductsModalContent.title}
          listItems={sgrProductsModalContent.listItems}
          buttons={sgrProductsModalContent.buttons}
        />
        <AlertModal
          open={isProductScanModalOpen}
          handleClose={closeProductScanMessage}
          title={productScanModalContent.title}
          description={productScanModalContent.description}
          buttons={productScanModalContent.buttons}
        />
        <AlertModal
          open={isCodeAndEanNotPresentModalOpen}
          handleClose={closeCodeAndEanNotPresentConfirmation}
          title={codeAndEanNotPresentModalContent.title}
          buttons={codeAndEanNotPresentModalContent.buttons}
        />
        <AlertModal
          open={isEanNotPresentModalOpen}
          handleClose={closeEanNotPresentConfirmation}
          title={eanNotPresentModalContent.title}
          buttons={eanNotPresentModalContent.buttons}
        />
        <AlertModal
          open={isSgrMessageModalOpen}
          handleClose={closeSgrMessage}
          title={sgrMessageModalContent.title}
          buttons={sgrMessageModalContent.buttons}
        />
        <AlertModal
          open={isMissingProductsConfirmModalOpen}
          handleClose={closeMissingProductsConfirm}
          title={MissingProductsConfirmModalContent.title}
          listItems={MissingProductsConfirmModalContent.listItems}
          buttons={MissingProductsConfirmModalContent.buttons}
        />
      </>
    </Grid>
  )
}
export default DeliveryCompleteScanStep2
