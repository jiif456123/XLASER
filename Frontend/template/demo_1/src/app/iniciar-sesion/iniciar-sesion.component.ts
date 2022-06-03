import { Component, OnInit } from '@angular/core';
import { UserAllService } from '../citas/services/usersAll.service';
import { PacienteService } from '../citas/services/paciente.service';
import { NgForm, FormGroup,FormControl, Validators } from '@angular/forms'; //para add
import { Router } from '@angular/router';
@Component({
  selector: 'app-login321321',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class LoginMComponent implements OnInit {

 
  /*
  user = {
    

  }*/

  constructor(public  userAllService: UserAllService, public pacienteService: PacienteService, private router:Router) { 


  }

  ngOnInit() {
   
  }


  public emailForm;
  public contraForm;
  public errorLogin;
  public rolUsuario;
  signIn(form: NgForm){
    //console.log(this.user);
    /*
  console.log(form.value.email + form.value.contra);
  console.log(form.value.contra);
  console.log(this.emailForm);
  console.log(this.contraForm);*/

  //"maximo@gmail.com","asdasdsa"

  
    this.userAllService.signIn3(form.value.user,form.value.password).subscribe(

      res =>{

       // console.log(res);
       // console.log("FUNCA RES SIGN");
        localStorage.setItem('idLoginUser', res.id);
        


       // this.userAllService.selectedTokenUser.nombre="hola";
        localStorage.setItem('token',res.token);
        
        console.log(this.rolUsuario);
        this.getDataOfUser(res.id);

        /* //TODO: DEMORA EN RUTA...
        if(this.rolUsuario=="medico"||this.rolUsuario=="Medico"||this.rolUsuario=="doctor"||this.rolUsuario=="Doctor"||
        this.rolUsuario=="paciente"||this.rolUsuario=="Paciente"){
          this.router.navigate(['/cita-virtual']);
        }*/
/*
        if(this.rolUsuario=="Enfermera"||this.rolUsuario=="enfermera"||this.rolUsuario=="Enfermero"||this.rolUsuario=="Enfermero"){
          this.router.navigate(['/gestionar-citas']);
        }*/
        //this.router.navigate(['/dashboard']);

       // console.log(this.userAllService.getToken());
      },
      err=> {  
        this.errorLogin=err.error.message;
        console.log(err.error.message);
        console.log(err)
      }

    )
    /*
    this.userAllService.signIn3(this.user).subscribe(

      res =>{
        console.log(res)
      },
      err=> console.log(err)
    )*/

  }

  getDataOfUser(idUser:string){
    this.userAllService.getUserById(idUser).subscribe(
      res =>{
        console.log(res);
        
      this.rolUsuario= res.rol;

      if(this.rolUsuario=="paciente"||this.rolUsuario=="Paciente"||this.rolUsuario=="medico"||this.rolUsuario=="Medico"||this.rolUsuario=="ADMINISTRADOR"||this.rolUsuario=="administrador"){
        this.router.navigate(['/welcome-page']);
      if(this.rolUsuario=="ADMINISTRADOR"||this.rolUsuario=="administrador")
        this.router.navigate(['/welcome-page']);
      }
      else{
        this.router.navigate(['/welcome-page']);
      }
      console.log(this.rolUsuario);
/*

        console.log("GAAAAAAA");
        console.log(res.nombre);
       this.userAllService.selectedTokenUser.nombre=res.nombre;
       this.userAllService.selectedTokenUser.rol=res.rol;
       console.log(this.userAllService.selectedTokenUser.nombre);*/
        /*this.nameSideBar=res.nombre;
        this.rolSideBar=res.rol;*/
        
      },
      err => console.error(err)
    )
  }


  

}
