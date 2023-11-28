import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditUserItem, ValueLabelInterface } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, statuses } from '../helpers'
import { ChangeEvent, useMemo, useState, useEffect } from 'react'
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

    const [regionId, setRegionId]=useState('');
    const [storeId, setStoreId]=useState('');

    const [rolesVal, setRolesVal]=useState([])
    const [traineeTypes, setTraineeTypes] = useState<ValueLabelInterface[]>(null);

    const [isRegionManagerChecked, setIsRegionManagerChecked] = useState(false)
    const [regionMgValue, setRegionMgValue] = useState<ValueLabelInterface>(null);

    const [isStoreManagerChecked, setIsStoreManagerChecked ] = useState(false)
    const [storeMgValue, setStoreMgValue] = useState<ValueLabelInterface>(null)
    
    const [isTraineeChecked, setIsTraineeChecked] = useState(false)
    const [traineeValue, setTraineeValue] = useState<ValueLabelInterface>(null)
    
    const [isSectionChecked, setIsSectionChecked] = useState(false)

    const { data: roles, refetch: refetchRoles } = useQuery(
      ['role'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/role')
        setRolesVal(result || []);
        return result || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching roles data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
      },
    )
    
    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
      ['user', editUserId],
      async () => {
        if (editUserId) {
          const result = await makeCoreGetRequest(`/bakery/user/${editUserId}`)
          if(result)setRegionId(result.structureRoles.find(strRole => strRole.structureType === 'REGION_MANAGER').roleId)
          if(result)setStoreId(result.structureRoles.find(strRole => strRole.structureType === 'STORE_MANAGER').roleId)
          refetchStructRegion()
          refetchStructStore()
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

    const { data: structRegion, isLoading: isStructRegionLoading, refetch: refetchStructRegion } = useQuery(
      // ['regions', rolesVal?.find(role => role.name === 'REGION_MANAGER').id || ''] ,
      ['regions', 'id'],
      // ['regions', editItemVal?.structureRoles?.find(strRole => strRole.structureType === 'REGION').roleId],
      async () => { 
        const result = await makeCoreGetRequest(`/bakery/structure/role/:id`)
        // const result = await makeCoreGetRequest(`/bakery/structure/role/${editItemVal?.structureRoles?.find(strRole => strRole.structureType === 'REGION').roleId}`)
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name')

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
      // ['stores', editItemVal?.structureRoles?.find(strRole => strRole.structureType === 'STORE').roleId], 
      // ['stores', rolesVal?.find(role => role.name === 'STORE_MANAGER').id || ''], 
      ['regions', 'id'],
      async () => {
        const result = await makeCoreGetRequest(`/bakery/structure/role/:id`)
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name')

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
                enable: values.enable === 'Active',
                // structureRoles: editItem.structureRoles.map(
                //   strRole => {
                //     "roleId": roles?.find(role => role.id === regionMgValue.value).id,
                //       "structureId": regionMgValue.value,
                //       "structureType": "REGION"
                //   }
                // )
                // structureRoles: [
                // ...(isRegionManagerChecked ? { 
                //   "roleId": roles?.find(role => role.id === regionMgValue.value).id,
                //   "structureId": regionMgValue.value,
                //   "structureType": "REGION"
                // } : {}),
                // ...(isStoreManagerChecked ? { 
                //   "roleId": roles?.find(role => role.id === storeMgValue.value).id,
                //   "structureId": storeMgValue.value,
                //   "structureType": "STORE"
                // } : {}),
                // ...(isTraineeChecked ? { 
                //   "roleId": roles?.find(role => role.id === traineeValue.value).id,
                //   "structureId": traineeValue.value,
                //   "structureType": null
                // } : {}),
                // ]
            }
            mutate(payload)
            resetForm()
        }
    })

    const handleChange = (field, value) => {
      switch(field) {
        case 'regionMg': 
          setRegionMgValue(value)
          setShouldRefreshData(true)
          break
        case 'storeMg': 
          setStoreMgValue(value)
          setShouldRefreshData(true)
          break
        default:
          setTraineeValue(value)
          setShouldRefreshData(true)
          break
      }
    }
    
    useEffect(() => {
      if(editItem && roles && structRegion && structStore) {
        editItem.structureRoles.forEach(strRole => {
          const role = roles?.find(role => role.id === strRole.roleId);
          console.log('role', role)
          if(role?.name === 'REGION_MANAGER') {
            const findRegion = structRegion?.find(reg => reg.value === strRole.structureId)
            setIsRegionManagerChecked(true)
            setRegionMgValue({label: findRegion.label , value: findRegion.id})
          }
          if(role?.name === 'STORE_MANAGER') {
            const findStore = structStore?.find(reg => reg.value === strRole.structureId)
            setIsStoreManagerChecked(true)
            setStoreMgValue({label: findStore.label , value: findStore.id})
          }
          if(role?.name.includes('TRAINEE')) {
            const findTrainee = roles?.find(role => role.id === strRole.roleId)
            setIsTraineeChecked(true)
            setTraineeValue({label: findTrainee?.name , value: findTrainee?.id})
          }
        })
      }

    },[roles, editItem, structRegion, structStore])

    useEffect(() => {
      if(rolesVal?.length) {
        const traineeTypes = []
        rolesVal?.map(role => role.name.includes('TRAINEE') && traineeTypes.push(role))
        setTraineeTypes(toAsyncSelectOptions(traineeTypes, 'id', 'name'))
        if(traineeTypes) setIsTraineeChecked(true)
      }
    },[roles])

    useEffect(() => {
      if(isRegionManagerChecked) refetchStructRegion()
      if(isStoreManagerChecked) refetchStructStore()
    },[isStoreManagerChecked, isRegionManagerChecked])

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

              <Grid xs={12} item>
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
                        disableClearable
                        variant="outlined"
                        name="region_manager"
                        label="Structura asociata"
                        value={regionMgValue}
                        options={structRegion}
                        onChange={(val) => handleChange('regionMg', val)}
                      />
                    </Grid>
                  )}
                </>
              }

              <Grid xs={12} item>
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
                      disableClearable
                      variant="outlined"
                      name="store_manager"
                      label="Structura asociata"
                      value={storeMgValue}
                      options={structStore}
                      onChange={(val) => handleChange('storeMg', val)}
                      />
                  </Grid>
                )}
              </>
              }

              <Grid xs={12} item>
                <Checkbox
                  checked={isTraineeChecked}
                  label={'TRAINEE'}
                  onChange={() => setIsTraineeChecked(!isTraineeChecked)}
                />
              </Grid>
              {isTraineeChecked &&
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    disableClearable
                    variant="outlined"
                    name="trainee"
                    label="Structura asociata"
                    value={traineeValue}
                    options={traineeTypes}
                    onChange={(val) => handleChange('trainee', val)}
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
