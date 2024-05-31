import { Box, Grid, Typography } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
import s from '../Tasks.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { InfoBox } from 'components/core-ui/InfoBox'
import {
  Autocomplete,
  Button,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import { ChangeEvent } from 'react'

const task = {
  name: `Miez de nuca 500g Orlando's per punga`,
  date: 'Astazi',
  interval: '10:00 - 12:00',
  metiCode: '0123456789',
  category: 'Legume',
  quantity: 10,
  stock: 50,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis suscipit gravida. Nullam egestas diam eget leo molestie rhoncus id vitae mauris. Donec hendrerit, mauris at laoreet sagittis, nulla augue sodales nisi, in tincidunt sem nunc a mi. Morbi vel lacinia risus, eget vestibulum erat. In metus nisl, fringilla nec orci quis, sollicitudin semper dui. Mauris gravida nec elit non laoreet. Pellentesque tempus quis nisi nec tempor. '
}

const Task = () => {
  const infoItems = [
    {
      label: 'Categoria:',
      name: task.category,
      render: () => <span style={{ fontWeight: 500 }}>{task.category}</span>
    },
    {
      label: 'Cod:',
      name: task.metiCode,
      render: () => <span style={{ fontWeight: 500 }}>{task.metiCode}</span>
    },
    {
      label: 'LSO Qt:',
      name: `${task.quantity}`,
      render: () => <span style={{ fontWeight: 500 }}>{task.quantity}</span>
    },
    {
      label: 'Stoc:',
      name: `${task.stock}`,
      render: () => <span style={{ fontWeight: 500 }}>{task.stock}</span>
    }
  ]

  return (
    <div className={s.mainContainer}>
      <Grid container flexDirection="column">
        <Grid item mb={1}>
          <Typography className={s.productName} fontWeight={700}>
            {task.name}
          </Typography>
        </Grid>

        <Grid item className={s.date} display={'flex'} alignItems={'center'} mb={2}>
          <Icon_v2 iconName="Date" iconType="Icon"></Icon_v2>
          <Typography ml={1}>
            {task.date}, {task.interval}
          </Typography>
        </Grid>

        <Grid item mb={2}>
          <FormInfoItems items={infoItems} style={{ backgroundColor: '#fff' }} />
        </Grid>

        <Grid item mb={1}>
          <InfoBox title={'Descriere'} content={task.description} />
        </Grid>

        <Grid item mb={1}>
          <InfoBox
            title={'Amana alarma'}
            content={
              <>
                <Typography>Cat timp vrei sa anulezi alarma?</Typography>
                <Box ml={1} mt={1}>
                  <RadioButtonGroup
                    dotStyle
                    name="snooze"
                    onChange={(e, option) => {}}
                    value={'oneWeek'}
                    options={[
                      {
                        label: '1 zi',
                        value: 'oneDay'
                      },
                      {
                        label: '1 saptamana',
                        value: 'oneWeek'
                      },
                      {
                        label: '2 saptamani',
                        value: 'twoWeeks'
                      },
                      {
                        label: '1 luna',
                        value: 'oneMonth'
                      }
                    ]}
                  />
                </Box>
              </>
            }
          />
        </Grid>

        <Grid item mb={1}>
          <InfoBox
            title={'Feedback'}
            content={
              <>
                <Autocomplete
                  variant="outlined"
                  label="Departament"
                  options={[
                    { value: 'Brutarie', label: 'bakery' },
                    { value: 'Receptie marfa', label: 'shopReception' }
                  ]}
                  style={{ marginBottom: '16px' }}
                />

                <Input
                  type="textarea"
                  variant="outlined"
                  name="mandatory"
                  label="Descriere"
                  width="100%"
                  value={'Fara descriere'}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {}}
                  rows={3}
                  style={{ marginBottom: '16px' }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <IconButton
                    label="Incarca foto"
                    onClick={() => {}}
                    startIcon={<Icon_v2 iconName="Date" iconType="Icon" />}
                    variant="outlined"
                    size="large"
                    sx={{ marginBottom: '16px' }}
                  />
                  <Button variant="contained" label="Inchide task" onClick={() => {}} />
                </Box>
              </>
            }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Task
