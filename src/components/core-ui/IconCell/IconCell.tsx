import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { IconCellProps } from './IconCellDefinitions'

function IconCell({ value }: IconCellProps) {
  switch (value) {
    case 'active':
      return <CheckCircleOutlineIcon style={{ color: 'green' }} />
    default:
      return <RadioButtonUncheckedIcon style={{ color: 'lightgray' }} />
  }
}

export default IconCell
