import { Grid, Paper } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../CommonStyles.modules.scss'
import { FileUpload } from '../../../../core-ui/FileUpload'
import { ChangeEvent, useState } from 'react'
import { TitleHeader } from '../../TitleHeader'

const SupportWrongDestinationDetail = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const file = event.target.files[0]
      setUploadedFile(file)
      setIsFileUploaded(true)
    } else {
      setUploadedFile(null)
      setIsFileUploaded(false)
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={s.filterPaper}>
          <TitleHeader title=' Rezolvă suportul' />
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <Input
                type='textarea'
                onChange={event => null}
                label='Comentariu'
                variant='outlined'
                style={{ width: '100%' }}
                value={'none'}
              />
            </Grid>
            <Grid xs={12} item>
              <FileUpload
                value={null}
                fileInputProps={{ displayImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt094LI3kTxh-hGY85ko1D6Z5DT9sEbkeqGWX-dbiEQg&s' }}
                onChange={onFileUpload}
              />
            </Grid>
            <Grid xs={12} item>
              <Button
                variant='contained'
                type='submit'
                label='Salvează'
                onClick={null}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SupportWrongDestinationDetail