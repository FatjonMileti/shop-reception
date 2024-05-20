import { getCIF } from './helpers'

export const toLegalPersonPayload = values => ({ ...values, cif: getCIF(values.cif) })
