import { Component } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private username: string;
  private password: string;
  private error: string;

  constructor(private http:Http) {

  }

  login(): void {
    let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    let body = {'username': 'davidv','password': 'davidv'}
    let url = "http://localhost:8022/recommender/authenticate"
    this.http.post(url,body,options).subscribe(data => {
      console.log("status ->" + data.status)
      console.log("headers ->" + data.headers.keys())
      let token = data.headers.get('x-auth-token')
      console.log('El token es '+ token)
    },
    (err) => {
      console.log('Ocurrio un error, causa: '+ err)
      this.error = err
    })
    //localStorage.removeItem("Access-Token")
  }
}