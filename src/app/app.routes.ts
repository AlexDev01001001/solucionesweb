import { Routes,RouterModule } from '@angular/router';
import { RedireccionamientosComponent } from './component/redireccionamientos/redireccionamientos.component';
import { MainComponent } from './login/main/main.component';
import { PaginacitasComponent } from './citas/paginacitas/paginacitas.component';
import { LogindoctorComponent } from './vistadoctor/logindoctor/logindoctor.component';
import { RegistroFillComponent } from './registro/registro-fill/registro-fill.component';
import { CitasListComponent } from './citas-list/citas-list.component';
import { PagoComponent } from './pago/pago.component';
import { VistaAdminComponent } from './vista-doctores/sidebarncontainer/sidebarncontainer.component';
import { VistadedoctoresComponent } from './nuevo/vistadedoctores/vistadedoctores.component';
export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:RedireccionamientosComponent},
    {path:'login',component:MainComponent},
    {path:'citas',component:PaginacitasComponent},
    {path:'doctor', component:LogindoctorComponent},
    {path:'registro', component:RegistroFillComponent},
    {path:'list',component:CitasListComponent},
    {path:'pay',component:PagoComponent},
    {path:'doctoresview',component:VistaAdminComponent},
    {path:'vistadedoctor',component:VistadedoctoresComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
