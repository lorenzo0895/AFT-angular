import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  uri:string = '/api/cliente/';

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.uri);;
  }

  getClientesActivos():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.uri+'activo');;
  }

}
