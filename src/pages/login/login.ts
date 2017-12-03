import { ToastService } from './../../services/ToastService';
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

  constructor(
    private http:Http,
    public navCtrl:NavController, 
    public menu:MenuController,
    public toastSrv:ToastService) {

  }

  ionViewWillEnter(){
    if(localStorage.getItem('Auth-Token')){
      this.menu.enable(true)
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
    },
    (err) => {
      if(err.status !== undefined && err.status === 401){
        this.toastSrv.createClosableToast('Invalid Credentials, check your username and password')
      }else{
        this.toastSrv.createClosableToast('Error Login, error trying to reach de server. Please try later')
      }
    })
    //localStorage.removeItem("Access-Token")
  }

  signup(): void{
    this.navCtrl.push(SignUpPage)
  }
}