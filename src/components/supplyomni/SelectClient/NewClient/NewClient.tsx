import { Grid, Box } from '@mui/material'
import s from './NewClient.modules.scss'
import { ChangeEvent, useState } from 'react'
import { IndividualPerson } from './IndividualPerson'
import { LegalPerson } from './LegalPerson'

interface NewClientProps {
  selectNewClient?: boolean
}

const NewClient: React.FC<NewClientProps> = ({ selectNewClient }) => {
  const [clientType, setClientType] = useState<string>('individualPerson')

  const onClientTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientType(e.target.value)
  }

  const renderClientType = {
    individualPerson: <IndividualPerson selectNewClient={selectNewClient} />,
    legalPerson: <LegalPerson selectNewClient={selectNewClient} />
  }

  return (
    <div className={s.mainContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '12px' }}>
        <Grid container spacing={3} width={'600px'} display={'flex'} flexDirection={'column'}>
          <Grid item>
            <label className={s.select}>
              <input
                type="radio"
                value="individualPerson"
                checked={clientType === 'individualPerson'}
                onChange={onClientTypeChange}
                className={s.radioButton}
              />
              Persoana fizica
            </label>

            <label className={s.select}>
              <input
                type="radio"
                value="legalPerson"
                checked={clientType === 'legalPerson'}
                onChange={onClientTypeChange}
                className={s.radioButton}
              />
              Persoana juridica
            </label>
          </Grid>

          <Grid item>{renderClientType[clientType]}</Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default NewClient
