import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { FileUpload } from '../../../../../core-ui/FileUpload'
import { ChangeEvent, useState } from 'react'
import { TitleHeader } from '../../../Common/TitleHeader'

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
    <Grid
      items={[
        <TitleHeader title=' Rezolvă suportul' />,
        <Input
          type='textarea'
          onChange={event => null}
          label='Comentariu'
          variant='outlined'
          style={{ width: '100%' }}
          value={'none'}
        />,
        <FileUpload
          value={null}
          fileInputProps={{ displayImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt094LI3kTxh-hGY85ko1D6Z5DT9sEbkeqGWX-dbiEQg&s' }}
          onChange={onFileUpload}
        />,
        <Button
          variant='contained'
          type='submit'
          label='Salvează'
          onClick={null}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default SupportWrongDestinationDetail