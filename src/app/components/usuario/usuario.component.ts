import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  msj:string = '';
  showIndexUsuario:boolean = true;
  usuarios:Usuario[];
  userToEdit:Usuario;

  constructor(private service:UsuarioService, private uiService:UiService) {
    this.uiService.observableShowIndexUsuario.subscribe(value => this.showIndexUsuario = value);
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(res => this.usuarios = res);
  }

  toggleEditarUsuario(i:number) {
    this.uiService.switchEditarUsuario();
    this.userToEdit = this.usuarios[i];
    this.msj = '';
  }

  recibirMsj(event:string) {
    this.msj = event;
  }
}
