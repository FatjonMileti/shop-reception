import { Grid } from '../../Common/Grid'
import { Button, Checkbox, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { FlexCenter } from '../../Common/FlexCenter'
import {useQuery} from "react-query";
import {makeCoreGetRequest, makeCorePostRequest} from "../../../../utils/api";
import {useLocation} from "react-router-dom";

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

const SupportCode = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false)
  const [supportImageButtonVisible, setSupportImageButtonVisible] = useState<boolean>(false)
  const [defectImageVisible, setDefectImageVisible] = useState<boolean>(false)
  const [supportNumber, setSupportNumber] = useState('')
  const [supportId, setSupportId] = useState(null)
  const [counter, setCounter] = useState(0)
  const { showNotification } = useNotification()
  const location = useLocation();
  const id = location.state?.item.id;

  const toggleShowConfirmation = (): void => {
    setShowConfirmation(!showConfirmation)
  }

  const toggleIsSearching = (): void => {
    makeCorePostRequest('/rm-api/support/scan/' + id, { supportCode: formik.values.supportCode }).then(r => {
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
    const saveModel =  {supportId, supportTypeId: formik.values.supportTypeId, defectReason: formik.values.reason, pictureIdNonConform: null, pictureIdSupportType: null}

    try {
      makeCorePostRequest('/rm-api/support/save/' + id, saveModel).then(resp => {
        const localCounter = resp.counter;
        if (localCounter > 0) {
          setCounter(localCounter);
        }

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

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        await makeCoreGetRequest('/rm-api/support/summary/' + id, null)
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: truck, isLoading} = useQuery(
      'counter',
      async () => {
        const truck = await makeCoreGetRequest('/rm-api/support/counter/' + id, null)
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
        return await makeCoreGetRequest('/rm-api/support/principal/type', null)
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

  if (isLoading || isLoadingSupports) {
    return <div>Loading...</div>;
  }

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
      onClick={() => formik.handleSubmit()}
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
      onClick={toggleIsFinalizing}
    />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: {truck.truckNumber}</Typography>
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
        onClick={() => formik.handleSubmit()}
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

export default SupportCode
