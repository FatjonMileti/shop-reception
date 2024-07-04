import * as Yup from 'yup'

export const getInitialValues = (shopCodes, shopTypes) => {
  return {
    shopCodes: shopCodes ? [shopCodes[0]] : null,
    file: null,
    ruleTypes: shopTypes ? [shopTypes[0]] : null
  }
}
