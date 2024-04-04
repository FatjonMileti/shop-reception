import * as Yup from 'yup'
import { formatBakeryPayloadDate, formatPayloadDate, getCurrentDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = () => {
  return {
    productionDate: getCurrentDate(),
    chargeNumber: null,
    productionOperator: null,
    quantity: null,
    thermalCondition: null,
    conform: true,
    nonComplianceReason: null,
    productDestination: null,
    dlc: null,
    traceabilityFrozenList: []
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
  quantity: Yup.number().required('Campul cantitate trebuie completat').positive('Inserati valoare pozitiva'),
  thermalCondition: Yup.string().required('Campul stare termica trebuie selectat.'),
  conform: Yup.boolean(),
  nonComplianceReason: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  productDestination: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  traceabilityFrozenList: Yup.array().of(
    Yup.object()
      .shape({
        batchId: Yup.string(),
        quantity: Yup.number().required('Cantitate obligatorie').positive('Inserati valoare pozitiva'),
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
        // dlc: Yup.string().nullable(),
        hasSecondaryDlc: Yup.boolean()
      })
      .required()
  )
})

export const toBatchFormat = (item, quantity) => ({
  batchName: item.batchName,
  batchId: item.id,
  quantity: quantity,
  hasSecondaryDlc: item?.hasSecondaryDlc,
  openingDate: null,
  dlcDays: item.dlcDays
})

export const toBatchFormatEdit = batches => {
  return batches.map(item => ({
    batchName: item.batch.batchName,
    batchId: item.batch.id,
    quantity: item.batch.batchQuantity,
    openingDate: formatPayloadDate(item.openingDate),
    dlc: item.batch.dlcDays
  }))
}
