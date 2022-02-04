import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-cheque',
  templateUrl: './aft-cheque.component.html',
  styleUrls: ['./aft-cheque.component.css']
})
export class AftChequeComponent implements OnInit {

  @Input() cheques:any[] = [];
  showCheque:boolean = false;
  @Output() chequeEvent = new EventEmitter();
  @Output() actualizarChequesEvent = new EventEmitter();

  constructor(
    private uiService:UiService) { }

  ngOnInit(): void {
    this.uiService.observableShowCheque.subscribe(value => this.showCheque = value);
  }

  switchChequeMenu():void {
    this.uiService.switchChequeMenu();
  }

  agregarCheque(cheque:any) {
    this.chequeEvent.emit(cheque);
    this.switchChequeMenu();
  }

  actualizarCheques() {
    this.actualizarChequesEvent.emit();
  }

}
