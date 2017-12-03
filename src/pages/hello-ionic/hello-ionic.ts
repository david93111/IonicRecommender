import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastService } from '../../services/ToastService';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl:NavController,public toastSrv:ToastService) {

  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.toastSrv.createClosableToast('Your current sesion has expired, please log in again.',false)
      this.navCtrl.setRoot(LoginPage)
    }
  }
}
