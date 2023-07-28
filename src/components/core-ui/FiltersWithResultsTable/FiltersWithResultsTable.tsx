import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper } from '@mui/material'
import { TableActions } from 'reducers/tableSlice'
import { renderComponent } from 'utils/dynamicRenderingService'
import { RootState } from 'configureStore'
import { formatPayloadDate, getDefaultItemValue } from 'utils/helpers'
import s from './FiltersWithResultsTable.modules.scss'

function FiltersWithResultsTable(props) {
  console.log("[fwrt] props: ", props)

  const { filters, table } = props

  const [filterValues, setFilterValues] = useState(Object.assign({}, ...filters.map(filter => ({[filter.name]: null}))))
  // filterValues => { "filtername1": null, "filtername2": { value: "value2", label: "label2" } }
  //                 { "teamMember.domain": { value: "Digital Platforms", label: "Digital Platforms" } }
  // console.log("[fwrt] filterValues2: ", filterValues)

  const allFiltersHaveValues = useMemo(() => {
    return Object.values(filterValues).includes(null) == false
  }, [filterValues])
  // console.log("[fwrt] allFiltersHaveValues: ", allFiltersHaveValues)

  const filterValuesToUrlParams = useMemo(() => {
    // => [ { "name": "filtername2" }, { "value": "value2" } ]
    return allFiltersHaveValues ? filters.map(filter => ({ name: filter.name, value: filterValues[filter.name]?.value})) : ''
  }, [allFiltersHaveValues])

  const setValueForFilter = (name, value, type, isCustomField) => {
    console.log("[fwrt:setValueForFilter] | name: ", name, " | value: ", value, " | type: ", type, " | isCustomField: ", isCustomField)
    setFilterValues({...filterValues, [name]: value})
  }

  return (
    <div className={s.mainContainer}>
      <Paper className={s.filtersContainer}>
        {filters.map(filter => {

          const { name, label, isCustomField, defaultValue, type } = filter
          // const filterValue = isCustomField ? customFilterState[name] : filterState[name]

          console.log("[fwrt:return:map] filter: ", filter)
          console.log("[fwrt:return:map] name: ", name, " | label: ", label, " | isCustomField: ", isCustomField, " | defaultValue: ", defaultValue, " | type: ", type)
          // console.log("[fwrt:return:map] filterValue: ", filterValue)

          return (
            <Grid key={name} xs={12} md={3} item>
              {renderComponent({
                ...filter,
                value: filterValues[filter.name],
                // ...(type === 'checkbox'
                //   ? {
                //       checked: filterValue ?? getDefaultItemValue(defaultValue)
                //     }
                //   : {}),
                label: label,
                onChange: arg => {
                  const { type, name } = filter
                  console.log("[fwrt:filter:onchange] arg: ", arg, " | arg.target.name: ", arg.target?.name, " | arg.target.value: ", arg.target?.value, " | type: ", type, " | name: ", name)
                  switch (type) {
                    // case 'date':
                    //   setFilterValues(name, arg, type, isCustomField)
                    //   break
                    case 'autocomplete':
                      setValueForFilter(name, arg, type, isCustomField)
                      break
                    // case 'checkbox':
                    //   setFilterValues(name, arg.target.checked, type, isCustomField)
                    //   break
                    default:
                      setValueForFilter(arg.target.name, arg.target.value, type, isCustomField)
                      break
                  }
                },
                setValueForFilter
              })}
            </Grid>
          )

        })}
      </Paper>
      
      {allFiltersHaveValues && renderComponent({...table, extraUrlParams: filterValuesToUrlParams})}

    </div>
  )
}

export default FiltersWithResultsTable
