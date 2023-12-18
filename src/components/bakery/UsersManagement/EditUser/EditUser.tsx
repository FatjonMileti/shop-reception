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
import { getInitialValues, statuses, updateStateWithExistingValues } from '../helpers'
import { ChangeEvent, useMemo, useState, useEffect } from 'react'
import { getStructureRoles, toAsyncSelectOptions } from '../serializers'
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

    const [regionId, setRegionId]=useState('')
    const [storeId, setStoreId]=useState('')
    const [traceabilityId, setTraceabilityId]=useState('')
    const [adminId, setAdminId]=useState('')
    const [isAdmin, setIsAdmin]=useState(false)
    const [traineeTypes, setTraineeTypes] = useState<ValueLabelInterface[]>(null)

    const [isRegionManagerChecked, setIsRegionManagerChecked] = useState(false)
    const [regionMgValue, setRegionMgValue] = useState<ValueLabelInterface>(null)

    const [isStoreManagerChecked, setIsStoreManagerChecked ] = useState(false)
    const [storeMgValue, setStoreMgValue] = useState<ValueLabelInterface>(null)

    const [isTraineeChecked, setIsTraineeChecked] = useState(false)
    const [traineeValue, setTraineeValue] = useState<ValueLabelInterface>(null)
    
    const [isTraceabilityOpChecked, setIsTraceabilityOpChecked] = useState(false)
    const [traceabilityOpValue, setTraceabilityOpValue] = useState<ValueLabelInterface>(null)

    const { data: roles } = useQuery(
      ['role'],
      async () => {
        const result = await makeCoreGetRequest('/bakery/role')
        if(result) {
          setRegionId(result.find(el => el.name === 'REGION_MANAGER')?.id)
          setStoreId(result.find(el => el.name === 'STORE_MANAGER')?.id)
          setTraceabilityId(result.find(el => el.name === 'TRACEABILITY_OPERATOR')?.id)
          setAdminId(result.find(el => el.name === 'ADMIN')?.id)
        }
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
          refetchStructRegion()
          refetchStructStore()
          refetchStructTraceabilityOp()
          return result || null
        }
        return null
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching user data. ${formatErrorMessage(
              error
            )}`,
            type: 'error'
          })
        }
      }
  )

    const { data: structRegion, refetch: refetchStructRegion } = useQuery(
      ['regions', regionId],
      async () => { 
        const result = await makeCoreGetRequest(`/bakery/structure/role/${regionId}`)
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

    const { data: structStore, refetch: refetchStructStore } = useQuery(
      ['stores', storeId],
      async () => {
        const result = await makeCoreGetRequest(`/bakery/structure/role/${storeId}`)
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

    const { data: structTraceabilityOp, refetch: refetchStructTraceabilityOp } = useQuery(
      ['traceabilityOp', traceabilityId],
      async () => {
        const result = await makeCoreGetRequest(`/bakery/structure/role/${traceabilityId}`)
        const resultOptions = toAsyncSelectOptions(result, 'id', 'name')

        return resultOptions || []
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching traceability operator dropdown data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
    )

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

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
    const getStructureRolesProps = {
      isRegionManagerChecked,
      isStoreManagerChecked,
      isTraceabilityOpChecked,
      isTraineeChecked,
      isAdmin,
      regionId,
      storeId,
      adminId,
      traceabilityId,
      regionMgValue,
      storeMgValue,
      traceabilityOpValue,
      traineeValue
    }

    //TODO find better way to validate data
    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: initialValues,
        onSubmit: async (values: any, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active',
                structureRoles: getStructureRoles(getStructureRolesProps)
            }
            mutate(payload)
            resetForm()
        }
    })
  
    const handleChange = (field, value) => {
      switch(field) {
        case 'regionMg': 
          setRegionMgValue(value)
          break
        case 'storeMg': 
          setStoreMgValue(value)
          break
        case 'traceabilityOp': 
          setTraceabilityOpValue(value)
          break
        default:
          setTraineeValue(value)
          break
      }
    }
    
    useEffect(() => {
      if(editItem?.structureRoles?.length && editItem && roles && structRegion && structStore && structTraceabilityOp) {
        editItem?.structureRoles?.forEach(strRole => {
          const role = roles?.find(role => role.id === strRole.roleId)
          if(role?.name === 'REGION_MANAGER') updateStateWithExistingValues(strRole, structRegion, setIsRegionManagerChecked, setRegionMgValue)
          if(role?.name === 'STORE_MANAGER') updateStateWithExistingValues(strRole, structStore, setIsStoreManagerChecked, setStoreMgValue)
          if(role?.name === 'TRACEABILITY_OPERATOR') updateStateWithExistingValues(strRole, structTraceabilityOp, setIsTraceabilityOpChecked, setTraceabilityOpValue)
          if(role?.name.includes('TRAINEE')) updateStateWithExistingValues(strRole, roles, setIsTraineeChecked, setTraineeValue, true)
          if(role?.name === 'ADMIN') {
            setIsAdmin(true)
          }
        })
      }

    },[roles, editItem, structRegion, structStore, structTraceabilityOp])

    useEffect(() => {
      if (roles?.length) {
        const traineeTypes = roles.reduce((accumulator, role) => {
          if (role.name.includes('TRAINEE')) {
            accumulator.push(role);
          }
          return accumulator;
        }, []);
      
        setTraineeTypes(toAsyncSelectOptions(traineeTypes, 'id', 'name'));
      }
    },[roles])

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
                    { label: 'Nume:', 
                      name: (editItem as EditUserItem)?.firstName || '-' 
                    },
                    {
                      label: 'Prenume:',
                      name: (editItem as EditUserItem)?.lastName || '-'
                    },
                    {
                      label: 'Rol:',
                      name: isAdmin ? 'ADMIN' : '-'
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
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    disableClearable
                    variant="outlined"
                    name="region_manager"
                    label="Structura asociata"
                    value={regionMgValue}
                    options={structRegion}
                    onChange={(val) => handleChange('regionMg', val)}
                    required={isRegionManagerChecked}
                    error={isRegionManagerChecked && !regionMgValue?.value}
                    helperText={isRegionManagerChecked && !regionMgValue?.value && 'Region manager is required'}
                  />
                </Grid> 
              }

              <Grid xs={12} item>
                <Checkbox
                  checked={isStoreManagerChecked}
                  label={'STORE_MANAGER'}
                  onChange={() => setIsStoreManagerChecked(!isStoreManagerChecked)}
                />
              </Grid>
              {isStoreManagerChecked &&
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    disableClearable
                    variant="outlined"
                    name="store_manager"
                    label="Structura asociata"
                    value={storeMgValue}
                    options={structStore}
                    onChange={(val) => handleChange('storeMg', val)}
                    required={isStoreManagerChecked}
                    error={isStoreManagerChecked && !storeMgValue?.value}
                    helperText={isStoreManagerChecked && !storeMgValue?.value && 'Store manager is required'}
                    />
                </Grid>
              }

              <Grid xs={12} item>
                <Checkbox
                  checked={isTraceabilityOpChecked}
                  label={'TRACEABILITY_OPERATOR'}
                  onChange={() => setIsTraceabilityOpChecked(!isTraceabilityOpChecked)}
                />
              </Grid>
              {isTraceabilityOpChecked &&
                <Grid xs={12} item>
                  <AsyncAutocomplete
                    disableClearable
                    variant="outlined"
                    name="traceability_operator"
                    label="Structura asociata"
                    value={traceabilityOpValue}
                    options={structTraceabilityOp}
                    onChange={(val) => handleChange('traceabilityOp', val)}
                    required={isTraceabilityOpChecked}
                    error={isTraceabilityOpChecked && !traceabilityOpValue?.value}
                    helperText={isTraceabilityOpChecked && !traceabilityOpValue?.value && 'Traceability operator is required'}
                    />
                </Grid>
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
                    required={isTraineeChecked}
                    error={isTraineeChecked && !traineeValue?.value}
                    helperText={isTraineeChecked && !traineeValue?.value && 'Trainee is required'}
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
