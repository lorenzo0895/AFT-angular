import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri:string = '/api'

  constructor(
    private http:HttpClient,
    private jwtHelper:JwtHelperService) { }

  login(user:any) {
    return this.http.post(this.uri+'/login', user);
  }

  logout() {
    console.log('llegué a logout');
    localStorage.removeItem('token');
  }

  getUser() {
    let token = localStorage.getItem('token');
    token = token ? token : '';
    return this.jwtHelper.decodeToken(token).data;
  }

  isAuth():boolean {
    let token = localStorage.getItem('token');
    token = token ? token : '';
    const decoded:any = this.jwtHelper.decodeToken(token).data;
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token') || !decoded.activo) {
      return false;
    } else {
      return true;
    }
  }

  isUserModifier():boolean {
    let token = localStorage.getItem('token');
    token = token ? token : '';
    const decoded:any = this.jwtHelper.decodeToken(token).data;
    return decoded.permiso_modificar_usuarios ? true : false;
  }
}
