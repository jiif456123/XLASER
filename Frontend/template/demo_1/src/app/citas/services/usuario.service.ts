import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser : User;
  user: User[];
  urlEndPoint: string = environment.endpoint.concat('/virtual/user');

  UserCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any>(this.urlEndPoint);
  }

  registrar(query: any) {
    return this.http.post<any>(this.urlEndPoint, query);
  }

  actualizar(id: string, query: any) {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, query);
  }

  registrarUser(user: any){
    return this.http.post<User[]>(this.urlEndPoint, user);
  }

  actualizarUser(user: User) {
    return this.http.put(this.urlEndPoint + `/${user._id}`, user);
  }
  listarUserId(id: string){
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }
  eliminar(_id: string) {
    return this.http.delete<any>(`${this.urlEndPoint}/${_id}`);
  };
}
