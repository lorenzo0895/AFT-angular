import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft',
  templateUrl: './aft.component.html',
  styleUrls: ['./aft.component.css']
})
export class AftComponent implements OnInit {

  user:any;
  showIndex:boolean = true;
  showDia:boolean = false;
  showRecibo:boolean = false;
  showListaRecibos: boolean = false;
  showConceptos:boolean = false;
  subscription?:Subscription;

  msj:string = '';

  constructor(
    private router:Router,
    private uiService:UiService,
    private authService:AuthService
    ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.uiService.observableShowIndex.subscribe(value => this.showIndex = value);
    this.uiService.observableShowDia.subscribe(value => this.showDia = value);
    this.uiService.observableShowRecibo.subscribe(value => this.showRecibo = value);
    this.uiService.observableShowListaRecibos.subscribe(value => this.showListaRecibos = value);
    this.uiService.observableShowConceptos.subscribe(value => this.showConceptos = value);
  }

  hasRoute(route:string) {
    return this.router.url === route;
  }

  toggleSwitchDay() {
    this.uiService.switchDay();
    this.msj = ''
  }

  toggleSwitchRecibo() {
    this.uiService.switchRecibo();
    this.msj = ''
  }

  toggleShowListaCajas() {
    this.msj = '';
    this.uiService.switchListaRecibos();
  }

  captarMsj(msj:string) {
    this.msj = msj;
  }

  switchListaConceptos() {
    this.uiService.switchListaConceptos();
  }

}
