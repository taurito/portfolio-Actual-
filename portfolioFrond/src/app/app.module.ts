import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './principal/paginas/pagina-principal/pagina-principal.component';
import { InicioComponent } from './principal/paginas/inicio/inicio.component';
import { SobreMiComponent } from './principal/paginas/sobre-mi/sobre-mi.component';
import { PortafolioComponent } from './principal/paginas/portafolio/portafolio.component';
import { PaginaAdminPrincipalComponent } from './administrador/pagina-admin-principal/pagina-admin-principal.component';
import { GeneralComponent } from './administrador/general/general.component';
import { UsuarioComponent } from './administrador/usuario/usuario.component';
import { HeaderComponent } from './principal/componentes/header/header.component';
import { FooterComponent } from './principal/componentes/footer/footer.component';
import { LoginComponent } from './principal/componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'jquery';
import { FormularioTrabajosComponent } from './administrador/formulario-trabajos/formulario-trabajos.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    InicioComponent,
    SobreMiComponent,
    PortafolioComponent,
    PaginaAdminPrincipalComponent,
    GeneralComponent,
    UsuarioComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FormularioTrabajosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
