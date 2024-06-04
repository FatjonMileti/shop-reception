import * as Yup from "yup";

export const getValidationSchema = () =>
  Yup.object().shape({
    stackList: Yup.array().of(
      Yup.object().shape({
          truckId: Yup.string(),
          shopCode: Yup.string(),
          shopName: Yup.string(),
          stackNumber: Yup.number(),
          confirmedStackNumber: Yup.number().required(),
          rollsNumber: Yup.number(),
          confirmedRollsNumber: Yup.number(),
        }
      )
    )
  })

export const initialValues = {
  stackList: []
}