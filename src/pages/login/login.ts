import { Component } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { NavController, MenuController } from 'ionic-angular';
import {SignUpPage} from '../signup/signup'
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private username: string;
  private password: string;
  private error: string;

  constructor(private http:Http,public navCtrl:NavController, public menu:MenuController) {

  }

  ionViewWillEnter(){
    if(localStorage.getItem('Auth-Token')){
      this.navCtrl.setRoot(HelloIonicPage)
    }else{
      this.menu.enable(false)
    }
  }

  login(): void {
    let options = { headers: new Headers({ 'Content-Type': 'application/json' }) };
    let body = {'username': this.username,'password': this.password}
    let url = "http://localhost:8022/recommender/authenticate"
    this.http.post(url,body,options).subscribe(data => {
      if(data.status===200){
        let token = data.headers.get('X-Auth-Token')
        console.log("el token es "+ token)
        if(token!==null){
          localStorage.setItem("Auth-Token",token)
          this.navCtrl.swipeBackEnabled = false
          this.menu.enable(true)
          this.navCtrl.setRoot(HelloIonicPage)
        }
      }
      console.log("status ->" + data.status)
      console.log("headers ->" + data.headers.keys())
    },
    (err) => {
      console.log('Ocurrio un error, causa: '+ err)
      this.error = err
    })
    //localStorage.removeItem("Access-Token")
  }

  signup(): void{
    this.navCtrl.push(SignUpPage)
  }
}