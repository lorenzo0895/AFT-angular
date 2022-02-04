import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http:HttpClient) { }

  uri:string = '/api/usuario/';

  getUsers():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.uri);
  }

  editarUsuario(obj:any) {
    return this.http.patch(this.uri+obj.id_usuario, obj);
  }
}
