import { CircularProgress } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReceiptClientDetails.modules.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ClientData } from '../SelectClient/ClientDetails/ClientData'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useMutation, useQuery } from 'react-query'

const ReceiptClientDetails: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { showNotification } = useNotification()

  const orderId = searchParams.get('orderId')
  let { id } = useParams()

  const { data: client, isLoading: isClientLoading } = useQuery(
    ['client-info'],
    async () => {
      return await makeCoreGetRequest(`/supply-omni/client/${id}`)
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la căutarea produsului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const generateInvoice = async values => {
    await makeCorePostRequest('/supply-omni/invoice', values)
  }

  const { isLoading, mutate } = useMutation(generateInvoice, {
    onSuccess: () => {
      showNotification({
        message: `Factura a fost generată cu success.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A apărut o eroare la generarea facturii. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  return (
    <div className={s.container}>
      {isClientLoading ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <ClientData
          client={client}
          buttons={{
            topButton: (
              <Button
                label="Modifică client"
                variant="contained"
                onClick={() => navigate(`/supplyOmni/receiptSelectClient?orderId=${orderId}`)}
              />
            ),
            bottomButton: (
              <Button
                label="Generează factură"
                variant="contained"
                onClick={() => mutate({ customerId: id, orderId })}
              />
            )
          }}
        />
      )}
    </div>
  )
}

export default ReceiptClientDetails
