import { Typography } from '@mui/material'
import s from './TitleHeader.modules.scss'

const TitleHeader = ({ title }) => {
  return <>
    <Typography component='h2' className={s.title} variant='regular'>{title}</Typography>
  </>
}

export default TitleHeader;