import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  constructor(private http:HttpClient) { }

  private uri:string = '/api/fecha/';

  newDay(fecha:Date){
    return this.http.post<any>(this.uri, {fecha});
  }

  closeDay(obj:any) {
    return this.http.patch<any>(this.uri, obj);
  }

  buscarActivos():Observable<any> {
    return this.http.get<any>(this.uri+'activo');
  }

  sumarDia(dia:Date) {
    return this.http.get<number>(this.uri + 'suma-dia/' + dia);
  }

}
