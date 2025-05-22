import { Routes,RouterModule } from '@angular/router';
import { RedireccionamientosComponent } from './component/redireccionamientos/redireccionamientos.component';
import { MainComponent } from './login/main/main.component';
import { PaginacitasComponent } from './citas/paginacitas/paginacitas.component';


export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:RedireccionamientosComponent},
    {path:'login',component:MainComponent},
    {path:'citas',component:PaginacitasComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
