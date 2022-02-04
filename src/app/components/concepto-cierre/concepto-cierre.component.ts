import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConceptoService } from 'src/app/services/concepto.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-concepto-cierre',
  templateUrl: './concepto-cierre.component.html',
  styleUrls: ['./concepto-cierre.component.css']
})
export class ConceptoCierreComponent implements OnInit {

  showCierre: boolean = false;
  formBuilder:FormBuilder = new FormBuilder();
  form:FormGroup = this.formBuilder.group({
    fecha: [(new Date()).toISOString().substring(0, 10),[]],
    concepto: [null,[]]
  });

  constructor(
    private uiService:UiService,
    private conceptoService:ConceptoService) { }

  ngOnInit(): void {
    this.uiService.observableShowCierre.subscribe(value => this.showCierre = value);
    this.conceptoService.getComceptos().subscribe(value => {
      this.form.get('concepto')?.setValue(value);
    });
    
  }

  actualizarMediosPago() {

  }

  switchVentanaCierre() {
    this.uiService.switchCierreConcepto();
  }

  cerrar() {

  }
}
