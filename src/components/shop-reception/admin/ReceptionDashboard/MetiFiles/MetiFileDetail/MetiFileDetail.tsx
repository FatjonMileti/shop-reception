import { Grid, Paper, Typography } from '@mui/material'
import s from '../../../Common/CommonStyles.modules.scss'
import { TitleHeader } from '../../../Common/TitleHeader'
import React, { useState } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { columns } from './helpers'
import { Table } from '../../../../../core-ui/Table'

const MetiFileDetail = () => {
  const [tableItems, setTableItems] = useState<MetiFile[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(false)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <TitleHeader title={` Fişier Meti pentru BL 60787, magazin ORADEA2`} />
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Depozit sursă:
              </Typography>
              <Typography variant='body1' display='inline'>
                DEPOZIT DEVA APLS
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Magazin destinatie:
              </Typography>
              <Typography variant='body1' display='inline'>
                ORADEA2
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Bon livrare:
              </Typography>
              <Typography variant='body1' display='inline'>
                60787
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Status fişier:
              </Typography>
              <Typography variant='body1' display='inline'>
                Trimis
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={s.filterPaper}>
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Cod produs'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Nume produs'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Comandă de origine'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Cod cursă'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Comandă METI'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='text'
                onChange={event => null}
                label='Status comandă METI'
                variant='outlined'
                style={{ width: '100%' }}
                value={null}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Selectează cu erori'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează cu erori',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Selectează cu erori'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează cu erori',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <Input
                type='select'
                onChange={event => null}
                label='Selectează cu diferenţe Meti'
                variant='outlined'
                style={{ width: '100%' }}
                values={[
                  {
                    label: 'Selectează cu diferenţe Meti',
                    value: 'none'
                  }
                ]}
                value={'none'}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <Table
          hideCheckbox
          orderBy='role'
          order='asc'
          columns={columns}
          items={tableItems}
          fetchData={() => {}}
          isLoading={isLoading}
          totalCount={totalCount}
          newButton={null}
          shouldRefreshData={shouldRefreshData}
          setShouldRefreshData={setShouldRefreshData}
        />
      </Grid>
    </Grid>
  )
}

export default MetiFileDetail