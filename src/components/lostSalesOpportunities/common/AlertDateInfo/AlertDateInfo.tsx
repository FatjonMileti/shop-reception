import { Box } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
import { getCurrentDate } from 'utils/helpers'
import { AlertDateInfoProps } from 'components/lostSalesOpportunities/interfaces'
import s from './AlertDateInfo.modules.scss'

const AlertDateInfo: React.FC<AlertDateInfoProps> = ({ validHour }) => {
  return (
    <Box className={s.date}>
      <Icon_v2 iconName="Date" iconType="Icon"></Icon_v2>
      <span>
        {getCurrentDate()}, {validHour}
      </span>
    </Box>
  )
}

export default AlertDateInfo
