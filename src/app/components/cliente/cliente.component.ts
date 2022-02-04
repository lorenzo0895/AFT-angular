import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes:Cliente[];
  clientesAMostrar:Cliente[];
  filtro:string = '';

  constructor(private service:ClienteService) { }

  ngOnInit(): void {
    this.service.getClientes().subscribe(res => {
      this.clientes = res;
      this.clientesAMostrar = res;
    });
  }

  filtrar() {
    let regExpr = new RegExp(this.filtro.toLowerCase().replace(/\s/g, ''));
    this.clientesAMostrar = this.clientes.filter(el => {
      return (
        regExpr.test(el.apellido.toLowerCase().replace(/\s/g, '')) || 
        regExpr.test(el.nombre.toLowerCase().replace(/\s/g, '')) ||
        regExpr.test((el.nombre.toLowerCase() + el.apellido.toLowerCase()).replace(/\s/g, '')) ||
        regExpr.test((el.apellido.toLowerCase() + el.nombre.toLowerCase()).replace(/\s/g, ''))
      );
    });
  }

}
