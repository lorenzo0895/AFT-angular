import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  @Input() text:string;
  @Input() type: 'warning' | 'success';

  constructor() { }

  ngOnInit(): void {
  }

}
