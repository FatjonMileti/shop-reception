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
    -- Shop Reception (Admin)
    (10, 'Administrare', 'ProjectTeamGovernance', '/admin', true, 5),
    (11, 'Receptie marfa', 'ProjectTeamGovernance', '/reception', true, 5),
    (12, 'Ambalaje', 'ProjectTeamGovernance', '/package', true, 5),
    -- Shop Reception (Mobile)
    (13, 'Receptie marfa', 'ProjectTeamGovernance', '/goodsReception', true, 6),
    (14, 'Returnare marfa', 'ProjectTeamGovernance', '/goodsReturn', true, 6);
    -- Bakery p2
    -- (10, 'Operator trasabilitate', 'TraceabilityOperator', '/traceabilityOperator', true, 2);


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
    (42, 'Management Angajati', 'EmployeeManagement', null, true, 7),
    (43, 'Management task template-uri', 'ManagementTasks', null, true, 8),
    (44, 'Alocare Task-uri', 'AssignTasks', null, true, 8),
    (45, 'Raport de Evaluare', 'EmployeeManagement', null, true, 9),
    (46, 'Raport norme', 'ReportsVolumetry', null, true, 9),
    (47, 'Task-uri alocate', 'AssignTasks', null, true, 8),
    (48, 'Status Angajati', 'EmployeeManagement', null, true, 8),
    -- Shop Reception (Admin)
    (49, 'Administrare depozite', 'UsersManagement', null, true, 10),
    (51, 'Administrare huburi', 'UsersManagement', null, true, 10),
    (52, 'Administrare magazine', 'UsersManagement',null, true, 10),
    (53, 'Administrare regiuni', 'UsersManagement', null, true, 10),
    (54, 'Centralizare magazine si huburi', 'UsersManagement', null, true, 10),
    (55, 'Administrare tipuri de scanare', 'UsersManagement', null, true, 10),
    (56, 'Prag valabilitate subfamilii', 'UsersManagement', null, true, 10),
    (57, 'Lista produse METI', 'UsersManagement', null, true, 10),
    (58, 'Administrare produse sensibile', 'UsersManagement', null, true, 10),
    (59, 'Administrare tipuri de ambalaje', 'UsersManagement', null, true, 10),
    (60, 'Administrare produse cu dlc scurt', 'UsersManagement', null, true, 10),
    (61, 'Fisiere receptie infolog', 'UsersManagement', null, true, 10),
    (62, 'Administrare produse SGR', 'UsersManagement', null, true, 10),
    (63, 'Bonuri de livrare', 'UsersManagement', null, true, 11),
    (64, 'Lista camioane marfa', 'UsersManagement', null, true, 11),
    (65, 'Suporti cu destinatie eronata', 'UsersManagement', null, true, 11),
    (66, 'Produse necomandate', 'UsersManagement', null, true, 11),
    (67, 'Fisiere meti', 'UsersManagement', null, true, 11),
    (68, 'Produse cu diferente', 'UsersManagement', null, true, 11),
    (69, 'Trasabilitate suport', 'UsersManagement', null, true, 11),
    (70, 'Lista camioane retur', 'UsersManagement', null, true, 12),
    (71, 'Rulaj ambalaje', 'UsersManagement', null, true, 12),
    (72, 'Sold ambalaje', 'UsersManagement', null, true, 12),
    (73, 'Litigii ambalaje - retur magazine', 'UsersManagement', null, true, 12),
    (74, 'Diferente tip ambalaj', 'UsersManagement', null, true, 12),
    (75, 'Ambalaje returnate', 'UsersManagement', null, true, 12),
    (76, 'Conformitate ambalaje', 'UsersManagement', null, true, 12),
    (77, 'Litigii ambalaje - administrare timer', 'UsersManagement', null, true, 12),
    -- Shop Reception (Mobile)
    (78, 'In procesare receptie', 'UsersManagement', null, true, 13),
    (79, 'Camioane asteptate', 'UsersManagement', null, true, 13),
    (80, 'Inregistreaza camion', 'UsersManagement', null, true, 13),
    (81, 'In procesare expeditie', 'UsersManagement', null, true, 13),
    (82, 'Camioane expediate', 'UsersManagement', null, true, 13),
    (87, 'Lista camioane', 'UsersManagement', null, true, 13),
    (88, 'Validare livrare', 'UsersManagement', null, true, 13),
    (83, 'Retururi asteptare', 'UsersManagement', null, true, 14),
    (84, 'Retur in curs de receptie', 'UsersManagement', null, true, 14),
    (85, 'Inregistrare retur', 'UsersManagement', null, true, 14),
    (86, 'Continuare retur', 'UsersManagement', null, true, 14),
    (89, 'Comanda camion retur', 'UsersManagement', null, true, 14),
    (90, 'Camioane retur confirmate', 'UsersManagement', null, true, 14);





    -- Bakery TRACEABILITY OP
    -- (47, 'Management produse', 'ProductManagementTO', null, true, 10),
    -- (48, 'Produse receptionate in raion', 'ReceivedProductsTO', null, true, 10),
    -- (49, 'Trasabilitate congelate', 'FrozenTraceabilityTO', null, true, 10),
    -- (50, 'Trasabilitate productie proprie', 'OwnProductionTraceabilityTO', null, true, 10),
    -- (51, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', null, true, 10),
    -- (52, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', null, true, 10);
    -- Bakery ADMIN p2
    -- (53, 'Gestiune ingrediente', 'Ingredients', null, true, 10);


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
    (62, 'Raport norme', '', '/volumetry/reports/dailyNorms', true, 46, true),
    (63, 'Task-uri alocate', '', '/volumetry/tasksManagement/assignedTasks', true, 47, true),
    (64, 'Status angajati', '', '/volumetry/employee/allocatedEmployeesStatus', true, 48, true),
    (65, 'Detalii task', '', '/volumetry/tasksManagement/taskAllocation', true, 44, false),
    -- Shop Reception (Admin)
    (66, 'Administrare depozite', '', '/shop-reception/admin/deposits', true, 49, true),
    (67, 'Administrare huburi', '', '/shop-reception/admin/hubs', true, 51, true),
    (68, 'Administrare magazine', '', '/shop-reception/admin/stores', true, 52, true),
    (69, 'Administrare regiuni', '', '/shop-reception/admin/regions', true, 53, true),
    (70, 'Centralizare magazine si huburi', '', '/shop-reception/admin/centralization', true, 54, true),
    (71, 'Administrare tipuri de scanare', '', '/shop-reception/admin/scanTypes', true, 55, true),
    (72, 'Prag valabilitate subfamilii', '', '/shop-reception/admin/subfamilyValidityTreshold', true, 56, true),
    (73, 'Lista produse METI', '', '/shop-reception/admin/metiProducts', true, 57, true),
    (74, 'Administrare produse sensibile', '', '/shop-reception/admin/sensitiveProducts', true, 58, true),
    (75, 'Administrare tipuri de ambalaje', '', '/shop-reception/admin/packingTypes', true, 59, true),
    (76, 'Administrare produse cu dlc scurt', '', '/shop-reception/admin/shortDlcProducts', true, 60, true),
    (77, 'Fisiere receptie infolog', '', '/shop-reception/admin/receptionFiles', true, 61, true),
    (78, 'Administrare produse SGR', '', '/shop-reception/admin/sgrProducts', true, 62, true),
    (79, 'Bonuri de livrare', '', '/shop-reception/reception/deliverySlips', true, 63, true),
    (80, 'Lista camioane marfa', '', '/shop-reception/reception/truckList', true, 64, true),
    (81, 'Suporti cu destinatie eronata', '', '/shop-reception/reception/wrongDestinationSupport', true, 65, true),
    (82, 'Produse necomandate', '', '/shop-reception/reception/nonRecommendedProducts', true, 66, true),
    (83, 'Fisiere meti', '', '/shop-reception/reception/metiFiles', true, 67, true),
    (84, 'Produse cu diferente', '', '/shop-reception/reception/productsDifferences', true, 68, true),
    (85, 'Trasabilitate suport', '', '/shop-reception/reception/trasabilitySupport', true, 69, true),
    (86, 'Lista camioane retur', '', '/shop-reception/package/trucksReturnList', true, 70, true),
    (87, 'Rulaj ambalaje', '', '/shop-reception/package/rolling', true, 71, true),
    (88, 'Sold ambalaje', '', '/shop-reception/package/balance', true, 72, true),
    (89, 'Litigii ambalaje - retur magazine', '', '/shop-reception/package/storeReturnsDisputes', true, 73, true),
    (90, 'Diferente tip ambalaj', '', '/shop-reception/package/typesDifferences', true, 74, true),
    (91, 'Ambalaje returnate', '', '/shop-reception/package/returned', true, 75, true),
    (92, 'Conformitate ambalaje', '', '/shop-reception/package/compliance', true, 76, true),
    (93, 'Litigii ambalaje - administrare timer', '', '/shop-reception/package/timerDisputes', true, 77, true),
    -- Shop Reception (Mobile)
    (94, 'In procesare receptie', '', '/shop-reception/mobile/inProcessingReception', true, 78, true),
    (95, 'Camioane asteptate', '', '/shop-reception/mobile/expectedTrucks', true, 79, true),
    (96, 'Inregistreaza camion', '', '/shop-reception/mobile/registerTruck', true, 80, true),
    (97, 'In procesare expeditie', '', '/shop-reception/mobile/inProcessingShipment', true, 81, true),
    (98, 'Camioane expediate', '', '/shop-reception/mobile/shippedTrucks', true, 82, true),
    (99, 'Retururi asteptare', '', '/shop-reception/mobile/expectedReturns', true, 83, true),
    (100, 'Retur in curs de receptie', '', '/shop-reception/mobile/inProgressReturnReception', true, 84, true),
    (101, 'Inregistrare retur', '', '/shop-reception/mobile/recordReturn', true, 85, true),
    (102, 'Continuare retur', '', '/shop-reception/mobile/continueReturn', true, 86, true),
    (103, 'Cod suport', '', '/shop-reception/mobile/supportCode', true, 78, false),
    (104, 'Detalii camion', '', '/shop-reception/mobile/truckDetails/:id', true, 84, false),
    (105, 'Detalii retur', '', '/shop-reception/mobile/recordReturnDetails', true, 85, false),
    (106, 'Detalii continure retur', '', '/shop-reception/mobile/continueReturnDetails', true, 86, false),
    (107, 'Adauga camion', '', '/shop-reception/mobile/addTruck', true, 79, false),
    (108, 'Lista camioane', '', '/shop-reception/mobile/trucksList', true, 87, true),
    (109, 'Detalii camion', '', '/shop-reception/mobile/truckDetails/:id', true, 87, false),
    (110, 'Validare livrare', '', '/shop-reception/mobile/validateDelivery', true, 88, true),
    (111, 'Detalii livrare', '', '/shop-reception/mobile/deliveryDetails', true, 88, false),
    (112, 'Scanare completa livrare', '', '/shop-reception/mobile/deliveryFullScan', true, 88, false),
    (113, 'Produse sensibile', '', '/shop-reception/mobile/sensitiveProducts', true, 88, false),
    (114, 'Suport aleatoriu', '', '/shop-reception/mobile/randomSupport', true, 88, false),
    (115, 'Produs aleatoriu', '', '/shop-reception/mobile/randomProduct', true, 88, false),
    (116, 'Comanda camion retur', '', '/shop-reception/mobile/truckReturnOrder', true, 89, true),
    (117, 'Camioane retur confirmate', '', '/shop-reception/mobile/truckReturnConfirm', true, 90, true);

    -- Bakery TRACEABILITY-OPERATOR
    -- (63, 'Management produse', 'ProductManagementTO', '/bakery/traceabilityOperator/product-management', true, 47, true),
    -- (64, 'Produse receptionate in raion', 'ReceivedProductsTO', '/bakery/traceabilityOperator/received-products', true, 48, true),
    -- (65, 'Trasabilitate congelate', 'FrozenTraceabilityTO', '/bakery/traceabilityOperator/frozen-traceability', true, 49, true),
    -- (66, 'Trasabilitate productie proprie', 'OwnProductionTraceabilityTO', '/bakery/traceabilityOperator/own-production-traceability', true, 50, true),
    -- (67, 'Raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/traceabilityOperator/frozen-traceability-report', true, 51, true),
    -- (68, 'Print raport trasabilitate congelate', 'FrozenTraceabilityReportTO', '/bakery/traceabilityOperator/frozen-traceability-report-print', true, 51, false),
    -- (69, 'Raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/traceabilityOperator/own-production-traceability-report', true, 52, true),
    -- (70, 'Print raport trasabilitate productie proprie', 'OwnProductionTraceabilityReportTO', '/bakery/traceabilityOperator/own-production-traceability-report-print', true, 52, false);
    -- Bakery ADMIN p2
    -- (71, 'Gestiune ingrediente', 'Ingredients', '/bakery/admin/ingredients', true, 53, true);

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
    -- (12, 'GG_RO_HQ_IT_DEX_BAKERY_TRACEABILITY'),
    -- Supply OMNI
    (11, 'GG_RO_HQ_IT-C4ASSIST'),
    -- Volumetry
    (100, 'VOLUMETRY_TASK_ALLOCATOR'),
    (101, 'VOLUMETRY_WORKER'),
    (102, 'VOLUMETRY_REGION_ADMIN'),
    (103, 'VOLUMETRY_STORE_ADMIN'),
    (104, 'VOLUMETRY_TEMPLATE_ADMIN'),
    -- Shop Reception
    (200, 'SHOP_RECEPTION_DUMMY_ROLE');


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
    (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12), (5, 13), (5, 14), (5, 15), (5, 16),
    -- GG_RO_HQ_IT_DEX_BAKERY_STORE
    (6, 27), (6, 28), (6, 29), (6, 30), (6, 31),
    -- GG_RO_HQ_IT_DEX_BAKERY_REGION
    (7, 32), (7, 33), (7, 34), (7, 35), (7, 36),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE
    (8, 17), (8, 18), (8, 19), (8, 20), (8, 21), (8, 22), (8, 23),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_HYPER
    (9, 17), (9, 18), (9, 19), (9, 20), (9, 21), (9, 22), (9, 23),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRAINEE_SUPER
    (10, 17), (10, 18), (10, 19), (10, 20), (10, 21), (10, 22), (10, 23),
    -- GG_RO_HQ_IT_DEX_BAKERY_TRACEABILITY
    -- (12, 47), (12, 48), (12, 49), (12, 50), (12, 51), (12, 52),
    -- Supply OMNI
    -- GG_RO_HQ_IT-C4ASSIST
    (11, 37), (11, 38), (11, 39), (11, 40), (11, 41),
    -- Volumetry
    -- VOLUMETRY_TASK_ALLOCATOR
    (100, 42),
    (100, 44),
    (100, 43),  -- temporary let this role access the task templates activity
    -- (100, 45),
    (100, 46),
    (100, 48),
    -- VOLUMETRY_WORKER
    (101, 47),
    -- VOLUMETRY_REGION_ADMIN
    (102, 42),
    (102, 46),
    -- (102, 45),
    -- VOLUMETRY_STORE_ADMIN
    (103, 42),
    (103, 44),
    -- (103, 45),
    -- VOLUMETRY_TEMPLATE_ADMIN
    (104, 43),
    -- Shop Reception Admin
    -- SHOP_RECEPTION_DUMMY_ROLE
    (200, 49), (200, 51), (200, 52), (200, 53), (200, 54), (200, 55), (200, 56), 
    (200, 57), (200, 58), (200, 59), (200, 60), (200, 61), (200, 62), (200, 63), (200, 64), 
    (200, 65), (200, 66), (200, 67), (200, 68), (200, 69), (200, 70), (200, 71), (200, 72), 
    (200, 73), (200, 74), (200, 75), (200, 76), (200, 77),
    -- Shop Reception Mobile
    -- SHOP_RECEPTION_DUMMY_ROLE
    (200, 78), (200, 79), (200, 80), (200, 81), (200, 82), (200, 83), (200, 84), (200, 85), 
    (200, 86), (200, 87), (200, 88), (200, 89), (200, 90);


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