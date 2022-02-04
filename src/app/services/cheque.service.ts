import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  uri:string = '/api/cheque/';

  constructor(private http:HttpClient) { }

  getChequesSinCaja():Observable<any[]> {
    return this.http.get<any[]>(this.uri + 'activo');
  }

  newCheque(body:any) {
    return this.http.post(this.uri, body);
  }

}
