import WestIcon from '@mui/icons-material/West'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import s from './BackButton.modules.scss'

interface BackButtonProps {
  text: string
  onNavBack: () => void
}

const BackButton = ({ text, onNavBack }: BackButtonProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.375rem'
      }}
    >
      <IconButton color="primary" onClick={onNavBack}>
        <WestIcon />
      </IconButton>

      <Typography className={s.text} variant="medium">
        <span>{text || ''}</span>
      </Typography>
    </Box>
  )
}

export default BackButton
