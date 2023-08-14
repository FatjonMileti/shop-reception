import React, { useState, useEffect, useMemo } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Close } from '@mui/icons-material'
import { Autocomplete, IconButton, Button } from '@fullscreendigital/carrefour-dex-fe'
import { useMediaQuery } from '@mui/material'

import s from './DownloadModal.modules.scss'
import { toTableGETUrl } from '../Table/serializers'

const sx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bgcolor: '#fff',
  p: 4,
  maxHeight: '80%',
  overflowY: 'auto',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px'
}

const DownloadModal = ({
  modalProps,
  isModalOpen,
  closeModal,
  columns,
  modalTitle,
  downloadUrl,
  dynamicColumns,
  extraUrlParams,
  url,
  tableFilters,
  ...rest
}) => {
  const columnOptions = useMemo(() => {
    return dynamicColumns.map(col => ({
      label: col.title,
      value: col.field
    }))
  }, [dynamicColumns])

  const [value, setValue] = useState(columnOptions)

  const closeModalAndResetForm = () => {
    closeModal()
  }

  const onSubmit = () => {
    const filters = toTableGETUrl({
      url,
      searchText: '',
      searchFields: [],
      filters: rest.filters,
      tableFilters: tableFilters,
      page: 0,
      rowsPerPage: 0,
      order: rest.order,
      orderBy: rest.orderBy,
      hasGeneralSearch: false,
      generalSearchText: '',
      extraUrlParams
    })

    const columnsToPrint = encodeURIComponent(value.map(val => val.value))
    const printUrl = ''.concat(filters, `&columns=${columnsToPrint}`)
   
    window.open(printUrl, '_blank');
  }

  const isXs = useMediaQuery('(max-width:624px)')

  return (
    <Modal
      {...modalProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isModalOpen}
      onClose={closeModalAndResetForm}
    >
      <Box
        sx={{
          ...sx,
          width: isXs ? 'calc(100% - 24px)' : '415px',
          height: '472px',
          ...(modalProps ? modalProps.sx : {})
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          withBackground
          onClick={closeModalAndResetForm}
        >
          <Close />
        </IconButton>
        {modalTitle && modalTitle.length > 0 && (
          <Grid item xs={12}>
            <Typography component="h2" variant="medium">
              <span className={s.modalTitle}>{modalTitle}</span>
            </Typography>
          </Grid>
        )}
        <Autocomplete
          multiple={true}
          options={columnOptions}
          value={value}
          onChange={(_, val) => setValue(val)}
          label="Selecteaza coloane"
          variant="standard"
        />
        <Grid item xs={12} className={s.modalButtons}>
          <Button label="Anuleaza" onClick={closeModal} />
          <Button variant="contained" label="Previzualizare" onClick={onSubmit} />
        </Grid>
      </Box>
    </Modal>
  )
}

export default DownloadModal
