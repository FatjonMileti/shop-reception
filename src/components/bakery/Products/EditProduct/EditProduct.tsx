import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditProductItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues } from '../helpers'
import { useMemo, useState } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { FileUpload } from 'components/core-ui/FileUpload'

interface EditProductProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editProductId?: string | number
}

const EditProduct: React.FC<EditProductProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editProductId } = props
    const { showNotification } = useNotification()
    const [isImgUploaded, setIsImgUploaded] = useState(null);
    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['product', editProductId],
        async () => {
          if (editProductId) {
            const result = await makeCoreGetRequest(`/bakery/product/management/${editProductId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `A aparut o eroare la obtinerea detaliilor zonei. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: EditProductItem) => {
        if(isImgUploaded) {
          await makeCorePostRequest(`/bakery/product/management/upload/${editProductId}`, values)
        } else {
          await makeCorePostRequest(`/bakery/product/management/delete/${editProductId}`, values)
        }
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Product edited successfully`,
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
        onSubmit: async (values: EditProductItem, { resetForm }) => {
            const payload = {
                ...values,
                ...(isImgUploaded ? { fileObject: 'xxx' } : {}),
            }
            mutate(payload)
            resetForm()
        }
    })

    const onFileUpload = (x) => {
      if(x) {  //TODO figure out what fileObject in uat post payload means
        console.log('xxxxxxxxxxxxxxx',x);
        console.log('xxxxxxxxxxxxxxx',x.target.files);
        console.log('imageUrl', URL.createObjectURL(x.target.files[0]))
        setIsImgUploaded(true);
      }
      else { console.log('yyyyyyyyyy',x)}
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
                    { label: 'Produs:', name: (editItem as EditProductItem)?.name },
                    {
                      label: 'Familie:',
                      name: (editItem as EditProductItem)?.familyModuleName
                    }
                  ]}
                />
              </Grid>
                
              <Grid xs={12} item>
                <FileUpload 
                  value={(editItem as EditProductItem)?.imageUrl}
                  editItem={(editItem as EditProductItem)}
                  fileInputProps={{ displayImage: (editItem as EditProductItem)?.imageUrl}}
                  onChange={onFileUpload}
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

export default EditProduct
