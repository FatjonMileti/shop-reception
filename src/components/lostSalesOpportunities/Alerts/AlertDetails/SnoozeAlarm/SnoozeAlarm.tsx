import { useState } from 'react'
import { Button, RadioButtonGroup } from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress } from '@mui/material'
import { getSnoozeOptions } from 'components/lostSalesOpportunities/api'
import { useNotification } from 'hooks'
import s from './SnoozeAlarm.modules.scss'
import { makeCorePostRequest } from 'utils/api'
import { toSnoozeAlertPayload } from './serializers'
import { useMutation } from 'react-query'
import { handleQueryError } from 'utils/helpers'

const SnoozeAlarm = props => {
  const { alertId } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const { showNotification } = useNotification()

  const { data: snoozeOptions, isLoading: isSnoozeOptionsLoading } =
    getSnoozeOptions(showNotification)

  const updateSnooze = async values => {
    await makeCorePostRequest('/lso/alerts-configuration', toSnoozeAlertPayload(alertId, values))
  }

  const { isLoading, mutate } = useMutation(updateSnooze, {
    onSuccess: res => {
      // setShouldRefreshData(true)
      showNotification({
        message: 'Alerta a fost amanata cu succes.',
        type: 'success'
      })
    },
    onError: error => handleQueryError(error, `Eroare la amanarea alertei.'}`, showNotification)
  })

  return isSnoozeOptionsLoading ? (
    <div style={{ display: 'flex' }}>
      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
    </div>
  ) : (
    <Box>
      <Box className={s.optionsTitle}>Cat timp vrei sa anulezi alarma?</Box>
      <Box className={s.optionsContainer}>
        <RadioButtonGroup
          dotStyle
          name="snoozeTime"
          onChange={(e, option) => {
            setSelectedOption(option)
          }}
          value={selectedOption}
          defaultValue={snoozeOptions[0]}
          options={snoozeOptions}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          label="Amana alarma"
          style={{ width: 'calc(100% - 16px)' }}
          onClick={() => mutate(selectedOption)}
        />
      </Box>
    </Box>
  )
}
export default SnoozeAlarm
