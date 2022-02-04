import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  uriLista:string = '/api/concepto-lista/';
  uri:string = '/api/concepto/';

  constructor(private http:HttpClient) { }

  getComceptos() {
    return this.http.get<any[]>(this.uri);
  }

  findBetweetDates(obj:any) {
    const { desde, hasta } = obj;
    return this.http.get<any[]>(this.uriLista+'filtro/fecha?desde='+ desde + '&hasta='+ hasta);
  }

  cerrarConcepto(id:string) {
    return this.http.patch(this.uriLista+id, {});
  }

}
