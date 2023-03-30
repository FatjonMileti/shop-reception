export const toApplicationPages = applications =>
  applications.reduce(
    (acc, app) =>
      acc.concat(
        app.screens.map(screen => ({
          name: app.name,
          icon: app.icon,
          route: {
            url: screen.routeURL,
            exact: screen.routePathExact
          },
          activityId: app.id,
          screenId: screen.id,
          isFirstScreen: screen.id === app.firstScreen.id
        }))
      ),
    []
  )
