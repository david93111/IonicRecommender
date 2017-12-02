import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl:NavController) {

  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.navCtrl.setRoot(LoginPage)
    }
  }

  ionViewCanEnter(){
    if(localStorage.getItem('Auth-Token')){
      return true
    }
    return false
  }
}
