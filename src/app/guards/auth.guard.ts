import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivoGuard implements CanActivate {

  constructor(
    private service:AuthService,
    private router:Router
    ) { }

  canActivate():boolean {
    if(!this.service.isAuth()) {
      console.log('El token no existe o expiró');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
