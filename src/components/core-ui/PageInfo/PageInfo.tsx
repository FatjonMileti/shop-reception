import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNotification } from 'hooks'
import { get } from 'lodash'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ModalInfo } from 'components/core-ui/ModalWithForm/ModalForm/ModalInfo'
import { makeCoreGetRequest } from 'utils/api'
import { PageInfoProps } from './PageInfoDefinitions'
import { Box } from '@mui/material'
import s from './PageInfo.modules.scss'

const PageInfo = (props: PageInfoProps) => {
  const { action, formInfoItems, title, ...rest } = props

  const [editItem, setEditItem] = useState({})

  const { id } = useParams()

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest(`${action.url}/${id}`)
        setEditItem(result)
      } catch (error) {
        showNotification({
          message: `A aparut o eroarea la obtinerea datelor. ${error?.message}`,
          type: 'error'
        })
      }
    })()
  }, [action])

  return (
    <Box className={s.infoContainer} style={{ marginBottom: '24px' }}>
      <Typography component="h1" variant="medium">
        {get(editItem, title.name)}
      </Typography>
      <ModalInfo formInfoItems={formInfoItems} editItem={editItem} />
    </Box>
  )
}

export default PageInfo
