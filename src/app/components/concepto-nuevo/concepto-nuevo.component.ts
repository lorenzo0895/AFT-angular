import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptoService } from 'src/app/services/concepto.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-concepto-nuevo',
  templateUrl: './concepto-nuevo.component.html',
  styleUrls: ['./concepto-nuevo.component.css']
})
export class ConceptoNuevoComponent implements OnInit {

  showConceptos:boolean = false;
  conceptos:any[] = [];
  formBuilder:FormBuilder = new FormBuilder();
  form:FormGroup = this.formBuilder.group({
    concepto: [null,[Validators.required]],
    importe: [0,[Validators.required, Validators.min(0.01)]]
  });
  @Output() conceptoNuevo = new EventEmitter();
  alert:string = '';

  constructor(
    private conceptoService:ConceptoService,
    private uiService:UiService
    ) { }

  ngOnInit(): void {
    this.conceptoService.getComceptos().subscribe(value => {
      this.conceptos = value;
    });
    this.uiService.observableShowConceptos.subscribe(value => this.showConceptos = value)
  }

  get concepto () {
    return this.form.get('concepto');
  }

  get importe () {
    return this.form.get('importe');
  }

  switchShowConcepto() {
    this.uiService.switchListaConceptos();
  }

  agregarConcepto(e:Event) {
    e.preventDefault();
    if (this.form.valid) {
      this.conceptoNuevo.emit(this.form.value);
    } else {
      this.importe?.markAsTouched();
      this.concepto?.markAsTouched();
    }
  }

  mover() {

  }

}
