import { Routes,RouterModule } from '@angular/router';
import { MainComponent } from './paginaprincipal/main/main.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:MainComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
