import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Divider, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { ProductActions } from 'reducers/productSlice'
import s from './ProductGeneralInfo.modules.scss'
import { formatErrorMessage } from 'utils/formatting'

const ProductGeneralInfo = ({
  price,
  currency,
  id,
  eanCode,
  storeCode,
  addToCartAction,
  isWarehouse,
  hasBuyback,
  purchaseOptions,
  available
}) => {
  const [selectedBuybackOption, setSelectedBuybackOption] = useState(
    (hasBuyback && purchaseOptions[0].value) || ''
  )
  const [displayAddToCartBtn, setDisplayAddToCartBtn] = useState(false)

  const { action, checkAction } = addToCartAction

  const navigate = useNavigate()

  const { showNotification } = useNotification()

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        let result
        if (checkAction.type === 'POST') {
          result = await makeCorePostRequest(checkAction.url)
        }
        setDisplayAddToCartBtn(result[checkAction.variable])
      } catch (error) {
        showNotification({
          message: `A aparut o eroarea la afisarea butonului de "Adauga in cos". ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    })()
  }, [isWarehouse])

  const addToCart = async () => {
    if (displayAddToCartBtn) {
      try {
        if (action.type === 'POST') {
          await makeCorePostRequest(`${action.url}`, {
            id,
            quantity: 1,
            isWarehouse,
            purchaseOption: selectedBuybackOption
          })
          showNotification({
            message: 'Produsul a fost adaugat in cos',
            type: 'success'
          })
        }
        dispatch(ProductActions.clearProduct())
        navigate(addToCartAction.href)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la adaugarea produsului in cos. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  }

  return (
    <div>
      <div className={s.infoContainer}>
        <div className={s.price}>
          {price}&nbsp;{currency}
        </div>
        <IconButton
          onClick={addToCart}
          label="Adauga in cos"
          variant="contained"
          endIcon={<Icon iconName="AddCircle" tiny={true} fill="white" />}
          disabled={!displayAddToCartBtn || !available}
          sx={displayAddToCartBtn ? {} : { opacity: 0.5 }}
        />
      </div>
      <Divider component="div" />
      {hasBuyback && (
        <div className={s.infoContainer} style={{ justifyContent: 'flex-end' }}>
          <Input
            type="select"
            name="buyback-input"
            label="Mod achizitie"
            values={purchaseOptions}
            value={selectedBuybackOption}
            variant="standard"
            width="320px"
            onChange={event => setSelectedBuybackOption((event.target as any).value)}
            disabled={purchaseOptions.length == 1}
          />
        </div>
      )}
      {hasBuyback && <Divider component="div" />}
      <div className={s.infoContainer}>
        <span className={s.firstCode}>
          <span className={s.lightText}>Cod EAN:</span> <strong>{eanCode}</strong>
        </span>
        <span className={s.secondCode}>
          <span className={s.lightText}>Cod intern:</span> <strong>{storeCode}</strong>
        </span>
      </div>
    </div>
  )
}

export default ProductGeneralInfo
