export const formatErrorMessage = error => {
    let data = error.response?.data

    if(data != null){
        return data?.message
    }
    return ""
}
