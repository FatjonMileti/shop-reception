import { resizeFile } from 'utils/helpers'
import { toFormDataPayload } from 'utils/serializers'

export const toAlertPayload = async (values, id) => {
  if (values.photo) {
    const resizedImage = await resizeFile({ file: values.photo })
    console.log('originalImage', (values.photo.size / (1024 * 1024)).toFixed(5), 'mb')
      console.log('resizedImage', (resizedImage.size / (1024 * 1024)).toFixed(5), 'mb')
    return toFormDataPayload({
      alertId: id,
      feedbackReasonId: values.feedbackReason.value,
      comment: values.comment,
      photo: resizedImage
    })
  }
  return toFormDataPayload({
    alertId: id,
    feedbackReasonId: values.feedbackReason.value,
    comment: values.comment
  })
}
