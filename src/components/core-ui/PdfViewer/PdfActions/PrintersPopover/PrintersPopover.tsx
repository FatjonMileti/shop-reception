import { useState, useEffect } from 'react'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Popover, MenuList, MenuItem, ListItemText } from '@mui/material'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import s from './PrintersPopover.modules.scss'

const PrintersPopover = ({ actions, id, handlePrintListClose, popoverId, open, anchorEl }) => {
  const [printers, setPrinters] = useState([])

  const { showNotification } = useNotification()

  useEffect(() => {
    if (open && !printers.length) {
      ;(async () => {
        try {
          const result = await makeCoreGetRequest(actions.printersAction.url)
          setPrinters(result)
        } catch (error) {
          showNotification({
            message: `A aparut o eroare la obtinerea listei de imprimante. ${formatErrorMessage(
              error
            )}`,
            type: 'error'
          })
        }
      })()
    }
  }, [open])

  const print = async printerId => {
    try {
      if (actions.printAction.type === 'GET') {
        await makeCoreGetRequest(`${actions.printAction.url}/${id}`)
      }
      if (actions.printAction.type === 'POST') {
        await makeCorePostRequest(`${actions.printAction.url}/${id}`, { printerId })
      }

      handlePrintListClose()

      showNotification({
        message: 'Fisierul a fost printat cu succes',
        type: 'success'
      })
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la printarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={handlePrintListClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <Box className={s.printerListContainer}>
        <Typography component="h3" variant="medium">
          Alege o imprimanta
        </Typography>
        <MenuList className={s.printerList}>
          {printers.map(printer => (
            <MenuItem key={printer.id} onClick={() => print(printer.id)}>
              <ListItemText>{printer.name}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Popover>
  )
}

export default PrintersPopover
