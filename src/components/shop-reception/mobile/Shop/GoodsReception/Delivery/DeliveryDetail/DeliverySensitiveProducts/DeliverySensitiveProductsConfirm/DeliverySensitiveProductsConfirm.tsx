import { useLocation, useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import React, { useEffect, useRef, useState } from "react";
import AlertModal from "../../../../../../Common/AlertModal/AlertModal";
import { DefectReason, Mark } from "../../../../../../../enums";
import { URLS } from "../../../../../../constants";

const DeliverySensitiveProductsConfirm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showNotification } = useNotification()

  const markOptions = Object.keys(Mark).map(key => ({ value: key, label: Mark[key] }));
  const defectReasonOptions = Object.keys(DefectReason).map(key => ({ value: key, label: DefectReason[key] }));
  const { truckId, support } = location.state
  const [productCode, setProductCode] = useState('')
  const [shouldSearch, setShouldSearch] = useState(false)
  const [marks, setMarks] = useState<string[]>([])
  const [defectReasons, setDefectReasons] = useState([])
  const [litigation, setLitigation] = useState([])
  const [uploadedImages, setUploadedImages] = useState({});
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [isSgrMessageModalOpen, setIsSgrMessageModalOpen] = useState(false)
  const [sgrMessageModalContent, setSgrMessageModalContent] = useState({ title: '', buttons: [] })
  const [isMandatoryDlcModalOpen, setIsMandatoryDlcModalOpen] = useState(false)
  const [mandatoryDlcModalContent, setMandatoryDlcModalContent] = useState({ title: '', description: '', buttons: [] })

  const { data: products, isLoading } = useQuery(
    ['sensitive-products'],
    async () => {
      const result = await makeCoreGetRequest(`/shop-reception-mobile/sensitive/products/${support.id}`, null)

      return result || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: product, isLoading: isLoadingProduct } = useQuery(
    ['product-scan'],
    async () => {
      const result = await makeCoreGetRequest(
        `/shop-reception-mobile/aleatory/product/scan-by-code/${support.supportCode}/${productCode}`,
        null
      );
      return result || [];
    },
    {
      enabled: shouldSearch,
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        });
      },
      onSettled: () => {
        setShouldSearch(false);
      }
    }
  );

  const { data: sensitiveProduct, isLoading: isLoadingSensitiveProduct } = useQuery(
    ['sensitive-product-scan'],
    async () => {
      const result = await makeCoreGetRequest(
        `/shop-reception-mobile/sensitive/product/scan/${support.supportCode}/${productCode}`,
        null
      );

      if (result.found) {
        setProductCode('');

        if (inputRef.current) {inputRef.current.focus()}
        if (result.sgr) {showSgrMessage()}
        if (result.eanReceived !== null) {
          const idx = formik.values.productList.findIndex(product => product?.id === result?.id);
          if (idx !== -1) {
            formik.setFieldValue(`productList[${idx}].eanReceived`, result.eanReceived);
          }
        }
      } else {
        let message = 'Produsul nu se află in lista de mai jos.';
        if (!result.inMeti) {message = 'Produsul inexistent!'}

        showMandatoryDlcMessage(message);
      }

      return result || [];
    },
    {
      enabled: shouldSearch,
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        });
      },
      onSettled: () => {
        setShouldSearch(false);
      }
    }
  );

  const saveProduct = async (values: any) => {
    return await makeCorePostRequest(
      `/shop-reception-mobile/sensitive/save/${truckId}/${support.id}`, values
    )
  }

  const { mutate } = useMutation(saveProduct, {
    onSuccess: () => {
      showNotification({
        message: `Produsul a fost salvat cu success.`,
        type: 'success'
      })
      navigate(URLS.AUTH_DELIVERY_DETAIL, { state: truckId })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: products || { productList: [] },
    onSubmit: async (values: any) => {
      const payload = values.productList.map(product => {
        const mark = markOptions.find(option => option.label === product.mark)
        const defectReason = defectReasonOptions.find(option => option.label === product.defectReason)

        return {...product, mark: mark.value, defectReason: defectReason.value}
      })

      mutate(payload)
    }
  })

  console.log(formik.values);
  console.log(litigation);
  console.log(uploadedImages);

  const updateLitigation = (index, value) => {
    setLitigation(prevLitigation => {
      const newLitigation = [...prevLitigation];
      newLitigation[index] = value;
      return newLitigation;
    });
  };

  useEffect(() => {
    if (currentIndex !== null) {
      calculateLitigationType(currentIndex);
    }
  }, [formik.values.productList[currentIndex]?.integral, formik.values.productList[currentIndex]?.broken, currentIndex]);

  useEffect(() => {
    if (currentIndex !== null) {
      populateDefectReasons(currentIndex);
    }
  }, [formik.values.productList[currentIndex]?.mark]);

  const calculateLitigationType = (idx) => {
    const currentConformValue = parseFloat(formik.values.productList[idx]?.integral);
    const currentDefectValue = parseFloat(formik.values.productList[idx]?.broken);
    const currentTotalValue = currentConformValue + currentDefectValue;
    const quantity = formik.values.productList[idx].quantity;
    const shopReceptionDeviation = formik.values.productList[idx]?.shopReceptionDeviation === null ? 0 :
      formik.values.productList[idx]?.shopReceptionDeviation / 1000;

    if (
      quantity > currentConformValue + shopReceptionDeviation && quantity === currentTotalValue
    ) {
      setMarks([
        Mark.VEGETABLE_FRUIT_QUALITY,
        Mark.EXPIRED,
        Mark.SHORT_TERM,
        Mark.DAMAGED,
        Mark.VEGETABLES_FRUITS,
        Mark.DETERIORATION_A
      ])

      updateLitigation(idx,2)
    } else if (
      quantity > currentConformValue + shopReceptionDeviation && quantity !== currentTotalValue
    ) {
      setMarks([
        Mark.PALLETS_MERCHANDISE_MISSING,
        Mark.MISSING_CARRIER,
        Mark.QUANTITATIVE_DIFFERENCE
      ])

      updateLitigation(idx,1)
    } else if (quantity < currentConformValue - shopReceptionDeviation) {
      setMarks([Mark.PALLETS_MERCHANDISE_MISSING, Mark.QUANTITATIVE_DIFFERENCE])

      updateLitigation(idx,1)
    } else if (
      quantity - shopReceptionDeviation <= currentConformValue &&
      currentConformValue <= quantity + shopReceptionDeviation
    ) {
      updateLitigation(idx,0)
      setMarks([])
    }

    formik.setFieldValue(`productList[${idx}].mark`, '')
    formik.setFieldValue(`productList[${idx}].defectReason`, '')
  }

  const populateDefectReasons = idx => {
    if (formik.values.productList[idx].mark) {
      const selectedMark = formik.values.productList[idx].mark
      formik.setFieldValue(`productList[${idx}].defectReason`, '')

      switch (litigation[idx]) {
        case 1:
          setDefectReasons([DefectReason.PROVIDER])
          formik.setFieldValue(`productList[${idx}].defectReason`, DefectReason.PROVIDER)
          break
        case 2:
          if (selectedMark === Mark.EXPIRED || selectedMark === Mark.SHORT_TERM) {
            setDefectReasons([DefectReason.PROVIDER])
            formik.setFieldValue(`productList[${idx}].defectReason`, DefectReason.PROVIDER)
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

  const showMandatoryDlcMessage = (message) => {
    setMandatoryDlcModalContent({
      title: 'Atentie',
      description: message,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsMandatoryDlcModalOpen(false)
          },
          color: 'primary'
        }
      ]
    })
    setIsMandatoryDlcModalOpen(true)
  }

  const closeMandatoryDlcModal = () => {
    setIsMandatoryDlcModalOpen(false)
  }

  const disabled = formik.values.productList.some((product, idx) => {
    if (litigation[idx] === 2 && uploadedImages[idx] !== true) return true;
    if (litigation[idx] === 1 && !product.mark) return true;
    if (litigation[idx] !== 0 && !litigation[idx] ) return true;
    return false;
  });

  if (isLoading || isLoadingSensitiveProduct || isLoadingProduct) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid item xs={10}>
        <TitleHeader title="" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            PRODUSE SENSIBILE
          </Typography>
          <Typography variant="medium" component="p">
            Eticheta suport: {support.supportCode}
          </Typography>
          <Typography variant="medium" component="p">
            Numar suport: {support.supportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod produs"
          autoFocus
          value={productCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setProductCode(target.value)
          }}
          onSearchIconClick={() => {if (productCode) setShouldSearch(true)}}
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
          onClick={() => () => {}}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid xs={10} item>
        <TableContainer>
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
              {formik.values?.productList?.map((product, index) => (
                <>
                  <TableRow>
                    <TableCell> {product.name}</TableCell>
                    <TableCell>
                      <div ref={sensitiveProduct?.id === product?.id ? inputRef : null}>
                        <Input
                          id={product?.id.toString()}
                          type="number"
                          variant="outlined"
                          width="100%"
                          value={product.integral}
                          onChange={event => {
                            formik.setFieldValue(`productList[${index}].integral`,
                              parseInt((event.target as HTMLInputElement).value));

                            setCurrentIndex(index);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        variant="outlined"
                        width="100%"
                        value={product.broken}
                        onChange={event => {
                          formik.setFieldValue(`productList[${index}].broken`,
                            parseInt((event.target as HTMLInputElement).value));

                          setCurrentIndex(index);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {litigation[index] === 2 && (
                        <ImageUpload
                          uploadUrl={`/shop-reception-mobile/integral/upload/${support.id}/${product.id}`}
                          onSuccess={() => {
                            setUploadedImages((prev) => ({
                              ...prev,
                              [index]: true,
                            }));

                            showNotification({
                              message: `Imaginea a fost incarcata cu succes.`,
                              type: 'success'
                            })
                          }}
                          onError={() =>
                            showNotification({
                              message: `A aparut o eroare la incarcarea imaginii.`,
                              type: 'error'
                            })
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {product.ean} ({product.code}) ({product.unit})
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        variant="outlined"
                        width="100%"
                        value={product?.newIntegral}
                        onChange={event =>
                          formik.setFieldValue(
                            `productList[${index}].newIntegral`,
                            parseInt((event.target as HTMLInputElement).value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        variant="outlined"
                        width="100%"
                        value={product?.newBroken}
                        onChange={event =>
                          formik.setFieldValue(
                            `productList[${index}].newBroken`,
                            parseInt((event.target as HTMLInputElement).value)
                          )
                        }
                      />
                    </TableCell>

                    <TableCell padding={"none"}>
                      <Button
                        variant="contained"
                        label="+"
                        onClick={() => {
                          formik.setFieldValue(
                            `productList[${index}].integral`,
                            formik.values.productList[index].integral +
                            (formik.values.productList[index].newIntegral || 0)
                          )

                          formik.setFieldValue(
                            `productList[${index}].broken`,
                            formik.values.productList[index].broken +
                            (formik.values.productList[index].newBroken || 0)
                          )

                          formik.setFieldValue(`productList[${index}].newBroken`, 0)
                          formik.setFieldValue(`productList[${index}].newIntegral`, 0)
                        }}
                      />
                    </TableCell>
                  </TableRow>

                  {product.integral !== product.quantity && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Input
                          type="select"
                          label="Marca"
                          variant="outlined"
                          width="100%"
                          value={formik.values.productList[index].mark}
                          values={marks?.map(mark => ({ value: mark, label: mark }))}
                          onChange={(event) => {
                            formik.setFieldValue(`productList[${index}].mark`, (event.target as HTMLInputElement).value);
                            setCurrentIndex(index)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )}

                  {product.integral !== product.quantity && product.mark && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Input
                          type="select"
                          label="Motiv"
                          variant="outlined"
                          width="100%"
                          value={formik.values.productList[index].defectReason}
                          values={defectReasons?.map(defect => ({ value: defect, label: defect }))}
                          onChange={event => {
                            formik.setFieldValue(`productList[${index}].defectReason`, (event.target as HTMLInputElement).value)
                          }}
                          disabled={formik.values.productList[index].mark === ''}
                        />
                      </TableCell>
                    </TableRow>
                  )}

                  <TableCell colSpan={4}>
                    <DatePicker
                      onChange={value => formik.setFieldValue(`productList[${index}].dlc`, value)}
                      value={dayjs(product.dlc)}
                      variant="outlined"
                      style={{ display: 'flex', justifyContent: 'center' }}
                      adapterLocale="ro"
                      modalLabel="Selecteaza data"
                      closeButtonLabel="Anuleaza"
                      confirmButtonLabel="Confirma"
                    />
                  </TableCell>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Confirma cantitati"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={disabled}
        />
      </Grid>

      <>
        <AlertModal
          open={isSgrMessageModalOpen}
          handleClose={closeSgrMessage}
          title={sgrMessageModalContent.title}
          buttons={sgrMessageModalContent.buttons}
        />
        <AlertModal
          open={isMandatoryDlcModalOpen}
          handleClose={closeMandatoryDlcModal}
          title={mandatoryDlcModalContent.title}
          buttons={mandatoryDlcModalContent.buttons}
        />
      </>
    </Grid>
  )
}
export default DeliverySensitiveProductsConfirm
