import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';
import { AftComponent } from './components/aft/aft.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AftAltaFormComponent } from './components/aft-alta-form/aft-alta-form.component';
import { AftDiaFormComponent } from './components/aft-dia-form/aft-dia-form.component';
import { UsuarioEditarComponent } from './components/usuario-editar/usuario-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { InterceptTokenService } from './services/intercept-token.service';
import { AftChequeComponent } from './components/aft-cheque/aft-cheque.component';
import { AftChequeAltaComponent } from './components/aft-cheque-alta/aft-cheque-alta.component';
import { AftListaComponent } from './components/aft-lista/aft-lista.component';
import { AftVerComponent } from './components/aft-ver/aft-ver.component';
import { AftListaConceptosComponent } from './components/aft-lista-conceptos/aft-lista-conceptos.component';
import { ConceptoCierreComponent } from './components/concepto-cierre/concepto-cierre.component';
import { ConceptoNuevoComponent } from './components/concepto-nuevo/concepto-nuevo.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MensajeComponent } from './components/mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    CardComponent,
    AftComponent,
    InicioComponent,
    ClienteComponent,
    UsuarioComponent,
    AftAltaFormComponent,
    AftDiaFormComponent,
    UsuarioEditarComponent,
    AftChequeComponent,
    AftChequeAltaComponent,
    AftListaComponent,
    AftVerComponent,
    AftListaConceptosComponent,
    ConceptoCierreComponent,
    ConceptoNuevoComponent,
    MensajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptTokenService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
