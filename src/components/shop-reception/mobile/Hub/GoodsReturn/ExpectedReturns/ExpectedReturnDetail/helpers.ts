import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    sealList: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        returnTruckId: Yup.string(),
        sealCode: Yup.string(),
        conform: Yup.boolean()
      })
    ),
    noticeList: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        truckId: Yup.number(),
        noticeNumber: Yup.string(),
        shopCode: Yup.string(),
        shopName: Yup.string(),
        hubName: Yup.string().nullable(),
        correctNoticeNumber: Yup.string().nullable(),
        correct: Yup.boolean()
      })
    ),
  })

export const initialValues = {
  sealList: [],
  noticeList: []
}
