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
  GroupVolumetryHome,
  TasksVolumetryHome,
  EmployeeManagementHome,
  ManagementTasksHome,
  ReportsVolumetrySubcategory
} from 'icons/volumetry'

import {
  AdminMenu,
  FormatorMenu,
  RegionManagerMenu,
  StoreManagerMenu,
  TraceabilityOperatorMenu,
  BakeryMenu,
  AdminHome,
  FormatorHome,
  StoreManagerHome,
  TraceabilityOperatorHome,
  RegionManagerHome,
  UsersManagementSubcategory,
  ZonesSubcategory,
  RegionsSubcategory,
  StoresSubcategory,
  FamiliesSubcategory,
  ClustersSubcategory,
  GrowthSubcategory,
  ProductsSubcategory,
  UsageReportSubcategory,
  SalesCadentierSubcategory,
  IngredientsSubcategory,
  SalesCadentierFormatorSubcategory,
  UsageReportFormatorSubcategory,
  GrowthIndexFormatorSubcategory,
  GrowthRegionFormatorSubcategory,
  CadentierFormatorSubcategory,
  ProductGrowthIndexFormatorSubcategory,
  ProductManagementFormatorSubcategory,
  ProductManagementRegionSubcategory,
  GrowthRegionSubcategory,
  GrowthIndexSubcategory,
  CadentierSalesRegionSubcategory,
  UsageReportRegionSubcategory,
  ProductManagementSubcategory,
  CadentierStoreSubcategory,
  GrowthIndexStoreSubcategory,
  ProductGrowthIndexSubcategory,
  CadentierSalesStoreSubcategory,
  FrozenTraceabilityReportTOSubcategory,
  FrozenTraceabilityTOSubcategory,
  OwnProductionTraceabilityReportTOSubcategory,
  OwnProductionTraceabilityTOSubcategory,
  ProductManagementTOSubcategory,
  ReceivedProductsTOSubcategory
} from 'icons/bakery'
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
  ManagementTasksMenu,
  ReportsVolumetryHome,
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
  TasksVolumetryHome,
  EmployeeManagementHome,
  ManagementTasksHome,
  ReportsVolumetryHome,
  ReportsVolumetrySubcategory,
  // Menu
  BakeryMenu,
  HomeMenu,
  NotificationsMenu,
  UserMenu,
  LogoutMenu,
  UsersMenu,
  ChairMenu,
  VolumetryMenu,
  EmployeeManagementMenu,
  ManagementTasksMenu,
  // Bakery
  //home
  AdminHome,
  FormatorHome,
  StoreManagerHome,
  TraceabilityOperatorHome,
  RegionManagerHome,
  //menu
  AdminMenu,
  FormatorMenu,
  RegionManagerMenu,
  StoreManagerMenu,
  TraceabilityOperatorMenu,
  //admin
  UsersManagementSubcategory,
  ZonesSubcategory,
  RegionsSubcategory,
  StoresSubcategory,
  FamiliesSubcategory,
  ClustersSubcategory,
  GrowthSubcategory,
  ProductsSubcategory,
  UsageReportSubcategory,
  SalesCadentierSubcategory,
  IngredientsSubcategory,
  //formator
  SalesCadentierFormatorSubcategory,
  UsageReportFormatorSubcategory,
  GrowthIndexFormatorSubcategory,
  GrowthRegionFormatorSubcategory,
  CadentierFormatorSubcategory,
  ProductGrowthIndexFormatorSubcategory,
  ProductManagementFormatorSubcategory,
  //regionMg
  ProductManagementRegionSubcategory,
  GrowthRegionSubcategory,
  GrowthIndexSubcategory,
  CadentierSalesRegionSubcategory,
  UsageReportRegionSubcategory,
  //storeMg
  ProductManagementSubcategory,
  CadentierStoreSubcategory,
  GrowthIndexStoreSubcategory,
  ProductGrowthIndexSubcategory,
  CadentierSalesStoreSubcategory,
  //traceabilityOp
  FrozenTraceabilityReportTOSubcategory,
  FrozenTraceabilityTOSubcategory,
  OwnProductionTraceabilityReportTOSubcategory,
  OwnProductionTraceabilityTOSubcategory,
  ProductManagementTOSubcategory,
  ReceivedProductsTOSubcategory
}

export type IconType = 'Menu' | 'Home' | 'Subcategory' | 'Icon'

interface IconProps {
  iconName: string
  iconType: IconType
}

const Icon_v2: React.FC<IconProps> = ({ iconName, iconType }) => {
  console.log( iconName, iconType)
  const iconComponent = IconComponents[`${iconName}${iconType}`]
  return iconComponent ? createElement(iconComponent) : <CheckBoxOutlineBlankIcon />
}

export default Icon_v2
