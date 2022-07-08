import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../citas/models/user.model';
import { UserService } from '../citas/services/usuario.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.scss'],
})
export class RegistrarClienteComponent implements OnInit {
  roles = [
    {
        rol:'ADMINISTRADOR',
    },
    {
        rol:'VENDEDOR',
    },{
        rol:'JEFEINVENTARIO',
    },{
        rol:'TECNICO',
    },{
        rol:'CLIENTE',
    }
  ]
id: string;
editar: boolean;

user: User;
registrarUser: User;

formUser: FormGroup;
users: User[];
objUser: User = null;

nombreAux: boolean;
rolAux: boolean;
apellidoPaternoAux: boolean;
apellidoMaternoAux: boolean;
dniAux: boolean;
celularAux: boolean;
emailAux: boolean;
fechaNacimientoAux: boolean;
direccionAux: boolean;
passwordAux: boolean;
fechaActualAux: boolean;
userAux: boolean;

constructor(
  private userService: UserService,
  private router: Router,
  private activateRouter: ActivatedRoute,
){}

ngOnInit(){
      this.users =[];
      this.userService.listar().subscribe(data => {
          this.users = data.data;
      })
this.formUser = new FormGroup({
    '_id':new FormControl(''),
    'nombre':new FormControl('', Validators.required),
    'rol': new FormControl('USUARIO',Validators.required),
    'apellidoPaterno':new FormControl('',Validators.required),
    'apellidoMaterno':new FormControl('',Validators.required),
    'dni':new FormControl('',Validators.required),
    'celular':new FormControl('',Validators.required),
    'email':new FormControl('', Validators.required),
    'fechaNacimiento': new FormControl('',Validators.required),
    'direccion':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
    'fechaActual':new FormControl('2022-06-06',Validators.required),
    'user':new FormControl('',Validators.required),
});

this.activateRouter.params.subscribe((params:Params ) => {
    this.id=params['id'];
    this.editar=params['id'] != null;
    this.cargarForm();
})
}

public invalid(field:any){
  return this.formUser.get(field).invalid && this.formUser.get(field).touched;
};

operar(){
console.log(this.formUser.valid)
console.log(this.formUser.invalid)
console.log(this.formUser.value)
  if(this.editar){
      this.formUser.value;
      this.userService.actualizarUser(this.formUser.value).pipe(switchMap(()=> {
          return this.userService.listar();
      })).subscribe(data => {
          this.userService.UserCambio.next(data);
          this.userService.mensajeCambio.next('Se registró correctamente');
      });
  } else {
      this.userService.registrarUser(this.formUser.value).pipe(switchMap(() => {
            return this.userService.listar();
      })).subscribe(data => {
          this.userService.UserCambio.next(data);
          this.userService.mensajeCambio.next('Nuevo registro exitoso');
          Swal.fire('Correcto', 'Se registro correctamente', 'success')
      })
  }
  this.router.navigate(['/presentarhome']);
}

cargarForm(){
if(this.editar){
    this.userService.listarUserId(this.id).subscribe(data => {
        this.user = data.data;
        this.formUser = new FormGroup({
            '_id':new FormControl(this.user._id, Validators.required),
            'nombre':new FormControl(this.user.nombre, Validators.required),
            'rol': new FormControl(this.user.rol,Validators.required),
            'apellidoPaterno':new FormControl(this.user.apellidoPaterno,Validators.required),
            'apellidoMaterno':new FormControl(this.user.apellidoMaterno,Validators.required),
            'dni':new FormControl(this.user.dni,Validators.required),
            'celular':new FormControl(this.user.celular,Validators.required),
            'email':new FormControl(this.user.email, Validators.required),
            'fechaNacimiento': new FormControl(this.user.fechaNacimiento,Validators.required),
            'direccion':new FormControl(this.user.direccion,Validators.required),
            'password':new FormControl(this.user.password,Validators.required),
            'fechaActual':new FormControl(this.user.fechaActual,Validators.required),
            'user':new FormControl(this.user.user,Validators.required),
        });
    });
}
}
}