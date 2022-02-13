import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router:Router,
    private service:AuthService
    ) { }

  ngOnInit(): void {
    if(!this.service.isAuth()) {
      this.router.navigate(['/login']);
    }
  }

  redirectTo(route:string) {
    this.router.navigate([route]);
  }

}
