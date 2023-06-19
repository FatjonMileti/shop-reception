import { Box } from '@mui/material'
import s from './ContainerBox.modules.scss'

const ContainerBox = props => {
  return (
    <Box style={{ textAlign: props.align || 'left' }} className={s.containerBox}>
      {props.children}
    </Box>
  )
}

export default ContainerBox
