import * as Yup from 'yup'
import { ReceivedProductToEdit } from './EditReceivedProduct'

export const correctReceivedProductSchema: Yup.ObjectSchema<ReceivedProductToEdit> = Yup.object()
  .shape({
    batchStatus: Yup.string(),
    closeReason: Yup.string(),
    verified: Yup.boolean().required('This field is required')
  })
  .test({
    test:  (value, context) =>  {
      const { batchStatus, closeReason } = value
      if ((batchStatus && !closeReason) || (!batchStatus && closeReason)) {
        return context.createError({
          path: batchStatus ? 'closeReason' : 'batchStatus',
          message: batchStatus ? 'reason is required' : 'batch status is required'
        })
      }
      return true
    }
  })
