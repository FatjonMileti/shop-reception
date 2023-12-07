import EffortMatrixSubcategory from 'icons/ProjectTeamSubcategories/EffortMatrixSubcategory'
import ProjectMilestonesSubcategory from 'icons/ProjectTeamSubcategories/ProjectMilestonesSubcategory'
import TeamAssignmentSubcategory from 'icons/ProjectTeamSubcategories/TeamAssignmentSubcategory'
import TeamCapacitySubcategory from 'icons/ProjectTeamSubcategories/TeamCapacitySubcategory'
import TeamDayOffManagementSubcategory from 'icons/ProjectTeamSubcategories/TeamDayOffManagementSubcategory'
import { createElement } from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ProductScanSubcategory from 'icons/SupplyOmniSubcategories/ProductScanSubcategory'
import ProformaListSubcategory from 'icons/SupplyOmniSubcategories/ProformaListSubcategory'
import MySalesSubcategory from 'icons/SupplyOmniSubcategories/MySalesSubcategory'
import ShoppingCartSubcategory from 'icons/SupplyOmniSubcategories/ShoppingCartSubcategory'
import PaidOrdersSubcategory from 'icons/SupplyOmniSubcategories/PaidOrdersSubcategory'
import EmployeeManagementSubcategory from 'icons/EmployeeManagementSubcategory/EmployeeManagementSubcategory'

const IconComponents = {
  // Governance
  TeamDayOffManagementSubcategory,
  TeamAssignmentSubcategory,
  TeamCapacitySubcategory,
  ProjectMilestonesSubcategory,
  EffortMatrixSubcategory,
  // SupplyOmni
  ProductScanSubcategory,
  ProformaListSubcategory,
  MySalesSubcategory,
  ShoppingCartSubcategory,
  PaidOrdersSubcategory,
  // EmployeeManagement
  EmployeeManagementSubcategory
}

export type IconType = 'Menu' | 'Subcategory'

interface IconProps {
  iconName: string
  iconType: IconType
}

const Icon_V2: React.FC<IconProps> = ({ iconName, iconType }) => {
  const iconComponent = IconComponents[`${iconName}${iconType}`]
  return iconComponent ? createElement(iconComponent) : <CheckBoxOutlineBlankIcon />
}

export default Icon_V2
