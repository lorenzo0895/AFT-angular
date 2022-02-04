import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.service.isAuth()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.service.login(this.user).subscribe((res:any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
    });
  }

}
