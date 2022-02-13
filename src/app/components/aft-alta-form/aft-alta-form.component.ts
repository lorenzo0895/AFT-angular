import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { CajaService } from 'src/app/services/caja.service';
import { ChequeService } from 'src/app/services/cheque.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DiaService } from 'src/app/services/dia.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-alta-form',
  templateUrl: './aft-alta-form.component.html',
  styleUrls: ['./aft-alta-form.component.css']
})
export class AftAltaFormComponent implements OnInit {

  @Output() msj = new EventEmitter<string>();
  alert:string = '';

  chequesLista:any[];
  showIndex:boolean = true;
  showDia:boolean = false;
  showRecibo:boolean = false;
  showCheque:boolean = false;
  subscription?:Subscription;
  clientes:Cliente[];
  detalle:string = '';
  cliente:any;
  dias:any;
  dia:any;
  efectivo:number = 0;
  transferencia:number = 0;
  cheques:any[] = [];
  total:number = 0;

  constructor(
    private chequeService:ChequeService,
    private uiService:UiService,
    private clienteService:ClienteService,
    private diaService:DiaService,
    private cajaService:CajaService) { }

  ngOnInit(): void {
    this.uiService.observableShowIndex.subscribe(value => this.showIndex = value);
    this.uiService.observableShowDia.subscribe(value => this.showDia = value);
    this.uiService.observableShowRecibo.subscribe(value => this.showRecibo = value);
    this.uiService.observableShowCheque.subscribe(value => this.showCheque = value);
    this.clienteService.getClientesActivos().subscribe(value => {
      this.clientes = value;
      this.cliente = this.clientes[0].id_cliente;
    });
    this.diaService.buscarActivos().subscribe(value => {
      this.dias = value;
      this.dia = this.dias[0].fecha;
    });
    this.chequeService.getChequesSinCaja().subscribe(value => {
      this.chequesLista = value;
    });
  }

  toggleSwitchRecibo() {
    this.uiService.switchRecibo();
  }

  calcularTotal() {
    let totalCheques = this.cheques.reduce((acc, item) => {
      return acc + item.importe;
    } , 0);
    this.total = this.transferencia + this.efectivo + totalCheques;
  }

  switchChequeMenu():void {
    this.uiService.switchChequeMenu();
  }

  agregarCheque(cheque:any) {
    this.cheques.push(cheque);
    this.chequesLista = this.chequesLista.filter(el => el != cheque);
    this.calcularTotal();
  }

  nuevaCaja():void {
    let obj = {
      cliente: this.cliente,
      fecha: this.dia,
      detalle: this.detalle,
      efectivo: this.efectivo,
      transferencia: this.transferencia,
      cheques: this.cheques
    };
    this.cajaService.newCaja(obj).subscribe({
      next: value => {
        this.msj.emit('Comprobante de Caja cargado correctamente');
        this.toggleSwitchRecibo();
      },
      error: error => {
        this.alert = error.error.message;
      }
    });
  }

  actualizarCheques() {
    this.chequeService.getChequesSinCaja().subscribe(value => {
      let array:any[] = [];
      value.forEach(el => {
        if(!this.cheques.find(item => item.id_cheque == el.id_cheque)){
          array.push(el);
        }
      });
      this.chequesLista = array;
    });
  }

  sacarCheque(cheque:any) {
    this.cheques = this.cheques.filter(el => {
      return el != cheque;
    });
    this.chequesLista.push(cheque);
    this.calcularTotal();
  }

}
