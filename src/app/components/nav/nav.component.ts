import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:any;

  constructor (private service:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = this.service.getUser();
  }

  hasRoute(route:string):boolean {
    return this.router.url === route;
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

}
