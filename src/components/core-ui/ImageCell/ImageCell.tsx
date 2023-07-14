import { ImageCellProps } from './ImageCellDefinitions'
import s from './ImageCell.modules.scss'

function ImageCell(props: ImageCellProps) {
  const { value, imageUrl } = props

  return (
    <div className={s.container}>
      <img
        className={s.image}
        src={imageUrl ?? 'images/default-product-image.svg'}
        alt="Selected file"
      />
      {value}
    </div>
  )
}

export default ImageCell
