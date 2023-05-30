import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Paper } from '@mui/material'
import s from './TableSearch.modules.scss'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TableActions } from 'reducers/tableSlice'
import { Icon } from '../Icon'
import { TableSearchProps } from './TableSearchDefinitions'

const TableSearch = (props: TableSearchProps) => {
  const { inputLabel, buttonLabel, ...rest } = props

  const [text, setText] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(TableActions.clearSearchData())
    }
  }, [])

  const searchTable = () => {
    dispatch(TableActions.setSearchData({ searchText: text }))
  }

  return (
    <Paper className={s.searchContainer}>
      <div className={s.controls}>
        <div className={s.searchInputContainer}>
          <Input
            {...rest}
            value={text}
            type="text"
            variant="standard"
            label={inputLabel}
            fullWidth
            onChange={event => setText(event.currentTarget.value)}
          />
        </div>
        <div className={s.buttonContainer}>
          <IconButton
            onClick={searchTable}
            label={buttonLabel}
            variant="contained"
            startIcon={<Icon iconName="SearchOutlined" tiny={true} fill="white" />}
          />
        </div>
      </div>
    </Paper>
  )
}

export default TableSearch
