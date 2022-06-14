import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { UserAllService } from 'src/app/citas/services/usersAll.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public uiAdvancedCollapsed = false;
  public formsCollapsed = false;
  public editorsCollapsed = false;
  public chartsCollapsed = false;
  public tablesCollapsed = false;
  public iconsCollapsed = false;
  public mapsCollapsed = false;
  public userPagesCollapsed = false;
  public errorCollapsed = false;
  public generalPagesCollapsed = false;
  public eCommerceCollapsed = false;



  constructor(translate: TranslateService, private userAllService:UserAllService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }

  public nameSideBar;
  public rolSideBar;

  public permitirHistoria;
  public permitirGPacienteYGCita;
  public permitirCita;
  public permitirReporteGeneral;
  public permitirGestionarServiAndCambiarC;
  public permitirEnfermera;
  public permitirDoctor;
  public permitirAdmin;
  public permitirJefe;
  public permitirCLiente;
  public permitirtecnico;
  public permitirVendedor;
  ngOnInit() {
    console.log(this.userAllService.selectedTokenUser.nombre);
    this.getDataOfUser();
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }


  getDataOfUser(){
    this.userAllService.getUserById(localStorage.getItem('idLoginUser')).subscribe(
      res =>{
        this.nameSideBar=res.nombre;
        this.rolSideBar=res.rol;

        if(this.rolSideBar=="ADMINISTRADOR"||this.rolSideBar=="administrador"){
            this.permitirAdmin=true;
        }else{
          this.permitirAdmin=false;
        }
        
        if(this.rolSideBar=="VENDEDOR"||this.rolSideBar=="vendedor"){
          this.permitirVendedor=true;
        }else{
          this.permitirVendedor=false;
        }
        
        if(this.rolSideBar=="JEFEINVENTARIO"||this.rolSideBar=="jefeinventario"){
          this.permitirJefe=true;
        }else{
          this.permitirJefe=false;
        }
        
        if(this.rolSideBar=="TECNICO"||this.rolSideBar=="tecnico"){
          this.permitirtecnico=true;
        }else{
          this.permitirtecnico=false;
        }
        
        if(this.rolSideBar=="CLIENTE"||this.rolSideBar=="Cliente"){
          this.permitirCLiente=true;
        }else{
          this.permitirCLiente=false;
        }
      },
      err => console.error(err)
    )
  }

}
