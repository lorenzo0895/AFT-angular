import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caja } from 'src/app/models/Caja';
import { CajaService } from 'src/app/services/caja.service';
import { ConceptoService } from 'src/app/services/concepto.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-ver',
  templateUrl: './aft-ver.component.html',
  styleUrls: ['./aft-ver.component.css']
})
export class AftVerComponent implements OnInit {

  total: number = 0;
  detalle: string = '';
  totalConceptos: number = 0;
  caja: Caja;
  showConcepto: boolean = false;
  msj: string = '';
  alert: string = '';

  constructor(
    private cajaService: CajaService,
    private activatedRoute: ActivatedRoute,
    private uiService: UiService,
    private conceptoService: ConceptoService
  ) { }

  ngOnInit(): void {
    let id: string = '';
    this.activatedRoute.params.subscribe(value => {
      id = <string>value['id'];
    });
    this.cajaService.getCaja(id).subscribe(value => {
      this.caja = value;
      this.detalle = value.detalle;
      let sumaCheques = value.Cheques.reduce((acc, item) => {
        return acc + item.importe;
      }, 0);
      this.total = value.efectivo + value.transferencia + sumaCheques;
      this.totalConceptos = value.concepto_lista.reduce((acc, item) => {
        return acc + item.importe;
      }, 0);
    });
    this.uiService.observableShowConceptos.subscribe(value => this.showConcepto = value);
  }

  print() {
    window.print();
  }

  editarDetalle() {
    this.cajaService.editarDetalle(this.caja.id_caja, this.detalle).subscribe({
      next: value => {
        this.msj = 'Detalle actualizado con exito';
      },
      error: error => {
        this.alert = error.error.message;
      }
    });
  }

  switchShowConcepto() {
    this.uiService.switchListaConceptos();
  }

  agregarConcepto(e: any) {
    e.caja = this.caja.id_caja;
    this.conceptoService.agregarConcepto(e).subscribe({
      next: (value: any) => {
        this.caja.concepto_lista.push(value);
        this.totalConceptos += value.importe;
        this.switchShowConcepto();
        this.msj = 'Concepto agregado correctamente';
        this.alert = '';
      },
      error: error => {
        this.msj = '';
        this.alert = 'Error al agregar el concepto';
      }
    });
  }

  cerrarCaja(id: number) {
    this.cajaService.cerrarCaja(id).subscribe({
      next: (value) => {
        this.msj = 'Comprobante cerrado con éxito';
        this.alert = '';
        this.caja.activo = false
      },
      error: (error) => {
        this.msj = '';
        this.alert = error.error.message;
      }
    });
  }

}
