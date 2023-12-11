import {
  EffortMatrixSubcategory,
  ProjectMilestonesSubcategory,
  ProjectTeamGovernanceHome,
  ProjectTeamGovernanceMenu,
  TeamAssignmentSubcategory,
  TeamCapacitySubcategory,
  TeamDayOffManagementSubcategory
} from 'icons/governance'
import { FolderIcon } from 'icons/shared'
import {
  SupplyOmniHome,
  MySalesSubcategory,
  PaidOrdersSubcategory,
  ProductScanSubcategory,
  ProformaListSubcategory,
  ShoppingCartSubcategory,
  SupplyOmniMenu
} from 'icons/supplyOmni'
import {
  EmployeeManagementSubcategory,
  AssignTasksSubcategory,
  ManagementTasksSubcategory,
  AssignmentVolumetryHome,
  GroupVolumetryHome
} from 'icons/volumetry'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { createElement } from 'react'
import {
  HomeMenu,
  NotificationsMenu,
  UserMenu,
  LogoutMenu,
  UsersMenu,
  ChairMenu,
  VolumetryMenu,
  EmployeeManagementMenu,
  ManagementTasksMenu
} from 'icons'

const IconComponents = {
  // Shared
  FolderIcon,
  // Governance
  ProjectTeamGovernanceHome,
  ProjectTeamGovernanceMenu,
  TeamDayOffManagementSubcategory,
  TeamAssignmentSubcategory,
  TeamCapacitySubcategory,
  ProjectMilestonesSubcategory,
  EffortMatrixSubcategory,
  // SupplyOmni
  SupplyOmniHome,
  SupplyOmniMenu,
  ProductScanSubcategory,
  ProformaListSubcategory,
  MySalesSubcategory,
  ShoppingCartSubcategory,
  PaidOrdersSubcategory,
  // Volumetry
  EmployeeManagementSubcategory,
  ManagementTasksSubcategory,
  AssignTasksSubcategory,
  AssignmentVolumetryHome,
  GroupVolumetryHome,
  // Menu
  HomeMenu,
  NotificationsMenu,
  UserMenu,
  LogoutMenu,
  UsersMenu,
  ChairMenu,
  VolumetryMenu,
  EmployeeManagementMenu,
  ManagementTasksMenu
}

export type IconType = 'Menu' | 'Home' | 'Subcategory' | 'Icon'

interface IconProps {
  iconName: string
  iconType: IconType
}

const Icon_v2: React.FC<IconProps> = ({ iconName, iconType }) => {
  const iconComponent = IconComponents[`${iconName}${iconType}`]
  return iconComponent ? createElement(iconComponent) : <CheckBoxOutlineBlankIcon />
}

export default Icon_v2
