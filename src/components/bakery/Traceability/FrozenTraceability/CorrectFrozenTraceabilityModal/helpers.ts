import * as Yup from 'yup'
import { formatBakeryPayloadDate, formatPayloadDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = editItem => {
  return {
    productionDate: editItem?.productionDate,
    chargeNumber: editItem?.chargeNumber || null,
    productionOperator: editItem?.productionOperator || null,
    quantity: editItem?.quantity || null,
    thermalCondition: editItem?.thermalCondition || null,
    conform: editItem?.conform || false,
    nonComplianceReason: editItem?.nonComplianceReason || null,
    productDestination: editItem?.productDestination || null,
    dlc: editItem?.dlc || null,
    product: editItem?.product,
    traceabilityFrozenList: editItem?.traceabilityFrozenList?.map(toBatchFormatEdit) || []
  }
}

export const validationSchema = Yup.object().shape({
  productionDate: Yup.date()
    .max(new Date(), 'Data de productie nu poate fi in viitor.')
    .required('Campul data productie trebuie completat.'),
  chargeNumber: Yup.number()
    .test('length', 'must be at most 30 digits', value => value?.toString()?.length <= 30)
    .required('Campul sarja trebuie completat.'),
  productionOperator: Yup.string().nullable(), //.required('Campul operator productie trebuie completat.'),
  quantity: Yup.number().positive().required('Campul cantitate trebuie completat'),
  thermalCondition: Yup.string().required('Campul stare termica trebuie selectat.'),
  conform: Yup.boolean(),
  product: Yup.object().required(),

  traceabilityFrozenList: Yup.array().of(
    Yup.object()
      .shape({
        batchId: Yup.string(),
        quantity: Yup.number()
          .required('Cantitate obligatorie')
          .positive('Cantitatea trebuie sa fie pozitiva'),
        openingDate: Yup.date().when(
          ['hasSecondaryDlc', '$productionDate'],
          ([hasSecondaryDlc, productionDate], schema) => {
            if (hasSecondaryDlc) {
              if (productionDate) {
                return schema
                  .required('Data obligatorie')
                  .test(
                    'notAfterProductionDate',
                    'Data deschiderii mai mica sau egala cu data productiei',
                    openingDate => {
                      return !dayjs(openingDate).isAfter(productionDate, 'date')
                    }
                  )
              } else {
                return schema.required('Data obligatorie')
              }
            } else {
              return schema.nullable()
            }
          }
        ),
        // dlc: Yup.string(),
        hasSecondaryDlc: Yup.boolean()
      })
      .required()
  )
})

export const toBatchFormat = (item, quantity) => ({
  batchName: item.batchName,
  batchId: item.id,
  quantity: quantity,
  hasSecondaryDlc: item.hasSecondaryDlc,
  openingDate: formatPayloadDate(item.entryDate),
  dlcDays: item.dlcDays
})

export const toBatchFormatEdit = item => ({
  batchName: item.batch?.batchName,
  batchId: item.batch?.id,
  quantity: item.quantity,
  hasSecondaryDlc: item.batch.hasSecondaryDlc,
  openingDate: formatPayloadDate(item.openingDate),
  dlc: item.dlc,
  dlcDays: item.batch?.dlcDays
})
