import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Login} from "../model/login";
import {LoginResponse} from "../model/LogResponse";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  public currentRole : string = "?";
  private authenticateURL = environment.backEnd+'/authenticate';
  private lambdaURL = environment.backLambda;
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  public isAuthenticated: boolean = false;
  public token: string = '';

  constructor(private http : HttpClient, private router: Router) { }

  public authenticate(login: Login): Observable<LoginResponse>{
    sessionStorage.setItem('authToken',"?");
    return this.http.post<LoginResponse>(this.lambdaURL+'/authenticate',login, {headers: this._headers})
      .pipe(
        tap((loginResponse)=>{
          sessionStorage.clear();
          this.saveToken(loginResponse);
          this.isAuthenticated = true;
          this.router.navigate(['eqlexchange/dashboard']);
        }
        )
      );

  }

  public isAuthenticate(): Observable<boolean> {
    if(sessionStorage.getItem('authToken') != null) {
      return of(true);
    } else {
      return of(false);
    }
  }

  public getToken(){
    return sessionStorage.getItem('authToken');
  }

  public logout() {
    sessionStorage.clear();
    this.isAuthenticated = false;
    this.isAuthenticate();
    this.token = '';
    this.router.navigate(['']);
  }

  private saveToken(loginResponse:LoginResponse){
    if(loginResponse != null){
      this.currentRole = "ROLE_USER";
      this.token = loginResponse.token;
      sessionStorage.setItem('authToken',loginResponse.token);
      sessionStorage.setItem('email', loginResponse.email);
    }
    else{
      sessionStorage.setItem('authToken',"");
      sessionStorage.setItem('email', "");
      this.currentRole = "?";
    }
  }

}
