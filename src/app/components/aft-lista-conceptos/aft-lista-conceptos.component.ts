import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConceptoService } from 'src/app/services/concepto.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-lista-conceptos',
  templateUrl: './aft-lista-conceptos.component.html',
  styleUrls: ['./aft-lista-conceptos.component.css']
})
export class AftListaConceptosComponent implements OnInit {

  showConceptos: boolean = false;
  showCierre: boolean = false;
  clientes: Cliente[] = [];
  id_cliente: string = '';
  conceptosOriginal: any[] = [];
  conceptos: any[] = [];
  formGroupFechas: FormGroup;
  user: Usuario;

  constructor(
    private uiService: UiService,
    private clienteService: ClienteService,
    private conceptoService: ConceptoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.uiService.observableShowCierre.subscribe(value => this.showCierre = value);
    this.uiService.observableShowConceptos.subscribe(value => this.showConceptos = value);
    this.clienteService.getClientes().subscribe(value => {
      this.clientes = value;
      this.clientes.unshift({
        id_cliente: "1",
        activo: true,
        apellido: '',
        nombre: 'Filtra por cliente',
        clave_fiscal: '',
        cuit: 1,
        mail: '',
        observaciones: '',
        posicion: '',
        telefono: ''
      })
      this.id_cliente = this.clientes[0].id_cliente;
    });
    this.formGroupFechas = new FormGroup({
      'desde': new FormControl((new Date()).toISOString().substring(0, 10)),
      'hasta': new FormControl((new Date()).toISOString().substring(0, 10))
    });
  }

  switchListaConceptos() {
    this.uiService.switchListaConceptos();
  }

  buscarPorFecha() {
    this.conceptoService.findBetweetDates(this.formGroupFechas.value).subscribe(value => {
      this.conceptos = value;
      this.conceptosOriginal = value;
    });
  }

  filtrarCliente() {

  }

  cerrarConcepto(id_concepto: string, e: Event) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.uiService.switchCierreConcepto();
    } else {
      this.conceptoService.cerrarConcepto(id_concepto).subscribe((value: any) => {
        this.conceptos = this.conceptos.map((el: any) => {
          if (el.id_concepto_lista === value.id_concepto_lista) {
            return { ...el, pagado: !el.pagado, fecha_pago: null };
          } else {
            return el;
          }
        });
        this.conceptosOriginal = this.conceptosOriginal.map((el: any) => {
          if (el.id_concepto_lista === value.id_concepto_lista) {
            return { ...el, pagado: !el.pagado };
          } else {
            return el;
          }
        })
      });
    }
  }
}
