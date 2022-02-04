import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {

  showIndexUsuario: boolean = true;
  @Input() user:Usuario;
  @Output() msj = new EventEmitter<string>();

  constructor(private uiService:UiService,
    private usuarioService:UsuarioService) {
    this.uiService.observableShowIndexUsuario.subscribe(value => this.showIndexUsuario = value);
  }

  ngOnInit(): void {
  }

  toggleEditarUsuario() {
    this.uiService.switchEditarUsuario();
  }

  editarUsuario(event:Event) {
    event.preventDefault();
    this.usuarioService.editarUsuario(this.user).subscribe(value => {
      this.msj.emit('Usuario modificado correctamente');
      this.uiService.switchEditarUsuario();
    });

  }
}
