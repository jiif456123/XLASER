import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Socket } from "ngx-socket-io";
import { v4 as uuidv4 }  from 'uuid';
import { HistoriaService } from 'src/app/citas/services/historia.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare const Peer;

import { UserAllService } from 'src/app/citas/services/usersAll.service';

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
}


@Component({
  selector: 'app-categoriaM',
  templateUrl: './virtualRoom.component.html',
  styleUrls: [ './virtualRoom.component.css'],
  providers: []
})


export class VirtualRoomComponent implements OnInit {

  currentUserId:string = uuidv4();
  videos: VideoElement[] = [];
  //videos: VideoElement[] = [];

formHistoriaModificar: FormGroup;
  //NEW ROOM
  roomName: string;

  constructor(
    private route:ActivatedRoute,
     private socket:Socket/*, 
     
     private peerService: PeerService
     */
     , public historiaService: HistoriaService, private userAllService:UserAllService) { 
      //New room
      this.roomName = route.snapshot.paramMap.get('id');

     }
  
     public nombreUsuario;
     public rolUsuario;
     public doctorBoolean;
     public usuarioEntrante;
    
     ngOnInit() {
      this.getDataOfUser();
      //this.historiaService.selectedHistoria.medico="xd";
      console.log(`Initialize Peer with id ${this.currentUserId}`);
      const myPeer = new Peer(this.currentUserId, {
        host: '/',
        port: 3001,
      });
  
      this.route.params.subscribe((params) => {
        console.log(params);
  
        myPeer.on('open', userId => {
          //roomID es 
          this.socket.emit('join-room', /*params.roomId*/ this.roomName, userId);
        });
      });
  
      navigator.mediaDevices.getUserMedia({
        audio: false, //TODO:FALSE PARA PROBARRRRR DEBERIA SER TRUE
        video: true,
      })
        .catch((err) => {
          console.error('[Error] Not able to retrieve user media:', err);
          Swal.fire('Error', 'No se permitio el acceso a la camara', 'error')
          return null;
        })
        .then((stream: MediaStream | null) => {
          if (stream) {
            this.addMyVideo(stream);
          }
  
          myPeer.on('call', (call) => {
            console.log('receiving call...', call);
            
            console.log(call.metadata.userLoginId);
            this.usuarioEntrante=call.metadata.userLoginId;
            call.answer(stream);
  
            call.on('stream', (otherUserVideoStream: MediaStream) => {
              console.log('receiving other stream', otherUserVideoStream);
  
              this.addOtherUserVideo(call.metadata.userId, otherUserVideoStream);
            });
  
            call.on('error', (err) => {
              console.error(err);
            })
          });
  
          this.socket.on('user-connected', (userId) => {
            console.log('Receiving user-connected event', `Calling ${userId}`);
  
            // Let some time for new peers to be able to answer
            setTimeout(() => {
              const call = myPeer.call(userId, stream, {
                metadata: { userId: this.currentUserId, userLoginId: localStorage.getItem('idLoginUser') },
              });
              call.on('stream', (otherUserVideoStream: MediaStream) => {
                console.log('receiving other user stream after his connection');
                this.addOtherUserVideo(userId, otherUserVideoStream);
              });
              //console.log(userId);
              call.on('close', () => {
                this.videos = this.videos.filter((video) => video.userId !== userId);
              });
            }, 5000);
          });
        });
  
      this.socket.on('user-disconnected', (userId) => {
        console.log(`receiving user-disconnected event from ${userId}`)
        this.videos = this.videos.filter(video => video.userId !== userId);
      });
    }
  
    addMyVideo(stream: MediaStream) {
      this.videos.push({
        muted: true,
        srcObject: stream,
        userId: this.currentUserId,
      });
    }
  
    addOtherUserVideo(userId: string, stream: MediaStream) {
      const alreadyExisting = this.videos.some(video => video.userId === userId);
      if (alreadyExisting) {
        console.log(this.videos, userId);
        return;
      }
      this.videos.push({
        muted: false,
        srcObject: stream,
        userId,
      });
    }
  
    onLoadedMetadata(event: Event) {
      (event.target as HTMLVideoElement).play();
    }

  
    actualizarHistoria(form: NgForm){
      
      if(form.value._id){
          this.historiaService.actualizar(form.value._id,form.value).subscribe(
            (res)=> {
              console.log(res);
              Swal.fire('Correcto', 'Se registro correctamente', 'success')

              },
              (err) => console.error(err)
          );
      }
    }

    getDataOfUser(){
      this.userAllService.getUserById(localStorage.getItem('idLoginUser')).subscribe(
        res =>{
          
          this.nombreUsuario=res.nombre;
          this.rolUsuario= res.rol;

          if(this.rolUsuario=="Doctor"||this.rolUsuario=="Medico"){
            this.doctorBoolean=true;  
          }else{
            this.doctorBoolean=false;
          }
          //console.log(this.rolUsuario);
          //this.rolSideBar=res.rol;
          
        },
        err => console.error(err)
      )
    }
}