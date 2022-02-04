import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caja } from 'src/app/models/Caja';
import { CajaService } from 'src/app/services/caja.service';

@Component({
  selector: 'app-aft-ver',
  templateUrl: './aft-ver.component.html',
  styleUrls: ['./aft-ver.component.css']
})
export class AftVerComponent implements OnInit {

  total:number = 0;
  detalle:string = '';
  totalConceptos:number = 0;
  caja:Caja;

  constructor(
    private cajaService:CajaService, 
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    let id:string = '';
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
        this.totalConceptos = value.concepto_lista.reduce((acc, item)=> {
          return acc + item.importe;
        }, 0);
      });
  }

  print(){
    window.print();
  }

  editarDetalle() {

  }

  sumarConcepto() {
    
  }

}
