import * as yup from 'yup'

const labelStyle = {
  color: '#052351',
  fontFamily: 'Ubuntu',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal'
}

const valueStyle = {
  color: '#052351',
  fontFamily: 'Ubuntu',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal'
}

export const getInfoItems = alert => [
  {
    label: 'Cod:',
    name: alert.articleId,
    labelStyle,
    valueStyle
  },
  {
    label: 'Cantitate LSO:',
    name: alert.lsoQuantity,
    labelStyle,
    valueStyle
  },
  {
    label: 'Stoc:',
    name: alert.realTimeStock,
    labelStyle,
    valueStyle
  }
]

export const validationSchema = yup.object({
  feedbackReasonId: yup.string().nonNullable().required(),
  comment: yup.string()
})
