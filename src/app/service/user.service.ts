import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model/User";
import {Observable} from "rxjs";
import { UpdateUserDto } from '../model/UpdateUserDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEmail: any = sessionStorage.getItem('email');
  apiURL: string = environment.backEnd;
  apiLambda: string = environment.backLambda
  httpOptions = {
    headers: new HttpHeaders( {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
    })
  };

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiURL+`/api/user?email=${this.userEmail}`, this.httpOptions);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiLambda}/createuser`, user);
  }

  public checkExistEmail(email: string): Observable<any> {
    return this.http.get(this.apiURL+`/api/exist?email=${email}`);
  }

  public updateUser(updateUserDto: UpdateUserDto): Observable<any>{
    return this.http.post<UpdateUserDto>(this.apiLambda+`/updateuser`, updateUserDto);
  };

  errorHandler(error: any) {
    console.log(error);
  }
}
