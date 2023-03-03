import { Icon } from 'components/core-ui/Icon'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'

export const toSelectedMenuItems = (items, selectedItemIndex) =>
  items.map(item => {
    const nestedItems = item.nestedItems?.map(item => ({
      ...item,
      selected: selectedItemIndex === item.index,
      infoText: (
        <span style={{ opacity: '0.5' }}>
          <KeyboardArrowRightOutlined />
        </span>
      )
    }))
    return { ...item, selected: selectedItemIndex === item.index, nestedItems }
  })

const toMenuItem = (item, index, nestedItems) => ({
  type: item.icon ? 'icon' : 'text',
  primaryText: item.name,
  index: index,
  icon: <Icon iconName={item.icon} />,
  disablePadding: true,
  id: item.id,
  href: item.routeURL || null,
  nestedItems: nestedItems || []
})

export const toMenuItems = modules => {
  let items = []
  let index = 4

  modules.forEach(module => {
    let nestedItems = []
    if (module.submodules) {
      module.submodules.forEach(submodule => {
        nestedItems.push(toMenuItem(submodule, index++))
      })
    }
    items.push(toMenuItem(module, index++, nestedItems))
  })

  return items
}

const toRoute = item => ({ route: { url: item.routeURL, exact: item.routePathExact } })

export const toApplicationModulesPages = modules => {
  let routes = []

  modules.forEach(module => {
    if (module.routeURL) {
      routes.push(toRoute(module))
    }

    if (module.submodules) {
      module.submodules.forEach(submodule => {
        routes.push(toRoute(submodule))
      })
    }
  })

  return routes
}
