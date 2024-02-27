export const formatErrorMessage = error => {
  let data = error.response?.data

  if (data !== null || data !== undefined) {
    return data?.message
  }

  return ''
}
