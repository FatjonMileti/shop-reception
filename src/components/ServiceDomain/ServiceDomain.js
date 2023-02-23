import { useNavigate } from 'react-router-dom'

const ServiceDomain = ({ applicationPages }) => {
  const navigate = useNavigate()

  return (
    <div>
      {applicationPages.map(app => (
        <div key={app.id} onClick={() => navigate(app.route.url)}>
          {app.name}
        </div>
      ))}
    </div>
  )
}

export default ServiceDomain
