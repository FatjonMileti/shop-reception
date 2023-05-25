import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

function IconCell({ value }: { value: string }) {
  switch (value) {
    case 'active':
      return <CheckCircleOutlineIcon style={{ color: 'green' }} />
    default:
      return <RadioButtonUncheckedIcon style={{ color: 'lightgray' }} />
  }
}

export default IconCell
