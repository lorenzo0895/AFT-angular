import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caja } from '../models/Caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  uri:string = '/api/caja/';

  constructor(private http:HttpClient) { }

  getCajas() {
    return this.http.get<any[]>(this.uri);
  }

  getCaja(id:string):Observable<Caja> {
    return this.http.get<Caja>(this.uri+id);
  }

  getCajaBetweenDates(obj:any) {
    let { desde, hasta } = obj;
    return this.http.get<Caja[]>(this.uri+'filtro/fecha?desde='+desde+'&hasta='+hasta);
  }

  newCaja(body:any) {
    return this.http.post(this.uri, body);
  }

}
