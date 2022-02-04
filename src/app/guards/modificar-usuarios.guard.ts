import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarUsuariosGuard implements CanActivate {

  constructor(
    private service:AuthService,
    private router:Router) { }

  canActivate() {
    if (this.service.isAuth() && this.service.isUserModifier()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
