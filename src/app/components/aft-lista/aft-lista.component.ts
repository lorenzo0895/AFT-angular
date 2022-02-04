import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { CajaService } from 'src/app/services/caja.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-lista',
  templateUrl: './aft-lista.component.html',
  styleUrls: ['./aft-lista.component.css']
})
export class AftListaComponent implements OnInit {

  showListaRecibos: boolean = false;
  cajas: any[] = [];
  cajasOriginal: any[] = [];
  clientes: Cliente[] = [];
  id_cliente: string = '';
  formGroupFechas: FormGroup;

  constructor(
    private cajaService: CajaService,
    private uiService: UiService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.uiService.observableShowListaRecibos.subscribe(value => this.showListaRecibos = value);
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

  toggleSwitchRecibo(): void {
    this.uiService.switchListaRecibos();
  }

  buscarPorFecha() {
    this.cajaService.getCajaBetweenDates(this.formGroupFechas.value).subscribe(value => {
      this.cajasOriginal = value;
      this.cajasOriginal.forEach(el => {
        let sumaCheque = el.Cheques.reduce((acc: number, item: any) => {
          return acc + item.importe;
        }, 0);
        el.sumaCheques = sumaCheque;
      });
      this.cajas = this.cajasOriginal;
      this.id_cliente = '1';
    });
  }

  filtrarCliente() {
    if (this.id_cliente == '1') {
      this.cajas = this.cajasOriginal;
      return;
    }
    this.cajas = this.cajasOriginal.filter(el => {
      return el.cliente.id_cliente == this.id_cliente;
    });
  }

}
