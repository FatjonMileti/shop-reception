import { Grid } from '../../../../Common/Grid'
import React, { useState } from 'react'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useParams } from 'react-router-dom'
import { Tabs, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Tab1, Tab2, Tab3, Tab4, Tab5 } from './Tabs'

const TruckDetail = () => {
  const { id } = useParams()
  const [tab, setTab] = useState<number>(0)

  return (
    <Grid
      items={[
        <Grid
          items={[
            <TitleHeader title={`Detalii transport recepţie marfa`} />,
            <>
              <Typography variant='mono'>
                Locaţie camion:
              </Typography>
              <Typography variant='medium'>
                Ieşire Depozit
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Număr înmatriculare:
              </Typography>
              <Typography variant='medium'>
                IF90AYN
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Cod şofer:
              </Typography>
              <Typography variant='medium'>
                CIORNACORN
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Cod cursă:
              </Typography>
              <Typography variant='medium'>
                00053548
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Status transport:
              </Typography>
              <Typography variant='medium'>
                Înregistrat
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Sigiliu/sigilii:
              </Typography>
              <Typography variant='medium'>
                ...
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Depozit:
              </Typography>
              <Typography variant='medium'>
                DEPOZIT CONGELATE
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                Magazin:
              </Typography>
              <Typography variant='medium'>
                ORADEA2 (25) ,ZALAU (46) ,CLUJ (10) ,ORADEA1 (22)
              </Typography>
            </>,
            <>
              <Typography variant='mono'>
                HUB:
              </Typography>
              <Typography variant='medium'>
                ORADEA2
              </Typography>
            </>
          ]}
          itemsPerRow={1}
        />,
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
      ]}
      itemsPerRow={1}
    />
  )
}

export default TruckDetail
