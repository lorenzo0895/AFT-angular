export interface Usuario {
  id_usuario:string;
	username:string;
	nombre:string;
	password:string;
	fecha_alta:Date;
	permiso_abrir_dias:boolean;
	permiso_cerrar_dias:boolean;
	permiso_ingresar:boolean;
	permiso_modificar:boolean;
	permiso_cerrar_modificaciones:boolean;
	permiso_modificar_usuarios:boolean;
	activo:boolean;
}