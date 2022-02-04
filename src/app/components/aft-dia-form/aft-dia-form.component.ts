import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DiaService } from 'src/app/services/dia.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-aft-dia-form',
  templateUrl: './aft-dia-form.component.html',
  styleUrls: ['./aft-dia-form.component.css']
})
export class AftDiaFormComponent implements OnInit {

  @Output() msj = new EventEmitter<string>();

  user: any;
  showIndex: boolean = true;
  showDia: boolean = false;
  subscription?: Subscription;
  file: Array<File>;

  newDay: Date;
  activos: any[] = [];
  closeDay: any;
  sobrante: number = 0;
  totalDia:number = 0;

  constructor(
    private uiService: UiService,
    private authService: AuthService,
    private dayService: DiaService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.uiService.observableShowIndex.subscribe(value => this.showIndex = value);
    this.uiService.observableShowDia.subscribe(value => this.showDia = value);
    this.dayService.buscarActivos().subscribe(value => {
      this.activos = value;
      this.activos.forEach((el:any) => {
        this.dayService.sumarDia(el.fecha).subscribe(value => {
          el.sumaImporte = value;
        });
      });
      // this.closeDay = this.activos[0].fecha;
      
    });
  }

  toggleSwitchDay() {
    this.uiService.switchDay();
  }

  createNewDay() {
    this.dayService.newDay(this.newDay).subscribe(value => {
      this.msj.emit('Día cargado correctamente.');
      this.toggleSwitchDay();
    });
  }

  fileChange(element: any) {
    console.log(element);
    this.file = element.target.files;
  }

  uploadAndCloseDay() {
    let formData = new FormData();
    formData.append('fecha', this.closeDay);
    formData.append('sobrante', this.sobrante.toString());
    for (var i = 0; i < this.file.length; i++) {
      formData.append("file", this.file[i], this.file[i].name);
    }
    this.dayService.closeDay(formData).subscribe((res) => {
      this.uiService.switchDay();
    });
  }

  calcularTotalDia() {
    this.totalDia = this.activos.filter(el => {
      return el.fecha == this.closeDay;
    })[0].sumaImporte;
  }

}
