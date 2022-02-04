import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showIndex:boolean = true;
  private showDia:boolean = false;
  private showRecibo:boolean = false;
  private subjectShowIndex = new Subject<boolean>();
  private subjectShowDia = new Subject<boolean>();
  private subjectShowRecibo = new Subject<boolean>();

  private showIndexUsuario:boolean = true;
  private subjectShowIndexUsuario = new Subject<boolean>();

  private showCheque:boolean = false;
  private subjectShowCheque = new Subject<boolean>();

  private showListaRecibos: boolean = false;
  private subjectShowListaRecibos = new Subject<boolean>();

  private showConceptos:boolean = false;
  private showCierre:boolean = false;
  private subjectShowConceptos = new Subject<boolean>();
  private subjectShowCierre = new Subject<boolean>();

  observableShowIndex = this.subjectShowIndex.asObservable();
  observableShowDia = this.subjectShowDia.asObservable();
  observableShowIndexUsuario = this.subjectShowIndexUsuario.asObservable();
  observableShowRecibo = this.subjectShowRecibo.asObservable();
  observableShowCheque = this.subjectShowCheque.asObservable();
  observableShowListaRecibos = this.subjectShowListaRecibos.asObservable();
  observableShowConceptos = this.subjectShowConceptos.asObservable();
  observableShowCierre = this.subjectShowCierre.asObservable();

  constructor() { }

  switchDay():void {
    this.showIndex = !this.showIndex;
    this.showDia = !this.showDia;
    this.subjectShowIndex.next(this.showIndex);
    this.subjectShowDia.next(this.showDia);
  }

  switchRecibo() {
    this.showIndex = !this.showIndex;
    this.showRecibo = !this.showRecibo;
    this.subjectShowIndex.next(this.showIndex);
    this.subjectShowRecibo.next(this.showRecibo);
  }

  switchEditarUsuario():void {
    this.showIndexUsuario = !this.showIndexUsuario;
    this.subjectShowIndexUsuario.next(this.showIndexUsuario);
  }

  switchChequeMenu():void {
    this.showCheque = !this.showCheque;
    this.subjectShowCheque.next(this.showCheque);
  }

  switchListaRecibos() {
    this.showIndex = !this.showIndex;
    this.showListaRecibos = !this.showListaRecibos;
    this.subjectShowListaRecibos.next(this.showListaRecibos);
    this.subjectShowIndex.next(this.showIndex);
  }

  switchListaConceptos() {
    this.showConceptos = !this.showConceptos;
    this.showIndex = !this.showIndex;
    this.subjectShowConceptos.next(this.showConceptos);
    this.subjectShowIndex.next(this.showIndex);
  }

  switchCierreConcepto() {
    this.showCierre = ! this.showCierre;
    this.subjectShowCierre.next(this.showCierre);
  }

}
