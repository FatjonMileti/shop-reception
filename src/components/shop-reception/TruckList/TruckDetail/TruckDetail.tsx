import { Paper, Grid, Typography } from '@mui/material'
import s from '../../CommonStyles.modules.scss'
import React, { useState } from 'react'
import { TitleHeader } from '../../TitleHeader'
import { useParams } from 'react-router-dom'
import { Tabs } from '@fullscreendigital/carrefour-dex-fe'
import { Tab1, Tab2, Tab3, Tab4, Tab5 } from './Tabs'

const TruckDetail = () => {
  const { id } = useParams()
  const [tab, setTab] = useState<number>(0)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <TitleHeader title={`Detalii transport recepţie marfa`} />
          <Grid container spacing={4}>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Locaţie camion:
              </Typography>
              <Typography variant='body1' display='inline'>
                Ieşire Depozit
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Număr înmatriculare:
              </Typography>
              <Typography variant='body1' display='inline'>
                IF90AYN
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Cod şofer:
              </Typography>
              <Typography variant='body1' display='inline'>
                CIORNACORN
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Cod cursă:
              </Typography>
              <Typography variant='body1' display='inline'>
                00053548
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Status transport:
              </Typography>
              <Typography variant='body1' display='inline'>
                Înregistrat
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Sigiliu/sigilii:
              </Typography>
              <Typography variant='body1' display='inline'>
                ...
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Depozit:
              </Typography>
              <Typography variant='body1' display='inline'>
                DEPOZIT CONGELATE
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                Magazin:
              </Typography>
              <Typography variant='body1' display='inline'>
                ORADEA2 (25) ,ZALAU (46) ,CLUJ (10) ,ORADEA1 (22)
              </Typography>
            </Grid>
            <Grid xs={12} md={4} item>
              <Typography variant='h6' display='inline'>
                HUB:
              </Typography>
              <Typography variant='body1' display='inline'>
                ORADEA2
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ margin: '8px' }}>
        <Tabs
          containerStyle={{
            width: '100%',
            paddingTop: '20px'
          }}
          onChange={(event, value) => {
            setTab(value)
          }}
          tabContentBoxStyle={{
            padding: 0
          }}
          tabs={[
            {
              content: <Tab1 />,
              label: 'Suporţi în camion',
              tabIndex: 0
            },
            {
              content: <Tab2 />,
              label: 'Imagini',
              tabIndex: 1
            },
            {
              content: <Tab3 />,
              label: 'Sigilii',
              tabIndex: 2
            },
            {
              content: <Tab4 />,
              label: 'Conformitate documente şi interval orar',
              tabIndex: 3
            },
            {
              content: <Tab5 />,
              label: 'Conformitate termodiagrama',
              tabIndex: 4
            }
          ]}
          tabsAriaLabel='basic tabs example'
          tabsContainerStyle={{
            borderBottom: 1,
            borderColor: '#223fa0'
          }}
          value={tab}
        />
      </Grid>
    </Grid>
  )
}

export default TruckDetail
