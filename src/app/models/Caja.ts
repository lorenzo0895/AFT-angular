import { Cliente } from "./Cliente";

export interface Caja {
  id_caja:number;
  activo:boolean;
  detalle:string;
  efectivo:number;
  transferencia:number;
  cliente_id_cliente:string;
  fecha_fecha:Date;
  cliente:Cliente;
  Cheques:any[];
  concepto_lista:any[];
}