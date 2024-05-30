import * as Yup from 'yup'
import { BATCH_STATUS, EditReceivedProductRequestData } from './EditReceivedProduct'

export const correctReceivedProductSchema: Yup.ObjectSchema<EditReceivedProductRequestData> =
  Yup.object()
    .shape({
      batchStatus: Yup.string().required('Camp obligatoriu'),
      closeReason: Yup.string()
      .when('batchStatus', ([batchStatus], schema) =>
        batchStatus !== BATCH_STATUS.AVAILABLE
          ? schema.required('Camp obligatoriu')
          : schema.nullable()
      ),
      verified: Yup.boolean().required('This field is required')
    })