import { Component, OnInit } from '@angular/core';
//import { resolve } from 'path';
import { CitaService } from '../citas/services/cita.service';
import { UserAllService } from '../citas/services/usersAll.service';
import { DatePipe } from '@angular/common';
import { HistoriaService } from '../citas/services/historia.service';
import { CitaVirtualComponent } from 'src/app/domicilio/citaVirtual/citaVirtual.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcom-page.component.html',
  styleUrls: ['./welcom-page.component.css'],
  providers: [DatePipe,CitaVirtualComponent]
})
export class WelcomePage implements OnInit {
  imageSrc="assets/images/impresionuno.jpg";
  imageSrcVirtual="assets/images/cita-medica-virtual.jpg";
  imgWelcomeText="assets/images/Fotocopiadora-09.gif";

  imageCantidadCitasSrc="assets/images/cantidad-citas.jpeg";
  constructor(private citaService: CitaService, private userAllService: UserAllService,private datePipe: DatePipe,
    public historiaService: HistoriaService, public citaVirtualComponent: CitaVirtualComponent) { 


  }
  public citasPendientes;
  public totalCitas;
  public nombreUsuario;
  public rolUsuario;
  public isPaciente;
  public arrayDatos=[];
  public proximaCitaArray=[];
  public proximaCitaFechaMedico;
  public estadoSinCitas;
  public totalCitasAll;
  /*public proximaCitaPaciente;
  public proximaCitaEspecialidad;*/
  public myDate=new Date();
   ngOnInit() {
   
    //setTimeout(() => {
      this.getDataOfUser();

     // this.listarCitas();


   // }, 1000);
    
   
  }

/*
 res.data.forEach( function(valor, indice) {
          var d=res.data[indice].motivo.descripcion;
   
          if(d=="Urgencia medica"){
           // newResultarUrgenciaMedica[indice]=valor[indice];
          newResultarUrgenciaMedica.push(valor);
           //console.log(valor);
          }
*/

   getCitasVirtualesActivas(){
    //this.getDataOfUser();
   // console.log("estes"+this.nameSideBar);
    this.citaService.listar().subscribe(
      res =>{
      
        res.data.forEach(function(valor,indice){
          var nombre=res.data[indice].doctor;  
          
          if(nombre==this.nameSideBar){
              this.arrayDatos.push(valor);
          }
        });
        /*
        if(res.nombre="Miguel"){
          this.arrayDatos.push(res);
        }*/
        console.log(this.arrayDatos);
        //this.totalCitas= res.data.length;

      }, err => console.log(err)
    )
  }

  getDataOfUser(){
    this.userAllService.getUserById(localStorage.getItem('idLoginUser')).subscribe(
      res =>{
        
        this.nombreUsuario=res.nombre;
        this.rolUsuario=res.rol;
        if(res.rol=="Paciente"||res.rol=="paciente"){
            this.isPaciente=true;
        }else{
          this.isPaciente=false;
        }
        this.listarCitas(res.nombre,res.rol,res.dni);
      
      },
      err => console.error(err)
    )
  }

  async listarCitas(nombreUsuario2: string, rolUsuario: string,dniPaciente:string){

       var dataCita = await this.citaService.listar().toPromise();

        var dataCitaActivas=[]; 
        var dataCitasTotales=[];
        var dataCitasMayoresAfecheActual=[];
        var d= new Date(dataCita.data.fechaHora);

        //console.log(dataCita.data[0].paciente._id);
        if(rolUsuario=="paciente"||rolUsuario=="Paciente"){
          dataCitaActivas = dataCita.data.filter(item =>  item.paciente.dni==dniPaciente && item.estado==1);
        }else{
          dataCitaActivas = dataCita.data.filter(item => item.doctor==nombreUsuario2 && item.estado==1);
        }

        if(rolUsuario=="paciente"||rolUsuario=="Paciente"){
          dataCitasTotales = dataCita.data.filter(item =>  item.paciente.dni==dniPaciente);
        }else{
          dataCitasTotales = dataCita.data.filter(item => item.doctor==nombreUsuario2);
        }
        
        console.log(dataCitaActivas);
          var varray=[];
          varray= dataCita.data;

          varray.forEach( function(valor, indice) {
          
            var d= new Date(varray[indice].fechaHora);
            //TODO: FALTA MOSTRAR ERROR SI NO TIENE CITAS 
            //TODO: ARREGLAR EL NOMBREUSUARIO
            if( (varray[indice].doctor==nombreUsuario2||varray[indice].paciente.dni==dniPaciente) && varray[indice].estado==1 && Date.now()<=d.getTime()){
            dataCitasMayoresAfecheActual.push(valor);
            }
  
  
          });   
        //console.log(dataCita2);
        console.log(dataCitasMayoresAfecheActual);
        this.citasPendientes=dataCitaActivas.length;
        console.log(this.rolUsuario);
        //var d= new Date(dataCitaActivas[0].fechaHora);

       
        console.log(d.getTime());
        console.log(Date.now());

        var dif2=[];
        var mayor;
        var menor;        
        var citaProxima=[];

        //Primero tengo que obtener las fechas de los datos
        //el que tenga menor diferencia entre mi fecha esla que esta mas cerca
        dataCitasMayoresAfecheActual.forEach( function(valor, indice) {
          var d= new Date(dataCitasMayoresAfecheActual[indice].fechaHora);
          
          var dif=Date.now()-d.getTime();
          dif2.push(dif);
          menor=Math.max.apply(null,dif2);
         
          
          if(dif==menor){
        
            citaProxima=valor;
          }
        });

        console.log(citaProxima);
        if(citaProxima.length==0){
          this.estadoSinCitas=0;
        }else{
          this.estadoSinCitas=1;
        }
        console.log(this.estadoSinCitas);
       var fecha333 = new Date(citaProxima["fechaHora"]);
       this.proximaCitaFechaMedico = this.datePipe.transform(fecha333, 'yyyy-MM-dd HH:mm');
       
        this.totalCitasAll=dataCitasTotales.length;

        this.proximaCitaArray=citaProxima;
        console.log(this.proximaCitaArray["paciente"].nombre);
        console.log(this.proximaCitaArray["paciente"]._id);
    }

    ingresarSalaButton(){
      console.log(this.proximaCitaArray);
      this.citaVirtualComponent.dirigirSala(this.proximaCitaArray["salaNumero"],this.proximaCitaArray["paciente"]._id)
    }
    
   
    

}