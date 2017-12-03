import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { ToastService } from './../../services/ToastService';
import { Http,Headers } from '@angular/http';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {
  user: any;

  constructor(
    public navCtrl: NavController,
    public http: Http, 
    public toastSrv:ToastService) {
  }

  getCurrentUser(){
    let options = { headers: new Headers(
      { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Auth-Token')
      }) };
    let url = "http://localhost:8022/recommender/users/current"
    this.http.get(url,options).subscribe(data=>{
        this.user = data.json();
    },
    err =>{
      console.log('Unexpected error obtaining the recomendations' + err);
      if(err.status !== undefined && err.status === 401){
        localStorage.removeItem('Auth-Token')
        this.toastSrv.createClosableToast('Your current sesion has expired, please log in again.',false)
        this.navCtrl.setRoot(LoginPage)
      }else{
        this.toastSrv.createClosableToast("Error trying to obtain your user information. Please try later")
      }
    })
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.toastSrv.createClosableToast('Your current sesion has expired, please log in again.',false)
      this.navCtrl.setRoot(LoginPage)
    }else{
      this.user = this.getCurrentUser()
    }
  }
}
