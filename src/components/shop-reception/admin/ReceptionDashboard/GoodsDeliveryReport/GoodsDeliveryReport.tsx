import { Grid } from '../../../Common/Grid'
import { Input, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Table } from '../../../../core-ui/Table'
import { columns } from './helpers'
import { useState } from 'react'
import { makeCoreGetRequest } from '../../../../../utils/api'
import { toTableGETUrl } from '../../../../core-ui/Table/serializers'
import { toTableRowItems } from './serializers'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import dayjs from 'dayjs'

const GoodsDeliveryReport = () => {
  const [tableItems, setTableItems] = useState<GoodsDeliveryReport[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const fetchData = async ({ page, rowsPerPage, order, orderBy, tableFilters }) => {
    setIsLoading(true)
    try {
      const response = await makeCoreGetRequest(
        toTableGETUrl({
          url: '/shop-reception-mobile/rm-api/truck/list',
          tableFilters,
          page,
          rowsPerPage,
          order,
          orderBy
        })
      )

      const responseList = response.list

      setTableItems(toTableRowItems(responseList))
      setTotalCount(response.page.totalCount)
      setIsLoading(false)
    } catch (error) {
      showNotification({
        message: `Error while fetching table data. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  return (
    <Grid
      items={[
        <TitleHeader title=" Raport livrare marfă" />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type="select"
              onChange={event => null}
              label="Niciun magazin sosire selectat"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Niciun magazin sosire selectat',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Niciun HUB plecare selectat"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Niciun HUB plecare selectat',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Niciun HUB sosire selectat"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Niciun HUB sosire selectat',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Selectează depozit"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează depozit',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Selectează status"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează status',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Selectează locaţie camion"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează locaţie camion',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Selectează recepţie în interval orar"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează recepţie în interval orar',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="select"
              onChange={event => null}
              label="Selectează tip sosire"
              variant="outlined"
              style={{ width: '100%' }}
              values={[
                {
                  label: 'Selectează tip sosire',
                  value: 'none'
                }
              ]}
              value={'none'}
            />,
            <Input
              type="text"
              onChange={event => null}
              label="Număr înmatriculare"
              variant="outlined"
              style={{ width: '100%' }}
            />,
            <Input
              type="text"
              onChange={event => null}
              label="Bon livrare"
              variant="outlined"
              style={{ width: '100%' }}
            />,
            <Input
              type="text"
              onChange={event => null}
              label="Cod cursǎ"
              variant="outlined"
              style={{ width: '100%' }}
            />,
            <DatePicker
              label="Selectează început interval sosire"
              variant="outlined"
              value={dayjs()}
              onChange={() => {}}
              adapterLocale="ro"
              modalLabel="Selecteaza data"
              closeButtonLabel="Anuleaza"
              confirmButtonLabel="Confirma"
            />,
            <DatePicker
              label="Selectează sfârşit interval sosire"
              variant="outlined"
              value={dayjs()}
              onChange={() => {}}
              adapterLocale="ro"
              modalLabel="Selecteaza data"
              closeButtonLabel="Anuleaza"
              confirmButtonLabel="Confirma"
            />,
            <DatePicker
              label="Selectează început interval înregistrare"
              variant="outlined"
              value={dayjs()}
              onChange={() => {}}
              adapterLocale="ro"
              modalLabel="Selecteaza data"
              closeButtonLabel="Anuleaza"
              confirmButtonLabel="Confirma"
            />,
            <DatePicker
              label="Selectează sfârşit interval înregistrare"
              variant="outlined"
              value={dayjs()}
              onChange={() => {}}
              adapterLocale="ro"
              modalLabel="Selecteaza data"
              closeButtonLabel="Anuleaza"
              confirmButtonLabel="Confirma"
            />
          ]}
          itemsPerRow={4}
        />,
        <Table
          hideCheckbox
          orderBy="role"
          order="asc"
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
          rowActions={[]}
          rowActionsWidth="130px"
          toolbarActions={
            [
              // {
              //   label: "Adauga",
              //   icon: <AddIcon />,
              //   onClick: null
              // }
            ]
          }
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default GoodsDeliveryReport
