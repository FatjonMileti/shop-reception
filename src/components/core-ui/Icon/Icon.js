import * as icons from '@mui/icons-material'

const Icon = ({ iconName }) => {
  const MaterialIcon = icons[iconName]
  return <MaterialIcon />
}

export default Icon
