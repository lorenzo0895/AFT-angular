import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title:string = '';
  @Input() text:string = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redirectTo(route:string) {
    this.router.navigate([route]);
  }

}
