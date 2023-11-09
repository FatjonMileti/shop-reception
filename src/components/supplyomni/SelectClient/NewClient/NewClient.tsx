import { Grid, Paper } from '@mui/material'
import s from './NewClient.modules.scss'
import { ChangeEvent, useState } from 'react'
import { PersoanaFizica } from './PersoanaFizica'
import { PersoanaJuridica } from './PersoanaJuridica'

const NewClient: React.FC = () => {
  const [clientType, setClientType] = useState<string>('persoanaFizica')

  const onClientTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientType(e.target.value)
  }

  const renderClientType = {
    persoanaFizica: <PersoanaFizica />,
    persoanaJuridica: <PersoanaJuridica />
  }

  return (
    <div className={s.mainContainer}>
      <Paper sx={{ display: 'flex', justifyContent: 'center', padding: '12px' }}>
        <Grid container spacing={3} width={'600px'} display={'flex'} flexDirection={'column'}>
          <Grid item>
            <label className={s.select}>
              <input
                type="radio"
                value="persoanaFizica"
                checked={clientType === 'persoanaFizica'}
                onChange={onClientTypeChange}
                className={s.radioButton}
              />
              Persoana fizica
            </label>

            <label className={s.select}>
              <input
                type="radio"
                value="persoanaJuridica"
                checked={clientType === 'persoanaJuridica'}
                onChange={onClientTypeChange}
                className={s.radioButton}
              />
              Persoana juridica
            </label>
          </Grid>

          <Grid item>{renderClientType[clientType]}</Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default NewClient
