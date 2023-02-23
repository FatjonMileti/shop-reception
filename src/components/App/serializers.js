import { Icon } from 'components/core-ui/Icon'

export const toApplicationPages = applications =>
  applications.map(app => ({
    name: app.name,
    icon: <Icon iconName={app.icon} />,
    route: {
      url: app.routeURL,
      exact: true
    },
    id: app.id
  }))
