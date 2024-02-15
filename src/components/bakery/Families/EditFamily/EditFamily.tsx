import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditFamilyItem, ValueLabelInterface } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, famInBakeryScopes, divisionTypes } from '../helpers'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { toAsyncSelectOptions } from 'components/bakery/commonSerializers'

interface EditFamilyProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editFamilyId: string | number
}

const EditFamily: React.FC<EditFamilyProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editFamilyId } = props
    const [moduleValue, setModuleValue] = useState<ValueLabelInterface>(null)
    const { showNotification } = useNotification()

    useEffect(() => {
      if(isModalOpen) refetchEditItem()
    }, [isModalOpen])
    
    const { data: modules, isLoading: isModulesLoading, refetch: refetchModules } = useQuery(
      ['modules'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/module')
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []
        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching module dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

    const { data: editItem, isLoading: isLoadingEditItem, refetch: refetchEditItem } = useQuery(
        ['family', editFamilyId],
        async () => {
          if (editFamilyId) {
            const result = await makeCoreGetRequest(`/bakery/family/${editFamilyId}`)
            refetchModules();
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching family data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: EditFamilyItem) => {
        await makeCorePutRequest(`/bakery/family/${editFamilyId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Family edited successfully`,
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
        onSubmit: async (values: EditFamilyItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Da',
            }
            if(moduleValue.value) {
              payload.moduleId = moduleValue.value
            }
            mutate(payload)
            resetForm()
        }
    })

    const handleModuleChange = value => {
      setModuleValue(value)
    }
    
    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Editeaza'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="enable"
                  label="Familie in scopul aplicatiei de brutarie"
                  values={famInBakeryScopes}
                  width="100%"
                  value={formik.values.enable}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('enable', (event.target as HTMLInputElement).value)}
                />
              </Grid>

              {isModulesLoading ? (
                <div style={{ display: 'flex' }}>
                  <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                </div>
              ) : (
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    variant="outlined"
                    name="moduleName"
                    label="Modul"
                    value={moduleValue}
                    options={modules}
                    onChange={handleModuleChange}
                  />
                </Grid>
              )}

              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="divisionType"
                  label="Divizie"
                  values={divisionTypes}
                  width="100%"
                  value={formik.values.divisionType}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('divisionType', (event.target as HTMLInputElement).value)}
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

export default EditFamily
