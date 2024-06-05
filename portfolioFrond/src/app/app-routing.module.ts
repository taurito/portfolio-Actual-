import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './principal/paginas/pagina-principal/pagina-principal.component';
import { InicioComponent } from './principal/paginas/inicio/inicio.component';
import { SobreMiComponent } from './principal/paginas/sobre-mi/sobre-mi.component';
import { PortafolioComponent } from './principal/paginas/portafolio/portafolio.component';
import { PaginaAdminPrincipalComponent } from './administrador/pagina-admin-principal/pagina-admin-principal.component';
import { GeneralComponent } from './administrador/general/general.component';
import { UsuarioComponent } from './administrador/usuario/usuario.component';

const routes: Routes = [
  {path:'', redirectTo: 'principal/inicio', pathMatch: 'full'},
  {path:'principal', component:PaginaPrincipalComponent, children:[
    {path:'inicio', component:InicioComponent},
    {path:'sobreMi', component:SobreMiComponent},
    {path:'portafolio', component:PortafolioComponent},
  ]},

  {path:'admin', component:PaginaAdminPrincipalComponent, children:[
    {path:'trabajos', component:PortafolioComponent},
    {path:'general', component:GeneralComponent},
    {path:'usuarios', component:UsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
