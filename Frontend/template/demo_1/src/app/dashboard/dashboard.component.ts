import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup,FormControl, Validators } from '@angular/forms'; //para add

import { MovimientoCajaService } from '../citas/services/movimiento-caja.service';

//CHART JS
import {Chart,registerables} from 'chart.js';
//import * as Chart from 'chart.js';


@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss'],
  //Se agrego en providers GestionarOrdenCompraComponent por el error  The pipe ' ' could not be found angular2 custom pipe
  providers: []
})


export class Dashboard implements OnInit {

 constructor(private movimientoCajaService: MovimientoCajaService) { 
    
  Chart.register(...registerables);

  }

  public yearSelected;
  public yearMovSelected;  
  public yearOrdenCompraSelected;  


  public monthSelected;
  public nombreEquipoSelected;
  public nombreCategoriaSelected;
  public cantidadEmpleados=0;
  public cantidadProveedores=0;
  public myChartBarra: Chart;
  public myChart: Chart;
  public myChartCircular: Chart;

  public ingresoCitasArray=[];
  public totalCitas=0;
  //VARIABLES FILTRADO
  public fechaDe;
  public fechaHasta;
  public estado=0;
  public ingresosPorEspecialidad=[];
  public nombres = ["Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  
   ngOnInit(){//  NEW 
    this.getDataOfMovimientoCaja("xd","d","dsd","ds",null,null,0);
    var nombresSinRepetir = ["Hola", "Xd"];
    var cantidadM = [1,2];  
    var ingresoCitas= [232,444,545];  
    var ingresoFarmacia = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.getDataForCircleChart();
    this.getNumeroTotalCitas();
    console.log(this.fechaDe);
   // this.setGraficoBarra("myChart",nombresSinRepetir,cantidadM);
   
   // this.setGraficoBarraDoble("myChartBarraDoble",this.nombres,this.ingresoCitasArray,ingresoFarmacia);
    //await this.getDataOfMovimientoCaja();

    /*
      await this.getDataOfMovimientoCaja();
      this.setGraficoBarraDoble("myChartBarraDoble",nombres,this.ingresoCitasArray,ingresoFarmacia);
*/
    

    //this.setGraficoBarraDoble("myChartBarraDoble",nombres,this.ingresoCitasArray,ingresoFarmacia);



    //this.setGraficoBarraDoble("myChartBarraDoble",nombres,this.ingresoCitasArray,ingresoFarmacia);
  //myCircleChart
/*
    setTimeout(() => {
      this.setGraficoCircular("myCircleChart",this.ingresosPorEspecialidad);
      //this.setGraficoBarraDoble("myChartBarraDoble",this.nombres,this.ingresoCitasArray,ingresoFarmacia);

    }, 1000);*/
    }
    
   

    setGraficoBarraDoble(canvas: string,labels: any[],data1: any[], data2: any[]){
      if (this.myChart) this.myChart.destroy(); 
       this.myChart = new Chart(canvas,{
          type: 'bar',
          
          data: {
              labels: labels,
              
              datasets: [
                  {
                  label: '#Citas',
                  
                  data: data1,
                  backgroundColor: [
                      'rgba(222, 222, 240, 1)'
                      
                  ],
                  borderColor: [
                      'rgba(222,222, 240, 1)'
                      
                  ],
                  borderWidth: 1
              },
              {
                  label: '#Farmacia',
                  data: data2,
                  backgroundColor: [
                      'rgba(167, 197, 235, 1)'
                      
                  ],
                  borderColor: [
                      'rgba(197, 197, 235, 1)'
                      
                  ],
                  borderWidth: 1
              }



              ]
          },


          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          },
      });
      
  } 

    setGraficoBarra(canvas: string,labels: any[], data: any[]){
      if (this.myChartBarra) this.myChartBarra.destroy(); 
      this.myChartBarra = new Chart(canvas,{
          type: "bar",
          data: {
              labels: labels/*labels*/,
              datasets: [{
                  indexAxis: "y",
                  label: 'Cantidad Medicamento Por Categoria',
                  data: data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
          }
      });
  }


  setGraficoCircular(canvas: string,data: any[]){
    if (this.myChartCircular) this.myChartCircular.destroy(); 
    this.myChartCircular = new Chart(canvas,{
        type: 'doughnut',
        data: {
          //this.ingresosPorEspecialidad=[urgenciaMedica,dermatologia,olftalmologia,medicinaGeneral,cardiologia,gastroenterologia,pediatria];

            labels: ["Urgencia Medica", "Dematologia", "Oftalmologia", "Medicina General", "Cardiologia", "Gastroenterologia", "Pediatria"]/*labels*/,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(222, 222, 240, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(222, 222, 240, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
   
}
  
 getDataOfMovimientoCaja(mesBuscar1: any, diaBuscar1: any, mesBuscar2: any, diaBuscar2: any,startDate: Date, endDate: Date,estado:any){
   /*var ingresoEnero,ingresoFebrero,ingresoMarzo,ingresoAbril,ingresoMayo,ingresoJunio,ingresoJulio,ingresoAgosto,ingresoSeptiembre,ingresoOctubre,
    ingresoNoviembre,ingresoDiciembre; */
    var ingresoTotal=0;
    var numeroMesPrueba=5;
    var ingresoEnero=0;
    var ingresoFebrero=0;
    var ingresoMarzo=0;
    var ingresoAbril=0;
    var ingresoMayo=0;
    var ingresoJunio=0;
    var ingresoJulio=0;
    var ingresoAgosto=0;
    var ingresoSeptiembre=0;
    var ingresoOctubre=0;
    var ingresoNoviembre=0;
    var ingresoDiciembre=0;
    var arrayEnero=[];
    var arrayFebrero=[];
    var arrayMarzo=[];
    var arrayAbril=[];
    var arrayMayo=[];
    var arrayJunio=[];
    var arrayJulio=[];
    var arrayAgosto=[];
    var arraySeptiembre=[];
    var arrayOctubre=[];
    var arrayNoviembre=[];
    var arrayDiciembre=[];
    var arrayIngresoCitasNew=[];
    var newResultarDermatologia=[];
    var newResultarOftalmologia=[];
    var newResultarMedicinaGeneral=[];
    var newResultarCardiologia=[];
   // var numbers = new Array(1, 4, 9); 
   var newResultarGastro=[];
    var newResultarPediatria=[];
    var arrayFiltradoMes=[];
    var arrayFiltradoMesDesdeYHasta=[];

   /* var d= new Date(this.fechaDe)
    var fechaDesdeMes= d.getMonth()+1;
    var fechaDesdeDia= d.getDate()+1;*/

          // console.log(fechaDesdeMes+1);

    this.movimientoCajaService.listar().subscribe(
      res =>{

        res.data.forEach( function(valor, indice) {
          var d=new Date(res.data[indice].fechaHora);
          var numeroMes=(d.getMonth()+1);
          var numeroDia=d.getDate(); //aca nos da el dia pero no lo modifica por eso no se suma

          //getMonth me da el mes -1

           /*
           if(numeroMes==11 && (numeroDia==1 && numeroDia==15) && numeroMes==12){
                            
           }
           */
           /*
           var d= new Date(this.fechaDe)
           var fechaDesdeMes= d.getMonth()+1;
           console.log(fechaDesdeMes+1);
           
          if(fechaDesdeMes==numeroMes){

          }
*/
/*
          if((mesBuscar1==numeroMes && diaBuscar1==numeroDia) && (mesBuscar2==numeroMes && diaBuscar2==numeroDia) ){
             arrayFiltradoMes.push(valor);
             console.log("Se filtro desde el mes: "+mesBuscar1 +  " y el dia: " + diaBuscar1+ " con dia en la BD de: " + numeroDia);
             console.log(arrayFiltradoMes);
             console.log("Se filtro desde el mes: " + mesBuscar1 + " y dia: " + diaBuscar1 + " HASTA el mes: " + mesBuscar2 + " y dia: " + diaBuscar2);
            // console.log(fechaDesdeDia);
          }*/
          
          //TODO: ddwdwd

          if(estado==0){
            var dat1= new Date("Thu Dec 31 2020 19:00:00 GMT-0500 (hora estándar de Perú)");
            var dat2= new Date("Thu Dec 30 2021 19:00:00 GMT-0500 (hora estándar de Perú)");
            if( (d>dat1) && (d<dat2) ){
              console.log("filtro");
              arrayFiltradoMes.push(valor);
              
            }

          }else{
          
            if( (d>startDate) && (d<endDate) ){
              console.log("filtro");
              arrayFiltradoMes.push(valor);
              console.log(startDate);
              console.log(endDate);
            }
          }
         //console.log("JAAA"+arrayFiltradoMes);

        });
        
        arrayFiltradoMes.forEach( function(valor, indice) {
          
          var d=new Date(arrayFiltradoMes[indice].fechaHora);
          var numeroMes=(d.getMonth()+1);
          var numeroDia=d.getDate(); //aca nos da el dia pero no lo modifica por eso no se suma

          if(numeroMes==1){
            arrayEnero.push(valor);
          }
          if(numeroMes==2){
            arrayFebrero.push(valor);
          }
          if(numeroMes==3){
            arrayMarzo.push(valor);
          }
          if(numeroMes==4){
            arrayAbril.push(valor);
          }
          if(numeroMes==5){
            arrayMayo.push(valor);
          }
          if(numeroMes==6){
            arrayJunio.push(valor);
          }
          if(numeroMes==7){
            arrayJulio.push(valor);
          }
          if(numeroMes==8){
            arrayAgosto.push(valor);
          }
          if(numeroMes==9){
            arraySeptiembre.push(valor);
          }
          if(numeroMes==10){
            arrayOctubre.push(valor);
          }
          if(numeroMes==11){
            arrayNoviembre.push(valor);
          }
          if(numeroMes==12){
            arrayDiciembre.push(valor);
          }
      
        });



        arrayEnero.forEach( function(valor, indice) {

          ingresoEnero+= arrayEnero[indice].montoRecibido;
        });
        arrayFebrero.forEach( function(valor, indice) {

          ingresoFebrero+= arrayFebrero[indice].montoRecibido;
        });
        arrayMarzo.forEach( function(valor, indice) {

          ingresoMarzo+= arrayMarzo[indice].montoRecibido;
        });
        arrayAbril.forEach( function(valor, indice) {

          ingresoAbril+= arrayAbril[indice].montoRecibido;
        });
        arrayMayo.forEach( function(valor, indice) {

          ingresoMayo+= arrayMayo[indice].montoRecibido;
        });
        arrayJunio.forEach( function(valor, indice) {

          ingresoJunio+= arrayJunio[indice].montoRecibido;
        });
        arrayJulio.forEach( function(valor, indice) {

          ingresoJulio+= arrayJulio[indice].montoRecibido;
        });
        arrayAgosto.forEach( function(valor, indice) {

          ingresoAgosto+= arrayAgosto[indice].montoRecibido;
        });
        arraySeptiembre.forEach( function(valor, indice) {

          ingresoSeptiembre+= arraySeptiembre[indice].montoRecibido;
        });
        arrayOctubre.forEach( function(valor, indice) {

          ingresoOctubre+= arrayOctubre[indice].montoRecibido;
        });
        arrayNoviembre.forEach( function(valor, indice) {

          ingresoNoviembre+= arrayNoviembre[indice].montoRecibido;
        });
        arrayDiciembre.forEach( function(valor, indice) {

          ingresoDiciembre+= arrayDiciembre[indice].montoRecibido;
        });
        
         
      
/*
    this.ingresoCitasArray=[ingresoEnero,ingresoFebrero,ingresoMarzo,ingresoAbril,ingresoMayo,ingresoJunio,ingresoJulio,ingresoAgosto,
    ingresoSeptiembre,ingresoOctubre,ingresoNoviembre,ingresoDiciembre];
*/

    arrayIngresoCitasNew=[ingresoEnero,ingresoFebrero,ingresoMarzo,ingresoAbril,ingresoMayo,ingresoJunio,ingresoJulio,ingresoAgosto,
      ingresoSeptiembre,ingresoOctubre,ingresoNoviembre,ingresoDiciembre];
      console.log(ingresoAgosto);
      console.log(ingresoJulio);
      console.log(ingresoSeptiembre);

    this.setGraficoBarraDoble("myChartBarraDoble",this.nombres,arrayIngresoCitasNew,[2,4,5,6,4,3,23]);

      }, err =>console.error(err)

    )

  }

 

  getDataForCircleChart(){
    var urgenciaMedica=0;
    var dermatologia=0;
    var olftalmologia=0;
    var medicinaGeneral=0;
    var cardiologia=0;
    var gastroenterologia=0;
    var pediatria=0;
    var ingresosPorEspecialidadNew=[];


    this.movimientoCajaService.listar().subscribe(
      res =>{
        //Urgencia Medica
        /*
        var resultUrgenciaMedica = res.data.filter((x,index) => { 

          var d=res.data[index].motivo.descripcion;
          //var numeroMes=(d.getMonth()+1);
          return (d=="Urgencia medica"); 

        });*/


        var newResultarUrgenciaMedica=[];
        var newResultarDermatologia=[];
        var newResultarOftalmologia=[];
        var newResultarMedicinaGeneral=[];
        var newResultarCardiologia=[];
       // var numbers = new Array(1, 4, 9); 
       var newResultarGastro=[];
        var newResultarPediatria=[];

        
        res.data.forEach( function(valor, indice) {
          var d=res.data[indice].motivo.descripcion;
   
          if(d=="Urgencia medica"){
           // newResultarUrgenciaMedica[indice]=valor[indice];
          newResultarUrgenciaMedica.push(valor);
           //console.log(valor);
          }
          if(d=="Dermatología"){
          newResultarDermatologia.push(valor);

          }
          if(d=="Oftalmología"){
            newResultarOftalmologia.push(valor);
  
          }
          if(d=="Medicina General"){
            newResultarMedicinaGeneral.push(valor);
  
          }
          if(d=="Cardiología"){
            newResultarCardiologia.push(valor);
  
          }
          if(d=="Gastroenterología"){
            newResultarGastro.push(valor);
  
          }
          if(d=="Pediatría"){
            newResultarPediatria.push(valor);
            //Otro modo Sumar con reduce pero consume mas memoria mas efectivo usar forEach
            // pero en terminos de reducir lineas de codigo es mejor usar reduce
            //const pediatria3 = newResultarPediatria => newResultarPediatria.reduce((a,b) => a + b, 0)
          }
        });

        /* console.log(newResultarUrgenciaMedica);
         console.log(newResultarDermatologia);*/

         newResultarUrgenciaMedica.forEach( function(valor, indice) {

          urgenciaMedica+= newResultarUrgenciaMedica[indice].montoRecibido;
        });

        newResultarDermatologia.forEach( function(valor, indice) {

          dermatologia+= newResultarDermatologia[indice].montoRecibido;
        });

        
        newResultarOftalmologia.forEach( function(valor, indice) {

          olftalmologia+= newResultarOftalmologia[indice].montoRecibido;
        });

        newResultarMedicinaGeneral.forEach( function(valor, indice) {

          medicinaGeneral+= newResultarMedicinaGeneral[indice].montoRecibido;
        });
     

        newResultarCardiologia.forEach( function(valor, indice) {

          cardiologia+= newResultarCardiologia[indice].montoRecibido;
        });


        newResultarPediatria.forEach( function(valor, indice) {

          pediatria+= newResultarPediatria[indice].montoRecibido;
        });

        newResultarGastro.forEach( function(valor, indice) {

          gastroenterologia+= newResultarGastro[indice].montoRecibido;
        });

        //this.ingresosPorEspecialidad=[urgenciaMedica,dermatologia,olftalmologia,medicinaGeneral,cardiologia,gastroenterologia,pediatria];
        ingresosPorEspecialidadNew=[urgenciaMedica,dermatologia,olftalmologia,medicinaGeneral,cardiologia,gastroenterologia,pediatria];
        
        //console.log(this.ingresosPorEspecialidad);

        this.setGraficoCircular("myCircleChart",ingresosPorEspecialidadNew);


      }, err => console.log(err)
    )
  }

  getNumeroTotalCitas(){
    this.movimientoCajaService.listar().subscribe(
      res =>{
        
        this.totalCitas= res.data.length;

      }, err => console.log(err)
    )

  }
  consoleLogFechaDe(){
    this.estado=1;
    console.log(this.fechaDe);
    var d= new Date(this.fechaDe)
    var fechaDesdeMes= d.getMonth()+1;
    var fechaDesdeDia= d.getDate()+1; //El date nos da un dia menos por eso se suma
    var d2= new Date(this.fechaHasta)
    var fechaDesdeMes2= d2.getMonth()+1;
    var fechaDesdeDia2= d2.getDate()+1; //El date nos da un dia menos por eso se suma
    
    console.log(this.fechaHasta);
    //console.log(d.getDate());
    //console.log(fechaDesdeMes+1);
    this.getDataOfMovimientoCaja(fechaDesdeMes,fechaDesdeDia,fechaDesdeMes2,fechaDesdeDia2,d,d2,1);
    console.log(d);

    /*
    
                var d=new Date(res[index]['fecha']);
                        var numeroYear=(d.getFullYear());
    */
  }
}