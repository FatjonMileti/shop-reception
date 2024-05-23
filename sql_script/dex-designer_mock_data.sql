/*
* Mock data for dex-designer
* Respect the insert order shown below.
* Use schema name.
* Reset the index values.
*/


-- delete existing data
DELETE FROM "dex-designer".roles_activities;
DELETE FROM "dex-designer".roles;
DELETE FROM "dex-designer".ui_schema;
DELETE FROM "dex-designer".screen;
DELETE FROM "dex-designer".activity;
DELETE FROM "dex-designer".application_submodule;
DELETE FROM "dex-designer".application_module;


-- application module
INSERT INTO
    "dex-designer".application_module (id, name, icon, route_url, route_path_exact)
VALUES
    (1, 'Governance', 'Chair', '/governance', true),
    (2, 'Bakery', 'Bakery', '/bakery', true),
    (3, 'Supply OMNI Offline', 'SupplyOmni', '/supplyOmni', true),
    (4, 'Volumetry', 'Volumetry', '/volumetry', true),    
    (5, 'Shop Reception Admin', 'DonutLargeTwoTone', '/shopReception', true),
    (6, 'Shop Reception Mobile', 'DonutLargeTwoTone', '/shopReception/mobile', true);


-- application submodule with module id
INSERT INTO
    "dex-designer".application_submodule (id, name, icon, route_url, route_path_exact, id_application_module)
VALUES
    -- Governance
    (1, 'Project Team', 'ProjectTeamGovernance', '/projectTeam', true, 1),
    -- Bakery p1
    (2, 'Admin', 'Admin', '/admin', true, 2),
    (3, 'Formator/ RQ Regional', 'Formator', '/formator', true, 2),
    (4, 'Manager magazin/raion', 'StoreManager', '/storeManager', true, 2),
    (5, 'Manager regiune', 'RegionManager', '/regionManager', true, 2),
    -- Supply OMNI
    (6, 'Supply OMNI Offline', 'SupplyOmni', '/supplyOmni', true, 3),
    -- Volumetry
    (7, 'Administrare Angajati', 'EmployeeManagement', '/employeeManagement', true, 4),
    (8, 'Administrare Task-uri', 'ManagementTasks', '/tasksManagement', true, 4),
    (9, 'Rapoarte', 'ReportsVolumetry', 'reports', true, 4),
    -- Bakery p2
    (11, 'Operator/ validator trasabilitate', 'TraceabilityOperator', '/traceabilityOperator', true, 2),
    -- Shop Reception (Admin)
    (12, 'Administrare', 'ProjectTeamGovernance', '/admin', true, 5),
    (13, 'Receptie marfa', 'ProjectTeamGovernance', '/reception', true, 5),
    (14, 'Ambalaje', 'ProjectTeamGovernance', '/package', true, 5),
    -- Shop Reception (Mobile)
    (15, 'Receptie marfa', 'ProjectTeamGovernance', '/goodsReception', true, 6),
    (16, 'Returnare marfa', 'ProjectTeamGovernance', '/goodsReturn', true, 6);


-- activity with submodule id
INSERT INTO
    "dex-designer".activity (id, name, icon, route_url, route_path_exact, id_application_submodule)
VALUES
    -- Governance
    (1, 'Team Assignment', 'TeamAssignment', null, true, 1),
    (2, 'Team Capacity', 'TeamCapacity', null, true, 1),
    (3, 'Project Milestones', 'ProjectMilestones', null, true, 1),
    (4, 'Effort Matrix', 'EffortMatrix', null, true, 1),
    (5, 'Team Day-Off Management', 'TeamDayOffManagement', null , true, 1),
    (6, 'My Time-Off', 'TeamDayOffManagement', null, true, 1),
    -- Bakery ADMIN p1
    (7, 'Gestiune utilizatori', 'UsersManagement', null, true, 2),
    (8, 'Gestiune zone', 'Zones', null, true, 2),
    (9, 'Gestiune regiuni', 'Regions', null, true, 2),
    (10, 'Gestiune magazine', 'Stores', null, true, 2),
    (11, 'Gestiune familii in scopul modulului', 'Families', null, true, 2),
    (12, 'Gestiune clustere', 'Clusters', null, true, 2),
    (13, 'Setari coeficient de crestere', 'Growth', null, true, 2),
    (14, 'Gestiune produse imagine', 'Products', null, true, 2),
    (15, 'Raport de utilizare aplicatie', 'UsageReport', null, true, 2),
    (16, 'Raport cadentier + vanzari', 'SalesCadentier', null, true, 2),
    -- Bakery FORMATOR (TRAINEE)
    (17, 'Management produse', 'ProductManagementFormator', null, true, 3),
    (18, 'Management productie (cadentier)', 'CadentierFormator', null, true, 3),
    (19, 'Coeficient crestere magazin', 'ProductGrowthIndexFormator', null, true, 3),
    (20, 'Setari coeficient de crestere', 'GrowthIndexFormator', null, true, 3),
    (21, 'Coeficient crestere regiune', 'GrowthRegionFormator', null, true, 3),
    (22, 'Raport de utilizare aplicatie', 'UsageReportFormator', null, true, 3),
    (23, 'Raport cadentier + vanzari', 'SalesCadentierFormator', null, true, 3),
    (191, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', null, true, 3),
    (192, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', null, true, 3),
    -- Bakery STORE_MANAGER
    (27, 'Management produse', 'ProductManagement', null, true, 4),
    (28, 'Management productie (cadentier)', 'CadentierStore', null, true, 4),
    (29, 'Coeficient crestere magazin', 'GrowthIndexStore', null, true, 4),
    (30, 'Setari coeficient de crestere', 'ProductGrowthIndex', null, true, 4),
    (31, 'Raport vanzari + cadentier', 'CadentierSalesStore', null, true, 4),
    -- Bakery REGION_MANAGER
    (32, 'Management produse', 'ProductManagementRegion', null, true, 5),
    (33, 'Management productie (cadentier)', 'GrowthRegion', null, true, 5),
    (34, 'Coeficient crestere regiune', 'GrowthIndex', null, true, 5),
    (35, 'Raport vanzari + cadentier', 'CadentierSalesRegion', null, true, 5),
    (36, 'Raport utilizare aplicatie', 'UsageReportRegion', null, true, 5),
    -- Supply OMNI
    (37, 'Scanare produs', 'ProductScan', null, true, 6),
    (38, 'Cos de cumparaturi', 'ShoppingCart', null, true, 6),
    (39, 'Listare proforme', 'ProformaList', null, true, 6),
    (40, 'Vanzarile mele', 'MySales', null, true, 6),
    (41, 'Comenzi achitate', 'PaidOrders', null, true, 6),
    -- Volumetry
    (42, 'Management angajati', 'EmployeeManagement', null, true, 7),
    (43, 'Management task template-uri', 'ManagementTasks', null, true, 8),
    (44, 'Alocare task-uri', 'AssignTasks', null, true, 8),
    (45, 'Raport de evaluare', 'EmployeeManagement', null, true, 9),
    (46, 'Link-uri rapoarte', 'ReportsVolumetry', null, true, 9),
    (47, 'Task-uri alocate', 'AssignTasks', null, true, 8),
    (48, 'Status angajati', 'EmployeeStatus', null, true, 8),
    (249, 'Management magazine', 'StoreManagement', null, true, 8),
    (250, 'Management business units', 'CategoryTemplateManagement', null, true, 8),
    -- Shop Reception (Admin)
    (149, 'Administrare depozite', 'UsersManagement', null, true, 12),
    (151, 'Administrare huburi', 'UsersManagement', null, true, 12),
    (152, 'Administrare magazine', 'UsersManagement',null, true, 12),
    (153, 'Administrare regiuni', 'UsersManagement', null, true, 12),
    (154, 'Centralizare magazine si huburi', 'UsersManagement', null, true, 12),
    (155, 'Administrare tipuri de scanare', 'UsersManagement', null, true, 12),
    (156, 'Prag valabilitate subfamilii', 'UsersManagement', null, true, 12),
    (157, 'Lista produse METI', 'UsersManagement', null, true, 12),
    (158, 'Administrare produse sensibile', 'UsersManagement', null, true, 12),
    (159, 'Administrare tipuri de ambalaje', 'UsersManagement', null, true, 12),
    (160, 'Administrare produse cu dlc scurt', 'UsersManagement', null, true, 12),
    (161, 'Fisiere receptie infolog', 'UsersManagement', null, true, 12),
    (162, 'Administrare produse SGR', 'UsersManagement', null, true, 12),
    (163, 'Bonuri de livrare', 'UsersManagement', null, true, 13),
    (164, 'Lista camioane marfa', 'UsersManagement', null, true, 13),
    (165, 'Suporti cu destinatie eronata', 'UsersManagement', null, true, 13),
    (166, 'Produse necomandate', 'UsersManagement', null, true, 13),
    (167, 'Fisiere meti', 'UsersManagement', null, true, 13),
    (168, 'Produse cu diferente', 'UsersManagement', null, true, 13),
    (169, 'Trasabilitate suport', 'UsersManagement', null, true, 13),
    (195, 'Articole sensibile', 'UsersManagement', null, true, 13),
    (196, 'Raport livrare marfa', 'UsersManagement', null, true, 13),
    (170, 'Lista camioane retur', 'UsersManagement', null, true, 14),
    (171, 'Rulaj ambalaje', 'UsersManagement', null, true, 14),
    (172, 'Sold ambalaje', 'UsersManagement', null, true, 14),
    (272, 'Inventar ambalaje', 'UsersManagement', null, true, 14),
    (173, 'Litigii ambalaje - retur magazine', 'UsersManagement', null, true, 14),
    (174, 'Diferente tip ambalaj', 'UsersManagement', null, true, 14),
    (175, 'Ambalaje returnate', 'UsersManagement', null, true, 14),
    (176, 'Conformitate ambalaje', 'UsersManagement', null, true, 14),
    (177, 'Litigii ambalaje - administrare timer', 'UsersManagement', null, true, 14),
    -- Shop Reception (Mobile)
    (178, 'In procesare receptie', 'UsersManagement', null, true, 15),
    (179, 'Camioane asteptate', 'UsersManagement', null, true, 15),
    (180, 'Inregistreaza camion', 'UsersManagement', null, true, 15),
    (181, 'In procesare expeditie', 'UsersManagement', null, true, 15),
    (182, 'Camioane expediate', 'UsersManagement', null, true, 15),
    (187, 'Lista camioane', 'UsersManagement', null, true, 15),
    (188, 'Validare livrare', 'UsersManagement', null, true, 15),
    (183, 'Retururi asteptare', 'UsersManagement', null, true, 16),
    (184, 'Retur in curs de receptie', 'UsersManagement', null, true, 16),
    (185, 'Inregistrare retur', 'UsersManagement', null, true, 16),
    (186, 'Continuare retur', 'UsersManagement', null, true, 16),
    (189, 'Comanda camion retur', 'UsersManagement', null, true, 16),
    (190, 'Camioane retur confirmate', 'UsersManagement', null, true, 16),
    -- Bakery TRACEABILITY OP
    (50, 'Management produse', 'ProductManagementTO', null, true, 11),
    (51, 'Produse receptionate in raion', 'ReceivedProductsTO', null, true, 11),
    (52, 'Trasabilitate congelate', 'FrozenTraceabilityTO', null, true, 11),
    (53, 'Trasabilitate productie proprie', 'OwnProductionTraceabilityTO', null, true, 11),
    (54, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', null, true, 11),
    (55, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', null, true, 11),
    -- Bakery ADMIN p2
    (56, 'Gestiune ingrediente', 'Ingredients', null, true, 2);


-- screen with activity id (some are first screens)
INSERT INTO
    "dex-designer".screen (id, name, icon, route_url, route_path_exact, activity_id, is_first_screen)
VALUES
    -- Governance
    (1, 'Team Day-Off Management', 'TimerOffOutlined', '/governance/projectTeam/teamDayOffManagement', true, 5, true),
    (2, 'Team Assignment', 'HowToRegOutlined', '/governance/projectTeam/teamAssignment', true, 1, true),
    (3, 'Effort Matrix', 'DonutSmallOutlined', '/governance/projectTeam/effortMatrix', true, 4, true),
    (4, 'Project Milestones', 'AccountTreeOutlined', '/governance/projectTeam/projectMilestones', true, 3, true),
    (5, 'Team Capacity Overview', 'PeopleAltOutlined', '/governance/projectTeam/teamCapacity', true, 2, true),
    (6, 'Individual Capacity', 'PeopleAltOutlined', '/governance/projectTeam/individualCapacity/:id', true, 2, false),
    (7, 'My Time-Off', 'TimerOffOutlined', '/governance/projectTeam/myTimeOff', true, 6, true),
    -- Bakery ADMIN p1
    (8 , 'Gestiune utilizatori', 'UsersManagement', '/bakery/admin/usersManagement', true, 7, true),
    (9 , 'Gestiune zone', 'Zones', '/bakery/admin/zones', true, 8, true),
    (10, 'Gestiune regiuni', 'Regions', '/bakery/admin/regions', true, 9, true),
    (11, 'Gestiune magazine', 'Stores', '/bakery/admin/stores', true, 10, true),
    (12, 'Gestiune familii in scopul modulului', 'Families', '/bakery/admin/families', true, 11, true),
    (13, 'Lista de produse ale familiei', 'PeopleAltOutlined', '/bakery/admin/family-products', true, 11, false),
    (14, 'Gestiune clustere', 'Clusters', '/bakery/admin/clusters', true, 12, true),
    (15, 'Setari coeficient de crestere', 'Growth', '/bakery/admin/growth', true, 13, true),
    (16, 'Gestiune produse imagine', 'Products', '/bakery/admin/products', true, 14, true),
    (17, 'Raport de utilizare aplicatie', 'UsageReport', '/bakery/admin/usage-report', true, 15, true),
    (18, 'Raport cadentier + vanzari', 'SalesCadentier', '/bakery/admin/sales-cadentier', true, 16, true),
    -- Bakery FORMATOR
    (19, 'Management produse', 'ProductManagementFormator', '/bakery/formator/product-management-formator', true, 17, true),
    (20, 'Management productie (cadentier)', 'CadentierFormator', '/bakery/formator/cadentier-formator', true, 18, true),
    (21, 'Print cadentier', 'CadentierFormator', '/bakery/formator/cadentier-formator-print', true, 18, false),
    (22, 'Detalii produs', 'CadentierFormator', '/bakery/formator/cadentier-details-formator', true, 18, false),
    (23, 'Coeficient crestere magazin', 'ProductGrowthIndexFormator', '/bakery/formator/product-growth-index-formator', true, 19, true),
    (24, 'Setari coeficient de crestere', 'GrowthIndexFormator', '/bakery/formator/growth-index-formator', true, 20, true),
    (25, 'Coeficient crestere regiune', 'GrowthRegionFormator', '/bakery/formator/growth-region-formator', true, 21, true),
    (26, 'Coeficient crestere magazin', 'ClustersManagement', '/bakery/formator/growthIndexView/:id', true, 21, false),
    (27, 'Setari coeficient de crestere', 'GrowthManagement', '/bakery/formator/growthIndexProductsView/:id', true, 21, false),
    (28, 'Raport de utilizare aplicatie', 'UsageReportFormator', '/bakery/formator/usage-report-formator', true, 22, true),
    (29, 'Raport cadentier + vanzari', 'SalesCadentierFormator', '/bakery/formator/sales-cadentier-formator', true, 23, true),
    (75, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/formator/frozen-traceability-report', true, 191, true),
    (76, 'Print raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/formator/frozen-traceability-report-print', true, 191, false),
    (77, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/formator/own-production-traceability-report', true, 192, true),
    (78, 'Print raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/formator/own-production-traceability-report-print', true, 192, false),
    
    -- Bakery STORE_MANAGER
    (30, 'Management produse', 'ProductManagement', '/bakery/storeManager/product-management', true , 27, true),
    (31, 'Management productie', 'CandetierStore', '/bakery/storeManager/cadentier-store', true , 28, true),
    (32, 'Print cadentier', 'ProductionManagement', '/bakery/storeManager/cadentier-store-print', true, 28, false),
    (33, 'Detalii produs', 'ProductionManagement', '/bakery/storeManager/cadentier-details', true , 28, false),
    (34, 'Coeficient crestere magazin', 'GrowthIndexStore', '/bakery/storeManager/growth-index', true , 29, true),
    (35, 'Coeficientul de crestere la nivelul produselor din magazin', 'ProductGrowthIndex', '/bakery/storeManager/product-growth-index', true , 30, true),
    (36, 'Raport vanzari + cadentier', 'CadentierSalesStore', '/bakery/storeManager/cadentier-sales-store', true , 31, true),
    -- Bakery REGION_MANAGER
    (37, 'Management produse', 'ProductManagementRegion', '/bakery/regionManager/product-management-region', true , 32, true),
    (38, 'Management productie', 'GrowthRegion', '/bakery/regionManager/growth-region', true , 33, true),
    (39, 'Print cadentier', 'ProductionManagement', '/bakery/regionManager/cadentier-region-print', true, 33, false),
    (40, 'Coeficient crestere regiune', 'GrowthIndex', '/bakery/regionManager/growth-index', true , 34, true),
    (41, 'Coeficientul de crestere la nivelul regiunii', 'StoresManagement', '/bakery/regionManager/growthIndexView', true , 34, false),
    (42, 'Setari coeficient de crestere la nivelul produselor din magazin', 'StoresManagement', '/bakery/regionManager/growthIndexProductsView', true , 34, false),
    (43, 'Raport vanzari + cadentier', 'CadentierSalesRegion', '/bakery/regionManager/cadentier-sales-region', true , 35, true),
    (44, 'Raport utilizare aplicatie', 'UsageReportRegion', '/bakery/regionManager/usage-report-region', true , 36, true),
    -- Supply OMNI
    (45, 'Scanare produs', 'QrCodeScannerOutlined', '/supplyOmni/productScan', true, 37, true),
    (46, 'Cos de cumparaturi', 'ShoppingBasketOutlined', '/supplyOmni/shoppingCart', true, 38, true),
    (47, 'Selecteaza client', '', '/supplyOmni/shoppingCartSelectClient', true, 38, false),
    (48, 'Date client', '', '/supplyOmni/shoppingCartClientDetails/:id', true, 38, false),
    (49, 'PDF proforma', '', '/supplyOmni/proformaView/:id', true, 38, false),
    (50, 'Scanare Bon', '', '/supplyOmni/scanReceipt/:id', true, 38, false),
    (51, 'Comanda finalizata', '', '/supplyOmni/receiptInvoiceFinalized', true, 38, false),
    (52, 'Date factura', '', '/supplyOmni/receiptClientDetails/:id', true, 38, false),
    (53, 'Selecteaza client', '', '/supplyOmni/receiptSelectClient', true, 38, false),
    (54, 'Listare proforme', '', '/supplyOmni/proformaList', true, 39, true),
    (55, 'Vanzarile mele', '', '/supplyOmni/sales', true, 40, true),
    (56, 'Comenzi achitate', '', '/supplyOmni/bills', true, 41, true),
    (57, 'PDF factura', '', '/supplyOmni/bills/:id', true, 41, false),
    -- Volumetry
    (58, 'Management angajati', '', '/volumetry/employee/employeeManagement', true, 42, true),
    (59, 'Management task template-uri', '', '/volumetry/tasksManagement/taskManagement', true, 43, true),
    (60, 'Alocare task-uri', '', '/volumetry/tasksManagement/taskAllocations', true, 44, true),
    (61, 'Raport de Evaluare', '', '/volumetry/employee/evaluationReports', true, 45, true),
    (62, 'Link-uri rapoarte', '', '/volumetry/reports/reportsLinks', true, 46, true),
    (63, 'Task-uri alocate', '', '/volumetry/tasksManagement/assignedTasks', true, 47, true),
    (64, 'Status angajati', '', '/volumetry/employee/allocatedEmployeesStatus', true, 48, true),
    (65, 'Detalii task', '', '/volumetry/tasksManagement/taskAllocation', true, 44, false),
    (266, 'Management magazine', '', '/volumetry/tasksManagement/locationManagement', true, 249, true),
    (267, 'Management business units', '', '/volumetry/tasksManagement/locationCategoryManagement', true, 250, true),
    -- Shop Reception (Admin)
    (166, 'Administrare depozite', '', '/shop-reception/admin/deposits', true, 149, true),
    (167, 'Administrare huburi', '', '/shop-reception/admin/hubs', true, 151, true),
    (220, 'Administrare huburi', '', '/shop-reception/admin/hubs/deliveryInterval/:id', true, 151, false),
    (168, 'Administrare magazine', '', '/shop-reception/admin/stores', true, 152, true),
    (169, 'Administrare regiuni', '', '/shop-reception/admin/regions', true, 153, true),
    (170, 'Centralizare magazine si huburi', '', '/shop-reception/admin/centralization', true, 154, true),
    (171, 'Administrare tipuri de scanare', '', '/shop-reception/admin/scanTypes', true, 155, true),
    (172, 'Prag valabilitate subfamilii', '', '/shop-reception/admin/subfamilyValidityTreshold', true, 156, true),
    (173, 'Lista produse METI', '', '/shop-reception/admin/metiProducts', true, 157, true),
    (174, 'Administrare produse sensibile', '', '/shop-reception/admin/sensitiveProducts', true, 158, true),
    (175, 'Administrare tipuri de ambalaje', '', '/shop-reception/admin/packingTypes', true, 159, true),
    (176, 'Administrare produse cu dlc scurt', '', '/shop-reception/admin/shortDlcProducts', true, 160, true),
    (177, 'Fisiere receptie infolog', '', '/shop-reception/admin/receptionFiles', true, 161, true),
    (178, 'Administrare produse SGR', '', '/shop-reception/admin/sgrProducts', true, 162, true),
    (179, 'Bonuri de livrare', '', '/shop-reception/reception/deliverySlips', true, 163, true),
    (222, 'Bonuri de livrare', '', '/shop-reception/reception/deliverySupportAction/:id', true, 163, false),
    (180, 'Lista camioane marfa', '', '/shop-reception/reception/truckList', true, 164, true),
    (291, 'Detalii lista camioane marfa', '', '/shop-reception/reception/truckList/:id', true, 164, false),
    (181, 'Suporti cu destinatie eronata', '', '/shop-reception/reception/wrongDestinationSupport', true, 165, true),
    (219, 'Suporti cu destinatie eronata', '', '/shop-reception/reception/wrongDestinationSupport/:id', true, 165, false),
    (182, 'Produse necomandate', '', '/shop-reception/reception/nonRecommendedProducts', true, 166, true),
    (183, 'Fisiere meti', '', '/shop-reception/reception/metiFiles', true, 167, true),
    (221, 'Detalii fisiere meti', '', '/shop-reception/reception/metiFiles/:id', true, 167, false),
    (184, 'Produse cu diferente', '', '/shop-reception/reception/productsDifferences', true, 168, true),
    (185, 'Trasabilitate suport', '', '/shop-reception/reception/trasabilitySupport', true, 169, true),
    (292, 'Articole sensibile', '', '/shop-reception/reception/sensitiveProducts', true, 195, true),
    (293, 'Raport livrare marfa', '', '/shop-reception/reception/deliveryTruckList', true, 196, true),
    (186, 'Lista camioane retur', '', '/shop-reception/package/trucksReturnList', true, 170, true),
    (286, 'Detalii camion retur', '', '/shop-reception/package/trucksReturn/:id', true, 170, false),
    (187, 'Rulaj ambalaje', '', '/shop-reception/package/rolling', true, 171, true),
    (188, 'Sold ambalaje', '', '/shop-reception/package/balance', true, 172, true),
    (288, 'Istoric sold', '', '/shop-reception/package/balance/history/:id', true, 172, false),
    (389, 'Inventar ambalaje', '', '/shop-reception/package/packingInventory', true, 272, true),
    (390, 'Istoric inventar', '', '/shop-reception/package/packingInventoryHistory/:id', true, 272, false),
    (189, 'Litigii ambalaje - retur magazine', '', '/shop-reception/package/storeReturnsDisputes', true, 173, true),
    (289, 'Litigiu aviz', '', '/shop-reception/package/storeReturnsDisputes/:id', true, 173, false),
    (290, 'Dovezi magazin', '', '/shop-reception/package/storeReturnsDisputesImages/:id', true, 173, false),
    (190, 'Diferente tip ambalaj', '', '/shop-reception/package/typesDifferences', true, 174, true),
    (191, 'Ambalaje returnate', '', '/shop-reception/package/returned', true, 175, true),
    (192, 'Conformitate ambalaje', '', '/shop-reception/package/compliance', true, 176, true),
    (193, 'Litigii ambalaje - administrare timer', '', '/shop-reception/package/timerDisputes', true, 177, true),
    -- Shop Reception (Mobile)
    (194, 'In procesare receptie', '', '/shop-reception/mobile/inProcessingReception', true, 178, true),
    (195, 'Camioane asteptate', '', '/shop-reception/mobile/expectedTrucks', true, 179, true),
    (196, 'Inregistreaza camion', '', '/shop-reception/mobile/registerTruck', true, 180, true),
    (197, 'In procesare expeditie', '', '/shop-reception/mobile/inProcessingShipment', true, 181, true),
    (198, 'Camioane expediate', '', '/shop-reception/mobile/shippedTrucks', true, 182, true),
    (199, 'Retururi asteptare', '', '/shop-reception/mobile/expectedReturns', true, 183, true),
    (200, 'Retur in curs de receptie', '', '/shop-reception/mobile/inProgressReturnReception', true, 184, true),
    (201, 'Inregistrare retur', '', '/shop-reception/mobile/recordReturn', true, 185, true),
    (202, 'Continuare retur', '', '/shop-reception/mobile/continueReturn', true, 186, true),
    (203, 'Cod suport', '', '/shop-reception/mobile/supportCode', true, 178, false),
    (204, 'Detalii camion', '', '/shop-reception/mobile/truckDetails/:id', true, 184, false),
    (205, 'Detalii retur', '', '/shop-reception/mobile/recordReturnDetails', true, 185, false),
    (206, 'Detalii continure retur', '', '/shop-reception/mobile/continueReturnDetails', true, 186, false),
    (207, 'Adauga camion', '', '/shop-reception/mobile/addTruck', true, 179, false),
    (208, 'Lista camioane', '', '/shop-reception/mobile/trucksList', true, 187, true),
    (209, 'Detalii camion', '', '/shop-reception/mobile/truckDetails/:id', true, 187, false),
    (210, 'Validare livrare', '', '/shop-reception/mobile/validateDelivery', true, 188, true),
    (211, 'Detalii livrare', '', '/shop-reception/mobile/deliveryDetails', true, 188, false),
    (212, 'Scanare completa livrare', '', '/shop-reception/mobile/deliveryFullScan', true, 188, false),
    (213, 'Produse sensibile', '', '/shop-reception/mobile/sensitiveProducts', true, 188, false),
    (214, 'Suport aleatoriu', '', '/shop-reception/mobile/randomSupport', true, 188, false),
    (215, 'Produs aleatoriu', '', '/shop-reception/mobile/randomProduct', true, 188, false),
    (216, 'Comanda camion retur', '', '/shop-reception/mobile/truckReturnOrder', true, 189, true),
    (217, 'Camioane retur confirmate', '', '/shop-reception/mobile/truckReturnConfirm', true, 190, true),
    (218, 'Bonuri de livrare', '', '/shop-reception/reception/deliverySlips/:id', true, 163, false),
    -- Bakery TRACEABILITY-OPERATOR
    (67, 'Management produse', 'ProductManagementTO', '/bakery/traceabilityOperator/product-management', true, 50, true),
    (68, 'Produse receptionate in raion', 'ReceivedProductsTO', '/bakery/traceabilityOperator/received-products', true, 51, true),
    (69, 'Trasabilitate congelate', 'FrozenTraceabilityTO', '/bakery/traceabilityOperator/frozen-traceability', true, 52, true),
    (70, 'Trasabilitate productie proprie', 'OwnProductionTraceabilityTO', '/bakery/traceabilityOperator/own-production-traceability', true, 53, true),
    (71, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/traceabilityOperator/frozen-traceability-report', true, 54, true),
    (72, 'Print raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/traceabilityOperator/frozen-traceability-report-print', true, 54, false),
    (73, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/traceabilityOperator/own-production-traceability-report', true, 55, true),
    (74, 'Print raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/traceabilityOperator/own-production-traceability-report-print', true, 55, false),
    -- Bakery ADMIN p2
    (80, 'Gestiune ingrediente', 'Ingredients', '/bakery/admin/ingredients', true, 56, true);

-- roles
INSERT INTO
	"dex-designer".roles (id, role_name)
VALUES
    -- Governance
    (1, 'GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN'),
    (2, 'GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL'),
    (3, 'GG_RO_HQ_IT_DEX_GOV_IT_PM'),
    (4, 'GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER'),
	  -- Bakery
    (5, 'GG_RO_HQ_IT_DEX_BAKERY_ADMIN'),
    (6, 'GG_RO_HQ_IT_DEX_BAKERY_STORE'),
    (7, 'GG_RO_HQ_IT_DEX_BAKERY_REGION'),
    (8, 'GG_RO_HQ_IT_DEX_BAKERY_TRAINEE'),
    (9, 'GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_HYPER'),
    (10, 'GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_SUPER'),
    (12, 'GG_RO_HQ_IT_DEX_BAKERY_TRACEABILITY'),
    -- Supply OMNI
    (11, 'GG_RO_HQ_IT-C4ASSIST'),
    -- Volumetry
    (100, 'VOLUMETRY_TASK_ALLOCATOR'),
    (101, 'VOLUMETRY_WORKER'),
    (102, 'VOLUMETRY_TEMPLATE_ADMIN'),
    (150, 'GG_RO_DEX_VOLUMETRY_TASK_ALLOCATOR'),
    (151, 'GG_RO_DEX_VOLUMETRY_WORKER'),
    (152, 'GG_RO_DEX_VOLUMETRY_TEMPLATE_ADMIN'),
    -- Shop Reception
    (200, 'GG_RO_HQ_SHOP_RECEPTION_ADMIN'),
    (201, 'GG_RO_HQ_SHOP_RECEPTION_BACKOFFICE'),
    (202, 'GG_RO_HQ_SHOP_RECEPTION_STORE'),
    (203, 'GG_RO_HQ_SHOP_RECEPTION_HUB'),
    (204, 'GG_RO_HQ_SHOP_RECEPTION_DIRECTOR'),
    (205, 'GG_RO_HQ_SHOP_RECEPTION_REGIONAL_OPERATIONS'),
    (206, 'GG_RO_HQ_SHOP_RECEPTION_WAREHOUSE'),
    (207, 'GG_RO_HQ_SHOP_RECEPTION_CG'),
    (208, 'GG_RO_HQ_SHOP_RECEPTION_AMBALAJE');






-- roles_activities
INSERT INTO
    "dex-designer".roles_activities (role_id, activity_id)
VALUES
    -- Governance
    -- GG_RO_HQ_IT_DEX_GOV_SRV_ADMIN
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
    -- GG_RO_HQ_IT_DEX_GOV_DOMAIN_TL
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
    -- GG_RO_HQ_IT_DEX_GOV_IT_PM
    (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6),
    -- GG_RO_HQ_IT_DEX_GOV_IT_DOMAIN_MEMBER
    (4, 1), (4, 2), (4,3), (4, 4), (4, 6),
    -- Bakery
    -- GG_RO_HQ_IT_DEX_BAKERY_ADMIN
    (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12), (5, 13), (5, 14), (5, 15), (5, 16), (5, 56),
    -- GG_RO_HQ_IT_DEX_BAKERY_STORE
    (6, 27), (6, 28), (6, 29), (6, 30), (6, 31),
    -- GG_RO_HQ_IT_DEX_BAKERY_REGION
    (7, 32), (7, 33), (7, 34), (7, 35), (7, 36),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE
    (8, 17), (8, 18), (8, 19), (8, 20), (8, 21), (8, 22), (8, 23), (8, 54), (8, 55), (8, 191), (8, 192),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_HYPER
    (9, 17), (9, 18), (9, 19), (9, 20), (9, 21), (9, 22), (9, 23), (9, 54), (9, 55), (9, 191), (9, 192),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_SUPER
    (10, 17), (10, 18), (10, 19), (10, 20), (10, 21), (10, 22), (10, 23), (10, 54), (10, 55), (10, 191), (10, 192),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRACEABILITY
    (12, 50), (12, 51), (12, 52), (12, 53), (12, 54), (12, 55),
    -- Supply OMNI
    -- GG_RO_HQ_IT-C4ASSIST
    (11, 37), (11, 38), (11, 39), (11, 40), (11, 41),
    -- Volumetry
    -- VOLUMETRY_TASK_ALLOCATOR
    (100, 42),
    (100, 44),
    (100, 46),
    (100, 47),
    (100, 48),
    -- VOLUMETRY_WORKER
    (101, 47),
    -- VOLUMETRY_TEMPLATE_ADMIN
    (102, 43),
    (102, 249),
    (102, 250),
    -- GG_RO_DEX_VOLUMETRY_TASK_ALLOCATOR
    (150, 42),
    (150, 44),
    (150, 46),
    (150, 47),
    (150, 48),
    -- GG_RO_DEX_VOLUMETRY_WORKER
    (151, 47),
    -- GG_RO_DEX_VOLUMETRY_TEMPLATE_ADMIN
    (152, 43),
    (152, 249),
    (152, 250),
    -- Shop Reception Admin
    -- SHOP_RECEPTION_DUMMY_ROLE
    (200, 149), (200, 151), (200, 152), (200, 153), (200, 154), (200, 155), (200, 156),
    (200, 157), (200, 158), (200, 159), (200, 160), (200, 161), (200, 162), (200, 163), (200, 164),
    (200, 165), (200, 166), (200, 167), (200, 168), (200, 169), (200, 170), (200, 171), (200, 172),
    (200, 173), (200, 174), (200, 175), (200, 176), (200, 177), (200, 272), (200, 195), (200, 196),
    -- Shop Reception Mobile
    -- SHOP_RECEPTION_DUMMY_ROLE
    (200, 178), (200, 179), (200, 180), (200, 181), (200, 182), (200, 183), (200, 184), (200, 185),
    (200, 186), (200, 187), (200, 188), (200, 189), (200, 190);


-- reset sequences
SELECT setval('"dex-designer".seq_id_roles', 200, true);
SELECT setval('"dex-designer".seq_id_ui_schema', 100, true);
SELECT setval('"dex-designer".seq_id_screen', 100, true);
SELECT setval('"dex-designer".seq_id_activity', 100, true);
SELECT setval('"dex-designer".seq_id_application_submodule', 100, true);
SELECT setval('"dex-designer".seq_id_application_module', 100, true);


-- select all data
SELECT
    m.name AS module_name,
    m.icon AS module_icon,
    m.route_url AS module_route_url,
    sm.name AS submodule_name,
    sm.icon AS submodule_icon,
    sm.route_url AS submodule_route_url,
    a.name AS activity_name,
    a.icon AS activity_icon,
    a.route_url AS activity_route_url,
    s.name AS screen_name,
    s.icon AS screen_icon,
    s.route_url AS screen_route_url,
    s.is_first_screen,
    u.json_schema AS json_schema
FROM "dex-designer".application_module m
LEFT JOIN "dex-designer".application_submodule sm
    ON m.id = sm.id_application_module
LEFT JOIN "dex-designer".activity a
    ON sm.id = a.id_application_submodule
LEFT JOIN "dex-designer".screen s
    ON a.id = s.activity_id
LEFT JOIN "dex-designer".ui_schema u
    ON s.id = u.screen_id;