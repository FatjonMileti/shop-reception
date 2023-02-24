export const toApplicationPages = applications =>
  applications.map(app => ({
    name: app.name,
    icon: app.icon,
    route: {
      url: app.routeURL,
      exact: true
    },
    id: app.id
  }))
