import { Box } from '@mui/material'
import { BooleanTextProps } from './BooleanTextDefinitions'

const BooleanText = (props: BooleanTextProps) => {
  const { value, onSuccess, onFailure } = props

  return <Box>{value ? onSuccess : onFailure}</Box>
}

export default BooleanText
