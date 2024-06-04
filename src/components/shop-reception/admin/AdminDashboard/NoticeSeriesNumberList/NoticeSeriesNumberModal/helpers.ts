import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  noticeMinNumber: Yup.number().required('Campul este obligatoriu.'),
  noticeMaxNumber: Yup.number().required('Campul este obligatoriu.'),
  noticeSeries: Yup.string().required('Campul este obligatoriu.'),
  year: Yup.number().required('Campul este obligatoriu.'),
  parentSociety: Yup.lazy(value =>
    typeof value === 'object'
      ? Yup.object().required('Campul este obligatoriu.').typeError('Campul este obligatoriu.')
      : Yup.string().required('Campul este obligatoriu.')
  )
})

export const getInitialValues = editItem => {
  return {
    noticeMinNumber: editItem?.noticeMinNumber || 0,
    noticeMaxNumber: editItem?.noticeMaxNumber || 0,
    noticeSeries: editItem?.noticeSeries || '',
    year: editItem?.year || 0,
    parentSociety: {label: editItem?.parentSociety, value: editItem?.parentSociety} || null
  }
}
