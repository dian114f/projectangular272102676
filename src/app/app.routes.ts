import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { Cuaca } from './cuaca/cuaca';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';
import { Mahasiswa } from './mahasiswa/mahasiswa';
import { otentikasiGuard } from './otentikasi-guard';
import { Forex} from './forex/forex';



export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "admin", component: Admin },
    { path : "cuaca", component: Cuaca, canActivate : [otentikasiGuard]},
    { path: "dashboard", component: Dashboard, canActivate: [otentikasiGuard]},
    { path: "dashboard2", component: Dashboard2, canActivate:[otentikasiGuard] },
    { path: "forex", component: Forex, canActivate: [otentikasiGuard]},
    { path: "dashboard3", component: Dashboard3,canActivate:[otentikasiGuard] },
    { path: "login", component: Login },
    { path: "mahasiswa", component: Mahasiswa }
];
  
    