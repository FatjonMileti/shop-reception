import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    seal: Yup.string().required('Număr sigiliu este un câmp necesar'),
    notice: Yup.string().required('Aviz/BL este un câmp necesar'),
    transportNote: Yup.string().required('Scrisoare de transport/CMR este un câmp necesar'),
    thermodiagram: Yup.string().required('Termodiagrama este un câmp necesar'),
  })

export const initialValues = {
  seal: '',
  notice: '',
  transportNote: '',
  thermodiagram: ''
}

// Conversion of the angular form from shop reception mobile

// export const getValidationSchema = Yup.object().shape({
//     temperature: Yup.number().nullable(),
//     thermodiagramConform: Yup.boolean(),
//     sealList: Yup.array().of(
//         Yup.object().shape({
//             id: Yup.string().required(),
//             code: Yup.string().required(),
//             integral: Yup.boolean(),
//         })
//     ),
//     documentList: Yup.array().of(
//         Yup.object().shape({
//             depositId: Yup.string().nullable(),
//             depositName: Yup.string(),
//             hasNotice: Yup.boolean(),
//             hasTransportNote: Yup.boolean(),
//         })
//     ),
// });

// export const initialValues = {
//     temperature: null,
//     thermodiagramConform: true,
//     sealList: [{ id: '', code: '', integral: true }],
//     documentList: [{ depositId: null, depositName: '', hasNotice: true, hasTransportNote: true }],
// };


// Example Payload

// {   "id": 294422,
//     "shopTemperature": null,
//     "sealList": [],
//     "documentList": [
//         {
//             "depositId": 7,
//             "depositName": null,
//             "hasNotice": true,
//             "hasTransportNote": true
//         }
//     ],
//     "thermodiagramConform": true
// }
