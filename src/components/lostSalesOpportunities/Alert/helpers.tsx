import * as yup from 'yup'

export const getInfoItems = alert => [
  {
    label: 'Cod:',
    name: alert.articleId,
    render: () => <span style={{ fontWeight: 500 }}>{alert.articleId}</span>
  },
  {
    label: 'Cantitate LSO:',
    name: alert.lsoQuantity,
    render: () => <span style={{ fontWeight: 500 }}>{alert.lsoQuantity}</span>
  },
  {
    label: 'Stoc:',
    name: alert.realTimeStock,
    render: () => <span style={{ fontWeight: 500 }}>{alert.realTimeStock}</span>
  }
]

export const validationSchema = yup.object({
  feedbackReasonId: yup.string().nonNullable().required(),
  comment: yup.string()
})
