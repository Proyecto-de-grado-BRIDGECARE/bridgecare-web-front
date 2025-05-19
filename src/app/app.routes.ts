import { Routes } from '@angular/router';
import { LoginComponent } from "./features/authentication/login/login.component";
import { HomeComponent } from "./features/general/home/home.component";
import { InspectionsComponent } from "./features/bridge-management/inspections/inspections.component";
import { InspectionBridgeComponent } from "./features/bridge-management/inspection-bridge/inspection-bridge.component";
import { InventoriesComponent } from "./features/bridge-management/inventories/inventories.component";
import { InventoryBridgeComponent } from "./features/bridge-management/inventory-bridge/inventory-bridge.component";
import { ManageUsersComponent } from "./features/account-management/manage-users/manage-users.component";
import { NotFoundComponent } from "./features/general/not-found/not-found.component";
import { AlertsComponent } from './features/bridge-management/alerts/alerts.component';

import { roleGuard } from './shared/guards/role.guard';
import { TableInspectionsComponent } from './shared/components/tables/table-inspections/table-inspections.component';
import { InspectionFormComponent } from './shared/components/forms/inspection-form/inspection-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [roleGuard],
    data: {
      requiredRole: [0, 1, 2] // 0 = municipal, 1 = student, 2 = admin
    }
  },
  {
    path: 'home/bridge-management',
    children: [
      {
        path: 'inventories',
        component: InventoriesComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      // Crear inventario
      {
        path: 'inventories/inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: { requiredRole: [1, 2] }
      },
      // Editar inventario
      {
        path: 'inventories/:bridgeIdentification/inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: { requiredRole: [ 1, 2] }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections',
        component: InspectionsComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [1, 2]
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [1, 2]
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections/inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections/inspection-bridge',
        component: InspectionBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: 'inventories/:BridgeId/view-inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: 'home/bridge-management/inventories/:bridgeIdentification/inspections',
        component: TableInspectionsComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections/:inspectionId/view',
        component: InspectionFormComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: 'inventories/:puenteId/inspections/:inspectionId/alerts', //mejorar esto
        component: AlertsComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: [0, 1, 2]
        }
      },
      {
        path: '',
        redirectTo: 'inventories',
        pathMatch: 'full'
      }
    ],
    canActivate: [roleGuard],
    data: {
      requiredRole: [0, 1, 2]
    }
  },
  {
    path: 'home/account-management',
    component: ManageUsersComponent,
    canActivate: [roleGuard],
    data: {
      requiredRole: [2]
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

