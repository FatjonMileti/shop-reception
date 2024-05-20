import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { getValidationSchema, initialValues } from './helpers'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useMemo, useState } from "react";
import { useFormik } from "formik";
import AlertModal from "../../../Common/AlertModal/AlertModal";
import { URLS } from "../../../constants";

const Step2 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [isInvalidSupportTypeModalOpen, setIsInvalidSupportTypeModalOpen] = useState(false)
  const [invalidSupportTypeModalContent, setInvalidSupportTypeModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isReturnableModalOpen, setIsReturnableModalOpen] = useState(false)
  const [returnableModalContent, setReturnableModalContent] = useState({ title: '', description: '', buttons: [] })
  const [packageScanned, setPackageScanned] = useState(false)
  const [searchCode, setSearchCode] = useState('')
  const id = location.state?.id || '';

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      if (values.returnable === false) {
        showReturnableModal();
      } else {
        try {
          await makeCorePostRequest('/shop-reception-mobile/truck/exit/supportType/save/' + id, {supportTypeId: values.currentSupportTypeId, supportNumber: values.supportNumber});

          setPackageScanned(true);
          setSearchCode('');
          await formik.setFieldValue('supportType', '');
          await formik.setFieldValue('currentSupportTypeId', '');
        } catch (error) {
          showNotification({
            message: `Error while submitting. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        }
      }
    }
  })

  const { data: returnTruckModel, isLoading: isLoadingReturnTruck} = useQuery(
    'returnTruckModel',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getTruckModel/' + id, null);
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: supportList, isLoading: isLoadingSupports} = useQuery(
    'supportList',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/support/all/list', null)
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

  if (isLoadingReturnTruck || isLoadingSupports) {
    return <div>Loading...</div>;
  }

  const showInvalidSupportTypeModal = () => {
    setInvalidSupportTypeModalContent({
      title: 'Atenție!',
      description: 'Acest ambalaj nu este de tip CHEP!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsInvalidSupportTypeModalOpen(false);
          },
          color: 'primary'
        }
      ]
    });
    setIsInvalidSupportTypeModalOpen(true);
  }

  const closeInvalidSupportTypeModal = () => {
    setIsInvalidSupportTypeModalOpen(false);
  };

  const showReturnableModal = () => {
    setReturnableModalContent({
      title: 'Atenție!',
      description: 'Ambalajul introdus este nereturnabil. Va rugam sa introduceti un tip de ambalaj returnabil.',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsReturnableModalOpen(false);
          },
          color: 'primary'
        }
      ]
    });
    setIsReturnableModalOpen(true);
  }

  const closeReturnableModal = () => {
    setIsReturnableModalOpen(false);
  };

  const supportScan = () => {
    if (!searchCode) return;

    try {
      makeCorePostRequest('/shop-reception-mobile/truck/exit/supportType/scan/' + id, searchCode).then(r => {
        if (!r.scanSuccess) {

        } else if (returnTruckModel.depositOrHubName.includes('CHEP') && !r.supportType.includes('CHEP')) {
          showInvalidSupportTypeModal();
        } else {
          formik.setValues({
            supportType: r.supportType,
            supportNumber: r.supportNumber,
            currentSupportTypeId: r.supportTypeId,
            returnable: r.returnable
          });
        }
      })
    } catch (error) {
      showNotification({
        message: `Error while scanning support. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handleSupportTypeChange = (event) => {
    setSearchCode('');
    const selectedValue = event.target.value;
    const selectedSupport = supportList.find(support => support.id === selectedValue);

    if (returnTruckModel.depositOrHubName.includes('CHEP') && !selectedSupport.name.includes('CHEP')) {
      showInvalidSupportTypeModal();
    } else {
      formik.setValues({
        supportType: selectedSupport.name,
        supportNumber: selectedSupport.conform,
        currentSupportTypeId: selectedSupport.id,
        returnable: selectedSupport.returnable
      });
    }
  };

  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: {returnTruckModel?.truckNumber}</Typography>
      <Typography variant='medium' component='p'>Destinație: {returnTruckModel?.depositOrHubName}</Typography>
    </>,
    <div style={{display: 'flex'}}>
      <Input
        type='text'
        label='Scanează tip ambalaj'
        variant='standard'
        value={searchCode}
        onChange={event => setSearchCode((event.target as HTMLInputElement).value)}
        width='100%'
      />
      <IconButton onClick={supportScan}>
        <ManageSearchIcon />
      </IconButton>
    </div>,
    <Input
      type='select'
      label='Cauta tip suport'
      variant='outlined'
      value={formik.values.currentSupportTypeId}
      values={supportList.map(support => ({ value: support.id, label: support.name }))}
      onChange={handleSupportTypeChange}
      error={!!formik.errors.supportType}
      helperText={formik.errors.supportType as string}
      width='100%'
    />,
    <AlertModal
      open={isInvalidSupportTypeModalOpen}
      handleClose={closeInvalidSupportTypeModal}
      title={invalidSupportTypeModalContent.title}
      description={invalidSupportTypeModalContent.description}
      buttons={invalidSupportTypeModalContent.buttons}
    />,
    <Divider>
      SAU
    </Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ TIP AMBALAJ'
      onClick={null}
      style={{ width: '100%' }}
    />,
    formik.values.currentSupportTypeId &&
    <Fragment>
      <Input
        type='text'
        label='Tip ambalaj'
        variant='outlined'
        width='100%'
        value={formik.values.supportType}
        style={{ marginBottom: '15px' }}
        readonly
      />
      <Input
        type='text'
        label='Număr ambalaje'
        variant='outlined'
        width='100%'
        value={formik.values.supportNumber}
        onChange={event => formik.setFieldValue('supportNumber', +(event.target as HTMLInputElement).value)}
        error={!!formik.errors.supportNumber}
        helperText={formik.errors.supportNumber as string}
      />
      <Button
        type='button'
        variant='contained'
        label='PASUL URMǍTOR'
        onClick={() => formik.handleSubmit()}
        style={{ width: '100%', marginTop: '15px' }}
      />
      <AlertModal
        open={isReturnableModalOpen}
        handleClose={closeReturnableModal}
        title={returnableModalContent.title}
        description={returnableModalContent.description}
        buttons={returnableModalContent.buttons}
      />
    </Fragment>,
    !formik.values.currentSupportTypeId &&
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR - SUMAR'
      onClick={() => navigate(URLS.AUTH_RETURN_STEP_3, { state: id })}
      disabled={!packageScanned}
      style={{ width: '100%' }}
    />
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default Step2
