import { Grid } from '../../../../Common/Grid'
import { Button, Checkbox, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../Common/TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { FlexCenter } from '../../../../Common/FlexCenter'
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../../Common/AlertModal/AlertModal";
import { URLS } from "../../../constants";

const options = [
  {
    field: 'reason',
    label: 'Conform'
  },
  {
    field: 'reason',
    label: 'Infoliere neconforma'
  },
  {
    field: 'reason',
    label: 'Lipsa banda sigilare'
  },
  {
    field: 'reason',
    label: 'Lipsa banda promo'
  },
  {
    field: 'reason',
    label: 'Palet suprainaltat'
  },
  {
    field: 'reason',
    label: 'Constructie defectuoasa'
  },
  {
    field: 'reason',
    label: 'Palet rasturnat asigurat'
  },
  {
    field: 'reason',
    label: 'Palet rasturnat ne-asigurat in camion'
  },
  {
    field: 'reason',
    label: 'Palet lovit'
  }
]

const SupportScanStep1 = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false)
  const [supportImageButtonVisible, setSupportImageButtonVisible] = useState<boolean>(false)
  const [defectImageVisible, setDefectImageVisible] = useState<boolean>(false)
  const [supportNumber, setSupportNumber] = useState('')
  const [supportId, setSupportId] = useState(null)
  const [counter, setCounter] = useState(0)
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false)
  const [finalizeModalContent, setFinalizeModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isMoreSupportsModalOpen, setIsMoreSupportsModalOpen] = useState(false)
  const [moreSupportsModalContent, setMoreSupportsModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isPriorityProductsModalOpen, setIsPriorityProductsModalOpen] = useState(false)
  const [priorityProductsModalContent, setPriorityProductsModalContent] = useState({ description: '', listItems: [], buttons: [] })
  const [isSensitiveAndShortDlcModalOpen, setIsSensitiveAndShortDlcModalOpen] = useState(false)
  const [sensitiveAndShortDlcModalContent, setSensitiveAndShortDlcModalContent] = useState({ title: '', listItems: [], buttons: [] })
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const id = location.state?.item.id;

  const { data: truck, isLoading} = useQuery(
    'counter',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/support/shop/counter/' + id, null)
      setCounter(truck.counter)

      return truck;
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: supportList, isLoading: isLoadingSupports} = useQuery(
    'supportList',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/support/shop/principal/type', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching supports. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const saveModel =  {supportId, supportTypeId: values.supportTypeId, defectReason: values.reason, pictureIdNonConform: null, pictureIdSupportType: null}

      try {
        makeCorePostRequest('/shop-reception-mobile/support/shop/save/' + id, saveModel).then(resp => {
          const localCounter = resp.counter;
          if (localCounter > 0) {
            setCounter(localCounter);
          }

          if (resp.priorityProducts?.length > 0) {
            showPriorityProducts(resp.priorityProducts, resp.hasSensitiveProducts, resp.hasProductsWithShortDlc, resp.hasSgrProducts, resp.sgrProductsList);
          } else if (resp.hasSensitiveProducts || resp.hasProductsWithShortDlc || resp.hasSgrProducts) {
            showSensitiveAndShortDlcInfo(resp.hasSensitiveProducts, resp.hasProductsWithShortDlc, resp.hasSgrProducts, resp.sgrProductsList);
          } else {
            openMoreSupportsModal(supportId);
          }

          formik.setFieldValue('reason', []);
          setSupportImageButtonVisible(false);
          setDefectImageVisible(false);
        });

        setIsFinalizing(true)
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  if (isLoading || isLoadingSupports) {
    return <div>Loading...</div>;
  }

  const toggleShowConfirmation = (): void => {
    setShowConfirmation(!showConfirmation)
  }

  const toggleIsSearching = (): void => {
    makeCorePostRequest('/shop-reception-mobile/support/shop/scan/' + id, { supportCode: formik.values.supportCode }).then(r => {
      setSupportNumber(r.supportNumber)
      setSupportId(r.supportId)
      formik.setFieldValue('supportTypeId', String(r.supportTypeId))
    })
    .catch(error => {
      console.error('Error updating form values:', error);
    })

    setIsSearching(true)
  }

  const toggleIsFinalizing = (): void => {
    try {
      makeCoreGetRequest('/shop-reception-mobile/support/shop/summary/' + id, null).then(response => {
        const count = response['counter'];
        const total = response['total'];

        openFinalizeModal(count, total)
      });
    } catch (error) {
      showNotification({
        message: `Error while submitting. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openFinalizeModal = (count, total) => {
    setFinalizeModalContent({
      title: '',
      description: 'Aţi scanat ' + count + ' suporţi din ' + total + ' aşteptaţi.',
      buttons: [
        {
          label: 'Continuă scanarea',
          onClick: () => setIsFinalizeModalOpen(false),
          color: 'primary'
        },
        {
          label: 'Am terminat',
          onClick: () => {
            navigate(URLS.AUTH_SUPPORT_SCAN_STEP_4, { state: id });
            setIsFinalizeModalOpen(false);
          },
          color: 'secondary'
        }
      ]
    });
    setIsFinalizeModalOpen(true);
  };

  const closeFinalizeModal = () => {
    setIsFinalizeModalOpen(false);
  };

  const showPriorityProducts = (priorityProducts, hasSensitiveProducts, hasProductsWithShortDlc, hasSgrProducts, sgrProducts) => {
    setPriorityProductsModalContent({
      description: 'Există produse prioritare pentru vânzare: ',
      listItems: priorityProducts,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            if (hasSensitiveProducts || hasProductsWithShortDlc || hasSgrProducts) {
              showSensitiveAndShortDlcInfo(hasSensitiveProducts, hasProductsWithShortDlc, hasSgrProducts, sgrProducts);
            } else {
              openMoreSupportsModal(supportId);
            }

            setIsPriorityProductsModalOpen(false);
          },
          color: 'primary'
        }
      ]
    });
    setIsPriorityProductsModalOpen(true);
  }

  const closePriorityProductsModal = () => {
    setIsPriorityProductsModalOpen(false);
  };

  const showSensitiveAndShortDlcInfo = (hasSensitiveProducts, hasShortDlcProducts, hasSgrProducts, sgrProducts) => {
    const conditions = [
      { condition: hasSensitiveProducts, message: 'produse sensibile' },
      { condition: hasShortDlcProducts, message: 'produse cu DLC' },
      { condition: hasSgrProducts, message: 'produse SGR' }
    ];

    const activeConditions = conditions.filter(c => c.condition);
    const messages = activeConditions.map(c => c.message);

    let productsMessage = '';
    if (messages.length > 0) {
      productsMessage = 'Pe acest suport există ' + messages.join(' şi ') + '!';
    }

    setSensitiveAndShortDlcModalContent({
      title: productsMessage,
      listItems: sgrProducts,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            openMoreSupportsModal(supportId);
            setIsSensitiveAndShortDlcModalOpen(false);
          },
          color: 'primary'
        }
      ]
    });
    setIsSensitiveAndShortDlcModalOpen(true);
  }

  const closeSensitiveAndShortDlcModal = () => {
    setIsSensitiveAndShortDlcModalOpen(false);
  };

  const openMoreSupportsModal = (supportId) => {
    setMoreSupportsModalContent({
      title: 'Există ambalaje secundare pe acest suport?',
      description: '',
      buttons: [
        {
          label: 'Nu',
          onClick: () => {
            // deleteSecondarySupports();

            formik.setFieldValue('supportCode', '')
            setSupportId(null)
            setSupportNumber('')

            setIsMoreSupportsModalOpen(false);
          },
          color: 'primary'
        },
        {
          label: 'Da',
          onClick: () => {
            formik.setValues({
              supportCode: '',
              supportTypeId: '',
              reason: []
            })
            setSupportImageButtonVisible(false);
            setDefectImageVisible(false);
            setCounter(null)
            setSupportId(null)
            setSupportNumber('')

            //navigate(URLS.AUTH_SUPPORT_SCAN_STEP_3)
            setIsMoreSupportsModalOpen(false);
          },
          color: 'secondary'
        }
      ]
    });
    setIsMoreSupportsModalOpen(true);
  };

  const closeMoreSupportsModal = () => {
    setIsMoreSupportsModalOpen(false);
  };

  let items = [
    <TitleHeader title='Cod Suport' />,
    <FlexCenter>
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
      <IconButton onClick={toggleIsSearching}>
        <ManageSearchIcon />
      </IconButton>
    </FlexCenter>,
    <Divider>SAU</Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ SUPORT'
      style={{ width: '100%' }}
      onClick={() => console.log('Manual Scan')}
    />
  ]

  if (isSearching) {
    items = [
      ...items,
      <Typography variant='medium' component='p'>Numǎr suport: {supportNumber}</Typography>,
      <Input
        type='select'
        label='Tip Ambalaj'
        variant='standard'
        width='100%'
        value={formik.values.supportTypeId}
        values={supportList.map(support => ({ value: support.id, label: support.name }))}
        onChange={event => {
          setSupportImageButtonVisible(true);
          formik.setFieldValue("supportTypeId", (event.target as HTMLInputElement).value);
        }}
        error={!!formik.errors.supportTypeId}
        helperText={formik.errors.supportTypeId as string}
      />,
      (supportImageButtonVisible &&
        <Button
          type='button'
          variant='outlined'
          label='Adaugă imagine suport neconform'
          style={{ width: '100%' }}
          onClick={null}
        />
      ),
      <Button
        type='button'
        variant='contained'
        label='CONFORMITATE SUPORT'
        style={{ width: '100%' }}
        onClick={toggleShowConfirmation}
      />
    ]
  }

  if (showConfirmation) {
    items.push(
      <Grid
        hasPaper={true}
        items={options.map(option =>
          <Checkbox
            onChange={() => {
              const set = new Set(formik.values.reason);
              if (set.has(option.label)) {
                set.delete(option.label);
                if (set.size < 1) {
                  setDefectImageVisible(false);
                }
              } else {
                set.add(option.label);
                if (set.size >= 1 && option.label !== 'Conform') {
                  setDefectImageVisible(true);
                }
              }
              formik.setFieldValue(option.field, Array.from(set));
            }}
            label={option.label}
            disabled={option.label !== 'Conform' && formik.values.reason.includes('Conform') ||
              option.label === 'Conform' && formik.values.reason?.length > 0 && !formik.values.reason.includes('Conform')}
          />
        )}
        itemsPerRow={1}
      />,
      (defectImageVisible &&
        <Button
          type='button'
          variant='outlined'
          label='Adaugă imagine suport neconform'
          style={{ width: '100%' }}
          onClick={null}
        />
      )
    )
  }

  items = [
    ...items,
    <Button
      type='button'
      variant='contained'
      label='ALTE AMBALAJE'
      style={{ width: '100%' }}
      onClick={null}
    />,
    <Button
      type='button'
      variant='contained'
      label='CONFIRM TIP SUPORT'
      style={{ width: '100%' }}
      onClick={() => {
        formik.handleSubmit();
      }}
      disabled={formik.values.reason.length === 0}
    />,
    <AlertModal
      open={isMoreSupportsModalOpen}
      handleClose={closeMoreSupportsModal}
      title={moreSupportsModalContent.title}
      description={moreSupportsModalContent.description}
      buttons={moreSupportsModalContent.buttons}
    />,
    <AlertModal
      open={isPriorityProductsModalOpen}
      handleClose={closePriorityProductsModal}
      description={priorityProductsModalContent.description}
      listItems={priorityProductsModalContent.listItems}
      buttons={priorityProductsModalContent.buttons}
    />,
    <AlertModal
      open={isSensitiveAndShortDlcModalOpen}
      handleClose={closeSensitiveAndShortDlcModal}
      title={sensitiveAndShortDlcModalContent.title}
      listItems={sensitiveAndShortDlcModalContent.listItems}
      buttons={sensitiveAndShortDlcModalContent.buttons}
    />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: {truck?.truckNumber}</Typography>
      <Typography variant='medium' component='p'>Numǎr suporți scanați: {counter}</Typography>
    </>
  ]

  if(isFinalizing){
    items.push(
      <Button
        type='button'
        variant='contained'
        label='FINALIZEAZĂ'
        size='large'
        style={{ width: '100%' }}
        onClick={toggleIsFinalizing}
      />,
      <AlertModal
        open={isFinalizeModalOpen}
        handleClose={closeFinalizeModal}
        title={finalizeModalContent.title}
        description={finalizeModalContent.description}
        buttons={finalizeModalContent.buttons}
      />
    )
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default SupportScanStep1
