export const formatErrorMessage = error => {
  let data = error.response?.data

  if (error.request?.responseType === 'arraybuffer') {
    data = JSON.parse(new TextDecoder().decode(error.request.response))
  }

  if (data !== null || data !== undefined) {
    return data?.message || error.message
  }

  return ''
}
