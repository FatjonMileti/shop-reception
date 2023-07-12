import React, { useEffect } from 'react'
import {
  CircularProgress,
  Paper
} from '@mui/material'
import s from './FlexListTable.modules.scss'
import { get } from 'lodash'

export type FlexListTableRowType = { [key: string]: any }

export type FlexListTableColumnsType = {
  field: string
  render?: (row: FlexListTableRowType) => React.ReactNode
  style?: any,
  displayIf?: string
}

export interface FlexListTableProps {
  columns: Array<FlexListTableColumnsType>
  rows: Array<FlexListTableRowType>
  handleRemoteData: () => void
  isLoading: boolean
  style?: any
  className?: string
}

const FlexListTable = (props: FlexListTableProps) => {
  useEffect(() => {
    props.handleRemoteData()
  }, [])

  return props.isLoading ? (
    <div style={{ display: 'flex' }}>
      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
    </div>
  ) : (
    <div className={s.listStyle} style={props.style}>
        {props.rows.map((row) => (
            <Paper key={row.id} className={s.rowStyle}>
              {props.columns.filter(column => !column.displayIf || get(row, column.displayIf)).map((column) => (
                <div key={column.field} style={column.style}>
                  {column.render ? column.render(row) : row[column.field]}
                </div>
              ))}
            </Paper>
        ))}
    </div>
  )
}

export default FlexListTable
