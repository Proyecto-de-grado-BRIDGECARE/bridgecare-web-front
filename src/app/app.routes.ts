import { Routes } from '@angular/router';
import { LoginComponent } from "./features/authentication/login/login.component";
import { HomeComponent } from "./features/general/home/home.component";
import { InspectionsComponent } from "./features/bridge-management/inspections/inspections.component";
import { InspectionBridgeComponent } from "./features/bridge-management/inspection-bridge/inspection-bridge.component";
import { InventoriesComponent } from "./features/bridge-management/inventories/inventories.component";
import { InventoryBridgeComponent } from "./features/bridge-management/inventory-bridge/inventory-bridge.component";
import { ManageUsersComponent } from "./features/account-management/manage-users/manage-users.component";
import { NotFoundComponent } from "./features/general/not-found/not-found.component";

import { roleGuard } from './shared/guards/role.guard';

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
      requiredRole: ['0', '1', '2'] // 0 = admin, 1 = student, 2 = municipal
    }
  },

  {
    path: 'home/bridge-management',
    children: [
      {
        path: 'inventories', // aparecen todos los inventarios
        component: InventoriesComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1', '2']
        }
      },
      {
        path: 'inventories/inventory-bridge', // se crea un nuevo inventario
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1']
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections', // se ven las inspecciones de un inventario
        component: InspectionsComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1', '2']
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inventory-bridge', // se modifica el inventario seleccionado
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1']
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections/inventory-bridge', // se ve el inventario
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1', '2']
        }
      },
      {
        path: 'inventories/:bridgeIdentification/inspections/inspection-bridge', // se ve la inspección detallada
        component: InspectionBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1', '2']
        }
      },
      {
        path: 'inventories/:bridgeIdentification/view-inventory-bridge',
        component: InventoryBridgeComponent,
        canActivate: [roleGuard],
        data: {
          requiredRole: ['0', '1', '2']
        }
      },
      {
        path: '', redirectTo: 'inventories', pathMatch: 'full'
      }
    ],
    canActivate: [roleGuard],
    data: {
      requiredRole: ['0', '1', '2']
    }
  },
  {
    path: 'home/account-management',
    component: ManageUsersComponent,
    canActivate: [roleGuard],
    data: {
      requiredRole: '0'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
