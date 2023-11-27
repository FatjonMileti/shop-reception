import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditFamilyItem, EditUserItem, ValueLabelInterface } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, famInBakeryScopes, divisionTypes, statuses, traineeTypes } from '../helpers'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toAsyncSelectOptions } from '../serializers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditUserProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editUserId: string | number
}

const EditUser: React.FC<EditUserProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editUserId } = props
    const { showNotification } = useNotification()
    
    const [structureRoles, setStructureRoles] = useState({
      regionManager: {id:'', roleId: '', structureId:'', structureType: 'REGION'},
      storeManager: {id:'', roleId: '', structureId:'', structureType: 'STORE'},
      trainee: {id:'', roleId: '', structureId:'', structureType: ''},
      sectionManager: {id: '', roleId: '', structureId:'', structureType: ''}
    })

    const [rolesx, setRolesx] = useState(null);

    const [isRegionManagerChecked, setIsRegionManagerChecked] = useState(false)
    const [regionMgValue, setRegionMgValue] = useState<ValueLabelInterface>(null);

    const [isStoreManagerChecked, setIsStoreManagerChecked ] = useState(false)
    const [storeMgValue, setStoreMgValue] = useState<ValueLabelInterface>(null)
    
    const [isTraineeChecked, setIsTraineeChecked] = useState(false)
    const [traineeValue, setTraineeValue] = useState<ValueLabelInterface>(null)
    
    const [isSectionChecked, setIsSectionChecked] = useState(false)

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
      ['user', editUserId],
      async () => {
        if (editUserId) {
          const result = await makeCoreGetRequest(`/bakery/user/${editUserId}`)


          return result || null
        }
        return null
      },
      {
        onError: error => {
          showNotification({
            message: `A aparut o eroare la obtinerea detaliilor userului. ${formatErrorMessage(
              error
            )}`,
            type: 'error'
          })
        }
      }
  )

    const { data: roles, isLoading: isRolesLoading, refetch: refetchRoles } = useQuery(
      ['role'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/role')
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

        setRolesx(resultOptions);

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

    const { data: structRegion, isLoading: isStructRegionLoading, refetch: refetchStructRegion } = useQuery(
      ['regions', roles.find(role => role.name === 'REGION_MANAGER')?.id],
      async () => {
        const result = await makeCoreGetRequest(`/bakery/stucture/role/${rolesx.find(role => role.name === 'REGION_MANAGER')?.id}`)
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching regions manager dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

    const { data: structStore, isLoading: isStructStoreLoading, refetch: refetchStructStore } = useQuery(
      ['stores', roles.find(role => role.name === 'STORE_MANAGER')?.id],
      async () => {
        const result = await makeCoreGetRequest(`/bakery/stucture/role/${rolesx.find(role => role.name === 'STORE_MANAGER')?.id}`)
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching store manager dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: EditUserItem) => {
        await makeCorePutRequest(`/bakery/user/${editUserId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `User edited successfully`,
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
        onSubmit: async (values: EditUserItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active'
            }
            mutate(payload)
            resetForm()
        }
    })

    const handleStructRegionChange = value => {
      setRegionMgValue(value);
      setShouldRefreshData(true)
    }

    const handleStructStoreChange = value => {
      setStoreMgValue(value);
      setShouldRefreshData(true)
    }

    const handleStructTraineeChange = value => {
      setTraineeValue(value);
      setShouldRefreshData(true)
    }
    
    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <FormInfoItems
                  items={[
                    { label: 'Nume:', name: (editItem as EditUserItem)?.firstName },
                    {
                      label: 'Prenume:',
                      name: (editItem as EditUserItem)?.lastName
                    },
                    {
                      label: 'Rol:',
                      name: '-' //TODO ask ale
                    }
                  ]}
                />
              </Grid>

              <Grid>
                <Checkbox
                  checked={isRegionManagerChecked}
                  label={'REGION_MANAGER'}
                  onChange={() => setIsRegionManagerChecked(!isRegionManagerChecked)}
                />
              </Grid>
              {isRegionManagerChecked && 
                <>
                  {isStructRegionLoading ? (
                    <div style={{ display: 'flex' }}>
                      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                    </div>
                  ) : (
                    <Grid xs={12} item>
                      <AsyncAutocomplete
                        variant="outlined"
                        name="region_manager"
                        label="Structura asociata"
                        value={regionMgValue}
                        options={structRegion}
                        onChange={handleStructRegionChange}
                      />
                    </Grid>
                  )}
                </>
              }

              <Grid>
                <Checkbox
                  checked={isStoreManagerChecked}
                  label={'STORE_MANAGER'}
                  onChange={() => setIsStoreManagerChecked(!isStoreManagerChecked)}
                />
              </Grid>
              {isStoreManagerChecked &&
              <>
                {isStructStoreLoading ? (
                  <div style={{ display: 'flex' }}>
                    <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
                  </div>
                ) : (
                  <Grid xs={12} item>
                    <AsyncAutocomplete
                      variant="outlined"
                      name="store_manager"
                      label="Structura asociata"
                      value={storeMgValue}
                      options={structStore}
                      onChange={handleStructStoreChange}
                    />
                  </Grid>
                )}
              </>
              }

              <Grid>
                <Checkbox
                  checked={isTraineeChecked}
                  label={'TRAINEE'}
                  onChange={() => setIsTraineeChecked(!isTraineeChecked)}
                />
              </Grid>
              {isTraineeChecked &&
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    variant="outlined"
                    name="trainee"
                    label="Structura asociata"
                    value={traineeValue}
                    options={traineeTypes}
                    onChange={handleStructTraineeChange}
                  />
                </Grid>
              }

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
                <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
                <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
              </Grid>
            </>)}
          </Grid>
        </Modal>
      )
}

export default EditUser
