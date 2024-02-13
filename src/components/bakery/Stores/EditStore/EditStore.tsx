import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditStoreItem, ValueLabelInterface } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, statuses } from '../helpers'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toAsyncSelectOptions } from 'components/bakery/commonSerializers'

interface EditStoreProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editStoreId?: string | number
}

const EditStore: React.FC<EditStoreProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editStoreId } = props
    const { showNotification } = useNotification()
    const [zoneValue, setZoneValue] = useState<ValueLabelInterface>(null)
    const [regionValue, setRegionValue] = useState<ValueLabelInterface>(null)

    useEffect(() => {
      if(isModalOpen) refetchEditItem()
    }, [isModalOpen])

    const { data: zones, refetch: refetchZones } = useQuery(
      ['zones'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/zone/all')
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

        if(editItem?.zone) {
          setZoneValue({value: editItem?.zone, label: editItem?.zone})
        }

        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching zone dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

    const { data: regions, refetch: refetchRegions } = useQuery(
      ['regions'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/region/all')
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

        if (editItem?.region) {
          setRegionValue({value: editItem?.region, label: editItem?.region})
        }

        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching region dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

    const { data: editItem, isLoading: isLoadingEditItem, refetch: refetchEditItem } = useQuery(
        ['store', editStoreId],
        async () => {
          if (editStoreId) {
            const result = await makeCoreGetRequest(`/bakery/store/${editStoreId}`)
           
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching store data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    useEffect(() => {
      if(editItem) {
        refetchZones()
        refetchRegions()
      }
    }, [editItem])

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
    const submitTask = async (values: EditStoreItem) => {
        await makeCorePutRequest(`/bakery/store/${editStoreId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Store edited successfully`,
            type: 'success'
          })
        },
        onError: res => {
          showNotification({
            message: `Error while trying to update field, ${formatErrorMessage(res)}`,
            type: 'error'
          })
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: initialValues,
        onSubmit: async (values: EditStoreItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Activ',
                region: regionValue?.label === '' || regionValue === null ? null : regionValue?.label,
                zone: zoneValue?.label === '' || zoneValue === null ? null : zoneValue?.label
            }
            mutate(payload)
            resetForm()
        }
    })

    const handleZoneChange = value => {
      setZoneValue(value)
      setShouldRefreshData(true)
    }
    const handleRegionChange = value => {
      setRegionValue(value)
      setShouldRefreshData(true)
    }

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Editeaza'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <FormInfoItems
                  items={[
                    { label: 'Magazin:', name: (editItem as EditStoreItem)?.name },
                    {
                      label: 'Societate parinte:',
                      name: (editItem as EditStoreItem)?.parentSociety
                    },
                    {
                      label: 'Cod METI:',
                      name: (editItem as EditStoreItem)?.metiCode
                    },
                    {
                      label: 'Divizie:',
                      name: (editItem as EditStoreItem)?.divisionType
                    }
                  ]}
                />
              </Grid>

              <Grid xs={12} item>
                  <AsyncAutocomplete
                    variant="outlined"
                    name="zone"
                    label="Zona"
                    value={zoneValue}
                    options={zones}
                    onChange={handleZoneChange}
                    style={{ minWidth: '100%'}}
                  />
              </Grid>
          
              <Grid xs={12} item>
                <AsyncAutocomplete
                  variant="outlined"
                  name="region"
                  label="Regiune"
                  value={regionValue}
                  style={{ width: '100%'}}
                  options={regions}
                  onChange={handleRegionChange}
                />
              </Grid>
                
              <Grid xs={12} item>
                <Input
                    type="select"
                    variant="outlined"
                    name="enable"
                    label="Status"
                    values={statuses}
                    width="100%"
                    value={formik.values.enable}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('enable', (event.target as HTMLInputElement).value)}
                />
              </Grid>
        
              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
                <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
              </Grid>
            </>)}
          </Grid>
        </Modal>
      )
}

export default EditStore
