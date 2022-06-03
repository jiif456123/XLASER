import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../models/usuario.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})



export class UserAllService {

  selectedTokenUser: UsuarioLogin={
    nombre: '',
    rol: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    celular: null,
    email: '',
    fechaNaciemineto: null,
    direccion: '',
    especialidad: '',
    contra: '',
    fechaActual: null,
    user: ''
  };
  
    
  urlEndPoint: string = environment.endpoint.concat('/auth/signIn');

  //localhost:3000/citas/cita

  
  constructor(private http: HttpClient, private router:Router) {}

  signIn3(user: string, password: string) {
    return this.http.post<any>("http://localhost:3000/auth/signIn",{
      "user": user,
      "password": password
   });
    
  }

  getMensaje(){
    return this.http.get<any>(this.urlEndPoint);
  }

  getUserById(id:string){
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }
  


  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/presentarhome']);
  }


  



  

  
}