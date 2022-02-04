import { Component, OnInit } from '@angular/core';
import { ChequeService } from 'src/app/services/cheque.service';

@Component({
  selector: 'app-aft-cheque-alta',
  templateUrl: './aft-cheque-alta.component.html',
  styleUrls: ['./aft-cheque-alta.component.css']
})
export class AftChequeAltaComponent implements OnInit {

  cuit:string = '';
  numero:string = '';
  importe:number = 0;
  banco:string = '';
  sucursal:string = '';
  fecha:Date;
  msj:string = '';
  alert:string = '';

  constructor(
    private chequeService:ChequeService
  ) { }

  ngOnInit(): void {
  }

  nuevoCheque() {
    let obj = {
      cuit: this.cuit,
      numero: this.numero,
      importe: this.importe,
      banco: this.banco,
      sucursal: this.sucursal,
      fecha: this.fecha
    }
    this.chequeService.newCheque(obj).subscribe(value => {
      this.msj = 'Cheque cargado con éxito';
      this.cuit = '';
      this.numero = '';
      this.importe = 0;
      this.banco = '';
      this.sucursal = '';
      this.alert = '';
      return;
    });
    this.alert = 'Error al dar de alta el cheque.';
  }

}
