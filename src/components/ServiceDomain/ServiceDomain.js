import { useNavigate } from 'react-router-dom'

const ServiceDomain = ({ pages }) => {
  const navigate = useNavigate()

  return (
    <div>
      {pages.map(app => (
        <div key={app.id} onClick={() => navigate(app.route.url)}>
          {app.name}
        </div>
      ))}
    </div>
  )
}

export default ServiceDomain
