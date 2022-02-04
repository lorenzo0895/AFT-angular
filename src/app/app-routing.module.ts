import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AftChequeAltaComponent } from './components/aft-cheque-alta/aft-cheque-alta.component';
import { AftVerComponent } from './components/aft-ver/aft-ver.component';
import { AftComponent } from './components/aft/aft.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ActivoGuard } from './guards/auth.guard';
import { ModificarUsuariosGuard } from './guards/modificar-usuarios.guard';

const routes: Routes = [
  {path:'aft/:id', component:AftVerComponent, pathMatch: 'full', canActivate:[ActivoGuard]},
  {path:'aft', component:AftComponent, pathMatch: 'full', canActivate:[ActivoGuard]},
  {path:'cheque', component:AftChequeAltaComponent, pathMatch: 'full', canActivate:[ActivoGuard]},
  {path:'cliente', component:ClienteComponent, pathMatch: 'full', canActivate:[ActivoGuard]},
  {path:'usuario', component:UsuarioComponent, pathMatch: 'full', canActivate:[ModificarUsuariosGuard]},
  {path:'', component:InicioComponent, pathMatch: 'full', canActivate:[ActivoGuard]},
  {path:'login', component:LoginComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
