import EffortMatrixSubcategory from 'icons/governance/submodules/EffortMatrixSubcategory'
import ProjectMilestonesSubcategory from 'icons/governance/submodules/ProjectMilestonesSubcategory'
import TeamAssignmentSubcategory from 'icons/governance/submodules/TeamAssignmentSubcategory'
import TeamCapacitySubcategory from 'icons/governance/submodules/TeamCapacitySubcategory'
import TeamDayOffManagementSubcategory from 'icons/governance/submodules/TeamDayOffManagementSubcategory'
import { createElement } from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ProductScanSubcategory from 'icons/supplyOmni/submodules/ProductScanSubcategory'
import ProformaListSubcategory from 'icons/supplyOmni/submodules/ProformaListSubcategory'
import MySalesSubcategory from 'icons/supplyOmni/submodules/MySalesSubcategory'
import ShoppingCartSubcategory from 'icons/supplyOmni/submodules/ShoppingCartSubcategory'
import PaidOrdersSubcategory from 'icons/supplyOmni/submodules/PaidOrdersSubcategory'
import EmployeeManagementSubcategory from 'icons/volumetry/submodules/EmployeeManagementSubcategory'
import ProjectTeamGovernanceHome from 'icons/governance/ProjectTeamGovernanceHome'
import ProjectTeamGovernanceMenu from 'icons/governance/ProjectTeamGovernanceMenu'
import SupplyOmniHome from 'icons/supplyOmni/SupplyOmniHome'
import SupplyOmniMenu from 'icons/supplyOmni/SupplyOmniMenu'
import AssignmentVolumetryHome from 'icons/volumetry/AssignmentVolumetryHome'
import GroupVolumetryHome from 'icons/volumetry/GroupVolumetryHome'

const IconComponents = {
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
  AssignmentVolumetryHome,
  GroupVolumetryHome
}

export type IconType = 'Menu' | 'Home' | 'Subcategory'

interface IconProps {
  iconName: string
  iconType: IconType
}

const Icon_v2: React.FC<IconProps> = ({ iconName, iconType }) => {
  const iconComponent = IconComponents[`${iconName}${iconType}`]
  return iconComponent ? createElement(iconComponent) : <CheckBoxOutlineBlankIcon />
}

export default Icon_v2
